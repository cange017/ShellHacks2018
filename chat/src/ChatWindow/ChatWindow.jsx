const {GoogleApis} = require('googleapis');
const google = new GoogleApis();

import React from 'react';

const ME = 'davidnagli'

// chat user's name
class ChatHeader extends React.Component {
  render() {
    let currentChat = this.props.chats.find(chat => chat.id === this.props.selectedChat)
    return <div id="chat-header">{currentChat ? currentChat.chatName : ''}</div>;
  }
}
/*
function start(message) {
    google.gapi.client.init({
          'apiKey': 'AIzaSyB4ZpaKaLtxoQcCdU_FCBS9SrTw1tzvxE0',
          'discoveryDocs': ['https://translation.googleapis.com/$discovery/rest?version=v2'],
        }).then(function() {
          // Executes an API request, and returns a Promise.
          // The method name `language.translations.list` comes from the API discovery.
          return gapi.client.language.translations.list({
            q: message,
            source: 'en',
            target: 'de',
          });
        }).then(function(response) {
          console.log(response.result.data.translations[0].translatedText);
          return response.result.data.translations[0].translatedText;
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
}
*/
// chat messages content area
class ContentArea extends React.Component {
  render() {
    let correctChat = this.props.chats.find(
      chat => chat.id === this.props.selectedChat
    );
    return (
      <div>
        {correctChat &&
          correctChat.messages &&
          correctChat.messages.map((message, i) => (
            <div key={i} className={message.from === ME ? 'me' : 'them'}>{message.content}</div>
          ))}
      </div>
    );
  }
}

class ComposeForm extends React.Component {
  render() {
    return <div>
      <form action="#" onSubmit={evt=>this.submitHandler(evt)}>
        <input type="text" id="compose-form" autoComplete="off" placeholder="Type here..." />
      </form>
      
      
    </div>
  }



  submitHandler(evt){
    let composeForm = document.querySelector('#compose-form');
    let input = composeForm.value;
    let currentChat = this.props.chats.find(chat => chat.id === this.props.selectedChat)
    let nextID = (currentChat && currentChat.messages && currentChat.messages.length) || 0
    // let nextID
    // try{
    //   nextID = this.props.chats[this.props.selectedChat].messages.length;
    // } catch (err) {
    //   console.error('err', err)
    //   console.log('this.props.chats[this.props.selectedChat]',this.props.chats[this.props.selectedChat])
    //   nextID = 0;
    // }
    
    composeForm.value = ''
    console.log('input', input)
    console.log('this.props.selectedChat', this.props.selectedChat)
    let idToSet = this.props.selectedChat;
    console.log('this.props.chats',this.props.chats)
    let newMessageRef = this.props.firebase.database().ref(`/chats/${idToSet}/messages/${nextID}`)
    newMessageRef.set({
      content: input,
      from: 'davidnagli',
      originLanguage: 'English'
    });
    evt.preventDefault();
  }
}


export default class ChatWindow extends React.Component {
  render() {
    return (
      <div id="chat-window">
        <ChatHeader selectedChat={this.props.selectedChat} chats={this.props.chats} />
        <ContentArea selectedChat={this.props.selectedChat} chats={this.props.chats}/>
        <ComposeForm firebase={this.props.firebase} selectedChat={this.props.selectedChat} chats={this.props.chats}/>
      </div>
    );
  }
}
