import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({handleInput, handleSubmit}) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Git it a try."}
      </p>
      <div className="center">
        <div className="form center pa3 br3 shadow-5">
          <input className="f4 pa3 w-70 center" type="text" onChange={handleInput}/>
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-orange" onClick={handleSubmit} >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
