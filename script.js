/* ===============================
   GLOBAL STATE
================================ */
let musicStarted = false;
let step = 0;

/* ===============================
   ELEMENTS
================================ */
const teddy = document.getElementById("teddy");
const bubble = document.getElementById("bubble");
const buttons = document.getElementById("buttons");
const blushes = document.querySelectorAll(".blush");

const hugSound = document.getElementById("hugSound");
const bgMusic = document.getElementById("bgMusic");

/* ===============================
   QUESTIONS
================================ */
const questions = [
  {
    text: "Hi… can I ask you something? 🧸💕",
    answers: [
      { label: "Yes 🥰", next: true },
      { label: "Of course ❤️", next: true }
    ]
  },
  {
    text: "Do you like cute teddies? 🧸",
    answers: [
      { label: "I love them 😍", next: true },
      { label: "Just like you ❤️", next: true }
    ]
  },
  {
    text: "Can I be your teddy forever? 💖",
    answers: [
      { label: "YES 🥹❤️", yes: true },
      { label: "Always 🤗", yes: true }
    ]
  }
];

/* ===============================
   INIT
================================ */
showStep();

/* ===============================
   FUNCTIONS
================================ */
function showStep() {
  bubble.innerHTML = questions[step].text;
  buttons.innerHTML = "";

  questions[step].answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans.label;

    btn.addEventListener("click", () => {
      startMusicOnce();      // 🔊 start music on FIRST interaction
      teddyBlush();

      if (ans.yes) {
        finalYes();
      } else {
        step++;
        showStep();
      }
    });

    buttons.appendChild(btn);
  });
}

function teddyBlush() {
  blushes.forEach(b => b.classList.add("active"));
  setTimeout(() => {
    blushes.forEach(b => b.classList.remove("active"));
  }, 700);
}

/* ===============================
   MUSIC CONTROL (IMPORTANT)
================================ */
function startMusicOnce() {
  if (musicStarted) return;

  bgMusic.currentTime = 0;
  bgMusic.volume = 0;
  bgMusic.play();

  // Smooth fade-in
  let vol = 0;
  const fade = setInterval(() => {
    vol += 0.02;
    if (vol >= 0.45) {
      vol = 0.45;
      clearInterval(fade);
    }
    bgMusic.volume = vol;
  }, 100);

  musicStarted = true;
}

/* ===============================
   FINAL YES ACTION
================================ */
function finalYes() {
  bubble.innerHTML = "Happy Teddy Day 🧸❤️<br>Come here… 🤗";
  buttons.innerHTML = "";

  teddy.innerHTML = "🧸🤗";

  // Play hug sound
  hugSound.currentTime = 0;
  hugSound.volume = 0.9;
  hugSound.play();

  startConfetti();
}

/* ===============================
   TEDDY CLICK (BLUSH + MUSIC)
================================ */
teddy.addEventListener("click", () => {
  startMusicOnce();
  teddyBlush();

  // Tiny click animation
  teddy.style.transform = "scale(1.1)";
  setTimeout(() => {
    teddy.style.transform = "scale(1)";
  }, 150);
});

/* ===============================
   🎉 CONFETTI HEARTS
================================ */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let hearts = [];

function startConfetti() {
  hearts = [];
  for (let i = 0; i < 120; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 8,
      speed: Math.random() * 2 + 1
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach(h => {
    ctx.font = `${h.size}px serif`;
    ctx.fillText("❤️", h.x, h.y);
    h.y += h.speed;
    if (h.y > canvas.height) h.y = -20;
  });

  requestAnimationFrame(animateConfetti);
}
