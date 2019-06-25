import React, { Component } from "react";

const usernameStyle = { color: "blue", fontWeight: "bold", margin: "10px" };

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username" style={usernameStyle}>
          {this.props.username}:
        </span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export { Message };
