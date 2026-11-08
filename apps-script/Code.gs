/**
 * Wellspring Writes — inquiry form → Google Sheet
 *
 * Paste this into the sheet's Apps Script editor (Extensions → Apps Script),
 * then Deploy → New deployment → Web app, "Execute as: Me",
 * "Who has access: Anyone". Copy the /exec URL into site/index.html
 * (the form's data-endpoint attribute).
 */

// Optional: send an email for every new inquiry. Leave empty to turn off.
const NOTIFY_EMAIL = '';

const SHEET_NAME = 'Sheet1';

// Form field name → column header, in column order.
const FIELDS = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['type', 'Project type'],
  ['date', 'Event date'],
  ['location', 'Location'],
  ['quantity', 'Quantity'],
  ['budget', 'Budget'],
  ['message', 'Message'],
];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Bots fill the hidden honeypot field; people don't see it.
  if (p['company-url']) return json({ result: 'ok' });

  if (!p.name || !p.email) {
    return json({ result: 'error', error: 'Name and email are required.' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Received'].concat(FIELDS.map(f => f[1])));
      sheet.getRange(1, 1, 1, FIELDS.length + 1).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const row = [new Date()].concat(FIELDS.map(f => clean(p[f[0]])));
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: p.email,
        subject: `New inquiry: ${clean(p.name)} (${clean(p.type) || 'general'})`,
        body: FIELDS.map(f => `${f[1]}: ${clean(p[f[0]])}`).join('\n') +
          `\n\nSheet: ${ss.getUrl()}`,
      });
    }

    return json({ result: 'ok' });
  } finally {
    lock.releaseLock();
  }
}

// Stops a submitted value starting with = + - @ being run as a formula in the sheet.
function clean(value) {
  const s = String(value || '').trim().slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
