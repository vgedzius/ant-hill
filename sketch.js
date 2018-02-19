let canvas;
let ants = [];
let food = [];

let numberOfAnts = 3;
let numberOfFood = 15;

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
    ants.push(new Ant());
  }

  ant = new Ant();
}

function draw() {
  background(0);

  food.map((pelet) => pelet.show());
  ants.map((ant) => {
    let f = p5.Vector.random2D();
    ant.applyForce(f).see().move().show();
  });
}