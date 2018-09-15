import React from 'react';

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
        <h2>Chats</h2>
        {this.props.chats.map((chat, i) => (
          <div key={i}>
            <div
              className="chat-selector"
              onClick={this.changeHandlerCaller(chat)}
            >
              {chat.chatName}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
