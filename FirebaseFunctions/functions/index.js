// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const {
    Translate
} = require('@google-cloud/translate');
// Your Google Cloud Platform project ID
const projectId = 'shellchat2018';
// Instantiates a client
const translate = new Translate({
    projectId: projectId
, });
admin.initializeApp();
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.translate = functions.https.onRequest((req, res) => {
    const language = req.query.language;
    const id = req.query.id;
    console.log("ver 2");
    Translate.gapi.client.init({
        'apiKey': 'AIzaSyB4ZpaKaLtxoQcCdU_FCBS9SrTw1tzvxE0'
        , 'discoveryDocs': ['https://translation.googleapis.com/$discovery/rest?version=v2']
    , }).then(function () {
        // Executes an API request, and returns a Promise.
        // The method name `language.translations.list` comes from the API discovery.
        return gapi.client.language.translations.list({
            q: 'hospital'
            , source: 'en'
            , target: 'de'
        , });
    }).then(function (response) {
        console.log(response.result.data.translations[0].translatedText);
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
    let chatsRef = admin.database().ref('chats').on("value", function (snapshot) {
        return res.status(200).send(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    
    /*
    gapi.client.init({
          'apiKey': 'AIzaSyD1o-JutApo-Kp_CLOFnkUrgn4df5y-KT8',
          'discoveryDocs': ['https://translation.googleapis.com/$discovery/rest?version=v2'],
        }).then(function() {
          // Executes an API request, and returns a Promise.
          // The method name `language.translations.list` comes from the API discovery.
          return gapi.client.language.translations.list({
            q: 'hospital',
            source: 'en',
            target: 'de',
          });
        }).then(function(response) {
          console.log(response.result.data.translations[0].translatedText);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });*/
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    /*
    let correctChat = this.props.chats.find(
      chat => id === this.props.selectedChat
    );
    // Grab the text parameter.
    */
});