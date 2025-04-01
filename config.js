const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "ZAIBI",
    ownerNumber: process.env.OWNER_NUMBER || "923368683702",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "PAKISTAN",
    botName: process.env.BOT_NAME || "Admin Bot",
    exifPack: process.env.EXIF_PACK || "Admin Bot",
    exifAuthor: process.env.EXIF_AUTHOR || "ZAIB",
    timeZone: process.env.TIME_ZONE || "USA/New York",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUdhK2Qya2F6U2RrWlUvSStnSUdKekpRcERDMG9JVkZXUVJyblNxcUlXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUtXMUtMK1dJSWlWam83eUtxWGhOTjdHV0l2aUhUUGc0TDR3am91SnVXRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQ2E3eGlERHJWRTBweDVvdm82UVRGZVZCR2RWRjdQQVJlYmpGdnlQSjJrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYSXFTNEtqVkpCZUZXc2MwMW5EbGROMkxLZ0RKeHdiaVRzb1RhallXY25BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVEK1BHU3YvZ0tSQno4NUZCZU1scjNTdW9CQTAxblhlTVhESGZMYUJpSG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImkzVnlhcmQ0RzRPRWRsejh5SExySUZHcEhpcC9EQThkQzRHQU0rOXMvZ2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0JKM1Bzcks1TFN0VktkR1pIb094MDRBZXo0ZHpZS3pVWGgzY2NNeUtuQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjVXa240M0NBQTJNTzNZdi80d2cxYjErR0lUSDU3aXFNd21jNmhMZmxRST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtZV2lBWHhiS09ybDIycEJNaHcwcS9oRGp0YkVyaU4wR1hOQWhGbjBERmJKREh2dHpNU0laMFdibEljVmMwS1NrMStPcm1CbnZzZWNKeEpaZzYvM0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6InN3bTB4MVJlMitiYkxUQWNjQ2tyN0M2ajBEajRzMzV2ak5MKzNlTWJXN2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMzY4NjgzNzAyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE4RDE2QzRBNDlBMkE4RjIyQ0IyN0NFNDkwOEE1QjFCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDM0ODI1MjJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ik1KM1RGNlBEIiwibWUiOnsiaWQiOiI5MjMzNjg2ODM3MDI6NzhAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI2NzUyMTgwMTY1MDI2OTo3OEBsaWQiLCJuYW1lIjoiQWRtaW4gQm90In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPbXUvdUVGRUlqZHJiOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqR2Z2RkNTRXVoWlFmNE9QcXdCT0YxSkJjdVp2aGgxRkNza0pwOVBJOFNZPSIsImFjY291bnRTaWduYXR1cmUiOiJ1dW9na3owbVV3RmpEaWgxWHFRQzBjcHpIbkh0MUpWMEZmRVVNNnVFM0hYS3JqZXJnbTlCdnpIbXJzak1XWCtGUW90L2ZQZnVGR0JLM3RJMCtBbUFBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidzllYzRkeC9DS3BJNXM5S1ROUlhjWGcwa2Z1cVY1S3VyU3ArSGtUMHkvc3I2VHcva2YyeWF4N0FlbUUrblJnQ3laUVlhNXg2eUI0WmU4bUFTMDJxQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMzNjg2ODM3MDI6NzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWXhuN3hRa2hMb1dVSCtEajZzQVRoZFNRWExtYjRZZFJRckpDYWZUeVBFbSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzNDgyNTE3LCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZGcCJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
