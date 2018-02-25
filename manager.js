class Manager {
  constructor() {
    this.numberOfAnts = 20;
    this.numberOfFood = 15;
    this.generation = 1;

    this.food = [];
    this.ants = [];
  }

  init() {
    for (let i = 0; i < this.numberOfFood; i++) {
      this.food.push(new Food());
    }

    for (let i = 0; i < this.numberOfAnts; i++) {
      this.ants.push(new Ant());
    }

    return this;
  }

  update() {
    if (this.food.length < this.numberOfFood) {
      this.food.push(new Food());
    }

    this.food.forEach((pelet) => pelet.show());
    this.ants.forEach((ant) => ant.update(this).show());
    this.displayStats();
    
    if (this.alive().length == 0) {
      this.newGeneration();
    }
  }

  alive() {
    return this.ants.filter((ant) => ant.hitPoints > 0);
  }

  displayStats() {
    fill(255);
    text('Generation: ' + this.generation, 10, 20);
    return this;
  }

  newGeneration() {
    this.ants = this.ants.sort((a, b) => a.timeAlive - b.timeAlive)
      .map((ant, index) => {
        if (index >= this.numberOfAnts / 2) {
          let r = [];
          r.push(ant.clone().mutate());
          r.push(ant.clone().mutate());
          return r;
        }
      }).filter((item) => item !== undefined)
      .reduce((a, b) => {
        return a.concat(b);
      });

    this.generation++;

    return this;
  }
}