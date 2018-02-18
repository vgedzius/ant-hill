let canvas;
let ant;
let food = [];

function setup() {
  angleMode(DEGREES);
  canvas = createCanvas(600, 400);
  canvas.parent('canvas-container');

  for (let i = 0; i < 1; i++) {
    let x = random(width);
    let y = random(height);
    food.push(new Food(x, y));
  }

  ant = new Ant();
}

function draw() {
  background(0);

  if (keyIsPressed) {
    switch (key) {
      case '&':
        ant.up();
        break;
      case '\'':
        ant.right();
        break;
      case '(':
        ant.down();
        break;
      case '%':
        ant.left();
        break;
      default:
        break;
    }
  }

  ant.see().move().show();

  food.map((pelet) => {
    pelet.show();
  });
}