'use strict';

(() => {
  const player = document.getElementById('watershed-player');
  const overlay = document.getElementById('watershed-animation');
  const route = document.getElementById('watershed-route');
  if (!player || !overlay || !route) return;

  const playButton = document.getElementById('watershed-play');
  const replayButton = document.getElementById('watershed-replay');
  const label = document.querySelector('#watershed-label span');
  const energyButton = document.querySelector('[data-scene="energy"]');
  const energyOverlay = document.getElementById('energy-animation');
  const energyHalo = document.getElementById('energy-halo');
  const energyRays = document.getElementById('energy-rays');
  const beam = document.getElementById('energy-beam');
  const photons = document.getElementById('energy-photons');
  const panel = document.getElementById('energy-panel');
  const wire = document.getElementById('energy-wire');
  const lights = document.getElementById('energy-lights');
  const windowGlow = document.getElementById('energy-window-glow');
  const flow = document.getElementById('watershed-flow');
  const flowReveal = document.getElementById('watershed-flow-reveal');
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
    ['Rain falls beside the building.', 'Follow rainwater as it travels down the left side of the building toward the ground below.'],
    ['Water follows the ground.', 'Runoff curves around the left edge of the building and continues downhill. Notice how the land shapes its path.'],
    ['Green ground slows some runoff.', 'As water passes a grassy strip, soil and plants can slow and absorb some runoff. The remaining water continues toward the stream.'],
    ['The trail joins the stream.', 'Watch the water meet the stream on the left. Small flows around our buildings connect to a larger watershed.']
  ], nature: [
    ['Sunlight powers a living city.', 'The sun supplies energy to plants. Follow the golden rays from the sun to the neighborhood trees.'],
    ['Leaves turn sunlight into food.', 'Through photosynthesis, leaves use sunlight, water, and carbon dioxide to make sugars that help trees grow.'],
    ['Tree canopies create shade.', 'Leaves intercept sunlight and shade the ground below. Compare a shaded green space with an open paved surface.'],
    ['Trees make room for life.', 'Branches and leaves offer shelter and habitat for birds and other wildlife. A small urban green space is part of a larger ecosystem.']
  ], energy: [
    ['Sunlight reaches the solar panel.', 'Golden rays travel from the sun to the rooftop panel. Sunlight supplies the energy for this simple solar story.'],
    ['Solar cells generate electricity.', 'The panel converts sunlight into electricity. The bright rooftop highlight shows where that conversion begins.'],
    ['Electricity reaches the building.', 'Through the building’s electrical equipment, solar electricity can power everyday devices. Follow the golden connection toward the windows.'],
    ['The building lights turn on.', 'All the windows light up as solar electricity powers the lights. This illustration connects a renewable energy source with a familiar use.']
  ]};
  const stageNames = {water: ['Rainfall', 'Runoff', 'Green spaces', 'Waterway'], nature: ['Sunlight', 'Leaves', 'Shade', 'Habitat'], energy: ['Sunlight', 'Solar panel', 'Electricity', 'Lights on']};
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
  flowReveal.setAttribute('stroke-dasharray', String(length));

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
    document.querySelector('#watershed-label').firstChild.textContent = {nature: 'Sun & trees ', water: 'Follow the water ', energy: 'Sunlight to lights '}[mode];
    label.textContent = reducedMotion.matches ? 'Reduced motion · step-by-step' : '10-second illustration';
    replayButton.disabled = !active;
    const storyLabel = {nature: 'nature story', water: 'water journey', energy: 'energy story'}[mode];
    playButton.textContent = !active ? `${reducedMotion.matches ? 'Explore' : 'Play'} ${storyLabel}` : reducedMotion.matches ? (stage === 3 ? 'Start again' : 'Next step') : playing ? 'Pause' : elapsed >= duration ? 'Play again' : 'Resume';
  }

  function drawWater(time, still = false) {
    const t = time / 1000;
    // One continuous curve, sampled by distance, keeps droplets moving at a steady speed.
    const travel = still ? [0, .42, .78, 1][Math.max(stage, 0)] : (time - 800) / 7500;
    const progress = clamp(travel);
    route.setAttribute('stroke-dashoffset', String(length * (1 - progress)));
    flowReveal.setAttribute('stroke-dashoffset', String(length * (1 - progress)));
    opacity(flow, still ? (stage > 0 ? .8 : 0) : clamp(travel * 4));
    flow.setAttribute('stroke-dashoffset', String(still ? 0 : -t * 22));
    opacity(cloud, still ? (stage === 0 ? 1 : .35) : 1 - .65 * clamp((t - 2.5) / 3));
    opacity(rain, still ? (stage === 0 ? 1 : 0) : 1 - clamp((t - 2.5) / 2));
    rainLines.forEach((line, index) => {
      const phase = (t * .6 + index / rainLines.length) % 1;
      line.setAttribute('transform', `translate(0 ${still ? index % 2 * 16 : phase * 28})`);
      opacity(line, still ? 1 : Math.sin(phase * Math.PI));
    });
    opacity(garden, still ? (stage >= 2 ? .4 : 0) : .4 * clamp((t - 5.4) / 1.3));
    opacity(soil, still ? (stage >= 2 ? 1 : 0) : clamp((t - 5.4) / 1.3));
    drops.forEach((drop, index) => {
      const u = travel - index * .045;
      const point = route.getPointAtLength(length * clamp(u));
      drop.setAttribute('cx', String(point.x));
      drop.setAttribute('cy', String(point.y));
      opacity(drop, still ? (stage > 0 && stage < 3 ? .9 : 0) : clamp(u / .05) * clamp((1 - u) / .06));
    });
    opacity(ripples, still ? (stage === 3 ? .8 : 0) : .8 * clamp((t - 8.1) / .8));
    rippleLines.forEach((ripple, index) => {
      const growth = still ? 1 : clamp((t - 8.1 - index * .2) / 1.4);
      ripple.setAttribute('rx', String(5 + growth * (12 + index * 9)));
      ripple.setAttribute('ry', String(2 + growth * (4 + index * 3)));
    });
  }

  function drawEnergy(time, still = false) {
    const t = time / 1000;
    const panelProgress = still ? (stage >= 1 ? 1 : 0) : clamp((t - 2.2) / 1);
    const powerProgress = still ? (stage >= 2 ? 1 : 0) : clamp((t - 5.6) / 1);
    const lightProgress = still ? (stage === 3 ? 1 : 0) : clamp((t - 8) / .7);
    opacity(energyHalo, .25);
    opacity(energyRays, .85);
    energyRays.setAttribute('transform', `rotate(${still ? 0 : t} 560 102)`);
    opacity(beam, still ? .24 : .24 * clamp(t / 1.2));
    opacity(photons, still ? .85 : clamp(t / 1.2));
    photons.setAttribute('stroke-dasharray', '12 22');
    photons.setAttribute('stroke-dashoffset', String(still ? 0 : -t * 38));
    opacity(panel, .38 * panelProgress);
    opacity(wire, powerProgress);
    wire.setAttribute('stroke-dasharray', '5 5');
    wire.setAttribute('stroke-dashoffset', String(still ? 0 : -t * 18));
    opacity(windowGlow, .16 * lightProgress);
    opacity(lights, lightProgress);
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
    else if (mode === 'energy') drawEnergy(time, still);
    else drawNature(time, still);
  }

  function clearScene() {
    overlay.classList.remove('is-visible');
    natureOverlay.classList.remove('is-visible');
    energyOverlay.classList.remove('is-visible');
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
    ({water: overlay, nature: natureOverlay, energy: energyOverlay})[mode].classList.add('is-visible');
    setStage(0, true);
    draw(0, reducedMotion.matches);
    if (reducedMotion.matches) controls();
    else play();
  }

  document.querySelectorAll('.scene-pin').forEach(button => {
    button.addEventListener('click', () => {
      begin(button.dataset.scene);
    });
  });

  playButton.addEventListener('click', () => {
    if (!active) { ({water: waterButton, nature: natureButton, energy: energyButton})[mode].click(); return; }
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
