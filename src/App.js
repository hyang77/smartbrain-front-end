import React from "react";
import Particles from "react-particles-js";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
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
      box: {},
      route: "signin",
      isSignedIn: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calcFaceLocation = this.calcFaceLocation.bind(this);
    this.displayFaceBox = this.displayFaceBox.bind(this);
  }

  calcFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - clarifaiFace.right_col * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  handleInput = (evt) => {
    this.setState({ input: evt.target.value });
  };

  handleSubmit = () => {
    console.log("submit!");
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        // do something with response
        console.log(response);
        this.displayFaceBox(this.calcFaceLocation(response));
      })
      .catch((err) => {
        // there was an error
        console.log(err);
      });
  };

  handleRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} handleRouteChange={this.handleRouteChange} />

        {this.state.route === "home" ? (
          <React.Fragment>
            <Logo />
            <Rank />
            <ImageLinkForm
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
            />
          </React.Fragment>
        ) : this.state.route === "signin" ? (
          <Signin handleRouteChange={this.handleRouteChange} />
        ) : (
          <Register handleRouteChange={this.handleRouteChange}/>
        )}
      </div>
    );
  }
}

export default App;
