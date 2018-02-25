let canvas;
let manager;

function setup() {
  angleMode(DEGREES);
  //colorMode(HSL);
  canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  manager = new Manager().init();
}

function draw() {
  background(0);

  manager.update();
}