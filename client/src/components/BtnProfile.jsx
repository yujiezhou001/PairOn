import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const btnProfile = {
  width: "4em",
  height: "4em",
  color: "#000",  
};

function BtnProfile(props) {
  return (<div>
    <a href="/" role="button" style={props.btnAbsolutR} >
      <FontAwesomeIcon style={btnProfile} icon={faUserCircle} />
    </a>
      <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown button
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="/logout">Logout</a>
        <a className="dropdown-item" href="#">Another action</a>
        <a className="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
  </div>
  )
}

export default BtnProfile;
