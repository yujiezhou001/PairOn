import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Chat } from "./Chat";
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";
import { Profile } from "./Profile";
import BtnProfile from "./components/BtnProfile.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: null,
        firstName: null,
        hometown: null,
        experiences: "All",
        avatarURL: null,
        currentLocation: { lat: 0, lng: 0 },
        aboutMe: null,
        type: "live"
      },
      clientList: [], // full of currentUser objects sent from WebSocket
      chatMessages: [],
      authorize: false
    };
  }

  btnAbsolutR = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: "300"
  };

  updateCurrentLocation = locationObject => {
    let currentUser = this.state.currentUser;
    currentUser.currentLocation = locationObject;
    console.log("THIS IS CURRENT USER - FE:", currentUser);
    // this.setState(currentUser);

    this.setState({ currentUser: currentUser });

    const locObject = {
      type: "outgoingCurrUserInfo",
      myLocation: this.state.currentUser.currentLocation,
      id: this.state.currentUser.id
    };

    this.socket.send(JSON.stringify(locObject));
    // console.log("USER OBJ SENT TO BACKEND", locObject);
    // this.socket.send(JSON.stringify(locationObject))
  };

  updateExperiences = experience => {
    let currentUser = this.state.currentUser;
    currentUser.experiences = experience;
    this.setState({ currentUser: currentUser });
    const experienceObj = {
      type: "experiencePick",
      id: this.state.currentUser.id,
      experiences: experience
    };
    this.socket.send(JSON.stringify(experienceObj));
  };

  addMessage = newMessage => {
    const messageObject = {
      username: this.state.currentUser.firstName,
      content: newMessage,
      type: "outgoingMessage"
    };

    // console.log("SEND", newMessage, "TO BACKEND!!!!");
    // console.log(messageObject);
    this.socket.send(JSON.stringify(messageObject));
  };

  handleOnMessage = event => {
    let data = JSON.parse(event.data);

    if (data.type === "incomingMessage") {
      this.setState({ chatMessages: [...this.state.chatMessages, data] });
      console.log("CHAT BROADCAST BACK TO ME!", data);
      // } else if (data.type === "incomingUserLoc") {
      //   this.setState({
      //     currentUser: { name: data.username, userColor: data.color }
      //   });
    } else if (data.type === "experiencePick") {
      console.log("EXPERIENCE FROM BACKEND:", this.state);
    } else {
      console.log("CLIENTLIST BROADCAST BACK TO ME!", data);
      this.setState(data);
    }
  };

  handleOnAuthorize = data => {
    const tempObj = {
      id: data.userObj.id,
      firstName: data.userObj.first_name,
      lastName: data.userObj.last_name,
      email: data.userObj.email,
      password: data.userObj.password,
      hometown: data.userObj.hometown,
      experiences: "All",
      avatarURL: data.userObj.avatar_url,
      currentLocation: { lat: 0, lng: 0 },
      aboutMe: data.userObj.about_me,
      type: "live"
    };
    this.setState({ currentUser: tempObj });
    this.setState({ authorize: data.authorize });
  };

  async componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");

    this.socket.onopen = function() {
      console.log("Connected to server");
    };
    this.socket.onmessage = e => {
      console.log("WS EVENT", e);
      this.handleOnMessage(e);
    };

    try {
      const response = await fetch("http://localhost:3001/current_user", {
        credentials: "include"
      });
      const data = await response.json();
      this.handleOnAuthorize(data);
    } catch (e) {
      // not logged in
    }
  }

  logout = async () => {
    const response = await fetch("http://localhost:3001/logout", {
      credentials: "include"
    });
    const data = await response.json();
    this.handleOnAuthorize(data);
  };

  render() {
    return (
      <div>
        <BtnProfile
          btnAbsolutR={this.btnAbsolutR}
          autorized={this.state.authorize}
          fnlogout={this.logout}
          CurrentUserId={this.state.currentUser.id}
        />
        <Router>
          {this.state.authorize && (
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  clientList={this.state.clientList}
                  updateCurrentLocation={this.updateCurrentLocation}
                  currentLocation={this.state.currentUser.currentLocation}
                  updateExperiences={this.updateExperiences}
                  handleOnClick={this.state.handleOnClick}
                  currentExperiences={this.state.currentUser.experiences}
                  currentUserId={this.state.currentUser.id}
                />
              )}
            />
          )}
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
          {!this.state.authorize && (
            <Route
              path="/login"
              render={props => (
                <Login {...props} authorize={this.handleOnAuthorize} />
              )}
            />
          )}
          {/* <Route path="/logout" render={() => <Login />} /> */}
          <Route path="/register" render={() => <Register />} />
          <Route
            path="/users/:id"
            render={props => (
              <Profile
                {...props}
                clientList={this.state.clientList}
                currentEmail={this.state.currentUser.email}
                currentfirstName={this.state.currentUser.firstName}
                currentlastName={this.state.currentUser.lastName}
                currenthometown={this.state.currentUser.hometown}
                currentid={this.state.currentUser.id}
              />
            )}
          />
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users/:id">Profile</Link>
              </li>
              <li>
                {this.state.authorize ? (
                  <button onClick={this.logout}> Logout</button>
                ) : (
                  <Link to="/login/">Login</Link>
                )}
              </li>
              <li>
                <Link to="/register/">Register</Link>
              </li>
              <li>
                <Link to="/chat/">Chat</Link>
              </li>
            </ul>
          </nav>
        </Router>
      </div>
    );
  }
}

export default App;
