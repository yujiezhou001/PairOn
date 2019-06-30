import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ActiveConvo } from "./ActiveConvo";
import { fontStyle, flexbox } from "@material-ui/system";

const noneStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  color: "grey",
  fontStyle: "italic"
};

class ChatConvos extends Component {
  render() {
    let lonelyEmoji = "/lonely-emoji.png";

    const chatters = [];

    this.props.messages.forEach(function(element) {
      chatters.unshift(element.senderId);
      chatters.unshift(element.recipientId);
    });

    const filteredChatters = chatters.filter(
      chatter => chatter !== this.props.currentUser.id
    );

    const uniqueChatters = [...new Set(filteredChatters)];

    const conversations = uniqueChatters.map(chatterId => (
      <ActiveConvo
        chatterId={chatterId}
        clientList={this.props.clientList}
        messages={this.props.messages}
      />
    ));
    return (
      <div>
        <div className="header-chat">
          <h2 style={{ margin: 0 }}>Messages</h2>
        </div>
        <div className="chat">
          <div className="space-header" />
          <div className="chat-box" style={{ backgroundColor: "white" }}>
            {!this.props.messages.length && (
              <div style={noneStyle}>
                <div
                  style={{
                    padding: "140px 0 15px",
                    textAlign: "center"
                  }}
                >
                  <h4>
                    No active <br />
                    conversations
                  </h4>
                </div>
                <img
                  src={lonelyEmoji}
                  style={{ width: "100px", marginBottom: "20px" }}
                />
                <p>Connect with a local now!</p>

                <Link to="/">
                  <button className="btn btn-outline-color">Map</button>
                </Link>
              </div>
            )}

            <div className="chat-box">{conversations}</div>
          </div>
        </div>
      </div>
    );
  }
}

export { ChatConvos };
