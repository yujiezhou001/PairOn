import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    // axios.get('/login').then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios.post('/login').then(({data}) => {
    //     console.log(data);
    // })
  }

  handleOnSubmit(e) {
    e.preventDefault();
    axios.post('/login').then(({data}) => {
        console.log(data);
    })
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <label htmlFor="login">name</label>
        <input type="text" name="login" id="login"/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
} 

export { Login };