# How to Connect EVOC Strategy Call Leads to Your Google Sheet (Gmail)

You can save all lead questionnaire submissions directly into your personal Google Sheet in your Gmail account without needing any database setup.

---

## ⚡ Quick 4-Step Setup (Takes 60 Seconds)

### Step 1: Create a Google Sheet
1. Open your browser and go to: [https://sheets.new](https://sheets.new) (logged into your Gmail).
2. Name the sheet: **EVOC Hospitality Strategy Leads**.

### Step 2: Open Google Apps Script
1. In your Google Sheet top menu, click on **Extensions** → **Apps Script**.
2. Erase any code in the editor, and paste the code below:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create bold headers if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Phone Number",
        "Business Name",
        "Business Type",
        "Struggles",
        "Marketing Budget (40K+)",
        "Location Address",
        "City",
        "State",
        "Latitude",
        "Longitude",
        "GPS Verified",
        "Status"
      ]);
      sheet.getRange(1, 1, 1, 14).setFontWeight("bold").setBackground("#1f2937").setFontColor("#f3f4f6");
    }
    
    // Append the incoming Strategy Call lead
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.businessName || "",
      data.businessType || "",
      Array.isArray(data.struggles) ? data.struggles.join(", ") : (data.struggles || ""),
      data.hasMarketingBudget40k || "",
      data.location ? (data.location.address || "") : "",
      data.location ? (data.location.city || "") : "",
      data.location ? (data.location.state || "") : "",
      data.location ? (data.location.latitude || "") : "",
      data.location ? (data.location.longitude || "") : "",
      data.location ? (data.location.fetchedViaGeolocation ? "YES" : "NO") : "NO",
      data.status || "New Lead"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as Web App
1. In the Apps Script top-right, click **Deploy** → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Description**: `EVOC Leads Webhook`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: must be Anyone so your website can post leads without password prompts)*
4. Click **Deploy** and click **Authorize access** (choose your Gmail account and click Advanced → Go to Untitled (unsafe) → Allow).
5. Copy the generated **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

### Step 4: Add the URL to the server
1.under the server folder, go to the google_sheet_config.json under it put that google sheet url into it which you get from the google sheets { someting like : https://script.google.com/macros/s/.../exec}

### Gmail notifications
Google Sheet delivery remains enabled. To also receive every booking by email:

1. Turn on 2-Step Verification for the Gmail account that will send the notifications.
2. Create a Google App Password for this project.
3. Add these values to `server/.env`:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password
BOOKING_NOTIFICATION_EMAIL=your-gmail-address@gmail.com
```

Restart the backend after changing `.env`. The Gmail app password is used only by the backend and must not be committed or exposed in the frontend.



