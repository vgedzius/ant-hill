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

  world = new World().init();
}

function draw() {
  background(0);

  world.update();
}