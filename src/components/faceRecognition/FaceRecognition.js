import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="image-container center ma2 " style={{ maxWidth: '500px'}}> 
      <img id="inputimage" alt="" src={ imageUrl } />
      <div className="bounding-box" 
        style={{ 
          top: box.topRow , 
          bottom: box.bottomRow , 
          left: box.leftCol , 
          right: box.rightCol , 
        }} ></div>
    </div>
  );
}
export default FaceRecognition;