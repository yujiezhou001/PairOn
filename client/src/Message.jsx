import React, { Component } from "react";

const usernameStyle = { color: "blue", fontWeight: "bold", margin: "10px" };

class Message extends Component {
  constructor(props) {
    super(props);
  }
  checkId(currentId) {
    return currentId === this.props.chatPartner;
  }

  render() {
    const isRecipient = this.checkId(this.props.senderId);
    const isSender = this.checkId(this.props.recipientId);

    return (
      <div>
        {isRecipient && (
          <div className="message">
            <span className="message-username" style={usernameStyle}>
              {this.props.username}:
            </span>
            <span className="message-content">{this.props.content}</span>
          </div>
        )}
        {isSender && (
          <div className="message">
            <span className="message-username" style={usernameStyle}>
              {this.props.username}:
            </span>
            <span className="message-content">{this.props.content}</span>
          </div>
        )}
      </div>
    );
  }
}

export { Message };
