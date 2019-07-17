import React, { Component } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Chat } from "./Chat";
import { ChatConvos } from "./ChatConvos";
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";
import { Profile } from "./Profile";
import BtnProfile from "./components/BtnProfile.jsx";
import BtnChat from "./components/BtnChat.jsx";
import BtnBack from "./components/BtnBack.jsx";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: null,
        firstName: null,
        hometown: null,
        experiences: "all",
        avatarURL: null,
        currentLocation: { lat: 0, lng: 0 },
        aboutMe: null,
        type: "live"
      },
      clientList: [], // full of currentUser objects sent from WebSocket
      eventsList: [],
      chatMessages: [],
      chatPartner: { id: null },
      authorize: false,
      unreadMsgs: 0,
      unread: false
    };
  }

  btnAbsolutR = {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: "300"
  };

  resetUnread = () => {
    this.setState({ unreadMsgs: 0, unread: false });
  };

  updateCurrentLocation = locationObject => {
    let currentUser = this.state.currentUser;
    currentUser.currentLocation = locationObject;

    this.setState({ currentUser: currentUser });

    const locObject = {
      type: "outgoingCurrUserInfo",
      myLocation: this.state.currentUser.currentLocation,
      id: this.state.currentUser.id
    };

    this.socket.send(JSON.stringify(locObject));
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

  updateChatPartner = userId => {
    var chatPartner = this.state.clientList.find(
      element => element.id === parseInt(userId)
    );
    this.setState({ chatPartner });
  };

  updateEventsList = onClickEvent => {
    const newEventsObj = {
      type: "newEventPin",
      id: this.state.currentUser.id,
      avatarURL: this.state.currentUser.avatarURL,
      description: `${
        this.state.currentUser.firstName
      }'s event. \n Show up or message them for more info!`,
      lat: onClickEvent.latLng.lat(),
      lng: onClickEvent.latLng.lng()
    };
    this.socket.send(JSON.stringify(newEventsObj));
  };

  removeEventPin = oneEvent => {
    if (this.state.currentUser.id === oneEvent.id) {
      let pinRemoval = {
        type: "removeEvent",
        uuid: oneEvent.uuid
      };
      this.socket.send(JSON.stringify(pinRemoval));
    }
  };

  addMessage = newMessage => {
    const timeOptions = {
      timeZone: "Canada/Central",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      seconds: "numeric"
    };

    const date = new Date();
    const d = date.toDateString();
    const time = date.toLocaleTimeString("en-US", timeOptions);

    const messageObject = {
      username: this.state.currentUser.firstName,
      senderId: this.state.currentUser.id,
      senderAvatar: this.state.currentUser.avatarURL,
      recipientId: this.state.chatPartner.id,
      content: newMessage,
      type: "outgoingMessage",
      datetime: `${time}`
    };
    this.socket.send(JSON.stringify(messageObject));
  };

  handleOnMessage = event => {
    let data = JSON.parse(event.data);

    if (data.type === "incomingMessage") {
      if (this.state.currentUser.id === data.recipientId) {
        this.setState({ chatMessages: [...this.state.chatMessages, data] });

        if (
          !(
            window.location.pathname === `/chat/${data.senderId}` ||
            window.location.pathname === "/chat/"
          )
        ) {
          this.setState({ unread: true });

          const newUnreadCount = this.state.unreadMsgs + 1;
          this.setState({ unreadMsgs: newUnreadCount });

          toaster.notify(
            <div
              elevation="md"
              style={{
                overflow: "hidden",
                alignItems: "center",
                display: "flex"
              }}
            >
              <img
                className="rounded-circle"
                src={data.senderAvatar}
                style={{ width: "70px" }}
              />
              <div style={{ padding: "1rem" }}>
                <h6>New message from {data.username}</h6>
                <p>{data.content}</p>
              </div>
            </div>,
            {
              position: "bottom-left" // top-left, top, top-right, bottom-left, bottom, bottom-right
              // duration: null // This notification will not automatically close
            }
          );
        }
      } else if (this.state.currentUser.id === data.senderId) {
        this.setState({ chatMessages: [...this.state.chatMessages, data] });
      }
      
    } else if (data.type === "experiencePick") {
      this.setState(data);
    
    } else if (this.state.authorize) {
      this.setState(data);
    }
  };

  handleOnAuthorize = data => {
    const tempObj = {
      id: data.userObj.id,
      firstName: data.userObj.firstName,
      lastName: data.userObj.lastName,
      email: data.userObj.email,
      hometown: data.userObj.hometown,
      experiences: "all",
      avatarURL: data.userObj.avatarURL,
      currentLocation: { lat: 0, lng: 0 },
      aboutMe: data.userObj.aboutMe,
      type: "real"
    };
    this.setState({ currentUser: tempObj, authorize: data.authorize });
  };

  handleOnUpdate = data => {
    const tempObj = {
      id: data.userObj.id,
      firstName: data.userObj.first_name,
      lastName: data.userObj.last_name,
      email: data.userObj.email,
      hometown: data.userObj.hometown,
      experiences: "all",
      avatarURL: data.userObj.avatar_url,
      currentLocation: { lat: 0, lng: 0 },
      aboutMe: data.userObj.about_me,
      type: "real"
    };
    this.setState({ currentUser: tempObj });
  };

  async componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");

    this.socket.onopen = function() {
      console.log("Connected to server");
    };
    this.socket.onmessage = e => {
      this.handleOnMessage(e);
    };

    try {
      const response = await fetch("/current_user", {
        credentials: "include"
      });
      const data = await response.json();
      this.handleOnAuthorize(data);
    } catch (e) {
      console.log("Wrong Username or Password!")
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
        <Router>
          <Route
            exact
            path="/"
            render={props =>
              this.state.authorize ? (
                <div>
                  <Link to="/chat/" className="btn-chat">
                    <BtnChat
                      resetUnread={this.resetUnread}
                      unreadMsgs={this.state.unreadMsgs}
                      unread={this.state.unread}
                    />
                  </Link>
                  <BtnProfile
                    btnAbsolutR={this.btnAbsolutR}
                    autorized={this.state.authorize}
                    fnlogout={this.logout}
                    CurrentUserId={this.state.currentUser.id}
                    CurrentUserImage={this.state.currentUser.avatarURL}
                  />
                  <Home
                    {...props}
                    clientList={this.state.clientList}
                    updateCurrentLocation={this.updateCurrentLocation}
                    currentLocation={this.state.currentUser.currentLocation}
                    updateExperiences={this.updateExperiences}
                    handleOnClick={this.state.handleOnClick}
                    currentExperiences={this.state.currentUser.experiences}
                    currentUserId={this.state.currentUser.id}
                    eventsList={this.state.eventsList}
                    updateEventsList={this.updateEventsList}
                    removeEventPin={this.removeEventPin}
                  />
                </div>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {this.state.authorize && (
            <div>
              <BtnProfile
                btnAbsolutR={this.btnAbsolutR}
                autorized={this.state.authorize}
                fnlogout={this.logout}
                CurrentUserId={this.state.currentUser.id}
                CurrentUserImage={this.state.currentUser.avatarURL}
              />

              <Route
                exact
                path="/chat/:id"
                render={props => (
                  <div>
                    <BtnBack backLinks="/" />
                    <Link to="/chat/" className="btn-chat">
                      <BtnChat
                        resetUnread={this.resetUnread}
                        unreadMsgs={this.state.unreadMsgs}
                        unread={this.state.unread}
                      />
                    </Link>
                    <Chat
                      {...props}
                      clientList={this.state.clientList}
                      addMessage={this.addMessage}
                      messages={this.state.chatMessages}
                      updateChatPartner={this.updateChatPartner}
                      chatPartner={this.state.chatPartner}
                    />
                  </div>
                )}
              />
            </div>
          )}
          {this.state.authorize && (
            <Route
              exact
              path="/chat"
              render={props => (
                <div>
                  <BtnBack backLinks="/" />
                  <ChatConvos
                    {...props}
                    clientList={this.state.clientList}
                    addMessage={this.addMessage}
                    messages={this.state.chatMessages}
                    chatPartner={this.state.chatPartner}
                    currentUser={this.state.currentUser}
                  />
                </div>
              )}
            />
          )}
          <Route
            path="/login"
            render={props =>
              this.state.authorize ? (
                <Redirect to="/" />
              ) : (
                <Login {...props} authorize={this.handleOnAuthorize} />
              )
            }
          />
          {/* <Route path="/logout" render={() => <Login />} /> */}
          <Route
            path="/register"
            render={props =>
              this.state.authorize ? (
                <Redirect to="/" />
              ) : (
                <Register {...props} authorize={this.handleOnAuthorize} />
              )
            }
          />
          <Route
            path="/users/:id"
            render={props => (
              <div>
                <BtnBack backLinks="/" />
                <Profile
                  {...props}
                  clientList={this.state.clientList}
                  currentEmail={this.state.currentUser.email}
                  currentfirstName={this.state.currentUser.firstName}
                  currentlastName={this.state.currentUser.lastName}
                  currenthometown={this.state.currentUser.hometown}
                  currentAboutMe={this.state.currentUser.aboutMe}
                  currentUser={this.state.currentUser}
                  currentid={this.state.currentUser.id}
                  authorize={this.handleOnAuthorize}
                />
              </div>
            )}
          />
          <nav>
            <ul>
              {/* <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users/:id">Profile</Link>
              </li>
              {!this.state.authorize && <li>
                <Link to="/login/">Login</Link>
              </li>}
              {!this.state.authorize && <li>
                <Link to="/register/">Register</Link>
              </li>}
              <li>
                <Link to="/chat/">Chat</Link>
              </li> */}
            </ul>
          </nav>
        </Router>
      </div>
    );
  }
}

export default App;
