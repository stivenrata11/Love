import { crearFondo, dibujarEstrellas, dibujarPetalos, dibujarCorazones, dibujarTulipan, dibujarGirasol, reproducirCancion } from './drawingFunctions';
import { crearEstrellas, crearPetalos, crearCorazones, resizeCanvas } from './utils';

let audio = null;
let currentTrackIndex = 0;

const tracks = [
  '/Audio/Audio1.mp3',
  '/audio/Audio2.mp3',
  '/audio/Audio3.mp3',
  '/audio/Audio4.mp3'
];

export function initCanvas(canvas) {
  resizeCanvas(canvas);
  window.addEventListener('resize', () => resizeCanvas(canvas));

  const estrellas = crearEstrellas(canvas);
  const petalos = crearPetalos(canvas);
  const corazones = crearCorazones(canvas);

  // Initialize the first song
  playTrack(currentTrackIndex);

  return { estrellas, petalos, corazones };
}

export function animate(canvas, estrellas, petalos, corazones) {
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let startTime = Date.now();

  const render = () => {
    const currentTime = Date.now() - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    crearFondo(ctx, canvas);
    dibujarTulipan(ctx, canvas, currentTime);
    dibujarGirasol(ctx, canvas, currentTime);
    dibujarEstrellas(ctx, estrellas);
    dibujarPetalos(ctx, petalos, canvas);
    dibujarCorazones(ctx, corazones, canvas);
    animationFrameId = requestAnimationFrame(render);
  };

  render();

  return () => {
    window.removeEventListener('resize', () => resizeCanvas(canvas));
    cancelAnimationFrame(animationFrameId);
    if (audio) {
      audio.pause();
      audio = null;
    }
  };
}

export function playTrack(trackIndex) {
  if (audio) {
    audio.pause();
    audio = null;
  }
  audio = new Audio(tracks[trackIndex]);
  audio.loop = true;
  audio.play().catch(error => console.error('Could not play the song:', error));
}

export function stopMusic() {
  if (audio) {
    audio.pause();
    audio = null;
  }
}

export function iluminarFlor(canvas, flowerType, estrellas, petalos, corazones) {
  const ctx = canvas.getContext('2d');
  const flowerSize = Math.min(canvas.width, canvas.height) * 0.2;

  let x, y;
  if (flowerType === 'tulipan') {
    x = canvas.width * 0.16;
    y = canvas.height - flowerSize - 280;
  } else if (flowerType === 'girasol') {
    x = canvas.width * 0.75;
    y = canvas.height - flowerSize - 280;
  } else {
    // If flowerType is null, simply redraw the scene without illumination
    animate(canvas, estrellas, petalos, corazones);
    return;
  }

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, flowerSize);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(x - flowerSize, y - flowerSize, flowerSize * 2, flowerSize * 2);
  ctx.restore();

  // Redraw the scene with the illumination effect
  animate(canvas, estrellas, petalos, corazones);
}


export function cambiarCancion() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  playTrack(currentTrackIndex);
}

export function ajustarVolumen(volumen) {
  if (audio) {
    audio.volume = volumen;
  }
}