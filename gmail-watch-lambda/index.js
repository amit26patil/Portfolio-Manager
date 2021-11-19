const fs = require('fs').promises;
const { google } = require('googleapis');
//const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';
const handler = async (event, _context) => {
    let content = await fs.readFile('credentials.json',"utf8")
    let auth = await authorize(JSON.parse(content));
    const gmail = google.gmail({version: 'v1', auth});
    let stopRes = await gmail.users.stop({
        userId: "me"
    });
    const res = await gmail.users.watch({
        userId: 'me',
        requestBody: {
            "labelIds": ['INBOX'],
            "topicName": "projects/porfolio-manager-ind/topics/gmail-topic"
        },
    });
    console.log(res.data);  
    return res.data;
};

async function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  let token = await fs.readFile(TOKEN_PATH,"utf8");
  var json = JSON.parse(token);
  oAuth2Client.setCredentials(json);
  if(json.refresh_token){
      await oAuth2Client.refreshAccessTokenAsync();
  }
  return oAuth2Client;
}
handler();
exports.handler = handler;


