import React from 'react';

// chat user's name
class ChatHeader extends React.Component {
  render() {
    return <div id="chat-header">Catherine</div>;
  }
}

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
            <div key={i}>{message.content}</div>
          ))}
      </div>
    );
  }
}

class ComposeForm extends React.Component {
  render() {
    return <div>
      <form action="#" onSubmit={evt=>this.submitHandler(evt)}>
        <input type="text" id="compose-form" autoComplete="off" placeholder="Type here..."/>
      </form>
    </div>
  }

  submitHandler(evt){
    let composeForm = document.querySelector('#compose-form');
    let input = composeForm.value;
    let nextID = this.props.chats[this.props.selectedChat].messages.length
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
        <ChatHeader />
        <ContentArea selectedChat={this.props.selectedChat} chats={this.props.chats}/>
        <ComposeForm firebase={this.props.firebase} selectedChat={this.props.selectedChat} chats={this.props.chats}/>
      </div>
    );
  }
}
