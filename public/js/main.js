// Mobile nav toggle (only JS on the site).
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

// KITT scanner: a lit lamp sweeps across 8 segments and back, and each lamp fades slowly after the sweep passes.
(function () {
  var lamps = document.querySelectorAll('.scanner i');
  if (!lamps.length) return;
  var last = lamps.length - 1;

  // Reduced motion: hold a still, centred glow instead of animating.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    [0.12, 0.2, 0.4, 1, 1, 0.4, 0.2, 0.12].forEach(function (b, i) {
      if (lamps[i]) lamps[i].style.setProperty('--b', b);
    });
    return;
  }

  var CYCLE = 1.9;   // seconds for one full sweep out and back
  var FADE = 0.32;   // seconds for a lamp to fade to about 37% of its brightness
  var level = new Array(lamps.length).fill(0);
  var prev = null;

  function frame(now) {
    var t = now / 1000;
    if (prev === null) prev = t;
    var dt = Math.min(t - prev, 0.1);
    prev = t;

    // Triangle wave: head position runs 0 -> last -> 0.
    var phase = (t % CYCLE) / CYCLE;
    var head = (phase < 0.5 ? phase * 2 : 2 - phase * 2) * last;
    var decay = Math.exp(-dt / FADE);

    for (var i = 0; i < lamps.length; i++) {
      var lit = Math.max(0, 1 - Math.abs(i - head)); // soft leading edge
      level[i] = Math.max(level[i] * decay, lit);
      lamps[i].style.setProperty('--b', Math.max(level[i], 0.06).toFixed(3));
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
