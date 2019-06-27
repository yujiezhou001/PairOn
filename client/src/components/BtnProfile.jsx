import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const btnProfile = {
  width: "4em",
  height: "4em",
  color: "#000"
};

function BtnProfile(props) {
  return (
    <a href="/" role="button" style={props.btnAbsolutR}>
      <FontAwesomeIcon style={btnProfile} icon={faUserCircle} />
    </a>
  );
}

export default BtnProfile;
