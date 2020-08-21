import React from "react";
import Particles from "react-particles-js";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Clarifai from "clarifai";

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const app = new Clarifai.App({
  apiKey: "bb2bfac70b194b01b241c20028762e29",
});


class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      input: "",
      imageURL: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput = (evt) => {
    this.setState({ input: evt.target.value });
  };

  handleSubmit = () => {
    console.log("submit!");
    this.setState({ imageURL: this.state.input });
    app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input
  )
  .then(
    function (response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function (err) {
      // there was an error
    }
  );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
        <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
