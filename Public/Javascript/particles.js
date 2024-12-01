const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#ff007f', '#ffa500', '#1e90ff', '#32cd32', '#ffff00']; // Random colors for particles

// Particle class
class Particle {
  constructor(x, y, size, color, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Bounce particles off canvas edges
    if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;

    this.draw();
  }
}

// Connect particles with lines
function connectParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

// Initialize particles
function initParticles() {
  particlesArray.length = 0;
  const numParticles = 25;
  for (let i = 0; i < numParticles; i++) {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocityX = (Math.random() - 0.5) * 2;
    const velocityY = (Math.random() - 0.5) * 2;

    particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
  }
}

// Animate particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => particle.update());
  connectParticles();
  requestAnimationFrame(animate);
}

// Resize canvas dynamically
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate();