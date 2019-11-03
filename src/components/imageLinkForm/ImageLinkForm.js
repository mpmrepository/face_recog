import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ( { onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3"> 
        { 'This detects faces. Give it  try' }
      </p>
      <div className="center">
        <div className="pa4 form center">
          <input className="f4 pa2 w-70 bw1 ba center " type="text" onChange={ onInputChange }/>
          <button 
            onClick={ onButtonSubmit } 
            className="w-30 b--black ba bw1 f4 link ph3 pv2 dib bg-white" 
            style={{ borderLeft: 'none' }}>
              Detect
            </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;