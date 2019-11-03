import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import ParticlesOptions from './components/particlesOptions/ParticlesOptions';
import Clarifai from 'clarifai';

const clarifyApp = new Clarifai.App({
  apiKey: 'e0ec84a4e14e4387a9ab971694662a02'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height= Number(image.height);
    console.log('width: ' + width, 'height: ' + height )

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow:  clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log('box sides: ' + box)
    this.setState({box: box }) 
  }

  onInputChange = (e) => {
     this.setState({ input: e.target.value})
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input })
    clarifyApp.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, {
        url: this.state.input
    })
    .then( response => this.displayFaceBox( this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className="particles"
          params={ ParticlesOptions }
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm  
          onInputChange={ this.onInputChange } 
          onButtonSubmit={ this.onButtonSubmit } />
        <FaceRecognition box={ this.state.box } imageUrl={ this.state.imageUrl } /> 
      </div>
    );
  }
}

export default App;
