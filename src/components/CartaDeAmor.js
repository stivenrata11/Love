import React, { useState, useEffect, useRef } from 'react';
import './CartaDeAmor.css';
import AudioPlayer from './AudioPlayer';

const CartaDeAmor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleCarta = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {

    const createStars = () => {
      // Remove existing stars
      const existingStars = containerRef.current.querySelectorAll('.star');
      existingStars.forEach(star => containerRef.current.removeChild(star));
      
      // Create new stars
      for (let i = 0; i < 300; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        containerRef.current.appendChild(star);
      }
    };

    createStars();


    // Optional: Add functionality for shooting stars if needed
    // const createShootingStars = () => { /* Implementation here */ };

    // Clean up on component unmount
    return () => {
      // Remove all stars when component unmounts
      const existingStars = containerRef.current.querySelectorAll('.star');
      existingStars.forEach(star => containerRef.current.removeChild(star));
    };
  }, []);

  return (
    <div className="carta-amor-container" ref={containerRef}>
      <div className={`sobre ${isOpen ? 'abierto' : ''}`} onClick={toggleCarta}>
        <div className="solapa"></div>
        <div className="contenido">
          <div className="carta">
            <h2>Para: Begonia</h2>
            <p>Mi amor ,</p>
            <p>
            Quizas no sea mucho lo que te doy,
            aunque sea poco, lo hago con mucho cariño.
            Gracias por ser mi novia,
            gracias por seguir a mi lado.
            Dale play al boton de abajo !Sorpresaaaa!. 
            </p>
            <p>Con todo cariño,</p>
            <p>Anderson</p>
          </div>
          <AudioPlayer src="/Audio/AudioCarta.mp3" title="Audio Especial" />
          
        </div>
      </div>
    </div>
  );
};

export default CartaDeAmor;