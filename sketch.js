let canvas;
let ants = [];
let food = [];
let generation = 1;

let numberOfAnts = 20;
let numberOfFood = 30;

function setup() {
  angleMode(DEGREES);
  canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  for (let i = 0; i < numberOfFood; i++) {
    food.push(new Food());
  }

  for (let i = 0; i < numberOfAnts; i++) {
    ants.push(new Ant());
  }
}

function draw() {
  background(0);

  if (food.length < numberOfFood) {
    food.push(new Food());
  }

  food.forEach((pelet) => pelet.show());
  ants.forEach((ant) => ant.update().show());

  let alive = ants.filter((ant) => ant.hitPoints > 0);

  fill(255);
  text('Generation: ' + generation, 10, 20);

  if (alive.length == 0) {
    // new generation
    ants = ants.sort((a, b) => a.timeAlive - b.timeAlive)
      .map((ant, index) => {
        if (index >= numberOfAnts / 2) {
          let r = [];
          r.push(ant.clone().mutate());
          r.push(ant.clone().mutate());
          return r;
        }
      }).filter((item) => item !== undefined)
      .reduce((a, b) => {
        return a.concat(b);
      });
    
    generation++;
  }
}