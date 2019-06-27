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
    <div>
      <div className="dropdown" style={props.btnAbsolutR}>
        <button
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon style={btnProfile} icon={faUserCircle} />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href={`/users/${props.CurrentUserId}`}>
            My profile
          </a>
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
