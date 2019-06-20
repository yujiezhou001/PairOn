import React from 'react';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    /**
     * Inside this is where you should initialize your component 
     * with some data coming from an api call, ... 
     * 
     */

    // axios.get('/user/id').then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    axios.post('/users/9').then(({data}) => {
        console.log(data);
    })
  }

  render() {
    return (
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="profile">name</label>
          <input type="text" name="profile" id="profile"/>
          <input type="submit" value="Submit"/>
        </form>
        );
  }
} 

export { Profile };