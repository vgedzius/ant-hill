function vectorFromPolar(angle, radius) {
  let x = radius * cos(angle);
  let y = radius * sin(angle);

  return createVector(x, y);
}

function angleFromVector(v) {
  let a = atan2(v.y, v.x);
  if (v.y < 0) {
    a += 360;
  }
  return a;
}