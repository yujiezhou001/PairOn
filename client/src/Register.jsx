import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    // axios.get('/register').then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios.post('/register').then(({data}) => {
    //     console.log(data);
    // })
  }

  handleOnSubmit(e) {
    e.preventDefault();
    axios.post('/register').then(({data}) => {
        console.log(data);
    })
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <label htmlFor="register">name</label>
        <input type="text" name="register" id="register"/>
        <input type="submit" value="Submit"/>
      </form>
      );
  }
} 

export { Register };