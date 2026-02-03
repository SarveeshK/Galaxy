# Galaxy 2K26 Registration Automation Guide

This guide explains how to set up the automation for sorting registrations and sending confirmation emails.

## Prerequisites
1.  A Google Form for registration.
2.  A Google Sheet linked to the Form (accepting responses).

## Step 1: Open Script Editor
1.  Open your **Master Google Sheet** (where form responses go).
2.  In the menu, click **Extensions** > **Apps Script**.

## Step 2: Add the Code
1.  You will see a file named `Code.gs`. Clear any existing code.
2.  Copy the entire content of `s:\Galaxy\automation\apps_script.js` and paste it into `Code.gs`.
3.  **IMPORTANT**: Look at the top of the file under `// CONFIGURATION`.
    *   Change values for `COL_EMAIL`, `COL_NAME`, and `COL_EVENT` to match the **exact column names** in your Google Sheet (e.g., "Email Address", "Full Name", "Choose your Event").

## Step 3: Setup Trigger
1.  Save the project (Floppy disk icon or Ctrl+S). Give it a name like "Galaxy Automation".
2.  In the toolbar dropdown (which says `myFunction` or `onFormSubmit`), select **`setupTrigger`**.
3.  Click **Run**.
4.  **Authorization**: Google will ask for permission.
    *   Click "Review Permissions".
    *   Choose your account.
    *   You might see "App isn't verified". Click **Advanced** > **Go to Galaxy Automation (unsafe)**.
    *   Click **Allow**.
5.  You should see a message saying "Success! Automation is now active."

## How it Works
*   **Automatic Sorting**: Every time someone submits the form, a copy of their response is added to a new tab named after their selected event (e.g., "QuestX"). If the tab doesn't exist, it creates it automatically.
*   **Email Confirmation**: The user immediately receives a styled HTML email confirming their registration for that specific event.

## Troubleshooting
*   **Emails not sending?** Check the "Executions" tab in Apps Script to see if there are errors (e.g., "Invalid email").
*   **Wrong Column Data?** Double-check that your `COL_...` constants match your Sheet headers exactly (case-sensitive).
