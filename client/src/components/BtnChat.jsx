import React, { Component } from "react";
import MessengerChat from "./c-svg/MessengerChat";

class BtnChat extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.resetUnread();
  }

  render() {
    return (     
        
        <button onClick={this.handleClick} className="btn-messenger">
          <MessengerChat />
          {this.props.unread && (
            <span class="badge badge-light">{this.props.unreadMsgs}</span>
          )}
        </button>
      
    );
  }
}

export default BtnChat;
