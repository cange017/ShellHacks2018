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
    
    let chatsRef = admin.database().ref('chats');
    let prettyData = [];
    chatsRef.on('value', snapshot => {
        console.log('new valueee!!!!!!');
        let data = snapshot.val();
        prettyData = [];
        for (let key in data) {
            let newDataObj = data[key];
            newDataObj.id = key;
            prettyData.push(newDataObj);
        }
    });
    
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return res.status(200).send(prettyData);
    
    
    /*
    let correctChat = this.props.chats.find(
      chat => id === this.props.selectedChat
    );
    // Grab the text parameter.
    */
    
});