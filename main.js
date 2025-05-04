document.addEventListener('DOMContentLoaded', () => {
  const bios = document.getElementById('bios-screen');
  setTimeout(() => {
    bios.classList.add('hidden');
  }, 3000);

  const buttons = document.querySelectorAll('.button');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1)';
      btn.style.transition = 'transform 0.2s ease-in-out';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
    btn.addEventListener('click', () => {
      btn.innerText = 'Сonnecting...';
      setTimeout(() => {
        btn.innerText = 'AUTOMATED';
      }, 1500);
    });
  });

  const canvas = document.getElementById('duck-canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.pointerEvents = 'none';

  const duckImg = new Image();
  duckImg.src = 'https://i.pinimg.com/originals/85/00/3b/85003b8e414d2708f18fcb0fd1ccecf0.png';

  let duckX = -100;
  let duckY = 80;
  let exploded = false;
  let duckVisible = false;
  let explosionFrame = 0;
  let animationRunning = false;
  let duckDestroyed = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawDuck() {
    if (!exploded && duckVisible) {
      ctx.drawImage(duckImg, duckX, duckY, 100, 100);
    } else if (exploded) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(duckX + 50, duckY + 50, 40 + explosionFrame * 4, 0, 2 * Math.PI);
      ctx.fill();
      explosionFrame++;
      if (explosionFrame > 5) {
        duckVisible = false;
        duckDestroyed = true;
        explosionFrame = 0;
      }
    }
  }

  function animateDuck() {
    if (animationRunning) return;
    animationRunning = true;
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (duckVisible) {
        drawDuck();
        if (!exploded) {
          duckX += 2;
          if (duckX > canvas.width) {
            duckVisible = false;
          }
        }
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  document.addEventListener('click', (e) => {
    if (!duckVisible || exploded) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (
      clickX >= duckX &&
      clickX <= duckX + 100 &&
      clickY >= duckY &&
      clickY <= duckY + 100
    ) {
      exploded = true;
      explosionFrame = 0;
    }
  });

  function startDuck() {
    if (exploded || duckVisible || duckDestroyed) return;
    duckX = -100;
    duckY = 80;
    exploded = false;
    duckVisible = true;
  }

  function initDuck() {
    resizeCanvas();
    animateDuck();
    setInterval(() => {
      if (!duckVisible && !exploded && !duckDestroyed) {
        startDuck();
      }
    }, 10000);
  }

  window.addEventListener('resize', resizeCanvas);

  if (duckImg.complete) {
    initDuck();
  } else {
    duckImg.onload = () => {
      initDuck();
    };
  }
});
