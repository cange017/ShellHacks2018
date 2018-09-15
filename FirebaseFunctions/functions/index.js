// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.translate = functions.https.onRequest((req, res) => {
    const language = req.query.language;
    const id = req.query.id;
    console.log("ver 1");
    let chatsRef = admin.database().ref('chats').on("value", function (snapshot) {
        return res.status(200).send(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    /*
    let correctChat = this.props.chats.find(
      chat => id === this.props.selectedChat
    );
    // Grab the text parameter.
    */
});