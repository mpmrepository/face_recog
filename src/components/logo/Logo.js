import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import skull from './logo.svg';

const Logo = () => {
  return (
    <div className="ma4 mt0">
    <Tilt className="Tilt ba br-100 bw1" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
      <div className="Tilt-inner f1"> 
        <img className="skull" alt="" src={ skull } />
      </div>
    </Tilt>
    </div>
  );
}

export default Logo;