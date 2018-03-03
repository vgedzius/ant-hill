class Food {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.hitRadius = config.food.hitRadius;
    this.energy = config.food.energy;
  }

  show() {
    push();
    fill(0, 255, 0);
    noStroke();
    ellipse(this.position.x, this.position.y, this.hitRadius * 2);
    pop();
  }
}
