import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
    axios.post("/login", { username: this.state.username, password: this.state.password }).then(({ data }) => {
      console.log(data);
    });
  }

  handleUsernameChange(e) {
    this.setState({
      username:e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password:e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              name="username"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <br />
          <button className="btn btn-primary" type="submit">
            Join
          </button>
        </p>
      </div>
    );
  }
}

export { Login };
