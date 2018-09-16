// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const googleTranslate = require('@google-cloud/translate');
// Your Google Cloud Platform project ID
const projectId = 'shellchat2018';

const translate = new googleTranslate({
        projectId: projectId
    , });
// Instantiates a client
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.translate = functions.https.onRequest((req, res) => {
    admin.initializeApp();
    const language = req.query.language;
    const id = req.query.id;
    console.log("ver 6");
    
    // The text to translate
    const text = 'Hello, world!';
    // The target language
    const target = 'ru';
    console.log(translate);
    // Translates some text into Russian
    translate.translate(text, target).then(results => {
        const translation = results[0];
        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
        return res.status(200).send('none');
    }).catch(err => {
        console.error('ERROR:', err);
    });
    
});