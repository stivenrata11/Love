
let audio = null;
let currentTrackIndex = 0;

const tracks = [
  '/audio/cancion1.mp3',
  '/audio/cancion2.mp3',
  '/audio/cancion3.mp3',
  '/audio/cancion4.mp3'
];

export function crearFondo(ctx, canvas) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#ff6f00'); // Naranja intenso
    gradient.addColorStop(0.5, '#ff9a8b'); // Rosa claro
    gradient.addColorStop(1, '#2e003e'); // Púrpura oscuro
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function dibujarTulipan(ctx, canvas, tiempo) {
  const tulipanSize = Math.min(canvas.width, canvas.height) * 0.2;
  const pixelSize = tulipanSize / 20;
  
  const x = canvas.width * 0.16;
  const y = canvas.height - tulipanSize - 280;
  const oscilacion = Math.sin(tiempo * 0.002) * 5;

  ctx.save();
  ctx.translate(x, y + oscilacion);

  for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
          if (tulipanPixels[i][j] === 1) {
              ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'; // Rojo para los pétalos
              ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
          }
          if (tulipanPixels[i][j] === 2) {
              ctx.fillStyle = 'rgba(0, 128, 0, 0.7)'; // Verde para el tallo
              ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
          }
      }
  }

  ctx.restore();
}

export function dibujarGirasol(ctx, canvas, tiempo) {
  const girasolSize = Math.min(canvas.width, canvas.height) * 0.2;
  const pixelSize = girasolSize / 20;
  
  const x = canvas.width * 0.75;
  const y = canvas.height - girasolSize - 280;
  const oscilacion = Math.sin(tiempo * 0.002 + Math.PI) * 5; // Desfasado respecto al tulipán

  ctx.save();
  ctx.translate(x, y + oscilacion);

  for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
          if (girasolPixels[i][j] === 1) {
              ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'; // Amarillo para los pétalos
              ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
          }
          if (girasolPixels[i][j] === 2) {
              ctx.fillStyle = 'rgba(0, 128, 0, 0.7)'; // Marrón para el centro
              ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
          }
          if (girasolPixels[i][j] === 3) {
              ctx.fillStyle = 'rgba(0, 128, 0, 0.7)'; // Verde para el tallo
              ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
          }
      }
  }

  ctx.restore();
}

const tulipanPixels = [
  [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0]
];

const girasolPixels = [
  [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0]
];

export function dibujarEstrellas(ctx, estrellas) {
    estrellas.forEach(estrella => {
        ctx.beginPath();
        ctx.arc(estrella.x, estrella.y, estrella.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${estrella.alpha})`;
        ctx.fill();
        estrella.alpha = Math.sin(Date.now() * 0.001 + estrella.x + estrella.y) * 0.5 + 0.5;
    });
}

export function dibujarPetalos(ctx, petalos, canvas) {
    ctx.fillStyle = '#FFC0CB';
    petalos.forEach(petalo => {
        ctx.beginPath();
        ctx.arc(petalo.x, petalo.y, petalo.size / 2, 0, Math.PI * 2);
        ctx.fill();
        petalo.y += petalo.speed;
        if (petalo.y > canvas.height) {
            petalo.y = -petalo.size;
            petalo.x = Math.random() * canvas.width;
        }
    });
}

export function dibujarCorazones(ctx, corazones, canvas) {
    corazones.forEach(corazon => {
        ctx.save();
        ctx.translate(corazon.x, corazon.y);
        ctx.scale(corazon.size / 60, corazon.size / 60);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5, -15, -15, -5, 0, 5);
        ctx.bezierCurveTo(15, -5, 5, -15, 0, 0);
        ctx.fillStyle = `rgba(255, 0, 0, ${corazon.opacity})`;
        ctx.fill();
        ctx.restore();

        corazon.y -= corazon.speed;
        corazon.opacity -= 0;

        if (corazon.y < -corazon.size || corazon.opacity <= 0) {
            corazon.y = canvas.height + corazon.size;
            corazon.x = Math.random() * canvas.width;
            corazon.opacity = Math.random();
        }
    });
}

function playTrack(trackIndex) {
    if (audio) {
        audio.pause();
        audio = null;
    }
    audio = new Audio(tracks[trackIndex]);
    audio.loop = true; // Opcional, si quieres que la canción se repita
    audio.play().catch(error => console.error('No se pudo reproducir la canción:', error));
}

export function reproducirCancion() {
    playTrack(currentTrackIndex);
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
