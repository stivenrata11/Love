// src/AudioControl.js
import React, { useState } from 'react';
import './AudioControl.css';

const AudioControl = ({ onVolumeChange, onChangeTrack }) => {
  const [volume, setVolume] = useState(1); // Volumen de 0 a 1

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  return (
    <div className="audio-control">
      <button onClick={onChangeTrack}>Cambiar Canción</button>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        value={volume} 
        onChange={handleVolumeChange} 
        className="volume-slider"
      />
    </div>
  );
};

export default AudioControl;
