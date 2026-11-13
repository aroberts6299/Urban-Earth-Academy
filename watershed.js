'use strict';

(() => {
  const player = document.getElementById('watershed-player');
  const overlay = document.getElementById('watershed-animation');
  const route = document.getElementById('watershed-route');
  if (!player || !overlay || !route) return;

  const playButton = document.getElementById('watershed-play');
  const replayButton = document.getElementById('watershed-replay');
  const label = document.querySelector('#watershed-label span');
  const natureButton = document.querySelector('[data-scene="nature"]');
  const natureOverlay = document.getElementById('nature-animation');
  const trees = document.getElementById('nature-trees');
  const halo = document.getElementById('nature-halo');
  const rays = document.getElementById('nature-rays');
  const sunlight = document.getElementById('nature-sunlight');
  const leaves = document.getElementById('nature-leaves');
  const shade = document.getElementById('nature-shade');
  const birds = document.getElementById('nature-birds');
  const waterButton = document.querySelector('[data-scene="water"]');
  const steps = [...player.querySelectorAll('.watershed-steps li')];
  const rain = document.getElementById('watershed-rain');
  const rainLines = [...rain.querySelectorAll('path')];
  const cloud = document.getElementById('watershed-cloud');
  const garden = document.getElementById('watershed-garden');
  const soil = document.getElementById('watershed-soil');
  const ripples = document.getElementById('watershed-ripples');
  const rippleLines = [...ripples.querySelectorAll('ellipse')];
  const drops = [...document.querySelectorAll('#watershed-drops circle')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const length = route.getTotalLength();
  const duration = 10000;
  const stageStarts = [0, 2200, 5600, 8000];
  const stories = {water: [
    ['Rain falls on the street.', 'Rain lands on the paved street between the buildings and the green space. Follow runoff as it begins its journey toward the river.'],
    ['Water moves through the city.', 'Water follows the street toward a planted area. This simplified trail shows how pavement and green spaces connect to a local waterway.'],
    ['Plants change the journey.', 'Soil and planted areas can slow and absorb some runoff. Green spaces connect neighborhood care with watershed health.'],
    ['Every street belongs to a watershed.', 'Water that continues downstream reaches local waterways. Caring for streets and green spaces supports the larger watershed.']
  ], nature: [
    ['Sunlight powers a living city.', 'The sun supplies energy to plants. Follow the golden rays from the sun to the neighborhood trees.'],
    ['Leaves turn sunlight into food.', 'Through photosynthesis, leaves use sunlight, water, and carbon dioxide to make sugars that help trees grow.'],
    ['Tree canopies create shade.', 'Leaves intercept sunlight and shade the ground below. Compare a shaded green space with an open paved surface.'],
    ['Trees make room for life.', 'Branches and leaves offer shelter and habitat for birds and other wildlife. A small urban green space is part of a larger ecosystem.']
  ]};
  const stageNames = {water: ['Rainfall', 'Runoff', 'Green spaces', 'Waterway'], nature: ['Sunlight', 'Leaves', 'Shade', 'Habitat']};
  let mode = 'nature';
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
    const [title, text] = stories[mode][next];
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
    player.dataset.story = mode;
    document.querySelector('#watershed-label').firstChild.textContent = mode === 'nature' ? 'Sun & trees ' : 'Follow the water ';
    label.textContent = reducedMotion.matches ? 'Reduced motion · step-by-step' : '10-second illustration';
    replayButton.disabled = !active;
    playButton.textContent = !active ? (reducedMotion.matches ? (mode === 'nature' ? 'Explore nature story' : 'Explore water journey') : (mode === 'nature' ? 'Play nature story' : 'Play water journey')) : reducedMotion.matches ? (stage === 3 ? 'Start again' : 'Next step') : playing ? 'Pause' : elapsed >= duration ? 'Play again' : 'Resume';
  }

  function drawWater(time, still = false) {
    const t = time / 1000;
    const progress = still ? [0, .42, .78, 1][Math.max(stage, 0)] : clamp((time - 1700) / 6900);
    route.setAttribute('stroke-dashoffset', String(length * (1 - progress)));
    opacity(cloud, still ? (stage === 0 ? 1 : .4) : 1 - .6 * clamp((t - 3) / 3));
    opacity(rain, still ? (stage === 0 ? 1 : 0) : 1 - clamp((t - 2.7) / 1.5));
    rainLines.forEach((line, index) => line.setAttribute('transform', `translate(0 ${still ? index % 2 * 14 : ((t * 38 + index * 13) % 68)})`));
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

  function drawNature(time, still = false) {
    const t = time / 1000;
    // Static poses convey the same concepts without any animation.
    const leafProgress = still ? (stage >= 1 ? 1 : 0) : clamp((t - 2.2) / 1.1);
    const shadeProgress = still ? (stage >= 2 ? 1 : 0) : clamp((t - 5.6) / 1);
    const habitatProgress = still ? (stage === 3 ? 1 : 0) : clamp((t - 8) / .7);
    opacity(halo, still ? .35 : .28 + .08 * Math.sin(t * 1.4));
    opacity(rays, still ? 1 : .75 + .2 * Math.sin(t * 1.4));
    rays.setAttribute('transform', `rotate(${still ? 0 : t * 1.8} 560 102)`);
    opacity(sunlight, still ? .8 : .65 + .18 * Math.sin(t * 1.8));
    sunlight.setAttribute('stroke-dasharray', '8 9');
    sunlight.setAttribute('stroke-dashoffset', String(still ? 0 : -t * 12));
    opacity(leaves, leafProgress);
    leaves.setAttribute('transform', `translate(575 240) scale(${.75 + leafProgress * .25}) translate(-575 -240)`);
    trees.setAttribute('transform', `rotate(${still ? 0 : Math.sin(t * 1.1) * .7 * leafProgress} 575 335)`);
    opacity(shade, .22 * shadeProgress);
    opacity(birds, habitatProgress);
    birds.setAttribute('transform', `translate(${still ? 0 : Math.sin(t * .9) * 4} ${still ? 0 : Math.sin(t * 1.8) * 3})`);
  }

  function draw(time, still = false) {
    if (mode === 'water') drawWater(time, still);
    else drawNature(time, still);
  }

  function clearScene() {
    overlay.classList.remove('is-visible');
    natureOverlay.classList.remove('is-visible');
    opacity(shade, 0);
    trees.removeAttribute('transform');
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

  function begin(nextMode = mode) {
    pause();
    clearScene();
    mode = nextMode;
    steps.forEach((item, index) => { item.lastChild.textContent = stageNames[mode][index]; });
    active = true;
    elapsed = 0;
    (mode === 'water' ? overlay : natureOverlay).classList.add('is-visible');
    setStage(0, true);
    draw(0, reducedMotion.matches);
    if (reducedMotion.matches) controls();
    else play();
  }

  document.querySelectorAll('.scene-pin').forEach(button => {
    button.addEventListener('click', () => {
      if (button === waterButton) begin('water');
      else if (button === natureButton) begin('nature');
      else {
        pause();
        active = false;
        elapsed = 0;
        stage = -1;
        clearScene();
        steps.forEach(item => { item.removeAttribute('aria-current'); item.classList.remove('is-complete'); });
        controls();
      }
    });
  });

  playButton.addEventListener('click', () => {
    if (!active) { (mode === 'water' ? waterButton : natureButton).click(); return; }
    if (reducedMotion.matches) {
      setStage((stage + 1) % stories[mode].length);
      elapsed = stageStarts[stage];
      draw(elapsed, true);
      controls();
    } else if (playing) pause();
    else play();
  });
  replayButton.addEventListener('click', () => begin());
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
