import React, { Component } from "react";


class Message extends Component {
  constructor(props) {
    super(props);
  }
  checkId(currentId) {
    return currentId === this.props.chatPartner.id;
  }

  render() {
    const isRecipient = this.checkId(this.props.senderId);
    const isSender = this.checkId(this.props.recipientId);

    return (
      <div>
        {isRecipient && (
          <div className="message recipient">
            <img
              className="rounded-circle shadow"
              src={this.props.senderAvatar}
            />
            <span className="message-content shadow-sm">{this.props.content}</span>
          </div>
        )}
        {isSender && (
          <div className="message sender">
            <img
              className="rounded-circle shadow"
              src={this.props.senderAvatar}
            />
            <span className="message-content shadow-sm">{this.props.content}</span>
          </div>
        )}
      </div>
    );
  }
}

export { Message };
