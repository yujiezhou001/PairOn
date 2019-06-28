import React from "react";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      hometown: '',
      email: '',
      password: '',
      authorize: false
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleHometownInput = this.handleHometownInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
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
    axios.post("/register", { 
      firstname: this.state.firstname, 
      lastname: this.state.lastname,
      hometown: this.state.hometown,
      email: this.state.email,
      password: this.state.password
     }).then(({ data }) => {
       console.log("Received from register:", data)
      this.setState({
        authorize:data
      });
      this.props.authorize(data)
    })
  }

  handleFirstNameInput(e) {
    this.setState({
      firstname:e.target.value
    });
  }

  handleLastNameInput(e) {
    this.setState({
      lastname:e.target.value
    });
  }

  handleHometownInput(e) {
    this.setState({
      hometown:e.target.value
    });
  }

  handleEmailInput(e) {
    this.setState({
      email:e.target.value
    });
  }

  handlePasswordInput(e) {
    this.setState({
      password:e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="inputAddress">First name</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              id="inputFirstName"
              placeholder="Hey ton "
              value={this.state.firstName}
              onChange={this.handleFirstNameInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Last name</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              id="inputLastName"
              placeholder="Yo ton"
              value={this.state.lastName}
              onChange={this.handleLastNameInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Hometown</label>
            <input
              type="text"
              className="form-control"
              name="hometown"
              id="inputHomeTown"
              placeholder="Ton Hometown"
              value={this.state.hometown}
              onChange={this.handleHometownInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmailInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="inputPassword"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordInput}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </form>
        <p>
          Already a member?
          <br />
          <a href="/login">Login</a>
        </p>
      </div>
    );
  }
}

export { Register };
