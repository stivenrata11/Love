export function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  export function crearEstrellas(canvas) {
    return Array(100).fill().map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      alpha: Math.random()
    }));
  }
  
  export function crearPetalos(canvas) {
    return Array(50).fill().map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 15 + 5,
      speed: Math.random() * 2 + 1
    }));
  }
  
  export function crearCorazones(canvas) {
    return Array(20).fill().map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 40 + 100,
      opacity: Math.random(),
      speed: Math.random() * 0.5 + 0.1
    }));
  }