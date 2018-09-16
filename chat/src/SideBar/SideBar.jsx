import React from 'react';
import logo from './logo.png';

// left sidebar that displays all of the groups/users
export default class Sidebar extends React.Component {
  changeHandlerCaller(chat) {
    let changeHandler = this.props.changeHandler;
    return function(evt) {
      changeHandler(chat);
    };
  }

  render() {
    return (
      <div id="sidebar">
        <h2 style={{margin: 29}}>
          <img src={logo} style={{height: 20, marginRight: 5}}/>Chats
        </h2>
        {this.props.chats.map(chat => (
          <div key={chat.id}>
            <div
              onClick={this.changeHandlerCaller(chat)}
              className={
                chat.id === this.props.selectedChat
                  ? 'chat-selector selected'
                  : 'chat-selector'
              }
            >
              {chat.chatName}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
