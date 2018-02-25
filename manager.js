class Manager {
  constructor() {
    this.numberOfAnts = 20;
    this.numberOfFood = 15;
    this.generation = 1;
    this.hiScore = 0;
    this.previousBest = 0;

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

    let txt = `Generation: ${this.generation}\n`;
    txt += `Population Size: ${this.ants.length}\n`;
    txt += `Current Best: ${this.currentBest().fitness()}\n`;
    txt += `Previous Best: ${this.previousBest}\n`;
    txt += `High Score: ${this.hiScore}\n`;
    text(txt, 2, 2, 200, 150);

    return this;
  }

  currentBest() {
    return this.ants.reduce((a, b) => a.fitness() > b.fitness() ? a : b);
  }

  newGeneration() {
    const best = this.currentBest();
    this.previousBest = best.fitness();
    if (best.fitness() > this.hiScore) {
      this.hiScore = best.fitness();
    }

    this.ants = this.ants.sort((a, b) => a.fitness() - b.fitness())
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