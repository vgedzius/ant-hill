class Food {
  constructor(x, y) {
    this.position = createVector(x, y);
  }

  show() {
    push();
    fill(0, 255, 0);
    noStroke();
    ellipse(this.position.x, this.position.y, 10);
    pop();
  }
}
