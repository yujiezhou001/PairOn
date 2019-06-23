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

  handleOnMessage = event => {
    const usersObj = JSON.parse(event.data);
    this.setState({
      clientList: usersObj
    });
  }

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

          <Route path="/" component={() => (<Home clientList={this.state.clientList} />)}/>
          <Route path="/chat/" component={Chat} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/users/id" component={Profile} />
        </Router>
      </div>
    );
  }
}

export default App;
