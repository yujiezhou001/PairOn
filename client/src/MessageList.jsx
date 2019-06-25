import React, { Component } from "react";
import { Message } from "./Message.jsx";

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(messageObj => (
      <Message
        key={messageObj.id}
        username={messageObj.username}
        content={messageObj.content}
      />
    ));
    return (
      <main className="messages">
        <div>{messages}</div>
      </main>
    );
  }
}

export { MessageList };
