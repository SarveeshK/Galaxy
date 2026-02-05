/**
 * Galaxy 2K26 Registration Script (UPDATED - EMAIL V4 + PER-EVENT SHEETS)
 * 
 * CRITICAL DEPLOYMENT INSTRUCTIONS:
 * 1. Go to 'Deploy' > 'Manage deployments'.
 * 2. Click the 'Edit' (pencil) icon next to your existing deployment.
 * 3. 'Version': Select 'New version'.
 * 4. Click 'Deploy'.
 * 5. Copy the Web App URL.
 */

const CONFIG = {
  SHEET_NAME: "Registrations", 
  FOLDER_NAME: "Galaxy_2K26_Screenshots", 
  TECH_SHEET: "Technical Registrations",
  NON_TECH_SHEET: "Non-Technical Registrations",
  
  TECH_EVENTS: [
    "PROJECT WAR", 
    "PAPER PRESENTATION", 
    "ARDUINO HACKATHON", 
    "CIRCUIT DEBUGGING", 
    "CHASE AND BUILD"
  ],
  
  LOGO_URL: "https://lh3.googleusercontent.com/d/18EQeNdPIj-9CnQjPz2gt_shdXtlYzC6l" 
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 
    
    // 1. Parse Data
    const data = JSON.parse(e.postData.contents);
    const { 
      fullName, 
      email, 
      phone, 
      college, 
      department, 
      year, 
      events, 
      teamDetails, 
      transactionId,
      paymentScreenshot 
    } = data;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 2. Prepare Main Sheet
    let mainSheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!mainSheet) {
      mainSheet = ss.insertSheet(CONFIG.SHEET_NAME);
      mainSheet.appendRow(["Timestamp", "Full Name", "Email", "Phone", "College", "Department", "Year", "Events", "Team Details", "Transaction ID", "Screenshot Link"]);
      mainSheet.getRange(1, 1, 1, 11).setFontWeight("bold");
      mainSheet.setFrozenRows(1);
    }
    
    // 3. Handle Image Upload
    let screenshotUrl = "No Image";
    if (paymentScreenshot && paymentScreenshot.startsWith("data:image")) {
      screenshotUrl = saveImageToDriveFolder(paymentScreenshot, `${fullName}_${transactionId}`);
    }

    // 4. Format Data for Main Sheet
    const timestamp = new Date();
    const eventsString = Array.isArray(events) ? events.join(", ") : events;
    
    let teamDetailsString = "";
    if (teamDetails) {
       for (const [evt, info] of Object.entries(teamDetails)) {
         if (events.includes(evt) && (info.leadName || (info.members && info.members.length))) {
           const mems = info.members ? info.members.filter(m=>m).join(", ") : "";
           teamDetailsString += `[${evt}] Lead: ${info.leadName} (${info.leadPhone}) | Mems: ${mems}\n`;
         }
       }
    }

    const row = [
      timestamp,
      fullName,
      email,
      phone,
      college,
      department,
      year,
      eventsString,
      teamDetailsString,
      transactionId,
      screenshotUrl
    ];

    mainSheet.appendRow(row);

    // 5. Handle Specialized Sheets
    if (Array.isArray(events)) {
      events.forEach(eventName => {
        // A. Add to Category Sheet (Tech vs Non-Tech)
        const isTech = CONFIG.TECH_EVENTS.includes(eventName.toUpperCase());
        const targetCategorySheet = isTech ? CONFIG.TECH_SHEET : CONFIG.NON_TECH_SHEET;
        addToCategorySheet(ss, targetCategorySheet, eventName, row, teamDetails?.[eventName]);
        
        // B. Add to Specific Event Sheet (e.g., "PROJECT WAR")
        // We use the same helper function but pass the eventName as the sheet name
        // We might want to sanitize the sheet name (max 100 chars, no special chars), but event names are usually safe.
        addToCategorySheet(ss, eventName.toUpperCase(), eventName, row, teamDetails?.[eventName]);
      });
    }

    // 6. Send Email
    if (email) {
      try {
        sendEmail(fullName, email, events, teamDetails);
      } catch (err) {
        console.log("Email error", err);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success", row: mainSheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function addToCategorySheet(ss, sheetName, eventName, mainRowData, teamInfo) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(["Timestamp", "Full Name", "Email", "Phone", "College", "Department", "Year", "Specific Event", "Team Lead", "Members", "Transaction ID", "Screenshot Link"]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 12).setFontWeight("bold");
    
    // Color coding for tabs
    if (sheetName.includes("Technical") && !sheetName.includes("Non")) sheet.setTabColor("#4285f4"); // Blue for Tech
    else if (sheetName.includes("Non-Technical")) sheet.setTabColor("#e06666"); // Red for Non-Tech
    else sheet.setTabColor("#f1c232"); // Yellow for Individual Events
  }

  let lead = "Individual";
  let mems = "";
  if (teamInfo) {
    if (teamInfo.leadName) lead = `${teamInfo.leadName} (${teamInfo.leadPhone})`;
    if (teamInfo.members) mems = teamInfo.members.filter(m=>m).join(", ");
  }

  const newRow = [
    mainRowData[0], // Time
    mainRowData[1], // Name
    mainRowData[2], // Email
    mainRowData[3], // Phone
    mainRowData[4], // College
    mainRowData[5], // Dept
    mainRowData[6], // Year
    eventName,      // THIS Event
    lead,           // Lead
    mems,           // Members
    mainRowData[9], // TxID
    mainRowData[10] // Link
  ];

  sheet.appendRow(newRow);
}

function saveImageToDriveFolder(base64String, fileName) {
  try {
    const folders = DriveApp.getFoldersByName(CONFIG.FOLDER_NAME);
    let folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(CONFIG.FOLDER_NAME);
    }
    
    var split = base64String.split('base64,');
    var contentType = split[0].replace('data:', '').replace(';', '');
    var base64 = split[1];
    var decoded = Utilities.base64Decode(base64);
    var blob = Utilities.newBlob(decoded, contentType, fileName);
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return file.getUrl();
  } catch (e) {
    return "Error saving image: " + e.toString();
  }
}

function sendEmail(name, email, events, teamDetails) {
  
  const eventItems = events.map(ev => {
    let membersHtml = '';
    
    if (teamDetails && teamDetails[ev]) {
      const info = teamDetails[ev];
      const membersList = info.members ? info.members.filter(m => m && m.trim()).join(", ") : "";
      
      if (membersList) {
        membersHtml = `
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed rgba(255,255,255,0.2); font-size: 13px;">
            <span style="color: #bbb; font-weight: bold; display: block; margin-bottom: 2px;">Team Mates:</span>
            <span style="color: #fff; letter-spacing: 0.5px;">${membersList}</span>
          </div>
        `;
      }
    }

    return `
    <div style="background: rgba(255,255,255,0.05); padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
      <div style="display: flex; align-items: center; margin-bottom: ${membersHtml ? '5px' : '0'};">
        <span style="color: #4285f4; margin-right: 10px; font-size: 18px;">🚀</span>
        <span style="color: #ffffff; font-family: 'Segoe UI', sans-serif; font-size: 14px; letter-spacing: 0.5px; font-weight: bold;">${ev}</span>
      </div>
      ${membersHtml}
    </div>`;
  }).join('');
  
  let shortFilmSection = '';
  const hasShortFilm = events.some(e => e.toUpperCase().includes("SHORT FILM") || e.toUpperCase().includes("SHORTFILM"));
  
  if (hasShortFilm) {
    shortFilmSection = `
      <div style="background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.3); padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
        <p style="margin: 0 0 10px 0; color: #fff; font-size: 14px;">🎬 <strong>Short Film Participants</strong></p>
        <p style="margin: 0; color: #ccc; font-size: 13px; margin-bottom: 8px;">Please join the official WhatsApp group for updates:</p>
        <a href="https://chat.whatsapp.com/FWRFhSYYylq7opyp9GG3iH?mode=gi_t" style="display: inline-block; background: #25D366; color: #fff; text-decoration: none; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">Join WhatsApp Group</a>
      </div>
    `;
  }

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      
      <div style="max-width: 600px; margin: 20px auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.7); border: 1px solid #333;">
        
        <div style="background-color: #000; padding: 0; text-align: center; border-bottom: 1px solid #222;">
          <img src="${CONFIG.LOGO_URL}" alt="GALAXY 2K26" style="width: 100%; height: auto; display: block;">
        </div>

        <div style="padding: 40px 30px; background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%);">
          
          <h2 style="color: #ffffff; margin: 0 0 10px 0; font-size: 24px; text-align: center; font-weight: 600; letter-spacing: 1px;">Registration <span style="color: #4285f4;">Confirmed</span></h2>
          <p style="color: #888; text-align: center; margin: 0 0 30px 0; font-size: 14px;">GET READY FOR THE FUTURE</p>

          <div style="background: rgba(66, 133, 244, 0.1); border-left: 4px solid #4285f4; padding: 15px; border-radius: 4px; margin-bottom: 30px;">
            <p style="margin: 0; color: #e0e0e0; font-size: 15px;">
              Hello <strong style="color: #fff;">${name}</strong>,<br><br>
              You have successfully secured your spot at the National Level Technical Symposium.
            </p>
          </div>

          <p style="color: #666; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; margin-bottom: 15px;">Your Events</p>
          
          <div style="margin-bottom: 20px;">
            ${eventItems}
          </div>

          ${shortFilmSection}

          <div style="display: flex; gap: 10px; margin-top: 30px; margin-bottom: 30px;">
            <div style="flex: 1; background: #151515; padding: 15px; border-radius: 12px; text-align: center; border: 1px solid #333;">
              <div style="font-size: 20px; margin-bottom: 5px;">📅</div>
              <div style="color: #fff; font-weight: bold; font-size: 14px;">Feb 27</div>
              <div style="color: #666; font-size: 12px;">2026</div>
            </div>
            <div style="flex: 1; background: #151515; padding: 15px; border-radius: 12px; text-align: center; border: 1px solid #333;">
              <div style="font-size: 20px; margin-bottom: 5px;">📍</div>
              <div style="color: #fff; font-weight: bold; font-size: 14px;">GCE Erode</div>
              <div style="color: #666; font-size: 12px;">Campus</div>
            </div>
          </div>

           <div style="text-align: center; margin-top: 40px; border-top: 1px solid #222; padding-top: 20px;">
            <p style="color: #444; font-size: 12px; line-height: 1.5;">
              Department of Electronics and Communication Engineering<br>
              Government College of Engineering, Erode
            </p>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;

  MailApp.sendEmail({
    to: email,
    subject: "Confirmed: Galaxy 2K26 Registration 🌌",
    htmlBody: htmlBody
  });
}
