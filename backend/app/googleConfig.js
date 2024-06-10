const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Chemin vers le fichier JSON
const credentialsPath = path.join(__dirname, 'config', 'auth0.json');

// Lire et parser le fichier JSON
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

// Extraire les informations du JSON
const { client_id, client_secret, redirect_uris } = credentials.web;

// Initialiser le client OAuth2
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Remplacez 'VOTRE_REFRESH_TOKEN' par le refresh token que vous avez obtenu
oAuth2Client.setCredentials({
  refresh_token: '1//04MXz3mCIeH4_CgYIARAAGAQSNwF-L9IrYsgV0qENKT4GVO1HnxScgsOkhlNu93uVCJv3r6snulDUhVK54jWrA9JQAjehVk6QyGo',
});

// Initialiser le service Google Calendar
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

module.exports = calendar;
