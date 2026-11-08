# Connecting the inquiry form to Google Sheets

Form submissions are saved as new rows in [Contact Form_Wellspring Writes](https://docs.google.com/spreadsheets/d/1pi5QcrqqstRHxXLGhTMOO6-UJ8nNWSWP1cc5HX24agk/edit). The site sends them to a small Google Apps Script attached to that sheet. Setup is one time and takes about 5 minutes.

## 1. Add the script to the sheet

1. Open the sheet and go to **Extensions → Apps Script**.
2. Delete the sample code and paste in everything from [`apps-script/Code.gs`](../apps-script/Code.gs).
3. Optional: set `NOTIFY_EMAIL` to Becki's address so she gets an email for each inquiry.
4. Click **Save**.

## 2. Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. **Execute as:** Me. **Who has access:** Anyone.
4. Click **Deploy** and approve the permissions. Google warns that the app is unverified because it's your own script: click *Advanced → Go to project*.
5. Copy the **Web app URL**. It ends in `/exec`.

## 3. Paste the URL into the site

In `site/index.html`, find:

```html
<form name="inquiry" id="inquiry-form" data-endpoint="PASTE_WEB_APP_URL">
```

and replace `PASTE_WEB_APP_URL` with the URL you copied.

## 4. Test

Submit the form on the site. A header row appears in the sheet on the first submission, then one row per inquiry:

| Received | Name | Email | Project type | Event date | Location | Quantity | Budget | Message |
|---|---|---|---|---|---|---|---|---|

## Notes

- **Changing the script later:** use **Deploy → Manage deployments → Edit → Version: New version**, which keeps the same URL. A *new* deployment gives a new URL that you'd have to paste again.
- **Spam:** a hidden "honeypot" field quietly drops most bot submissions.
- **Safety:** a value starting with `=`, `+`, `-` or `@` is saved as plain text, so nobody can slip a formula into the sheet.
- The web app URL appears in the public page source. That's normal: all it can do is add rows to this one sheet.
