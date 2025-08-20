import React, { useRef, useEffect } from 'react';
import './MagicCursorEffect.css';

function MagicCursorEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let stars = [];
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;
    let lastTime = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    class Star {
      constructor(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.finalSize = Math.random() * 2 + 0.5;
        this.size = this.finalSize * 2;
        this.alpha = 1;
        this.velocityX = velocityX * 0.05;
        this.velocityY = 1 + Math.random() + velocityY * 0.05;
        this.gravity = 0.02;
        this.drag = 0.97;
        this.turbulence = () => Math.random() * 0.5 - 0.25;
        this.timeElapsed = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`; // Use our theme's gold color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update(deltaTime) {
        this.x += this.velocityX + this.turbulence();
        this.velocityX *= this.drag;
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        this.alpha = Math.max(0, this.alpha - 0.005);
        this.timeElapsed += deltaTime;
        if (this.timeElapsed < 2000) {
          this.size = this.finalSize * 2 - (this.finalSize * this.timeElapsed / 2000);
        } else {
          this.size = this.finalSize;
        }
      }
    }

    const addStar = (e) => {
      mouseVelocityX = e.clientX - lastMouseX;
      mouseVelocityY = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      stars.push(new Star(e.clientX, e.clientY, mouseVelocityX, mouseVelocityY));
    };

    window.addEventListener('mousemove', addStar);

    const update = (time = 0) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => star.update(deltaTime));
      stars.forEach(star => star.draw());
      stars = stars.filter(star => star.alpha > 0 && star.y < height);
      requestAnimationFrame(update);
    };

    update();

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', addStar);
    };
  }, []); // Empty dependency array means this effect runs only once

  return <canvas ref={canvasRef} className="magic-canvas" />;
}

export default MagicCursorEffect;