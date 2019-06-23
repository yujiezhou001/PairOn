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
        firstName: null,
        hometown: null,
        experiences: "All",
        avatarURL: null,
        currentLocation: { lat: null, lng: null },
        aboutMe: null
      },
      clientList: [], // full of currentUser objects sent from WebSocket
      chatMessages: []
    };
  }

  updateCurrentLocation = (locationObject) => {
    this.setState({currentUser: {currentLocation: locationObject}})
    console.log("successfully passed to parent state", locationObject)
    // this.socket.send(JSON.stringify(locationObject))
  }

  handleOnMessage = event => {
    const usersObj = JSON.parse(event.data);
    this.setState(usersObj);
  };

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function() {
      console.log("Connected to server");
    };
    this.socket.onmessage = this.handleOnMessage;
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
            path="/"
            render={props => <Home {...props} clientList={this.state.clientList}
             updateCurrentLocation={this.updateCurrentLocation}
              currentLocation={this.state.currentUser.currentLocation} />}
          />
          <Route path="/chat/" render={() => <Chat />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
          <Route
           path="/users/:id"
           render={props => <Profile {...props} clientList={this.state.clientList} />}
         />        </Router>
      </div>
    );
  }
}

export default App;
