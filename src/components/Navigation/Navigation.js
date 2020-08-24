import React from "react";

const Navigation = ({ handleRouteChange, isSignedIn }) => {
  if (!isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => handleRouteChange("signin")}
          className="fs link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => handleRouteChange("register")}
          className="fs link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => handleRouteChange("signout")}
          className="fs link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  }
};

export default Navigation;
