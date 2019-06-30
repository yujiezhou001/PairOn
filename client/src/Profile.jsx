import React from "react";
import axios from "axios";
//@@@ creer plusieur component fix for the current user
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
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
      }
    };

    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  handleOnSubmit(e) {
    e.preventDefault();
    axios.post(this.props.match.url).then(({ data }) => {
      console.log(data, this.props.match.url);
    });
  }

  checkCurrentId(currentId) {
    return currentId == Number(this.props.match.params.id);
  }

  render() {


    const user = this.props.clientList.find(
      userObj => userObj.id === Number(this.props.match.params.id)
    );

    const isAccountUser = this.checkCurrentId(this.props.currentid);

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
        <a className="btn btn-outline-color" href="/" role="button">
          Message
        </a>
      );
    }

    const personalProfile = user && (
      <div className="oter-profile d-flex justify-content-start flex-column align-items-center">
        <img
          className="rounded-circle"
          src={user.avatarURL}
        />
        <div className="about-me d-flex justify-content-start flex-column align-items-center">
          <h3>{user.firstName}</h3>
          <p>{user.hometown}</p>
          <h4>About me</h4>
          <p>{user.aboutMe}</p>
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
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Tell us a little bit about yourself."
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputAddress">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFirstName"
                  placeholder="First name "
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputAddress2">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  placeholder="Last name"
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputAddress2">Hometown</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputHomeTown"
                  placeholder="Hometown"
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label hmtlFor="inputPassword4">New password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputNewPassword"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-outline-color">
                Join
              </button>
            </form>
          </div>
        ) : (
          <div>
            {personalProfile}
          </div>
        )}
      </div>
    );
  }
}

export { Profile };
