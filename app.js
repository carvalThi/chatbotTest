/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework.
-----------------------------------------------------------------------------*/
const path = require('path');
const botauth = require('botauth');
const restify = require('restify');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const expressSession = require('express-session');
const https = require('https');
const request = require('request');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

const WEBSITE_HOSTNAME = "testauthent.azurewebsites.net"
const PORT =process.env.port || process.env.PORT || 3978;
const BOTAUTH_SECRET = "testtest123456789"

const AZUREAD_APP_ID = "300fac18-1246-47b0-849a-b78efa71dc64"
const AZUREAD_APP_PASSWORD = "lejtUWHZ258({*oipHGM96|"
const AZUREAD_APP_REALM = "consumers"



/*----------------------------------------------------------------------------------------
* Bot Setup
* ---------------------------------------------------------------------------------------- */

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "e5eb2574-65c1-47b0-886f-c81e1b9f1fa5",
    appPassword: ">fdbY2pSoP}Oc2{z",
    openIdMetadata: ""
});


var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Désolé, je n'ai pas compris, tu peux reformuler stp ?");
});
server.post('/api/messages', connector.listen());
server.get('/code', restify.plugins.serveStatic({
  'directory': path.join(__dirname, 'public'),
  'file': 'code.html'
}));

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

// Make sure you add code to validate these fields
var luisAppId = "650d863b-a5cb-4888-a0a9-e8775b807dad" ;
var luisAPIKey = "e72f2b0a2fa04c6ba4179744b336e4dc";
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;
console.log(LuisModelUrl)
// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer)

//=========================================================
// Auth Setup
//=========================================================


//=========================================================
// Bots Dialogs
//=========================================================

/*bot.dialog("/", new builder.IntentDialog()
    .matches(/get_profile/, "get_profile")
    .matches(/none/, "/none")
    .onDefault((session, args) => {
        session.endDialog("welcome");
    })
);*/


/*bot.dialog("get_profile", [].concat(
    ba.authenticate("aadv2"),
    function(session, args, skip){
        let user = ba.profile(session, "aadv2");
        session.endDialog("hello, je sais que tu es" + user.displayName);
        session.userData.accessToken = user.accessToken;
        session.userData.refreshToken = user.refreshToken;
        console.log(session.userData)
    }
)).triggerAction({ matches: 'get_profile' });;
*/

bot.dialog("salut", [
  function(session, args){
    //console.log(session)
    session.send("Coucou toi !origin master")
  }
]).triggerAction({ matches: 'salut' });


bot.dialog('/', [
    function(session, args){
        session.send("Désolé, je n'ai pas compris. Tu peux reformuler s'il te plait ? N'oublie pas que je suis encore jeune et que j'ai beaucoup à apprendre !");
        session.endDialog();
    }
])
