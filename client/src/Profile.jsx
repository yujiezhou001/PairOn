import React from "react";
import axios from "axios";
//@@@ voir si j ai vraiment besoin de mettre le url id dans le state
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      // idUrl: this.props.match.params.id,
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
      clientList: [
        {
          id: 1,
          first_name: "Mathieu",
          about_me:
            "Fam actually scenester microdosing church-key pinterest synth copper mug enamel pin narwhal YOLO helvetica 8-bit cardigan. Sartorial selvage hashtag, cliche pug yr artisan iceland scenester art party live-edge. Try-hard synth vaporware austin."
        },
        {
          id: 2,
          first_name: "Eric",
          about_me:
            "Fam actually scenester microdosing church-key pinterest synth copper mug enamel pin narwhal YOLO helvetica 8-bit cardigan. Sartorial selvage hashtag, cliche pug yr artisan iceland scenester art party live-edge. Try-hard synth vaporware austin."
        }
      ]
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
    axios.post("/users/9").then(({ data }) => {
      console.log(data);
    });
  }

  checkCurrentId(currentId) {
    return currentId == Number(this.state.idUrl);
  }

  render() {
    const imgPicture = {
      width: "100px"
    };
    let list = this.props.clientList.map(e=>
      e.id 
    )
    
    console.log(list)

    const isAccountUser = this.checkCurrentId(this.state.currentUser.id);
    let button;
    if (isAccountUser) {
      button = (
        <div>
          <div className="p-3 mb-2 bg-light border border-info">
            <p>First name: {this.state.currentUser.firstName}</p>
            <p>Last name: {this.state.currentUser.lastName}</p>
            <p>Hometown: {this.state.currentUser.hometown}</p>
            <p>Email: {this.state.currentUser.email}</p>
            <p>Password: ******************</p>
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            Edit
          </button>
        </div>
      );
    } else {
      button = (
        <a className="btn btn-primary" href="../../chat" role="button">
          Message
        </a>
      );
    }

    return (
      <div>
        
        {this.state.isToggleOn ? (
          <div className="edit-account">
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <label hmtlFor="exampleFormControlTextarea1">About me</label>
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
                <label hmtlFor="inputPassword4">Old password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputOldPassword"
                  placeholder="Password"
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
              <button type="submit" className="btn btn-primary">
                Join
              </button>
            </form>
          </div>
        ) : (
        <div className="persone-profile">
          <img
            className="rounded-circle"
            src={this.state.currentUser.avatarURL}
            style={imgPicture}
          />
          <h3>{this.state.currentUser.firstName}</h3>
          <p>{this.state.currentUser.hometown}</p>
          <h4>About me</h4>
          <p>{this.state.currentUser.aboutMe}</p>
          {button}
        </div> 
        )  
        }     
      </div>
    );
  }
}

export { Profile };
