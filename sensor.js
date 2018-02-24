class Sensor {
  constructor(start, angle, lenght) {
    this.start = start;
    this.angle = angle;
    this.lenght = lenght;
    this.heat = 0;
  }

  scan(proximity) {
    let p = proximity.filter((item) => {
      let finish = this.start + this.angle;
      let angle = angleFromVector(item);
      return angle >= this.start && angle < finish;
    });

    let closest = this.lenght;
    p.map((item) => {
      let d = item.mag();
      if (d < closest) {
        closest = d;
      }
    });
    this.heat = map(closest, 0, this.lenght, 2, 0);
    return this.heat;
  }

  show() {
    push();
    beginShape();
    let c = map(this.heat, 0, 1, 0, 255);
    fill(c, 100);
    vertex(0, 0);
    let current = this.start;
    let finish = this.start + this.angle;
    let v = vectorFromPolar(current, this.lenght);
    vertex(v.x, v.y);
    while (current < finish) {
      v = vectorFromPolar(current, this.lenght);
      vertex(v.x, v.y);
      current++;
    }
    v = vectorFromPolar(finish, this.lenght);
    vertex(v.x, v.y);
    
    endShape(CLOSE);
    pop();
  }
}