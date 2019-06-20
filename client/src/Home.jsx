import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/').then(({data}) => {
      console.log(data);
    })
  }

  render() {
    return <h2>Home</h2>;
  }
} 

export { Home };