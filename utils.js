function vectorFromPolar(angle, radius) {
  let x = radius * cos(angle);
  let y = radius * sin(angle);

  return createVector(x, y);
}

function angleFromVector(v) {
  let q;
  if (v.x < 0) {
    q = v.y < 0 ? 3 : 2; 
  } else {
    q = v.y < 0 ? 4 : 1; 
  }
  let a = atan(v.x / v.y);
  switch (q) {
    case 1:
      return a;
      break;
    case 2:
    case 3:
      return a + 180;
      break;
    case 4:
      return a + 360;
      break;
  }
}