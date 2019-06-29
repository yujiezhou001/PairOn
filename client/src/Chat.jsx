import React, { Component } from "react";
import axios from "axios";
import { ChatBar } from "./ChatBar";
import { MessageList } from "./MessageList";
import { Link } from "react-router-dom";
import BackArrow from "./components/c-svg/BackArrow";

const messagesStyle = {
  height: "300px",
  border: "1px solid black",
  left: "0",
  padding: "10px"
};
const zIndex = {
  zIndex: "5555"
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
      <div className="chat">
        {user && (
          <div className="d-flex justify-content-start align-items-center">
            <Link to={`/users/${JSON.stringify(user.id)}`} style={zIndex}>
              <img className="rounded-circle" src={user.avatarURL} />
            </Link>
            <div className="user-info">
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
