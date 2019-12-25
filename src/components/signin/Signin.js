import React from 'react'

class Signin extends React.Component  {
  constructor(props) {
    super(props);
    this.state =  {
      signInEmail: '',
      signInPassword: ''
    }
}
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value })
  }
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value })
  }
  onSubmitSignIn = () => {
    fetch('https://polar-mesa-44185.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
    })
  }
  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article className="form-box">
          <main className="pa4 black-80">
            <div className="measure center">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0 block-18 ">SIGN IN</legend>
                <div className="block-28">
                  <label className="label" htmlFor="email-address">Email</label>
                  <input 
                    onChange={ this.onEmailChange }
                    className="text-box" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="block-28">
                  <label className="label" htmlFor="password">Password</label>
                  <input 
                    onChange={ this.onPasswordChange }
                    className="text-box" type="password" name="password"  id="password" />
                </div>
              </fieldset>
              <div className="">
                <input className="b f4 ttu ph3 bw1 fw7 pv2 input-reset ba b--black bg-white  hover-white hover-bg-black pointer f6 lh-title dib" type="submit" value="Sign in" 
                onClick={ this.onSubmitSignIn } 
                />
              </div>
              <div className="lh-copy mt3">
                <p href="#0" className="f6  ttu fw7 pointer link dim black db underline"
                  onClick={() => onRouteChange('register') } 
                >
                  Sign up
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Signin; 


