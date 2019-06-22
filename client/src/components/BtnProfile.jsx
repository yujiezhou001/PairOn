import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const btnProfile = {
  width: "2em",
  height: "2em"
};

function BtnProfile() {
  return (
    <a href="#" role="button">
      <FontAwesomeIcon style={btnProfile} icon={faUserCircle} />
    </a>
  );
}

export default BtnProfile;
