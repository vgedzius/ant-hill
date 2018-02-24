class Ant {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.sensitivity = 0.01;
    this.friction = 0.97;
    this.visionRadius = 150;
    this.hitRadius = 10;
    this.numberOfEyes = 10;
    this.showSensors = false;
    this.startingHitPoints = 2000;
    this.hitPoints = this.startingHitPoints;

    this.sensors = [];
    let angle = 360 / this.numberOfEyes;
    for (let i = 0; i < this.numberOfEyes; i++) {
      let sensor = new Sensor(i * angle, angle, this.visionRadius);
      this.sensors.push(sensor);
    }
    this.proximity = [];

    this.brain = new NeuralNetwork([this.numberOfEyes, this.numberOfEyes * 2, this.numberOfEyes * 2, 4]);
  }

  update() {
    if (this.hitPoints > 0) {
      this.eat().see().move();
    }
    this.hitPoints--;

    return this;
  }

  move() {
    // this.acceleration = p5.Vector.random2D();
    this.velocity.add(this.acceleration);
    this.acceleration = createVector(0, 0);

    this.detectEdges();

    this.velocity.mult(this.friction);

    this.position.add(this.velocity);

    return this;
  }

  up() {
    this.applyForce(createVector(0, -1).mult(this.sensitivity));
    return this;
  }

  right() {
    this.applyForce(createVector(1, 0).mult(this.sensitivity));
    return this;
  }

  down() {
    this.applyForce(createVector(0, 1).mult(this.sensitivity));
    return this;
  }

  left() {
    this.applyForce(createVector(-1, 0).mult(this.sensitivity));
    return this;
  }

  detectEdges() {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
    return this;
  }

  applyForce(force) {
    this.acceleration.add(force);
    return this;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);

    // ant body
    stroke(255);
    if (this.hitPoints > 0) {
      let c = map(this.hitPoints, 0, this.startingHitPoints, 0, 255);
      fill(255, c);
    } else {
      fill(255, 0, 0);
    }
    
    ellipse(0, 0, this.hitRadius * 2);

    // vision
    if (this.showSensors) {
      this.sensors.forEach((sensor) => sensor.show());
    }
    pop();
    return this;
  }

  see() {
    this.proximity = [];
    food.map((pelet) => {
      let d = p5.Vector.sub(pelet.position, this.position);
      if (d.mag() < this.visionRadius && d.mag()) {
        this.proximity.push(d);
      }
    });

    let heatMap = this.sensors.map((sensor) => sensor.scan(this.proximity));

    let a = this.brain.feedForward(heatMap);
    if (Math.round(Math.abs(a[0]))) {
      this.up();
    }
    if (Math.round(Math.abs(a[1]))) {
      this.right();
    }
    if (Math.round(Math.abs(a[2]))) {
      this.down();
    }
    if (Math.round(Math.abs(a[3]))) {
      this.left();
    }

    return this;
  }

  eat() {
    food = food.filter((pelet) => {
      let d = dist(this.position.x, this.position.y, pelet.position.x, pelet.position.y);
      if (d <= this.hitRadius + pelet.hitRadius) {
        this.hitPoints += pelet.energy;
        return false;
      }
      return true;
    });
    
    return this;
  }
}
