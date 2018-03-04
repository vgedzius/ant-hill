let canvas;
let world;
let config;

function preload() {
  config = loadJSON('config.json');
}

function setup() {
  angleMode(DEGREES);
  canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  SettingsLoader.init();

  world = new World().init();

  select('#restartBtn').mousePressed(() => {
    world.init();
  });
}

function draw() {
  background(0);

  world.update();
}