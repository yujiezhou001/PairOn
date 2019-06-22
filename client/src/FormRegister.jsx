import React from "react";
//@@@ ask for bootstrap impolementation

const FormRegister = () => {
  return (
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
  );
};

export default FormRegister;
