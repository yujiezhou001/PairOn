import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const fontStyle = { color: "blue", fontWeight: "bold", margin: "10px" };

class ActiveConvo extends Component {
  constructor(props) {
    super(props);
  }

  findChatterInfo = userId => {
    const chatPartner = this.props.clientList.find(
      element => element.id === userId
    );
    return chatPartner;
  };

  findLatestMsg = userId => {
    const latestMsg = this.props.messages
      .reverse()
      .find(
        element => element.senderId === userId || element.recipientId === userId
      );
    return latestMsg;
  };

  render() {
    const currentChatter = this.findChatterInfo(this.props.chatterId);
    const latestMsg = this.findLatestMsg(this.props.chatterId);
    console.log("THIS IS LATEST!!!", latestMsg);

    return (
      <div class="panel panel-default">
        <div class="panel-body">
          <img
            className="rounded-circle"
            src={currentChatter.avatarURL}
            style={{ width: "55px" }}
          />
          <span className="message-username" style={fontStyle}>
            {currentChatter.firstName}
          </span>
          <span className="message-content">
            {latestMsg.content}
            {"\n"}
          </span>
          <span className="message-content">{latestMsg.datetime}</span>
        </div>
      </div>
    );
  }
}

export { ActiveConvo };
