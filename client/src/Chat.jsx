import React from "react";
import axios from "axios";

const navStyle = {
  background: "violet",
  height: "80px",
  borderBottom: "1px solid black",
  left: "0",
  // padding: "0 10px"
  // position: "fixed",
  right: 0,
  top: 0,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center"
};

const messagesStyle = {
  height: "300px",
  border: "1px solid black",
  left: "0",
  padding: "10px"
};

const imgPicture = {
  width: "55px",
  margin: "10px"
};

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatPartner: {
        id: 4,
        firstName: "Rebecca",
        lastName: "Gold",
        email: "rebecca.gold@mail.mcgill.ca",
        password: "1234",
        hometown: "Montreal",
        experiences: "All",
        avatarURL:
          "https://s3.amazonaws.com/uifaces/faces/twitter/GavicoInd/128.jpg",
        aboutMe: "Blablabla"
      },
      messages: []
    };
  }

  componentDidMount() {
    axios.post("/chat").then(({ data }) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <div style={navStyle}>
          <a href="#" className="previous">
            &laquo; Back
          </a>
          <img
            className="rounded-circle"
            src={this.state.chatPartner.avatarURL}
            style={imgPicture}
          />
          <h4>
            {this.state.chatPartner.firstName}
            <br />
          </h4>
          <p>({this.state.chatPartner.hometown})</p>
        </div>
        <div>
          <div style={messagesStyle}>
            <div>display messages here</div>
          </div>
          <input
            className="chatbar-message"
            name="content"
            placeholder="Type a message and hit ENTER"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export { Chat };
