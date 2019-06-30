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
    position: "absolute",
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
    console.log("EXP OBJ:", experienceObj);
  };

  updateChatPartner = userId => {
    var chatPartner = this.state.clientList.find(
      element => element.id === parseInt(userId)
    );

    console.log(chatPartner);

    this.setState({ chatPartner });
  };

  updateEventsList = onClickEvent => {
    //let newEventsList = this.state.eventsList;
    const newEventsObj = {
      type: "newEventPin",
      id: this.state.currentUser.id,
      avatarURL: this.state.currentUser.avatarURL,
      description: `${
        this.state.currentUser.firstName
      }'s event. \n Show up or message him for more info!`,
      lat: onClickEvent.latLng.lat(),
      lng: onClickEvent.latLng.lng()
    };
    this.socket.send(JSON.stringify(newEventsObj));
    // newEventsList.push
    // this.setState(newEventsList)
    //console.log(onClickEvent)
  };

  removeEventPin = oneEvent => {
    //console.log(oneEvent);
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

    console.log("SEND", newMessage, "TO BACKEND!!!!");
    // console.log(messageObject);
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
          console.log("UNREAD COUNT", newUnreadCount);
          this.setState({ unreadMsgs: newUnreadCount });

          toaster.notify(
            <div>
              <img
                className="rounded-circle"
                src={data.senderAvatar}
                style={{ width: "55px" }}
              />
              <h5>New message from {data.username}</h5>
              <p>{data.content}</p>
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
      console.log("CHAT BROADCAST BACK TO ME!", data);
    } else if (data.type === "experiencePick") {
      this.setState(data);
    } else if (this.state.authorize) {
      this.setState(data);
    }
  };

  handleOnAuthorize = data => {
    const tempObj = {
      id: data.userObj.id,
      firstName: data.userObj.first_name,
      lastName: data.userObj.last_name,
      email: data.userObj.email,
      // password: data.userObj.password,
      hometown: data.userObj.hometown,
      experiences: "all",
      avatarURL: data.userObj.avatar_url,
      currentLocation: { lat: 0, lng: 0 },
      aboutMe: data.userObj.about_me,
      type: "real"
    };
    console.log("handle on Authorize: ", data);
    this.setState({ currentUser: tempObj, authorize: data.authorize });
  };

  handleOnUpdate = data => {
    const tempObj = {
      id: data.userObj.id,
      firstName: data.userObj.first_name,
      lastName: data.userObj.last_name,
      email: data.userObj.email,
      // password: data.userObj.password,
      hometown: data.userObj.hometown,
      experiences: "all",
      avatarURL: data.userObj.avatar_url,
      currentLocation: { lat: 0, lng: 0 },
      aboutMe: data.userObj.about_me,
      type: "real"
    };
    console.log("handle on Update: ",data)
    this.setState({ currentUser: tempObj});
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
        <Router>
          <Link to="/chat/" className="btn-chat">
            {this.state.authorize && (
              <BtnChat
                resetUnread={this.resetUnread}
                unreadMsgs={this.state.unreadMsgs}
                unread={this.state.unread}
              />
            )}
          </Link>
          <Route
            exact
            path="/"
            render={props =>
              this.state.authorize ? (
                <div>
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
            <Route
              exact
              path="/chat/:id"
              render={props => (
                <div>
                  <BtnBack backLinks="/" />
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
