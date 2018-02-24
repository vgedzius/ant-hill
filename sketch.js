let canvas;
let ants = [];
let food = [];

let numberOfAnts = 20;
let numberOfFood = 30;

function setup() {
  angleMode(DEGREES);
  canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  for (let i = 0; i < numberOfFood; i++) {
    let x = random(width);
    let y = random(height);
    food.push(new Food(x, y));
  }

  for (let i = 0; i < numberOfAnts; i++) {
    let x = random(width);
    let y = random(height);
    ants.push(new Ant(x, y));
  }

  ant = new Ant();
}

function draw() {
  background(0);

  food.forEach((pelet) => pelet.show());
  ants.forEach((ant) => ant.update().show());
}