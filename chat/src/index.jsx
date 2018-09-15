import React from 'react';
import reactDOM from 'react-dom';
import ChatWindow from './ChatWindow/ChatWindow';
import Sidebar from './SideBar/SideBar';

// Firebase App is always required and must be first
let firebase = require('firebase/app');

// Add additional services that you want to use
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');
require('firebase/messaging');
require('firebase/functions');

let config = {
  apiKey: 'AIzaSyDj8r082goFM0L51LrF55UKJInRtX5G0UA',
  authDomain: 'shellchat2018.firebaseapp.com',
  databaseURL: 'https://shellchat2018.firebaseio.com',
  projectId: 'shellchat2018',
  storageBucket: 'shellchat2018.appspot.com',
  messagingSenderId: '633502686100'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { chats: [], selectedChat: 0 };
  }

  componentDidMount() {
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
      console.log('changing state to', { chats: prettyData });
      this.setState(() => ({ chats: prettyData }));
      console.log('done setting state', this.state);
    });
  }

  chatChangeHandler = chat => {
    this.setState({
      selectedChat: chat.id
    });
  };

  render() {
    return (
      <div>
        <Sidebar
          chats={this.state.chats}
          changeHandler={this.chatChangeHandler}
        />
        <ChatWindow
          selectedChat={this.state.selectedChat}
          chats={this.state.chats}
        />
      </div>
    );
  }
}


reactDOM.render(<App />, document.getElementById('app'));
