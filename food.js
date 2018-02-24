class Food {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.hitRadius = 5;
    this.energy = 200;
  }

  show() {
    push();
    fill(0, 255, 0);
    noStroke();
    ellipse(this.position.x, this.position.y, this.hitRadius * 2);
    pop();
  }
}
