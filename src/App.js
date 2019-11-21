import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
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
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }
  componentDidMount() {
    fetch('http://localhost:8000')
    .then(response => response.json())
    .then(console.log)
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height= Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow:  clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
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
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false }) 
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }
  render() {
    const { isSignedIn, box, imageUrl, route } = this.state;
    return (
      <div className="App">
        <Particles 
          className="particles"
          params={ ParticlesOptions }
        />
        <header >
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}  />
          <Logo />
        </header>
        {/* This is an if else statement */}
        { route === 'home' 
          ?  <div>
            <Rank />
            <ImageLinkForm  
              onInputChange={ this.onInputChange } 
              onButtonSubmit={ this.onButtonSubmit } />
            <FaceRecognition box={ box } imageUrl={ imageUrl } /> 
          </div>
          : (
            route ==='signin'
            ?  <Signin onRouteChange={this.onRouteChange} />
            :  <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
