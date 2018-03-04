class World {
  init() {
    this.numberOfAnts = config.world.numberOfAnts;
    this.numberOfFood = config.world.numberOfFood;

    this.generation   = 1;
    this.hiScore      = 0;
    this.previousBest = 0;
    this.items        = [];
    this.ants         = [];

    for (let i = 0; i < this.numberOfFood; i++) {
      this.items.push(new Item());
    }

    for (let i = 0; i < this.numberOfAnts; i++) {
      this.ants.push(new Ant().init());
    }

    return this;
  }

  update() {
    this.ants.forEach((ant) => ant.update(this).show());
    this.items.forEach((pelet) => pelet.show());
    this.displayStats();

    if (this.items.length < this.numberOfFood) {
      this.items.push(new Item());
    }
    
    if (this.alive().length == 0) {
      this.newGeneration();
    }
  }

  alive() {
    return this.ants.filter((ant) => ant.hitPoints > 0);
  }

  displayStats() {
    fill(255);

    let txt = `Food: ${this.ants[0].foodEaten}\n`;
    txt += `Poison: ${this.ants[0].poisonEaten}\n`;
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