import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import BackArrow from "./c-svg/BackArrow";
import zIndex from "@material-ui/core/styles/zIndex";

const BtnBack = props => {
  let autorized = props.autorized;

  return (
    <div className="back-arrow">
      <Link to={props.backLinks}>
        <BackArrow />
      </Link>
    </div>
  );
};

export default BtnBack;
