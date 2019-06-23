import React from "react";
import axios from "axios";

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
    axios.post("/register").then(({ data }) => {
      console.log(data);
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
              id="inputFirstName"
              placeholder="Hey ton "
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Last name</label>
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              placeholder="Yo ton"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Hometown</label>
            <input
              type="text"
              className="form-control"
              id="inputHomeTown"
              placeholder="Ton Hometown"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </form>
        <p>
          Already a member?
          <br />
          <a href="#">Login</a>
        </p>
      </div>
    );
  }
}

export { Register };
