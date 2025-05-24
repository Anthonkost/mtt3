document.addEventListener('DOMContentLoaded', () => {
  const bios = document.getElementById('bios-screen');
  setTimeout(() => {
    bios.classList.add('hidden');
  }, 1000);

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
  duckImg.src = '/duck.png';

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
  

//header background
  window.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.mtt3-header');
    function checkScroll() {
      if (window.scrollY < 24) {
        header.classList.add('bg-hidden');
      } else {
        header.classList.remove('bg-hidden');
      }
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);
  });


// Sticky BIOS-style CTA button in bottom-right
  const isItRealWrapper = document.createElement('div');
  isItRealWrapper.style.position = 'fixed';
  isItRealWrapper.style.bottom = '20px';
  isItRealWrapper.style.right = '20px';
  isItRealWrapper.style.zIndex = '1000';

  const isItRealBtn = document.createElement('button');
  isItRealBtn.innerText = 'Is it real?';
  isItRealBtn.style.backgroundColor = '#008080';
  isItRealBtn.style.color = '#fff';
  isItRealBtn.style.border = '2px solid #fff';
  isItRealBtn.style.fontFamily = 'monospace';
  isItRealBtn.style.padding = '6px 12px';
  isItRealBtn.style.cursor = 'pointer';
  isItRealBtn.style.display = 'block';
  

  const isItRealText = document.createElement('div');
  isItRealText.innerText = 'Yes. This is no joke, even though it might look like one. We really help businesses automate their workflows by implementing AI.';
  isItRealText.style.background = '#000';
  isItRealText.style.color = '#0f0';
  isItRealText.style.fontFamily = 'monospace';
  isItRealText.style.fontSize = '12px';
  isItRealText.style.marginTop = '8px';
  isItRealText.style.padding = '8px';
  isItRealText.style.border = '1px solid #0f0';
  isItRealText.style.display = 'none';
  isItRealText.style.transition = 'opacity 0.3s ease';

  isItRealBtn.addEventListener('click', () => {
    isItRealText.style.display = isItRealText.style.display === 'none' ? 'block' : 'none';
  });

  isItRealWrapper.appendChild(isItRealBtn);
  isItRealWrapper.appendChild(isItRealText);
  document.body.appendChild(isItRealWrapper);
  
});
