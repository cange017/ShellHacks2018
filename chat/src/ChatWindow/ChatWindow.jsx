//import Translate from '@google-cloud/translate';

import React from 'react';

const ME = 'davidnagli'

// Enter an API key from the Google API Console:
//   https://console.developers.google.com/apis/credentials
const apiKey = "AIzaSyDj8r082goFM0L51LrF55UKJInRtX5G0UA";

// Set endpoints
const endpoints = {
  translate: "",
  detect: "detect",
  languages: "languages"
};

// Abstract API request function
function makeApiRequest(endpoint, data, type, authNeeded) {
  url = "https://www.googleapis.com/language/translate/v2/" + endpoint;
  url += "?key=" + apiKey;

  // If not listing languages, send text to translate
  if (endpoint !== endpoints.languages) {
    url += "&q=" + encodeURI(data.textToTranslate);
  }

  // If translating, send target and source languages
  if (endpoint === endpoints.translate) {
    url += "&target=" + data.targetLang;
    url += "&source=" + data.sourceLang;
  }

  // Return response from API
  return $.ajax({
    url: url,
    type: type || "GET",
    data: data ? JSON.stringify(data) : "",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
}

// Translate
function translate(data) {
  makeApiRequest(endpoints.translate, data, "GET", false).success(function(
    resp
  ) {
    $(".target").text(resp.data.translations[0].translatedText);
    $("h2.detection-heading").hide();
    $("h2.translation-heading, p").show();
  });
}

// Detect language
function detect(data) {
  makeApiRequest(endpoints.detect, data, "GET", false).success(function(resp) {
    source = resp.data.detections[0][0].language;
    conf = resp.data.detections[0][0].confidence.toFixed(2) * 100;

    $(".source-lang option")
      .filter(function() {
        return $(this).val() === source; //To select Blue
      })
      .prop("selected", true);
    $.when(getLanguageNames()).then(function(data) {
      $("p.target").text(data[source] + " with " + conf + "% confidence");
    });
    $("h2.translation-heading").hide();
    $("h2.detection-heading, p").show();
  });
}

// Get languages
function getLanguages() {
  makeApiRequest(endpoints.languages, null, "GET", false).success(function(
    resp
  ) {
    $.when(getLanguageNames()).then(function(data) {
      $.each(resp.data.languages, function(i, obj) {
        $(".source-lang, .target-lang").append(
          '<option value="' +
            obj.language +
            '">' +
            data[obj.language] +
            "</option>"
        );
      });
    });
  });
}

// Convert country code to country name
function getLanguageNames() {
  return $.getJSON("https://api.myjson.com/bins/155kj1");
}



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
                makeApiRequest(endpoints.translate, message.content, "GET", false).success(function(
    resp
  ) {
            <div key={i} className={message.from === ME ? 'me' : 'them'}>{resp.data.translations[0].translatedText}</div>
                }
          )))}
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
