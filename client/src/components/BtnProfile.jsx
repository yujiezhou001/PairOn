import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";

const btnProfile = {
  width: "4em",
  height: "4em",
  color: "#000"
};

const BtnProfile = props => {
  let autorized = props.autorized;

  return (
    <div className="btn-profile">
      <div className="dropdown" style={props.btnAbsolutR}>
        <button
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src={props.CurrentUserImage} alt="Button My profile" className="rounded-circle" />
          {/* <FontAwesomeIcon style={btnProfile} icon={faUserCircle} /> */}
        </button>
        <div className="dropdown-menu dropdown-menu-right text-right" aria-labelledby="dropdownMenuButton">
          <div className="dropdown-item">
            <Link to={`/users/${props.CurrentUserId}`}>My Profile</Link>
          </div>

          {autorized && (
            <button className="dropdown-item" onClick={props.fnlogout}>
              {" "}
              <a href="/login"> logout</a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BtnProfile;
