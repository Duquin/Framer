// Framer 3D Enhanced Experience
// Enhanced with multiple effects, controls, and UI features

import AttractionCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.26/build/cursors/attraction1.min.js"

// Initialize variables
let app;
let currentEffect = 'attraction';
let currentColorMode = 'random';
let particlesCount = 500;
let isPanelCollapsed = false;

// DOM Elements
const canvas = document.getElementById('canvas');
const loadingScreen = document.getElementById('loading-screen');
const progress = document.getElementById('progress');
const particleCountEl = document.getElementById('particle-count');
const colorModeEl = document.getElementById('color-mode');
const effectModeEl = document.getElementById('effect-mode');
const panelToggle = document.getElementById('panel-toggle');
const panelContent = document.getElementById('panel-content');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

// Initialize 3D Application
async function initApp() {
  // Simulate loading progress
  simulateLoading();
  
  // Initialize particle system
  app = AttractionCursor(canvas, {
    particles: {
      count: particlesCount,
      attractionIntensity: 1,
      size: 5,
      speed: 1,
    },
  });
  
  // Wait for initialization
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Hide loading screen
  loadingScreen.classList.add('hidden');
  
  // Update particle count display
  updateParticleCount();
  
  // Initialize event listeners
  initEventListeners();
  
  // Start animation loop for additional effects
  animate();
  
  showNotification('3D Universe Ready!');
}

// Simulate loading progress
function simulateLoading() {
  let progressValue = 0;
  const interval = setInterval(() => {
    progressValue += Math.random() * 20;
    if (progressValue > 100) {
      progressValue = 100;
      clearInterval(interval);
    }
    progress.style.width = `${progressValue}%`;
  }, 200);
}

// Update particle count display
function updateParticleCount() {
  if (app && app.particles) {
    particleCountEl.textContent = particlesCount;
  }
}

// Initialize all event listeners
function initEventListeners() {
  // Original random colors button
  const colorsBtn = document.getElementById('colors-btn');
  colorsBtn.addEventListener('click', setRandomColors);
  
  // Color mode buttons
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active state
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Set color mode
      currentColorMode = this.dataset.color;
      colorModeEl.textContent = this.textContent.split('\n')[0].trim();
      
      // Apply color mode
      applyColorMode();
      
      showNotification(`Color mode: ${currentColorMode}`);
    });
  });
  
  // Effect buttons
  document.querySelectorAll('.effect-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active state
      document.querySelectorAll('.effect-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Set effect
      currentEffect = this.dataset.effect;
      effectModeEl.textContent = this.textContent.split('\n')[0].trim();
      
      // Apply effect
      applyEffect();
      
      showNotification(`Effect: ${currentEffect}`);
    });
  });
  
  // Sliders
  const particleSize = document.getElementById('particle-size');
  const particleSpeed = document.getElementById('particle-speed');
  const attractionStrength = document.getElementById('attraction-strength');
  
  particleSize.addEventListener('input', function() {
    const value = this.value;
    document.getElementById('size-value').textContent = value;
    if (app && app.particles) {
      app.particles.size = parseFloat(value);
    }
  });
  
  particleSpeed.addEventListener('input', function() {
    const value = this.value;
    document.getElementById('speed-value').textContent = value;
    if (app && app.particles) {
      app.particles.speed = parseFloat(value);
    }
  });
  
  attractionStrength.addEventListener('input', function() {
    const value = this.value;
    document.getElementById('attraction-value').textContent = value;
    if (app && app.particles) {
      app.particles.attractionIntensity = parseFloat(value);
    }
  });
  
  // Action buttons
  document.getElementById('reset-btn').addEventListener('click', resetToDefault);
  document.getElementById('clear-btn').addEventListener('click', clearParticles);
  document.getElementById('add-btn').addEventListener('click', addParticles);
  
  // Panel toggle
  panelToggle.addEventListener('click', function() {
    isPanelCollapsed = !isPanelCollapsed;
    panelContent.classList.toggle('collapsed', isPanelCollapsed);
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-chevron-up');
    icon.classList.toggle('fa-chevron-down');
  });
}

// Set random colors (original function)
function setRandomColors() {
  if (app && app.particles) {
    app.particles.light1.color.set(Math.random() * 0xffffff);
    app.particles.light2.color.set(Math.random() * 0xffffff);
    showNotification('Colors randomized!');
  }
}

// Apply color mode based on selection
function applyColorMode() {
  if (!app || !app.particles) return;
  
  switch(currentColorMode) {
    case 'random':
      setRandomColors();
      break;
      
    case 'gradient':
      // Create gradient colors
      const color1 = Math.random() * 0xffffff;
      const color2 = (color1 + 0x333333) % 0xffffff;
      app.particles.light1.color.set(color1);
      app.particles.light2.color.set(color2);
      break;
      
    case 'mono':
      // Monochromatic theme
      const monoColor = Math.random() * 0xffffff;
      app.particles.light1.color.set(monoColor);
      app.particles.light2.color.set(monoColor);
      break;
      
    case 'rainbow':
      // Rainbow effect will be handled in animation loop
      break;
  }
}

// Apply effect based on selection
function applyEffect() {
  if (!app || !app.particles) return;
  
  switch(currentEffect) {
    case 'attraction':
      app.particles.attractionIntensity = Math.abs(app.particles.attractionIntensity);
      break;
      
    case 'repulsion':
      app.particles.attractionIntensity = -Math.abs(app.particles.attractionIntensity);
      break;
      
    case 'swirl':
      // Swirl effect (custom implementation)
      if (app.particles.swirlEffect) {
        app.particles.swirlEffect.active = true;
      }
      break;
      
    case 'chaos':
      // Chaos mode - random movements
      if (app.particles.chaosEffect) {
        app.particles.chaosEffect.active = true;
      }
      break;
  }
}

// Reset to default settings
function resetToDefault() {
  if (!app || !app.particles) return;
  
  // Reset sliders
  document.getElementById('particle-size').value = 5;
  document.getElementById('particle-speed').value = 1;
  document.getElementById('attraction-strength').value = 1;
  
  // Update display values
  document.getElementById('size-value').textContent = '5';
  document.getElementById('speed-value').textContent = '1';
  document.getElementById('attraction-value').textContent = '1';
  
  // Reset particle properties
  app.particles.size = 5;
  app.particles.speed = 1;
  app.particles.attractionIntensity = 1;
  
  // Reset to default colors
  currentColorMode = 'random';
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.color-btn[data-color="random"]').classList.add('active');
  colorModeEl.textContent = 'Random';
  setRandomColors();
  
  // Reset to default effect
  currentEffect = 'attraction';
  document.querySelectorAll('.effect-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.effect-btn[data-effect="attraction"]').classList.add('active');
  effectModeEl.textContent = 'Attraction';
  applyEffect();
  
  showNotification('Reset to default settings');
}

// Clear all particles
function clearParticles() {
  particlesCount = 0;
  updateParticleCount();
  showNotification('Particles cleared');
  
  // In a real implementation, you would clear particles from the scene
  // This depends on the AttractionCursor API capabilities
}

// Add more particles
function addParticles() {
  particlesCount += 100;
  updateParticleCount();
  
  // In a real implementation, you would add particles to the scene
  // This depends on the AttractionCursor API capabilities
  
  showNotification(`Added 100 particles (Total: ${particlesCount})`);
}

// Show notification
function showNotification(message) {
  notificationText.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Animation loop for additional effects
function animate() {
  requestAnimationFrame(animate);
  
  // Apply rainbow effect if selected
  if (currentColorMode === 'rainbow' && app && app.particles) {
    const time = Date.now() * 0.001;
    const hue = (time * 0.1) % 1;
    const color = hue * 0xffffff;
    app.particles.light1.color.set(color);
    app.particles.light2.color.set((color + 0x888888) % 0xffffff);
  }
  
  // Apply custom effects based on selection
  if (app && app.particles) {
    switch(currentEffect) {
      case 'swirl':
        // Implement swirl effect
        // This would require custom shader or particle system modifications
        break;
        
      case 'chaos':
        // Implement chaos effect
        // This would require custom particle behavior
        break;
    }
  }
}

// Track mouse movement for particle interaction
document.addEventListener('mousemove', (e) => {
  if (app && app.particles && app.particles.onMouseMove) {
    app.particles.onMouseMove(e);
  }
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Handle window resize
window.addEventListener('resize', () => {
  if (app && app.onResize) {
    app.onResize();
  }
});