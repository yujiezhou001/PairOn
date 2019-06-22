import React, { Component } from 'react'

class BtnMood extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick} className="btn btn-primary">
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default BtnMood