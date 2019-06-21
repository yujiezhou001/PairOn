import React from 'react';
import axios from 'axios';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.post('/chat').then(({data}) => {
      console.log(data);
    })
  }

  render() {
    return <h2>Chat</h2>;
  }
} 

export { Chat };