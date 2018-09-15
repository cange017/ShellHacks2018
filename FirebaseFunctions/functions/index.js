// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.translate = functions.https.onRequest((req, res) => {
    let chatsRef = firebase.database().ref('chats');
    chatsRef.on('value', snapshot => {
        console.log('new valueee!!!!!!');
        let data = snapshot.val();
        let prettyData = [];
        for (let key in data) {
            let newDataObj = data[key];
            newDataObj.id = key;
            prettyData.push(newDataObj);
        }
        console.log('changing state to', {
            chats: prettyData
        });
        this.setState(() => ({
            chats: prettyData
        }));
        console.log('done setting state', this.state);
    });
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return this.chats;
});