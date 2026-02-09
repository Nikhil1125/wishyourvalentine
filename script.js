window.addEventListener("load", () => {

    /* ===============================
       🌊 LENIS – SMOOTH CONTROLLED SCROLL
    =============================== */
    const lenis = new Lenis({
        duration: 2.2, // ⬅️ increase for slower scroll
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* ===============================
       GSAP SETUP
    =============================== */
    gsap.registerPlugin(ScrollTrigger);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            return arguments.length
                ? lenis.scrollTo(value, { immediate: true })
                : window.scrollY;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    ScrollTrigger.refresh();

    /* ===============================
       🍫❤️ FLOATING HEARTS + CHOCOLATES
    =============================== */
    const floaterContainer = document.querySelector(".floaters");
    const emojis = ["❤️", "🍫", "🍫"];

    for (let i = 0; i < 25; i++) {
        const span = document.createElement("span");
        span.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDuration = 8 + Math.random() * 8 + "s";
        span.style.fontSize = 14 + Math.random() * 22 + "px";
        span.style.animationDelay = Math.random() * 6 + "s";
        floaterContainer.appendChild(span);
    }

    /* ===============================
       ✨ SPLIT TEXT
    =============================== */
    document.querySelectorAll(".split").forEach(el => {
        el.innerHTML = el.textContent
            .split("")
            .map(char => `<span>${char}</span>`)
            .join("");
    });

    /* ===============================
       🎬 CINEMATIC SCROLL SECTIONS
    =============================== */
gsap.utils.toArray(".scene").forEach(scene => {

  const chars = scene.querySelectorAll(".split span");
  const fades = scene.querySelectorAll(".fade");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "+=240%",
      scrub: true,
      pin: true
    }
  });

  // Animate text only IF it exists
  if (chars.length) {
    tl.from(chars, {
      y: 90,
      opacity: 0,
      stagger: 0.04,
      ease: "power4.out"
    });
  }

  // Animate fade text only IF it exists
  if (fades.length) {
    tl.from(fades, {
      opacity: 0,
      y: 40,
      duration: 1
    }, chars.length ? "-=0.6" : 0);
  }
});


    /* ===============================
       🎵 MUSIC START (USER TAP)
    =============================== */
    const music = document.getElementById("bgMusic");
    const overlay = document.getElementById("musicOverlay");

    overlay.addEventListener("click", () => {
        music.volume = 0;
        music.play();

        gsap.to(music, {
            volume: 0.6,
            duration: 3,
            ease: "power2.out"
        });

        overlay.style.display = "none";
    });

});
