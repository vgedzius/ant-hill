class Ant {
  constructor() {
    let x = floor(random(width));
    let y = floor(random(height));
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.sensitivity = 0.9;
    this.friction = 0.95;
    this.visionRadius = 150;
    this.numberOfEyes = 20;

    this.sensors = [];
    let angle = 360 / this.numberOfEyes;
    for (let i = 0; i < this.numberOfEyes; i++) {
      let sensor = new Sensor(i * angle, angle, this.visionRadius);
      this.sensors.push(sensor);
    }

    this.proximity = [];
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
    ellipse(0, 0, 10);

    // vision
    this.sensors.map((sensor) => sensor.show());

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

    this.sensors.map((sensor) => sensor.scan(this.proximity));

    return this;
  }
}
