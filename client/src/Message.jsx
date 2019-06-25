import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username" style={{ color: "blue" }}>
          {this.props.username}
        </span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export { Message };
