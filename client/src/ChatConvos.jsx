import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ActiveConvo } from "./ActiveConvo";

class ChatConvos extends Component {
  render() {
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
        <h1>Chats</h1>
        {!this.props.messages.length && (
          <div>
            <h5>No active conversations</h5>
          </div>
        )}
        <div />
        <main>
          <div className="well well-lg">{conversations}</div>
        </main>
      </div>
    );
  }
}

export { ChatConvos };
