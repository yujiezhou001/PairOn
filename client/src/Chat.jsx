import React, { Component } from "react";
import axios from "axios";
import { ChatBar } from "./ChatBar";
import { MessageList } from "./MessageList";

const navStyle = {
  background: "#b3f2ef",
  height: "80px",
  borderBottom: "1px solid black",
  left: "0",
  padding: "10px",
  // padding: "0 10px"
  // position: "fixed",
  right: 0,
  top: 0,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "bottom"
};

const userStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "10px"
};

const messagesStyle = {
  height: "300px",
  border: "1px solid black",
  left: "0",
  padding: "10px"
};

const imgPicture = {
  width: "55px",
  margin: "0 10px"
};

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   axios.post("/chat").then(({ data }) => {
  //     console.log(data);
  //   });
  // }

  componentDidMount() {
    this.props.updateChatPartner(this.props.match.params.id);
  }

  render() {
    const user = this.props.clientList.find(
      userObj => userObj.id === Number(this.props.match.params.id)
    );

    return (
      <div>
        {user && (
          <div style={navStyle}>
            <a href="/" className="btn btn-primary" role="button">
              &laquo; Back
            </a>
            <a href={`/users/${JSON.stringify(user.id)}`}>
              <img
                className="rounded-circle"
                src={user.avatarURL}
                style={imgPicture}
              />
            </a>
            <div style={userStyle}>
              <h4>
                {user.firstName}
                <br />
              </h4>
              <p>{user.hometown}</p>
            </div>
          </div>
        )}
        <div>
          <div style={messagesStyle}>
            <MessageList
              messages={this.props.messages}
              chatPartner={this.props.chatPartner}
            />
          </div>
          <ChatBar addMessage={this.props.addMessage} />
        </div>
      </div>
    );
  }
}

export { Chat };
