/**
 * Galaxy 2K26 Registration Automation
 * 
 * Instructions:
 * 1. Open your Google Sheet linked to the Form.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code into Code.gs.
 * 4. Save the project.
 * 5. Run the 'setupTrigger' function once to authorize and set up the automation.
 */

// CONFIGURATION - Update these to match your Google Form exact headers
const COL_EMAIL = "Email Address";
const COL_NAME = "Name"; // Or "Full Name"
const COL_EVENT = "Event Selection"; // The question asking which event they are registering for

// Email Configuration
const EMAIL_SUBJECT = "Registration Confirmed: Galaxy 2K26";
const EMAIL_SENDER_NAME = "Galaxy 2K26 Team";

/**
 * Triggered automatically when a form is submitted.
 * Sorts data to sub-sheets and sends confirmation emails.
 */
function onFormSubmit(e) {
    if (!e) {
        Logger.log("Run this function via a trigger, not manually.");
        return;
    }

    const sheet = e.range.getSheet();
    const row = e.range.getRow();
    const values = e.values; // Array of values from the submitted row

    // Get headers to map column names to indexes
    const headers = sheet.getDataRange().getValues()[0];
    const colMap = getColumnMap(headers);

    // Retrieve Data
    const email = values[colMap[COL_EMAIL]];
    const name = values[colMap[COL_NAME]];
    const selectedEvent = values[colMap[COL_EVENT]];

    // 1. Sort to Sub-Sheet
    if (selectedEvent) {
        sortToEventSheet(selectedEvent, values);
    }

    // 2. Send Confirmation Email
    if (email) {
        sendConfirmationEmail(email, name, selectedEvent);
    }
}

/**
 * Specific function to copy the row to a sheet named after the event.
 * Creates the sheet if it doesn't exist.
 */
function sortToEventSheet(eventName, rowData) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let targetSheet = ss.getSheetByName(eventName);

    // Create sheet if it doesn't exist
    if (!targetSheet) {
        targetSheet = ss.insertSheet(eventName);
        // Optional: Copy headers from the first sheet
        const masterSheet = ss.getSheets()[0];
        const headers = masterSheet.getRange(1, 1, 1, masterSheet.getLastColumn()).getValues()[0];
        targetSheet.appendRow(headers);
    }

    triggerAutoResize(targetSheet);
    targetSheet.appendRow(rowData);
}

/**
 * Sends a HTML formatted confirmation email.
 */
function sendConfirmationEmail(email, name, eventName) {
    const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f0f13; color: #ffffff; padding: 20px; border-radius: 10px;">
      <div style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #bc13fe; margin: 0;">GALAXY 2K26</h1>
        <p style="color: #888; margin-top: 5px;">ECE Association</p>
      </div>
      
      <p>Hello <strong>${name}</strong>,</p>
      
      <p>Your registration for <strong style="color: #00f3ff;">${eventName}</strong> has been confirmed!</p>
      
      <div style="background-color: #1a1a23; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #bc13fe;">
        <p style="margin: 5px 0;"><strong>Event:</strong> ${eventName}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> February 27, 2026</p>
        <p style="margin: 5px 0;"><strong>Venue:</strong> GCEE Auditorium</p>
      </div>
      
      <p>We are thrilled to have you onboard. Get ready for an experience that transcends boundaries!</p>
      
      <p>If you have any questions, feel free to reply to this email.</p>
      
      <div style="margin-top: 40px; font-size: 12px; color: #555; text-align: center;">
        <p>© 2026 Galaxy 2K26 ECE Association. All rights reserved.</p>
      </div>
    </div>
  `;

    GmailApp.sendEmail(email, EMAIL_SUBJECT, "", {
        name: EMAIL_SENDER_NAME,
        htmlBody: htmlBody
    });
}

/**
 * Helper to map headers to column indexes (0-based)
 */
function getColumnMap(headers) {
    const map = {};
    for (let i = 0; i < headers.length; i++) {
        map[headers[i]] = i;
    }
    return map;
}

/**
 * AUTO-SETUP FUNCTION
 * Run this function ONCE from the editor to set up the trigger.
 */
function setupTrigger() {
    const ss = SpreadsheetApp.getActive();

    // Check if trigger already exists to avoid duplicates
    const triggers = ScriptApp.getProjectTriggers();
    for (let i = 0; i < triggers.length; i++) {
        if (triggers[i].getHandlerFunction() === 'onFormSubmit') {
            SpreadsheetApp.getUi().alert('Trigger already exists!');
            return;
        }
    }

    ScriptApp.newTrigger('onFormSubmit')
        .forSpreadsheet(ss)
        .onFormSubmit()
        .create();

    SpreadsheetApp.getUi().alert('Success! Automation is now active.');
}

function triggerAutoResize(sheet) {
    // Resize columns to fit content properly
    sheet.autoResizeColumns(1, sheet.getLastColumn());
}
