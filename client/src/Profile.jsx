import React from "react";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentUser: {
      //   avatar_url:
      //     "https://pbs.twimg.com/profile_images/834493671785525249/XdLjsJX_.jpg",
      //   first_name: "Chatal",
      //   last_name: "Tremblay",
      //   hometown: "Laval, Canada",
      //   email: "Chantal.t@gmail.com",
      //   password: "patate",
      //   about_me:
      //     "Fam actually scenester microdosing church-key pinterest synth copper mug enamel pin narwhal YOLO helvetica 8-bit cardigan. Sartorial selvage hashtag, cliche pug yr artisan iceland scenester art party live-edge. Try-hard synth vaporware austin."
      // },
      // messages: [
      //   {
      //     first_name: "Mathieu",
      //     about_me:
      //       "Fam actually scenester microdosing church-key pinterest synth copper mug enamel pin narwhal YOLO helvetica 8-bit cardigan. Sartorial selvage hashtag, cliche pug yr artisan iceland scenester art party live-edge. Try-hard synth vaporware austin."
      //   },
      //   {
      //     first_name: "Eric",
      //     about_me:
      //       "Fam actually scenester microdosing church-key pinterest synth copper mug enamel pin narwhal YOLO helvetica 8-bit cardigan. Sartorial selvage hashtag, cliche pug yr artisan iceland scenester art party live-edge. Try-hard synth vaporware austin."
      //   }
      // ]
    };
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
    axios.post("/users/9").then(({ data }) => {
      console.log(data);
    });
  }

  render() {
    const imgPicture = {
      width: "100px"
    };

    return (
      <div>
        <div className="persone-profile">
          <img
            className="rounded-circle"
            src="https://pbs.twimg.com/profile_images/834493671785525249/XdLjsJX_.jpg"
            style={imgPicture}
          />
          <h3>Chantal</h3>
          <p>Lava, Canada</p>
          <h4>About me</h4>
          <p>
            Fam actually scenester microdosing church-key pinterest synth copper
            mug enamel pin narwhal YOLO helvetica 8-bit cardigan. Sartorial
            selvage hashtag, cliche pug yr artisan iceland scenester art party
            live-edge. Try-hard synth vaporware austin.
          </p>
          <button type="submit" className="btn btn-primary">
            message
          </button>
        </div>

        <div className="edit-account">
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">About me</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Fam actually scenester microdosing church-key pinterest synth copper mug enamel pin narwhal YOLO helvetica
  8-bit cardigan. Sartorial selvage hashtag, cliche pug yr artisan iceland scenester art party live-edge. Try-hard
  synth vaporware austin."
              />
            </div>
            <div className="form-group">
              <label for="inputAddress">First name</label>
              <input
                type="text"
                className="form-control"
                id="inputFirstName"
                placeholder="First name "
              />
            </div>
            <div className="form-group">
              <label for="inputAddress2">Last name</label>
              <input
                type="text"
                className="form-control"
                id="inputLastName"
                placeholder="Last name"
              />
            </div>
            <div className="form-group">
              <label for="inputAddress2">Hometown</label>
              <input
                type="text"
                className="form-control"
                id="inputHomeTown"
                placeholder="Hometown"
              />
            </div>
            <div className="form-group">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label for="inputPassword4">Old password</label>
              <input
                type="password"
                className="form-control"
                id="inputOldPassword"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label for="inputPassword4">New password</label>
              <input
                type="password"
                className="form-control"
                id="inputNewPassword"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Join
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export { Profile };
