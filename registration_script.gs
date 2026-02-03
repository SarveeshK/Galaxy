/**
 * Google Apps Script for Galaxy 2K26 Registration (REFINED VERSION)
 * 
 * Features:
 * 1. Categorizes both TECHNICAL and NON-TECHNICAL events into separate sheets.
 * 2. Handles multiple selections from both columns.
 * 3. Sends a styled confirmation email.
 * 4. Automatically creates specific sheets for all your events.
 */

const CONFIG = {
  EMAIL_SUBJECT: "Galaxy 2K26 - Registration Successful!",
  NAME_COL: 2,       // Column B: Participant Name
  EMAIL_COL: 3,      // Column C: Mail Id
  PHONE_COL: 4,      // Column D: Contact Number
  COLLEGE_COL: 5,    // Column E: College Name
  TECH_EVENTS_COL: 6, // Column F: TECHNICAL EVENTS
  NON_TECH_COL: 7,    // Column G: NON - TECH EVENTS
  TEAM_DATA_COL: 9,   // Column I: Team Name and Members
};

function onFormSubmit(e) {
  try {
    const rowData = e.values;
    const name = rowData[CONFIG.NAME_COL - 1];
    const email = rowData[CONFIG.EMAIL_COL - 1];
    
    // Get events from both columns
    const techEventsRaw = rowData[CONFIG.TECH_EVENTS_COL - 1] || "";
    const nonTechEventsRaw = rowData[CONFIG.NON_TECH_COL - 1] || "";
    
    // Combine and clean events list
    const allSelectedEvents = [];
    if (techEventsRaw) techEventsRaw.split(',').forEach(ev => allSelectedEvents.push(ev.trim()));
    if (nonTechEventsRaw) nonTechEventsRaw.split(',').forEach(ev => allSelectedEvents.push(ev.trim()));

    // 1. Sort into separate sheets
    allSelectedEvents.forEach(event => {
      if (event) {
        copyToEventSheet(event, rowData);
      }
    });

    // 2. Send confirmation email
    if (email) {
      sendStyledEmail(name, email, allSelectedEvents);
    }

  } catch (err) {
    Logger.log("Error: " + err.toString());
  }
}

function copyToEventSheet(eventName, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(eventName);
  
  // Create sheet with headers if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(eventName);
    const mainSheet = ss.getSheets()[0];
    const headers = mainSheet.getRange(1, 1, 1, mainSheet.getLastColumn()).getValues();
    sheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.setTabColor("#4285f4"); // Blue theme
  }
  
  sheet.appendRow(data);
}

function sendStyledEmail(name, email, events) {
  const eventItems = events.map(ev => `<li style="margin-bottom: 8px;">🚀 ${ev}</li>`).join('');
  
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 4px; text-transform: uppercase;">Galaxy 2K26</h1>
        <p style="color: #4285f4; margin: 5px 0 0 0; font-size: 14px; letter-spacing: 2px;">THE BEGINNING OF AI ERA</p>
      </div>
      
      <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 8px;">
        <p style="font-size: 16px; margin-top: 0;">Hello <strong style="color: #4285f4;">${name}</strong>,</p>
        <p>Your registration for the National Level Technical Symposium is confirmed!</p>
        
        <p style="margin-top: 25px; color: #888; text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 1px;">Selected Events:</p>
        <ul style="list-style: none; padding-left: 0; margin-top: 10px;">
          ${eventItems}
        </ul>
      </div>

      <div style="margin-top: 30px; border-left: 4px solid #4285f4; padding-left: 20px;">
        <p style="margin: 0; font-size: 14px;">📅 <strong>Date:</strong> Feb 27, 2026</p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">📍 <strong>Venue:</strong> GCE Erode</p>
      </div>

      <div style="margin-top: 40px; text-align: center; border-top: 1px solid #333; padding-top: 20px;">
        <p style="font-size: 12px; color: #666;">This is an automated confirmation. See you at the symposium!</p>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: "Galaxy 2K26 - Registration Confirmed! 🚀",
    htmlBody: htmlBody
  });
}
