import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Chat } from "./Chat";
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";
import { Profile } from "./Profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: null,
        firstName: "Chantal",
        hometown: null,
        experiences: "All",
        avatarURL: null,
        currentLocation: { lat: 0, lng: 0 },
        aboutMe: null
      },
      clientList: [], // full of currentUser objects sent from WebSocket
      chatMessages: []
    };
  }

  updateCurrentLocation = locationObject => {
    this.setState({ currentUser: { currentLocation: locationObject } });

    const locObject = {
      currentUser: this.state.currentUser,
      type: "outgoingUserLoc"
    };

    this.socket.send(JSON.stringify(locObject));
    console.log("successfully passed to parent state", locObject);
    // this.socket.send(JSON.stringify(locationObject))
  };

  addMessage = newMessage => {
    const messageObject = {
      username: this.state.currentUser.firstName,
      content: newMessage,
      type: "outgoingMessage"
    };

    // this.setState({
    //   chatMessages: [
    //     { user: messageObject.username, content: messageObject.content }
    //   ]
    // });
    console.log("SEND", newMessage, "TO BACKEND!!!!");
    console.log(messageObject);
    this.socket.send(JSON.stringify(messageObject));
  };

  // handleOnMessage = event => {
  //   const usersObj = JSON.parse(event.data);
  //   this.setState(usersObj);
  // };

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function() {
      console.log("Connected to server");
    };

    // this.socket.onmessage = this.handleOnMessage;

    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);

      if (data.type === "incomingMessage") {
        this.setState({ chatMessages: [...this.state.chatMessages, data] });
        console.log("MESSAGE BROADCAST BACK TO ME!", data);
        // } else if (data.type === "incomingUserLoc") {
        //   this.setState({
        //     currentUser: { name: data.username, userColor: data.color }
        //   });
      } else {
        console.log("CLIENTLIST BROADCAST BACK TO ME!", data);
        this.setState(data);
      }
    };
  }

  render() {
    return (
      <div>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users/id">Profile</Link>
              </li>
              <li>
                <Link to="/login/">Login</Link>
              </li>
              <li>
                <Link to="/register/">Register</Link>
              </li>
              <li>
                <Link to="/chat/">Chat</Link>
              </li>
            </ul>
          </nav>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                clientList={this.state.clientList}
                updateCurrentLocation={this.updateCurrentLocation}
                currentLocation={this.state.currentUser.currentLocation}
              />
            )}
          />
          <Route
            exact
            path="/chat/:id"
            render={props => (
              <Chat
                {...props}
                clientList={this.state.clientList}
                addMessage={this.addMessage}
                messages={this.state.chatMessages}
              />
            )}
          />
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/users/:id" render={() => <Profile />} />
        </Router>
      </div>
    );
  }
}

export default App;
