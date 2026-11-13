'use strict';

(() => {
  const player = document.getElementById('watershed-player');
  const overlay = document.getElementById('watershed-animation');
  const route = document.getElementById('watershed-route');
  if (!player || !overlay || !route) return;

  const playButton = document.getElementById('watershed-play');
  const replayButton = document.getElementById('watershed-replay');
  const label = document.querySelector('#watershed-label span');
  const waterButton = document.querySelector('[data-scene="water"]');
  const steps = [...player.querySelectorAll('.watershed-steps li')];
  const rain = document.getElementById('watershed-rain');
  const rainLines = [...rain.querySelectorAll('path')];
  const cloud = document.getElementById('watershed-cloud');
  const roof = document.getElementById('watershed-roof');
  const garden = document.getElementById('watershed-garden');
  const soil = document.getElementById('watershed-soil');
  const ripples = document.getElementById('watershed-ripples');
  const rippleLines = [...ripples.querySelectorAll('ellipse')];
  const drops = [...document.querySelectorAll('#watershed-drops circle')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const length = route.getTotalLength();
  const duration = 10000;
  const stageStarts = [0, 2200, 5600, 8000];
  const captions = [
    ['Rain falls on rooftops.', 'Rain lands on roofs and other hard surfaces. Follow a raindrop as it begins its journey through the neighborhood.'],
    ['Water moves through the city.', 'Water runs off roofs and paved spaces, following connected paths toward lower ground and local waterways.'],
    ['Plants change the journey.', 'Soil and planted areas can slow and absorb some runoff. Green spaces connect neighborhood care with watershed health.'],
    ['Every street belongs to a watershed.', 'Water that continues downstream reaches local waterways. Caring for roofs, streets, and green spaces supports the larger watershed.']
  ];
  let active = false;
  let playing = false;
  let elapsed = 0;
  let frameId = null;
  let previousTime = null;
  let stage = -1;
  const clamp = value => Math.max(0, Math.min(1, value));
  const opacity = (element, value) => element.setAttribute('opacity', String(value));

  route.setAttribute('stroke-dasharray', String(length));

  function setStage(next, force = false) {
    if (next === stage && !force) return;
    stage = next;
    const [title, text] = captions[next];
    document.getElementById('scene-heading').textContent = title;
    document.getElementById('scene-copy').textContent = text;
    document.getElementById('scene-number').textContent = String(next + 1).padStart(2, '0');
    steps.forEach((item, index) => {
      if (index === next) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
      item.classList.toggle('is-complete', index < next);
    });
  }

  function controls() {
    player.classList.toggle('is-reduced', reducedMotion.matches);
    player.dataset.playback = !active ? 'idle' : reducedMotion.matches ? 'step-by-step' : playing ? 'playing' : elapsed >= duration ? 'complete' : 'paused';
    label.textContent = reducedMotion.matches ? 'Reduced motion · step-by-step' : '10-second illustration';
    replayButton.disabled = !active;
    playButton.textContent = !active ? (reducedMotion.matches ? 'Explore water journey' : 'Play water journey') : reducedMotion.matches ? (stage === 3 ? 'Start again' : 'Next step') : playing ? 'Pause' : elapsed >= duration ? 'Play again' : 'Resume';
  }

  function draw(time, still = false) {
    const t = time / 1000;
    const progress = still ? [0, .42, .78, 1][Math.max(stage, 0)] : clamp((time - 1700) / 6900);
    route.setAttribute('stroke-dashoffset', String(length * (1 - progress)));
    opacity(cloud, still ? (stage === 0 ? 1 : .4) : 1 - .6 * clamp((t - 3) / 3));
    opacity(rain, still ? (stage === 0 ? 1 : 0) : 1 - clamp((t - 2.7) / 1.5));
    rainLines.forEach((line, index) => line.setAttribute('transform', `translate(0 ${still ? index % 2 * 14 : ((t * 38 + index * 13) % 68)})`));
    opacity(roof, still ? (stage === 0 ? .45 : .12) : .38 * (1 - clamp((t - 2.2) / 1.2)));
    opacity(garden, still ? (stage >= 2 ? .68 : 0) : .68 * clamp((t - 5.6) / .7));
    opacity(soil, still ? (stage >= 2 ? 1 : 0) : clamp((t - 6) / .7));
    drops.forEach((drop, index) => {
      const pointProgress = Math.max(0, progress - index * .034);
      const point = route.getPointAtLength(length * pointProgress);
      drop.setAttribute('cx', String(point.x));
      drop.setAttribute('cy', String(point.y));
      opacity(drop, still ? (stage === 0 ? 0 : 1 - index * .18) : (time < 1500 ? 0 : 1 - index * .18));
    });
    opacity(ripples, still ? (stage === 3 ? .9 : 0) : clamp((t - 8) / .6));
    rippleLines.forEach((ripple, index) => {
      const growth = still ? 1 : clamp((t - 8 - index * .25) / 1.5);
      ripple.setAttribute('rx', String(10 + growth * (25 + index * 12)));
      ripple.setAttribute('ry', String(4 + growth * (9 + index * 4)));
    });
  }

  function pause() {
    playing = false;
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    previousTime = null;
    controls();
  }

  function frame(timestamp) {
    if (!playing || !active || reducedMotion.matches) return;
    if (previousTime !== null) elapsed = Math.min(duration, elapsed + timestamp - previousTime);
    previousTime = timestamp;
    const nextStage = elapsed >= 8000 ? 3 : elapsed >= 5600 ? 2 : elapsed >= 2200 ? 1 : 0;
    setStage(nextStage);
    draw(elapsed);
    if (elapsed >= duration) pause();
    else frameId = requestAnimationFrame(frame);
  }

  function play() {
    if (reducedMotion.matches) return;
    if (elapsed >= duration) { elapsed = 0; setStage(0, true); draw(0); }
    playing = true;
    previousTime = null;
    controls();
    frameId = requestAnimationFrame(frame);
  }

  function begin() {
    pause();
    active = true;
    elapsed = 0;
    overlay.classList.add('is-visible');
    setStage(0, true);
    draw(0, reducedMotion.matches);
    if (reducedMotion.matches) controls();
    else play();
  }

  document.querySelectorAll('.scene-pin').forEach(button => {
    button.addEventListener('click', () => {
      if (button === waterButton) begin();
      else {
        pause();
        active = false;
        elapsed = 0;
        stage = -1;
        overlay.classList.remove('is-visible');
        steps.forEach(item => { item.removeAttribute('aria-current'); item.classList.remove('is-complete'); });
        controls();
      }
    });
  });

  playButton.addEventListener('click', () => {
    if (!active) { waterButton.click(); return; }
    if (reducedMotion.matches) {
      setStage((stage + 1) % captions.length);
      elapsed = stageStarts[stage];
      draw(elapsed, true);
      controls();
    } else if (playing) pause();
    else play();
  });
  replayButton.addEventListener('click', begin);
  reducedMotion.addEventListener('change', () => {
    pause();
    if (active) draw(elapsed, reducedMotion.matches);
    controls();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden && playing) pause(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting && playing) pause();
    }, { threshold: 0 });
    observer.observe(document.querySelector('.hero-visual'));
  }
  player.hidden = false;
  controls();
})();
