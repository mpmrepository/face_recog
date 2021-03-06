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
// import Clarifai from 'clarifai';


// const clarifyApp = new Clarifai.App({
//   apiKey: 'e0ec84a4e14e4387a9ab971694662a02'
// });


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }
  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined 
    }})
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
    fetch('https://polar-mesa-44185.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then( response => {
      if (response) {
        fetch('https://polar-mesa-44185.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })   
        .then( response => response.json())
        .then( count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.displayFaceBox( this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState) 
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm  
              onInputChange={ this.onInputChange } 
              onButtonSubmit={ this.onButtonSubmit } />
            <FaceRecognition box={ box } imageUrl={ imageUrl } /> 
          </div>
          : (
            route ==='signin'
            ?  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :  <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
