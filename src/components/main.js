import React, { useEffect, useRef, useState } from 'react';
import { initCanvas, animate, cambiarCancion, ajustarVolumen, iluminarFlor, playTrack } from './canvasLogic';
import CartaDeAmor from './CartaDeAmor';
import AudioControl from './AudioControl';
import PaginaVideo from './PaginaVideo';
import './AtardecerMagico.css';

const AtardecerMagico = () => {
  const canvasRef = useRef(null);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showCarta, setShowCarta] = useState(false);
  const [showPaginaVideo, setShowPaginaVideo] = useState(false);
  const [flowerPositions, setFlowerPositions] = useState({ tulipan: {}, girasol: {} });
  const [canvasElements, setCanvasElements] = useState({ estrellas: [], petalos: [], corazones: [] });

  useEffect(() => {
    let cleanup = () => {};
    let letterInterval;

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const { estrellas, petalos, corazones } = initCanvas(canvas);
      setCanvasElements({ estrellas, petalos, corazones });
      cleanup = animate(canvas, estrellas, petalos, corazones);

      letterInterval = setInterval(() => {
        setVisibleLetters(prev => (prev < 7 ? prev + 1 : prev));
      }, 300);

      updateFlowerPositions();
      window.addEventListener('resize', updateFlowerPositions);

      // Start playing the first track
      playTrack(0);
    }

    return () => {
      cleanup();
      if (letterInterval) {
        clearInterval(letterInterval);
      }
      window.removeEventListener('resize', updateFlowerPositions);
    };
  }, []);

  const updateFlowerPositions = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const tulipanSize = Math.min(canvas.width, canvas.height) * 0.2;
      const girasolSize = Math.min(canvas.width, canvas.height) * 0.2;

      setFlowerPositions({
        tulipan: {
          left: canvas.width * 0.16 - tulipanSize / 2,
          top: canvas.height - tulipanSize - 280,
          width: tulipanSize,
          height: tulipanSize
        },
        girasol: {
          left: canvas.width * 0.75 - girasolSize / 2,
          top: canvas.height - girasolSize - 280,
          width: girasolSize,
          height: girasolSize
        }
      });
    }
  };

  const handleFlowerClick = (flowerType) => {
    if (canvasRef.current) {
      iluminarFlor(canvasRef.current, flowerType, canvasElements.estrellas, canvasElements.petalos, canvasElements.corazones, true);
    }
    setShowPaginaVideo(true);
  };

  const handleFlowerHover = (flowerType) => {
    if (canvasRef.current) {
      iluminarFlor(canvasRef.current, flowerType, canvasElements.estrellas, canvasElements.petalos, canvasElements.corazones);
    }
  };

  const handleLetraClick = () => {
    setShowCarta(true);
  };

  const handleVolumeChange = (volume) => {
    ajustarVolumen(volume);
  };

  const handleChangeTrack = () => {
    cambiarCancion();
  };

  if (showCarta) {
    return <CartaDeAmor />;
  }

  if (showPaginaVideo) {
    return <PaginaVideo />;
  }

  return (
    <div className="atardecer-magico-container">
      <canvas
        ref={canvasRef}
        className="atardecer-magico-canvas"
      />
      <div 
        className="flower-button"
        style={{
          left: `${flowerPositions.tulipan.left}px`,
          top: `${flowerPositions.tulipan.top}px`,
          width: `${flowerPositions.tulipan.width}px`,
          height: `${flowerPositions.tulipan.height}px`,
        }}
        onClick={() => handleFlowerClick('tulipan')}
        onMouseEnter={() => handleFlowerHover('tulipan')}
        onMouseLeave={() => handleFlowerHover(null)}
      />
      <div 
        className="flower-button"
        style={{
          left: `${flowerPositions.girasol.left}px`,
          top: `${flowerPositions.girasol.top}px`,
          width: `${flowerPositions.girasol.width}px`,
          height: `${flowerPositions.girasol.height}px`,
        }}
        onClick={() => handleFlowerClick('girasol')}
        onMouseEnter={() => handleFlowerHover('girasol')}
        onMouseLeave={() => handleFlowerHover(null)}
      />
      <div className="begonia-container">
        {'BEGONIA'.split('').map((letra, index) => (
          <span 
            key={index} 
            className={`begonia-letra ${index < visibleLetters ? 'visible' : ''}`}
            onClick={handleLetraClick}
          >
            {letra}
          </span>
        ))}
      </div>
      <AudioControl 
        onVolumeChange={handleVolumeChange}
        onChangeTrack={handleChangeTrack}
      />
    </div>
  );
};

export default AtardecerMagico;