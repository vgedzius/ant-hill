class SettingsLoader {
  static init() {
    select('#numberOfAnts')
      .value(config.world.numberOfAnts)
      .input(function () {
        config.world.numberOfAnts = this.value();
      });
    
    select('#numberOfFood')
      .value(config.world.numberOfFood)
      .input(function () {
        config.world.numberOfFood = this.value();
      });

    select('#sensitivity')
      .value(config.ant.sensitivity)
      .input(function () {
        config.ant.sensitivity = this.value();
      });
    
    select('#friction')
      .value(config.ant.friction)
      .input(function () {
        config.ant.friction = this.value();
      });
    
    select('#visionRadius')
      .value(config.ant.visionRadius)
      .input(function () {
        config.ant.visionRadius = this.value();
      });
    
    select('#antHitRadius')
      .value(config.ant.hitRadius)
      .input(function () {
        config.ant.hitRadius = this.value();
      });
    
    select('#numberOfEyes')
      .value(config.ant.numberOfEyes)
      .input(function () {
        config.ant.numberOfEyes = this.value();
      });
    
    select('#showSensors')
      .changed(function () {
        config.ant.showSensors = this.checked();
      })
      .elt.checked = config.ant.showSensors;
    
    select('#startingHitPoints')
      .value(config.ant.startingHitPoints)
      .input(function () {
        config.ant.startingHitPoints = this.value();
      });
    
    select('#foodHitRadius')
      .value(config.food.hitRadius)
      .input(function () {
        config.food.hitRadius = this.value();
      });
    
    select('#energy')
      .value(config.food.energy)
      .input(function () {
        config.food.energy = this.value();
      });
  }
}
