import React, { useRef, useEffect } from 'react';
import './PaginaVideo.css';

const PaginaVideo = () => {
  const photos = ['Foto1.jpeg', 'Foto2.jpeg', 'Foto3.jpeg', 'Foto4.jpeg', 'Foto5.jpeg'];
  const totalStars = 500;

  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.volume = 1.0;
      // Intenta habilitar el audio
      videoElement.muted = false;
    }
  }, []);

  const handleImageClick = (photo) => {
    window.open(`/Photo/${photo}`, '_blank');
  };

  return (
    <div className="pagina-video-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          controls
          className="video"
          width="260"
          height="347"
          playsInline // Añadido para mejorar la reproducción en dispositivos móviles
        >
          <source src="/Video/Video1.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>

      <div className="photos-section">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="photo-container"
            onClick={() => handleImageClick(photo)}
          >
            <img 
              src={`/Photo/${photo}`} 
              alt={`Foto ${index + 1}`} 
              className="photo" 
            />
          </div>
        ))}
      </div>

      <div className="stars-container">
        {[...Array(totalStars)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      <div className="hearts-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="heart"></div>
        ))}
      </div>
    </div>
  );
};

export default PaginaVideo;