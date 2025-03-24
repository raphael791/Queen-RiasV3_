const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0txRVBJTEVKV1JkZ0NIOFltMkszaldMbnN4ZzQ4QTJuRFNSVmF1Y1pYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1VOdGZLcWNuUG1zRXhKQ2hhMzJjTEVZb0FOWmR1MTYzYjNhWVJSZlNDcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQ3pyMjdpMHpvNzRwK040dXZKVzlING50Z0FSZm1SWHJ2Mkk4MVRtWFU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVWEg2ZUdBTC9GTVlwQmJGYjhVZ1d2cmtkOEZTci96QUpSQ21peTFITW5nPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1MUUs0ZnBUU2h6bFVnbndOZHZvMlpEdlo5N2I4Y2hUVlk4OTE2RHdVbWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVzbzN0eVVKZElCS1duRklMYlc2bW1IVS80VlBSQSs5d3poU2NaL1gzMVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU9ocVBzRGpXZ0loL3kvUGhQb0pWTHBtQVJSM3RoeTJjZzIwN1NDeWszOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1I5ZG1HYjl6WW51NjlNN2ZtcEZRNGh6bWhFcDdnb1JTZFc2RkJaTktscz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InUxcnV4K3MvaW13Nzg2aXlhY2hBRndBWVdUZG0wcll1RDB0RnVnSVlVTk5BbE5aOTJSM0NmWTc1SDRheVVQQmFlQ1c1T09ROXBaaUF0LzViaEU3YkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQxLCJhZHZTZWNyZXRLZXkiOiJHRkY2M0YzMlVUTENPa2tmUGJmekZGeGdLR0tkZkZ2Nm5KSnpaeE93QnZrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxQ05ESlZKQyIsIm1lIjp7ImlkIjoiMjU0NzEzNTExMDI2OjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTsOvIFLDpHBow6TDq2wiLCJsaWQiOiIxNzYyNjE1NjU1NjcwMDk6MUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kzUDZOc0VFT1hlaEw4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkY1aXJ3KzlaN29GOXM3eDdsMzVBUmYzdG0rbVN1dEkwNlFFTUE5Q0prMnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjdnM1BiYm5FYmoyTkYwM0RvMUtwNXMzN2lXc1crcitKVkJSeW55VVJHTktaTjgvMm50RTRqaXFjSG1waDlmUHBlaTlENHNhU28vVjBvMER4ckNxRENRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOYmJyTGxlV3hQQlUvOTlKejJzUjZXbVdFUVp6VTNSeFora0l5ZWk2Y1RxMnQ0aXdTQy9QLzFDZ2Y0WWJmcU1zcjNFVEg4WW1mZWsxTk1Ob2k3YjREUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxMzUxMTAyNjoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJlWXE4UHZXZTZCZmJPOGU1ZCtRRVg5N1p2cGtyclNOT2tCREFQUWlaTnIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MjgxMDk5NSwibGFzdFByb3BIYXNoIjoiMlY3N3FVIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDMGwifQ==",
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
