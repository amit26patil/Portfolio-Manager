const fs = require('fs').promises;
const { google } = require('googleapis');
const ImportHelper = require("./importhelper")
//const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';
const handler = async (event, _context) => {
    let content = await fs.readFile('credentials.json',"utf8")
    let auth = await authorize(JSON.parse(content));
    const gmail = google.gmail({version: 'v1', auth});
    let historyResponse = await gmail.users.history.list({
        historyTypes : ["MESSAGE_ADDED"],
        startHistoryId : 2425,
        userId : "me",
        labelId : "INBOX",
    })
    let allIds = [];
    if(historyResponse.data.history.length){
        for (let ind = 0; ind < historyResponse.data.history.length; ind++) {
            const history = historyResponse.data.history[ind];
            let ids = history.messagesAdded.map(a=>a.message.id);
            allIds = allIds.concat(ids);
        }
    }
    allIds.forEach(async id => {
        let msg = await gmail.users.messages.get({
            userId : "me",
            id : id
        });
        if(msg.data.snippet && msg.data.snippet.indexOf("CAMS Mailback")!=-1){
            var att = await gmail.users.messages.attachments.get({
                userId:'me',
                messageId : id,
                id: msg.data.payload.parts[1].body.attachmentId
            })
            const buff = Buffer.from(att.data.data, 'base64');
            ImportHelper.LoadPdf(buff, 'BTSPP6519B', async (pdf) =>{
                let j = JSON.stringify(pdf.Output);
                console.log(`output JSON :${j}`);
                await gmail.users.stop({
                    userId: "me"
                });
            })
        }
    });
    // console.log(res.data);  
    // return res.data;
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
handler()
exports.handler = handler;


