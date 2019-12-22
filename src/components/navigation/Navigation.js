import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
      <nav className="ma4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p 
          onClick={() => onRouteChange('signout')} 
          className="f6 fw5  link dim black underline ttu  pointer">Sign out</p>
      </nav> 
      );
    } else {
      return (
        <nav className="ma4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signin')} className="f6 ttu fw5 link dim black underline  pointer">Sign in</p>
          <p onClick={() => onRouteChange('Register')} className="f6 ttu fw5 ml3 link dim black underline  pointer">Register</p>
        </nav> 
      );
    }
}

export default Navigation;