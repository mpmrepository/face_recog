import React from 'react'

const Register = ({ onRouteChange }) => {
  return (
    <div>
      <article className="br0 ba bw1 dark-gray b--black bg-white mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">REGISTER</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="bw1 fw7 pa2 input-reset ba bg-white hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="bw1 fw7 pa2 input-reset ba bg-white hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b fw7 bw1 pa2 input-reset ba bg-white hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 bw1 fw7 pv2 input-reset ba b--black bg-white  hover-white hover-bg-black pointer f6 dib" type="submit" value="Register" 
              onClick={() => onRouteChange('home') } 
              />
            </div>
          </div>
        </main>
      </article>
    </div>
  );
}

export default Register; 

