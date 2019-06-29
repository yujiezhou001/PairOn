import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import BackArrow from "./c-svg/BackArrow";


const btnBack = {
  width: "5em",
  color: "#000",
  position: "absolute"
};

const BtnBack = props => {
  let autorized = props.autorized;

  return (
    <div style={btnBack}>
      <Link to={props.backLinks}>
        <div className="back-arrow">
          <BackArrow />
        </div>
      </Link>
    </div>
  );
};

export default BtnBack;
