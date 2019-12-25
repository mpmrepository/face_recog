import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      email: '',
      password: '',
      name: ''
    }
  }
  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }
  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }
  onSubmitSignIn = () => {
    fetch('https://polar-mesa-44185.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      })
    })
    .then( response => response.json())
    .then( user => {
      if ( user.id ) {
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      }
    })
  }
  render() {
    const {  onPasswordChange , onNameChange, onEmailChange, onSubmitSignIn } = this;
    return (
      <div>
        <article className="form-box">
          <main className="pa4 black-80">
            <div className="measure center">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw7 ph0 mh0 block-18 ">REGISTER</legend>
                <div className="block-28">
                  <label className="db fw7  ttu lh-copy f6 tl  pb2 " htmlFor="name">Name</label>
                  <input 
                    className="text-box" 
                    type="text" 
                    name="name"  
                    id="name" 
                    onChange={ onNameChange } 
                  />
                </div>
                <div className="block-28">
                  <label className="db fw7 lh-copy f6 tl pt2 pb2 ttu" htmlFor="email-address">Email</label>
                  <input 
                    className="text-box" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange={ onEmailChange } 
                  />
                </div>
                <div className="block-28">
                  <label className="db fw7 lh-copy f6 tl pt2 pb2 ttu" htmlFor="password">Password</label>
                  <input 
                  className="text-box" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={ onPasswordChange } />
                </div>
              </fieldset>
              <div className="">
                <input 
                className="b ph3 bw1 fw7 pv2 input-reset ba b--black bg-white ttu hover-white hover-bg-black pointer f6 dib" 
                type="submit" 
                value="Register" 
                onClick={ onSubmitSignIn } 
                />
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Register; 


