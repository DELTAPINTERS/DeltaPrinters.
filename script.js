/* =========================
   INTRO + ROBOT ENTRY
========================= */

window.addEventListener("load", () => {

  const tl = gsap.timeline();

  tl.from(".intro-text", {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    ease: "power2.out"
  })

  .to(".top-circle", {
    top: "-170vw",
    duration: 1.2,
    ease: "expo.inOut"
  })

  .to(".bottom-circle", {
    bottom: "-170vw",
    duration: 1.2,
    ease: "expo.inOut"
  }, "-=1.2")

  .to("#intro", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      const intro = document.getElementById("intro");
      if (intro) intro.style.display = "none";

      // Robot simple entry
      gsap.from(".robot-container", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  });

  /* =========================
     NAVBAR STAGGER ANIMATION
  ========================= */

 
});


/* =========================
   GET STARTED BUTTON
========================= */

const getStartBtn = document.getElementById("getStartBtn");

if (getStartBtn) {
  getStartBtn.addEventListener("click", e => {
    e.preventDefault();
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  });
}


/* =========================
   GLOBAL SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* =========================
   MOUSE GLOW
========================= */

const glow = document.getElementById("mouse-glow");

if (glow) {
  document.addEventListener("mousemove", e => {
    gsap.to(glow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: "power2.out"
    });
  });
}


/* =========================
   GOLDEN STAR FLOW
========================= */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

let stars = [];

for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 3,
    speed: Math.random() * 0.6 + 0.2
  });
}


/* DRAW STAR */

function drawStar(x, y, r, spikes) {

  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;
  let outerRadius = r;
  let innerRadius = r / 2;

  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);

  for (let i = 0; i < spikes; i++) {

    ctx.lineTo(
      x + Math.cos(rot) * outerRadius,
      y + Math.sin(rot) * outerRadius
    );
    rot += step;

    ctx.lineTo(
      x + Math.cos(rot) * innerRadius,
      y + Math.sin(rot) * innerRadius
    );
    rot += step;
  }

  ctx.closePath();
  ctx.fill();
}


/* STAR ANIMATION LOOP */

function animateStars() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(212,175,55,0.7)";

  const glowValue = 0.5 + Math.sin(Date.now() * 0.003) * 0.3;

  stars.forEach(s => {

    ctx.fillStyle = `rgba(212,175,55,${glowValue})`;

    drawStar(s.x, s.y, s.size, 5);

    s.y += s.speed;

    if (s.y > canvas.height) {
      s.y = -10;
      s.x = Math.random() * canvas.width;
    }

  });

  requestAnimationFrame(animateStars);
}

animateStars();


/* =========================
   RESIZE HANDLER
========================= */

window.addEventListener("resize", resizeCanvas);

/* FORCE NAV VISIBILITY */

window.addEventListener("load", () => {
  document.querySelectorAll(".nav-center-links a").forEach(link=>{
    link.style.opacity = "1";
    link.style.visibility = "visible";
  });
});
