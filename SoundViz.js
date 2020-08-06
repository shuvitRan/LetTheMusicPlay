// Visualizations in the bg

function SoundViz() {
  switch (vizPage) {
    case 1:
      circleViz();
      break;
    case 2:
      lineViz();
      break;
    case 3:
      shapeViz(posneg);
      break;
  };
};





function shapeViz(posNeg) {

  this.posNeg = posNeg;
  let spectrum = fft2.analyze();


  push();
  let red = 200 * noise(t + 10);
  let green = 200 * noise(t + 15);
  let blue = 200 * noise(t + 35);
  

// Play with the vertexs and create shapes 
  translate(width / 2, height / 2)
  fill(red, 100, green, 200);
  beginShape();
    curveVertex(-(width / 5), -(height / 5));
    curveVertex(-(width / 5) * this.posNeg, -(height / 5) * this.posNeg);
    curveVertex(0, -(height / 4) - spectrum[2]);
    curveVertex(width / 4 + spectrum[0], -height / 3 + spectrum[3]);
    curveVertex(width / 4, 0);
    curveVertex(width / 3 + spectrum[4] * this.posNeg, height / 3 + spectrum[4] * this.posNeg);
    curveVertex(0, height / 4);
    curveVertex(-width / 3 - spectrum[5], height / 3 + spectrum[6]);
    curveVertex(-(width / 4) - spectrum[8] * this.posNeg, -(height / 3) - spectrum[10] * this.posNeg);
    curveVertex(width / 5, 0);
    curveVertex(-(width / 4) * this.posNeg, -(height / 4) * this.posNeg);
  endShape();
  fill(220, blue, green, 150);
  beginShape();
    curveVertex(-(width / 6) + spectrum[2] * this.posNeg, -(height / 6) + spectrum[7] * this.posNeg);
    curveVertex(width / 6 + spectrum[14] * this.posNeg, height / 6 + spectrum[13] * this.posNeg);
    curveVertex(-width / 6 - spectrum[5], height / 6 + spectrum[15]);
    curveVertex(-(width / 5) - spectrum[4] * this.posNeg, -(height / 5) + spectrum[0] * this.posNeg);
    curveVertex(width / 6 + spectrum[4], 0 + spectrum[3]);
    curveVertex(0 + spectrum[6] * this.posNeg, -(height / 6) - spectrum[2]);
    curveVertex(width / 6 + spectrum[5] * this.posNeg, -height / 6 + spectrum[8] * this.posNeg);
    curveVertex(0, height / 6 + spectrum[0] * this.posNeg);
    curveVertex(-(width / 6) - spectrum[4], -(height / 6) - spectrum[2] * this.posNeg);
    curveVertex(-(width / 6) - spectrum[8], -(height / 6) - spectrum[11]);
  endShape();

  pop();

  t = t + 0.01;

}

function lineViz() {
  // this.color =color;
  push();
  let spectrum = fft.analyze();



  let x = width * noise(t);
  let y = height * noise(t + 5);
  let red = 255 * noise(t + 10);
  let g = 200 * noise(t + 15);
  let b = 200 * noise(t + 20);
  // background(r, g, b);

  noStroke();
  // fill(r, g, b);

  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    let r = map(amp, 0, 64, 20, 100);
    let mix = map(r + red, 0, 355, 10, 250)
    strokeWeight(.8);
    if (i < 32) {
      stroke(mix, mix, 256);
      fftLines[i].display(r);
    } else {
      stroke(mix, mix - 10, mix);
      fftLines[i].display(mix);
    }

    noFill();

  };

  t = t + 0.01;
  pop();


}

class SoundLine {
  constructor() {
    this.x1 = random(width);
    this.y1 = random(height);

    this.x2 = random(width);
    this.y2 = random(height);
    this.xoff = random(0, width);

    this.n;
    this.perlinX = random(0, 3) / 10000;
    this.value = random(0, 100);
  }

  update() {
    this.xoff = random(0, width);


  }


  display(spectrumInput) {
    this.spectrumInput = spectrumInput
    this.xoff = this.xoff + this.perlinX;
    this.n = noise(this.xoff) * width;
    line(this.n, this.y1 - this.spectrumInput / 2, this.n, this.y1 + this.spectrumInput / 2);
  }


}


function circleViz() {
  // this.color =color;
  push();
  let spectrum = fft.analyze();
  fill(200);
  noStroke();
  rectMode(CORNER);
  // stroke(random(0,255),0,random(100,200));


  var x = width * noise(t);
  var y = height * noise(t + 5);
  var red = 255 * noise(t + 10);
  var g = 100 * noise(t + 15);
  var b = 200 * noise(t + 20);
  // background(r, g, b);

  noStroke();
  // fill(r, g, b);

  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 64, height, 0);
    let r = map(amp, 0, 64, 4, 70);

    let mix = map(r + red, 0, 316, 21, 200)

    fill(mix, 20, b);

    fftCircles[i].move();
    fftCircles[i].display(r);
  };

  t = t + 0.01;
  pop();

}

class Jitter {
  constructor() {
    this.x = random(width);
    this.y = random(height);

    this.speed = 1;
  }

  pUpdate() {
    this.x = random(width);
    this.y = random(height);
  }

  move() {

    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display(spectrumInput) {
    this.spectrumInput = spectrumInput
    ellipse(this.x, this.y, this.spectrumInput, this.spectrumInput);
  }
}