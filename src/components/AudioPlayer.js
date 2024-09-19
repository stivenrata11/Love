// src/AudioPlayer.js
import React, { useRef, useState } from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ src, title, position }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`audio-player ${position}`} onClick={togglePlay}>
      <audio ref={audioRef} src={src} />
      <div className="play-button">
        {isPlaying ? 'Pause' : 'Play'}
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default AudioPlayer;
