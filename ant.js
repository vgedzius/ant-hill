class Ant {
  constructor() {
    this.sensitivity        = config.ant.sensitivity;
    this.friction           = config.ant.friction;
    this.visionRadius       = config.ant.visionRadius;
    this.hitRadius          = config.ant.hitRadius;
    this.startingHitPoints  = config.ant.startingHitPoints;
    this.numberOfEyes       = config.ant.numberOfEyes;

    if (this.numberOfEyes.constructor == Array) {
      this.numberOfEyes = floor(random(this.numberOfEyes[0], this.numberOfEyes[1]));
    }
  }

  init() {
    this.position     = createVector(random(width), random(height));
    this.velocity     = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.hitPoints    = this.startingHitPoints;
    this.timeAlive    = 0;
    this.digestion    = 0.0;
    this.foodEaten    = 0;
    this.poisonEaten  = 0
    this.sensors      = [];
    this.proximity = [];

    let angle = 360 / this.numberOfEyes;
    for (let i = 0; i < this.numberOfEyes; i++) {
      let sensor = new Sensor(i * angle, angle, this.visionRadius);
      this.sensors.push(sensor);
    }

    // this.brain = new NeuralNetwork([
    //   this.numberOfEyes,
    //   this.numberOfEyes + 2,
    //   this.numberOfEyes + 2,
    //   4
    // ]);

    const env = {
      getNumStates: () => this.numberOfEyes * 2,
      getMaxNumActions: () => 4
    };
    const spec = {
      alpha: 0.01
    };
    this.brain = new RL.DQNAgent(env, spec); 

    return this;
  }

  update(world) {
    this.digestion = 0;
    if (this.hitPoints > 0) {
      this.eat(world)
          .see(world)
          .move();
    }

    this.brain.learn(this.digestion);

    //this.hitPoints--;
    this.timeAlive++;

    return this;
  }

  clone() {
    let x = random(width);
    let y = random(height);
    let ant = new Ant(x, y);
    ant.numberOfEyes = this.numberOfEyes;
    ant.init();
    ant.brain = this.brain.clone();
    
    return ant;
  }

  mutate() {
    this.brain.mutate();

    return this;
  }

  fitness() {
    return this.timeAlive;
  }

  move() {
    // this.acceleration = p5.Vector.random2D();
    this.velocity.add(this.acceleration);
    this.acceleration = createVector(0, 0);
    this.detectEdges();
    this.position.add(this.velocity);
    this.velocity.mult(this.friction);
    
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
    if (this.position.x < this.hitRadius || this.position.x > width - this.hitRadius) {
      this.velocity.x *= -1;
    }

    if (this.position.y < this.hitRadius || this.position.y > height - this.hitRadius) {
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

    // body
    noStroke();
    
    if (this.hitPoints > 0) {
      if (config.ant.showSensors) {
        this.sensors.forEach((sensor) => sensor.show());
      }

      let hue;
      let alpha = map(this.hitPoints, 0, this.startingHitPoints, 0.1, 1);
      if (config.ant.numberOfEyes.constructor == Array) {
        let min = config.ant.numberOfEyes[0];
        let max = config.ant.numberOfEyes[1];
        hue = round(map(this.numberOfEyes, min, max, 0, 360));
      } else {
        hue = round(map(this.numberOfEyes, 2, 20, 0, 360));
      }
      let c = color(`hsla(${hue}, 100%, 50%, ${alpha})`);
      fill(c);
    } else {
      fill(255, 0, 0);
    }
    ellipse(0, 0, this.hitRadius * 2);

    pop();
    return this;
  }

  see(world) {
    this.proximity = [];
    world.items.map((pelet) => {
      const d = p5.Vector.sub(pelet.position, this.position);
      if (d.mag() < this.visionRadius && d.mag()) {
        this.proximity.push({ d, pelet });
      }
    });

    let heatMap = this.sensors
      .map((sensor) => sensor.scan(this.proximity))
      .reduce((a, b) => a.concat(b), []);

    switch (this.brain.act(heatMap)) {
      case 0:
        this.up();
        break;
      case 1:
        this.right();
        break;
      case 2:
        this.down();
        break;
      case 3:
        this.left();
        break;
    }

    return this;
  }

  eat(world) {
    world.items = world.items.filter((pelet) => {
      let d = dist(this.position.x, this.position.y, pelet.position.x, pelet.position.y);
      if (d <= this.hitRadius + pelet.hitRadius) {
        this.digestion += pelet.type;
        switch (pelet.type) {
          case Item.FOOD:
            this.foodEaten++;
            break;
          case Item.POISON:
            this.poisonEaten++;
            break;
        }
        return false;
      }
      return true;
    });
    
    return this;
  }
}
