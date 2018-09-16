// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
// Your Google Cloud Platform project ID
const projectId = 'shellchat2018';
var gcloud = require('google-cloud');

var gct = gcloud.translate({projectId: 'shellchat2018', keyFilename: 'keyfile.json'});
admin.initializeApp();
// Instantiates a client
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.translate = functions.https.onRequest((req, res) => {
    
    
    
    const language = req.query.language;
    const id = req.query.id;
    console.log("ver 6");
    
    
    
});