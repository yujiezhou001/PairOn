import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//@@@ creer plusieur component fix for the current user
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: 4,
        avatarURL:
          "https://pbs.twimg.com/profile_images/834493671785525249/XdLjsJX_.jpg",
        firstName: "Chatal",
        lastName: "Tremblay",
        hometown: "Laval, Canada",
        email: "Chantal.t@gmail.com",
        password: "patate",
        aboutMe:
          "Fam actually scenester microdosing church-key pinterest synth copper mug enamel pin narwhal YOLO helvetica 8-bit cardigan. Sartorial selvage hashtag, cliche pug yr artisan iceland scenester art party live-edge. Try-hard synth vaporware austin."
      },
      firstname: "",
      lastname: "",
      hometown: "",
      email: "",
      password: "",
      aboutme: "",
      updated: false,
      isToggleOn: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleHometownInput = this.handleHometownInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleAboutMeInput = this.handleAboutMeInput.bind(this);
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

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  handleOnSubmit(e) {
    e.preventDefault();
    axios
      .post("/users/:id", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        hometown: this.state.hometown,
        email: this.state.email,
        password: this.state.password,
        aboutme: this.state.aboutme
      })
      .then(({ data }) => {
        this.props.authorize(data);
        this.setState({
          firstname: data.userObj.first_name,
          lastname: data.userObj.last_name,
          hometown: data.userObj.hometown,
          email: data.userObj.email,
          password: data.userObj.password,
          aboutme: data.userObj.about_me,
          updated: "Your Profile is successfully updated"
        });
      });
  }

  handleFirstNameInput(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  handleLastNameInput(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  handleHometownInput(e) {
    this.setState({
      hometown: e.target.value
    });
  }

  handleEmailInput(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordInput(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleAboutMeInput(e) {
    this.setState({
      aboutme: e.target.value
    });
  }

  checkCurrentId(currentId) {
    return currentId == Number(this.props.match.params.id);
  }

  render() {

    const tempUser = this.props.clientList.find(
      userObj => userObj.id === Number(this.props.match.params.id)
    );

    const isAccountUser = this.checkCurrentId(this.props.currentid);

    let user;
    if(isAccountUser) {
      user = this.props.currentUser;
    } else {
      user = this.props.clientList.find(
        userObj => userObj.id === Number(this.props.match.params.id)
      )
    }

    let button;
    if (isAccountUser) {
      button = (
        <div>
          <div className="p-3 mb-2 bg-light border border-info">
            <p>First name: {this.props.currentfirstName}</p>
            <p>Last name: {this.props.currentlastName}</p>
            <p>Hometown: {this.props.currenthometown}</p>
            <p>Email: {this.props.currentEmail}</p>
            <p>Password: ******************</p>
          </div>

          <button onClick={this.handleClick} className="btn btn-outline-color">
            Edit
          </button>
        </div>
      );
    } else {
      button = (
        <Link
          to={`/chat/${this.props.match.params.id}`}
          className="btn btn-outline-color"
        >
          Message
        </Link>
      );
    }

    const personalProfile = user && (
      <div className="oter-profile d-flex justify-content-start flex-column align-items-center">
        <img className="rounded-circle" src={user.avatarURL} />
        <div className="about-me d-flex justify-content-start flex-column align-items-center">
          <h2>{user.firstName}</h2>
          <p>{user.hometown}</p>
          <div>
            <h4>About me</h4>
            <p>{user.aboutMe}</p>
          </div>
          {button}
        </div>
      </div>
    );

    return (
      <div className="profile d-flex justify-content-center align-items-center">
        {this.state.isToggleOn ? (
          <div className="edit-account">
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <label hmtlFor="exampleFormControlTextarea1">About me</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Tell us a little bit about yourself."
                  name="aboutme"
                  id="inputAboutMe"
                  value={this.state.aboutme}
                  onChange={this.handleAboutMeInput}
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputAddress">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFirstName"
                  placeholder="First name "
                  name="firstname"
                  id="inputFirstName"
                  value={this.state.firstname}
                  onChange={this.handleFirstNameInput}
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputAddress2">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  placeholder="Last name"
                  name="lastname"
                  id="inputLastName"
                  value={this.state.lastname}
                  onChange={this.handleLastNameInput}
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputAddress2">Hometown</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputHomeTown"
                  placeholder="Hometown"
                  name="hometown"
                  id="inputHomeTown"
                  value={this.state.hometown}
                  onChange={this.handleHometownInput}
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  name="email"
                  id="inputEmail"
                  value={this.state.email}
                  onChange={this.handleEmailInput}
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputPassword4">New password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputNewPassword"
                  placeholder="Password"
                  name="password"
                  id="inputPassword"
                  value={this.state.password}
                  onChange={this.handlePasswordInput}
                />
              </div>
              <button type="submit" className="btn btn-outline-color">
                Update
              </button>
              {this.state.updated && (
                <div>
                  <p className="updateStatus">
                    Your profile is successfully updated!
                  </p>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div>{personalProfile}</div>
        )}
      </div>
    );
  }
}

export { Profile };
