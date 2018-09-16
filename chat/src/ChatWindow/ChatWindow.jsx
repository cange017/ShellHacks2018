import React from 'react';

function addMessage(message)
{
    //create a unike key for each new fruit item
     var timestamp = (new Date()).getTime();
     if(!this.state.messages
        {
         this.state.message = [];
        }
     // update the state object
     this.state.messages['messages-' + timestamp ] = fruit;
     // set the state
     this.setState({ messages : this.state.messages });
}

async function getTranslation(originalText, target) {
  console.log('originalText', originalText);
  console.log('target', target);
  let url = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDj8r082goFM0L51LrF55UKJInRtX5G0UA&q=${originalText}&target=${target}`;
  let result = await fetch(url, { method: 'POST' }).then(res => {addMessage(res.json().result.data.translations[0].translatedText);
                                                                }
                                                        ).catch(err => ({}))
  console.log('result', result);
  return result;
}

// chat user's name
class ChatHeader extends React.Component {
  render() {
    let currentChat = this.props.chats.find(
      chat => chat.id === this.props.selectedChat
    );
    return (
      <div id="chat-header">
        <div>
          {currentChat
            ? currentChat.chatName
            : 'Please choose a chatroom to begin...'}
        </div>
        <div>
          {window.localStorage.username} – {window.localStorage.understoodLang}{' '}
          speaker
        </div>
      </div>
    );
  }
}

// let globalTranslateCache = new Map()

// chat messages content area
class ContentArea extends React.Component {
    componentDidMount() {
        let correctChat = this.props.chats.find(
      chat => chat.id === this.props.selectedChat
    );
        
        for(let message in correctChat.messages) {
            getTranslation(message, 'es');
        }
        
    }
    
  render() {
    let correctChat = this.props.chats.find(
      chat => chat.id === this.props.selectedChat
    );
    try {
      // let translatedMessagesForCorrectChat = [];
      // let results = correctChat.messages.map(message =>
      //   resolveTranslation(message)
      // );

      // await Promise.all(results);

      correctChat && console.log('correctChat.translatedMessages',correctChat.translatedMessages)

      return (
        <div id="messages">
          {correctChat &&
            correctChat.messages &&
            correctChat.messages.map((message, i) => (
              <li
                key={i}
                className={
                  message.from === window.localStorage.username ? 'me' : 'them'
                }
              >
                <span>{getTranslation(message.content)}</span>
              </li>
            ))}
        </div>
      );
    } catch (err) {
      console.error(err);
    }
  }
}

class ComposeForm extends React.Component {
  render() {
    return (
      <div>
        <form action="#" onSubmit={evt => this.submitHandler(evt)}>
          <input
            type="text"
            id="compose-form"
            autoComplete="off"
            placeholder="Type here..."
          />
        </form>
      </div>
    );
  }

  submitHandler(evt) {
    let composeForm = document.querySelector('#compose-form');
    let input = composeForm.value;
    let currentChat = this.props.chats.find(
      chat => chat.id === this.props.selectedChat
    );
    let nextID =
      (currentChat && currentChat.messages && currentChat.messages.length) || 0;

    composeForm.value = '';
    console.log('input', input);
    console.log('this.props.selectedChat', this.props.selectedChat);
    let idToSet = this.props.selectedChat;
    console.log('this.props.chats', this.props.chats);
    let newMessageRef = this.props.firebase
      .database()
      .ref(`/chats/${idToSet}/messages/${nextID}`);
    newMessageRef.set({
      content: input,
      from: 'davidnagli',
      originLanguage: 'English'
    });
    evt.preventDefault();

    //scroll down
    let messagesEl = document.getElementById('messages');
    setTimeout(() => {
      messagesEl &&
        messagesEl.scrollTo({
          top: messagesEl.scrollHeight + 1000,
          behavior: 'smooth'
        });
    }, 500);
  }
}

export default class ChatWindow extends React.Component {
  render() {
    return (
      <div id="chat-window">
        <ChatHeader
          selectedChat={this.props.selectedChat}
          chats={this.props.chats}
        />
        <ContentArea
          selectedChat={this.props.selectedChat}
          chats={this.props.chats}
        />
        <ComposeForm
          firebase={this.props.firebase}
          selectedChat={this.props.selectedChat}
          chats={this.props.chats}
        />
      </div>
    );
  }
}
