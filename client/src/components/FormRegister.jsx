import React from "react";
//@@@ ask for bootstrap impolementation

const FormRegister = () => {
  return (
    <div>
      <form action="">
        <div className="form-group">
          <label for="inputAddress">First name</label>
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            placeholder="Hey ton "
          />
        </div>
        <div className="form-group">
          <label for="inputAddress2">Last name</label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            placeholder="Yo ton"
          />
        </div>
        <div className="form-group">
          <label for="inputAddress2">Hometown</label>
          <input
            type="text"
            className="form-control"
            id="inputHomeTown"
            placeholder="Ton Hometown"
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
          <label for="inputPassword4">Password</label>
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
    </div>
  );
};

export default FormRegister;
