class Item {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.hitRadius = config.food.hitRadius;
    this.type = floor(random([-1, 1]));
  }

  show() {
    push();
    switch(this.type) {
      case Item.FOOD:
        fill(0, 255, 0);
        break;
      case Item.POISON:
        fill(255, 0, 0);
        break;
    }
    
    noStroke();
    ellipse(this.position.x, this.position.y, this.hitRadius * 2);
    pop();
  }
}

Item.FOOD = 1;
Item.POISON = -1