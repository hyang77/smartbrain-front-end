import React from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import './Logo.css'

const Logo = () => {
  return (
    <React.Fragment>
      <Tilt
        className="Tilt br2 shadow-2 ml3 pa3"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner">
          <img src={brain} alt="logo" />
        </div>
      </Tilt>
    </React.Fragment>
  );
};

export default Logo;
