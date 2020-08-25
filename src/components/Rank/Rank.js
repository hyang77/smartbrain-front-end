import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div style={{ color: "white", fontSize: "1.5em" }}>
      {`${name}, your current entry count is ...`}
      <div>{entries}</div>
    </div>
  );
};

export default Rank;
