const WIDTH = 300;
const HEIGHT = 300;
const DEFAULT_FRAME_RATE = 30;
const DEFAULT_LOOP_LENGTH_IN_FRAMES = 100;

function drawClock(p, pct, size) {
  p.fill(100);
  p.noStroke();
  p.circle(0, 0, size);
  p.fill(0);
  p.arc(0, 0, size, size, 0, pct * Math.PI * 2);
}

function drawInformation(p, t, otherData) {
  p.textFont("Roboto Mono", 14); // Here 'Roboto' is the name of the font and 32 is the font size

  let x = 10;
  let y = 15;
  p.text("loop time:" + t.toFixed(2), x, y);
  otherData.forEach((text, index) => {
    p.text(text, x, y + 15 * (index + 1));
  });

  // Draw a clock face
  p.push();
  p.translate(p.width - 30, 30);
  drawClock(p, t, 30);
  p.pop();
}

// Three useful functions for animations
function pingpong(t) {
  // Return a number from 0 to 1
  // t=0 => 0
  // t=.5 => 1
  // t=1 => 0
  return 1 - Math.abs(((t * 2) % 2) - 1);
}

function pingpongEased(t) {
  // Same as pingpong, but it eases in and out
  return 0.5 - 0.5 * Math.cos(2 * t * Math.PI);
}

function ease(t) {
  // Ease just from 0 to 1 (the first half of pingpong)
  return 0.5 - 0.5 * Math.cos(t * Math.PI);
}

// =================================================
const sketches = [
  {
    name: "sketch 1",
    show: true,

    draw(p) {
      if (p.frameCount % 9 == 0) {
        p.background(0)
      }
      // Get time in SECONDS
      let t = p.millis() * 0.001;
      let hue = (t * 100) % 360;
      p.strokeWeight(5);
      p.stroke(hue, 100, 20);
      p.fill(hue, 100, 50);
      let circleRadius = Math.random() * 40 + 20;
      let x = Math.random() * p.width;
      let y = Math.random() * p.height;

      p.circle(x, y, circleRadius);
      //p.rect(x, y, circleRadius, circleRadius);
      
    },
  },
  
  {
    name: "sketch 2",
    show: true,

    setup(p) {
      // Setup only happens once.
      // We can use it to start off our canvas with a particular color
      p.background(0, 0, 80);
    },

    draw(p) {
      p.background(0, 0, 80, 0.1);

      let t = p.frameCount * 0.05;

      let x = p.width * (0.5 + 0.05 * Math.sin(t * 5));
      let y = p.width * (0.5 + 0.5 * Math.cos(t * 0.75));
      

      let hue = (t * 50) % 360;
      let circleRadius = 60 * p.noise(t);
      p.strokeWeight(5);
      p.stroke(hue, 100, 20);
      p.fill(hue, 100, 50);
      p.circle(x, y, circleRadius);
      
      // circle 2
      let x2 = p.width * (0.7 + 0.1 * Math.sin((t - Math.PI*1.5) * 3));
      let y2 = p.height * (0.5 + 0.5 * Math.cos((t - Math.PI*1.5) * 0.75));
      let hue2 = ((t * 50) + 180) % 360; // Shift hue for the second circle
      let circleRadius2 = 60 * p.noise(t + 100); // Use a different seed for the second circle's noise
      
      p.strokeWeight(5);
      p.stroke(hue2, 100, 20);
      p.fill(hue2, 100, 50);
      p.circle(x2, y2, circleRadius2);
      
      
      // circle 3
      let x3 = p.width * (0.3 + 0.1 * Math.sin((t + Math.PI) * 3)); // Adjust position to the left
      let y3 = p.height * (0.5 + 0.5 * Math.cos((t + Math.PI) * 0.75)); // Adjust position to the left
      let hue3 = ((t * 50) + 90) % 360; // Shift hue for the third circle (90 degrees)
      let circleRadius3 = 60 * p.noise(t - 200); // Use a different seed for the third circle's noise
      
      p.strokeWeight(5);
      p.stroke(hue2, 100, 20);
      p.fill(hue2, 100, 50);
      p.circle(x3, y3, circleRadius3);
      
    },
  },
  
  {
    name: "my first looping sketch",
    description: "",
    show: true,
    setup(p) {},

    // So we know how long to make the gif
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      // If you set t to a number that loops from 0 to 1,
      // and you use functions where the value for 0 and 1 are the same (the pingpong functions above)
      // Then it will loop
      // You can also use cyclical values, like hue, which wraps around

      let t = (p.frameCount / this.loopLength) % 1;

      let hue = t * 360; 
      p.background(hue, 100, 50);

      // Pingpong returns a
      let squareSize = pingpong(t);

      let w = squareSize * WIDTH;
      let h = squareSize * HEIGHT;

      p.rect(0, 0, w, h);

      p.strokeWeight(10);
      p.stroke(100);

      p.textSize(20);
      p.text("how far through the loop are we?", 20, 60, 200);

      p.textSize(50);
      p.text(t.toFixed(2), 20, 160);
    },
  },
  
  // below are kate's sketches
  
  {
    name: "my first animating sketch",
    show: false,

    setup(p) {
      // Setup only happens once.
      // We can use it to start off our canvas with a particular color
      p.background(0, 0, 80);
    },

    draw(p) {
      // Each frame, draw a light gray background
      // p.background(0, 0, 80)
      // Or a semi transparent background (NOTE TRY THIS IT'S COOL)
      p.background(0, 0, 80, 0.1);
      // Or no background? Try commenting these background lines
      // on and off and see how they change

      let t = p.frameCount * 0.05;

      // We can use "parametric equations" to drive movment over time
      // If we have one "t" value, and equations for x and y that depend on it
      // then as we increase t, those equations will draw a path over time

      // Some Khan videos on parametric curves
      // https://www.youtube.com/watch?v=m6c6dlmUT1c
      // https://www.youtube.com/watch?v=bb4bSCjlFAw

      // You can make good art with them, especially with *polar* curves
      // https://www.youtube.com/watch?v=Y2T31OQ-cWA

      // You can also change the speed by
      //multiplying by it by different numbers
      // t *= 4
      // t *= .4

      let x = p.width * (0.5 + 0.5 * Math.sin(t * 2));
      let y = p.width * (0.5 + 0.5 * Math.cos(t * 1.71));

      // If we save a color for the hue,
      // we can use it for both the fill and the stroke
      // so we can have a circle with an outline of a darker color
      // which looks nice
      let hue = (t * 50) % 360;
      let circleRadius = 60 * p.noise(t);
      p.strokeWeight(5);
      p.stroke(hue, 100, 20);
      p.fill(hue, 100, 50);
      p.circle(x, y, circleRadius);
    },
  },

  // One sketch
  {
    name: "my first looping sketch",
    description: "",
    show: true,
    setup(p) {},

    // So we know how long to make the gif
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      // If you set t to a number that loops from 0 to 1,
      // and you use functions where the value for 0 and 1 are the same (the pingpong functions above)
      // Then it will loop
      // You can also use cyclical values, like hue, which wraps around

      let t = (p.frameCount / this.loopLength) % 1;

      let hue = t * 360;
      p.background(hue, 100, 50);

      // Pingpong returns a
      let squareSize = pingpong(t);

      let w = squareSize * WIDTH;
      let h = squareSize * HEIGHT;

      //p.rect(0, 0, w, h);
      p.circle(0, 0, w);

      p.strokeWeight(10);
      p.stroke(100);

      p.textSize(20);
      p.text("how far through the loop are we?", 20, 60, 200);

      p.textSize(50);
      p.text(t.toFixed(2), 20, 160);
    },
  },
  // One sketch
  {
    name: "my test sketch",
    show: true,
    description: "an empty container for you to copy",
    setup(p) {
      p.background(50);
    },

    draw(p) {
      p.background(0, 0, 50, 0.01);

      // let t = p.millis()*.001
      let t = p.frameCount;

      for (var i = 0; i < 10; i++) {
        let hue = 320;

        let x = t * 10 + i * 10;
        let y = 10 + 30 * i;

        // Add interesting motion
        y += 40 * Math.sin(x * 0.03);

        let rad = 30;
        x = (x - 100) % (p.width + 200);

        // Draw shadow circle
        p.noStroke();
        p.fill(0, 0, 0, 0.2);
        p.circle(x, y + 10, rad * 1.1);

        // Draw main circle
        p.noStroke();
        p.fill(hue, 100, 100 - 10 * i);
        p.circle(x, y, rad);

        // Text!
        p.text("💖", x, y);
      }

      // Draw last, be on top

      p.fill(0, 0, 0, 0.4);
      p.text("Dr Kate", 10, 105);

      p.fill(0);
      p.textSize(40);
      p.stroke(100);
      p.strokeWeight(5);
      p.text("Dr Kate", 10, 100);
    },
  },

  // One sketch
  {
    name: "repetition and symmetry",
    show: false,
    description: "Exploring transformation",
    setup(p) {},
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      // Options for time
      // let t = p.millis()*.001 // Does not work with Gif
      let t = p.frameCount / this.loopLength;

      p.background(50);

      p.push();
      p.translate(150, 150);
      // p.circle(0, 0, 50);

      function drawFlower() {
        let count = 18;
        for (var i = 0; i < count; i++) {
          // Draw each petal rotated

          let petalRadius = 50;
          let x = petalRadius;
          let y = 0;

          // pct goes from 0 to 1
          let pct = i / (count - 1);

          // number from -100, 100
          // let y = p.map(pct, 0, 1, -100, 100)

          let hue = p.map(pct, 0, 1, 0, 360);
          p.fill(hue, 100, 50);
          p.strokeWeight(10);
          p.stroke(hue, 100, 70);

          let angle = p.map(pct, 0, 1, 0, Math.PI * 2);

          p.push();
          p.rotate(angle);

          // p.ellipse(x, y, 50, 20);

          p.textSize(100);
          p.translate(x, y);
          p.rotate(0.3 * Math.sin(i * 10));
          p.text("🍂", 0, 0);

          p.pop();
        }
      }

      let flowerCount = 3;
      for (var i = 0; i < flowerCount; i++) {
        p.push();
        let flowerPct = i / (flowerCount - 1);
        let x = p.map(flowerPct, 0, 1, -100, 100);
        let y = 50 * Math.sin(i + t * 10);

        p.translate(x, y);
        p.scale(0.6 + 0.1 * Math.sin(i + t * 0.2));
        p.rotate(t * 3);
        drawFlower();

        p.pop();
      }
      p.pop();
    },
  },

  // One sketch
  {
    name: "empty sketch",
    show: true,
    description: "an empty container for you to copy",
    setup(p) {},

    draw(p) {},
  },

  // One sketch
  {
    name: "ocean",
    show: true,
    description: "noise",
    setup(p) {},

    draw(p) {
      let t = p.millis() * 0.001;
      p.background(180, 100, 90);

      function drawWave(offset) {
        let count = 100;

        p.beginShape();
        for (var i = 0; i < count; i++) {
          let pct = i / (count - 1);
          let x = p.map(pct, 0, 1, 0, p.width);
          // let y = 100 + 100*Math.sin(pct*Math.PI*2 + t)

          // p.noiseDetail(2, 5)
          let y = 100 + 150 * p.noise(pct, t + offset);
          // p.circle(x, y, 10)
          p.vertex(x, y);
        }

        p.vertex(p.width, 500);
        p.vertex(0, 500);
        p.endShape();
      }

      for (var i = 0; i < 10; i++) {
        let hue = 190;
        p.fill(hue, 100, 50 - i * 3, 0.3);
        p.stroke(hue, 100, 90, 0.3);
        p.push();
        p.translate(0, -50 + i * 10);
        drawWave(i);
        p.pop();
      }

      let count = 30;
      for (var i = 0; i < count; i++) {
        let pctX = i / (count - 1);
        for (var j = 0; j < count; j++) {
          let pctY = j / (count - 1);

          let x = pctX * p.width;
          let y = pctY * p.height;

          let scale = 0.02;
          let hue = 360 * p.noise(x * scale, y * scale, t);
          p.fill(hue, 100, 50);
          p.circle(x, y, 20);
        }
      }
    },
  },

  {
    name: "Text repetition",
    show: true,
    description: "",
    setup(p) {},

    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      p.background(90);
      let text = "How to make stuff look good";
      let techniques = [
        "symmetry",
        "repetition",
        "variation",
        "contrast",
        "gradual change",
      ];
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.textAlign(p.CENTER);
      p.text(text, 0, -50);

      techniques.forEach((item, index) => {
        p.text(item, 0, index * 20 - 20);
      });

      p.pop();
    },
  },
  //===================================================================

  {
    name: "my first looping sketch",
    description: "",
    show: true,
    setup(p) {},

    // So we know how long to make the gif
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      // If you set t to a number that loops from 0 to 1,
      // and you use functions where the value for 0 and 1 are the same (the pingpong functions above)
      // Then it will loop
      // You can also use cyclical values, like hue, which wraps around

      let t = (p.frameCount / this.loopLength) % 1;

      let hue = t * 360;
      p.background(hue, 100, 50);

      // Pingpong returns a
      let squareSize = pingpong(t);

      let w = squareSize * WIDTH;
      let h = squareSize * HEIGHT;

      p.rect(0, 0, w, h);

      p.strokeWeight(10);
      p.stroke(100);

      p.textSize(20);
      p.text("how far through the loop are we?", 20, 60, 200);

      p.textSize(50);
      p.text(t.toFixed(2), 20, 160);
    },
  },

  {
    name: "Loop - graphs",
    show: true,
    description: "Rotate all the way around",
    setup(p) {},

    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      p.background(90);

      // Where are we in the loop?
      let t = (p.frameCount / this.loopLength) % 1;
      // Turn that into an angle in radians (2PI is a full rotation)
      let angle = t * Math.PI * 2;

      let count = 31;

      let fxns = [pingpong, pingpongEased];
      fxns.forEach((fxn) => {
        p.noFill();
        p.beginShape();
        for (var i = 0; i < count; i++) {
          let pct = i / (count - 1); // 0- 1
          let x = pct * p.width;
          let y = (1 - fxn(pct)) * p.height;
          p.vertex(x, y);
        }
        p.endShape();
      });

      fxns.forEach((fxn, index) => {
        let pct = (index * 0.5 + t) % 1;
        let x = pct * p.width;
        let y = (1 - fxn(pct)) * p.height;
        p.circle(x, y, 10);
      });

      p.fill(0);
      // Output information about where we are in the loop
      drawInformation(p, t, [
        "angle:    " + angle.toFixed(2),
        "angle(π): " + (angle / Math.PI).toFixed(2),
      ]);
    },
  },

  {
    name: "Loop - rotation",
    show: true,
    description: "Rotate all the way around",
    setup(p) {},

    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      p.background(90);

      // Where are we in the loop?
      let t = (p.frameCount / this.loopLength) % 1;
      // Turn that into an angle in radians (2PI is a full rotation)
      let angle = t * Math.PI * 2;

      // Move to the center of the sketch
      p.push();
      p.translate(p.width / 2, p.height / 2);

      let rotationRadius = 100;
      let circleRadius = 30;

      p.noStroke();

      // Rotate with P5 transformations
      p.push();
      p.rotate(angle);
      p.fill(60);
      p.rect(rotationRadius, 0, circleRadius * 2);
      p.circle(rotationRadius, 0, circleRadius * 2);

      p.stroke(60);
      p.line(0, 0, rotationRadius, 0);

      p.fill(0);
      p.textSize(16);
      p.text("this rotates the alignment", rotationRadius - 40, 0, 150);

      p.pop();

      // Rotate with polar coordinates
      let x = rotationRadius * Math.cos(angle + Math.PI / 2);
      let y = rotationRadius * Math.sin(angle + Math.PI / 2);
      p.fill(100);
      p.stroke(60);

      p.line(0, 0, x, y);
      p.rect(x, y, circleRadius);
      p.circle(x, y, circleRadius);

      p.fill(0);
      p.textSize(16);
      p.text("this rotates the position and not the alignment", x, y, 150);

      p.pop();

      // Output information about where we are in the loop
      drawInformation(p, t, [
        "angle:    " + angle.toFixed(2),
        "angle(π): " + (angle / Math.PI).toFixed(2),
      ]);
    },
  },

  {
    name: "Loop - color",
    show: true,
    description: "Rotate all the way around the color wheel",
    setup(p) {},

    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      p.background(90);

      // Where are we in the loop?
      let t = (p.frameCount / this.loopLength) % 1;
      // Turn that into an angle in radians (2PI is a full rotation)
      let angle = t * Math.PI * 2;
      let hue = t * 360;

      // Move to the center of the sketch
      p.push();
      p.translate(p.width / 2, p.height / 2);

      // Draw the color wheel
      let slices = 10;
      let arcSize = 200;
      p.noStroke();
      for (var i = 0; i < slices; i++) {
        let a0 = (Math.PI * 2 * i) / slices + Math.PI / 2;
        let a1 = (Math.PI * 2 * (i + 1)) / slices + Math.PI / 2;
        let hue = (360 * (i + 1)) / slices;
        p.fill(hue, 100, 50);
        p.arc(0, 0, arcSize, arcSize, a0, a1);
      }

      let rotationRadius = 100;
      let circleRadius = 30;

      // Rotate with polar coordinates
      let x = rotationRadius * Math.cos(angle + Math.PI / 2);
      let y = rotationRadius * Math.sin(angle + Math.PI / 2);
      p.fill(hue, 100, 50);
      p.stroke(hue, 100, 30);

      p.line(0, 0, x, y);
      p.circle(x, y, circleRadius);

      p.pop();

      // Output information about where we are in the loop
      drawInformation(p, t, ["hue:    " + hue.toFixed(0)]);
    },
  },

  {
    name: "Loop - going offscreen",
    show: true,
    description:
      "Move offscreen, then onscreen at a different location. Either go fully offscreen before changing position (think of a border around the screen) or have two copies a screen-width apart",
    setup(p) {},

    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      p.background(90);

      // Where are we in the loop?
      let t = (p.frameCount / this.loopLength) % 1;
      // Turn that into an angle in radians (2PI is a full rotation)
      let angle = t * Math.PI * 2;
      let hue = t * 360;

      let border = -20;

      p.strokeWeight(1);
      p.stroke(0);
      let count = 100;
      for (var i = 0; i < count; i++) {
        let xPct = (t + i * 0.12) % 1;
        let x = p.map(xPct, 0, 1, -border, p.width + border);
        // The y position, like the x, changes
        let yPct = (t + i * 0.39) % 1;
        let y = p.map(yPct, 0, 1, -border, p.height + border);
        // y += 20 * Math.sin(i * 2 + angle);
        // y = 100
        p.fill(50);
        if (i === 0) p.fill(0, 100, 50);
        p.circle(x, y, 10);
      }

      // Fade the frame in and out
      let opacity = 0.5 + 0.7 * Math.sin(angle);
      p.textSize(12);
      p.stroke(100, opacity);
      p.noFill();
      p.strokeWeight(50);
      p.rect(0, 0, p.width, p.height);
      p.noStroke();
      p.fill(0, opacity);
      p.text("Hide where geometry goes off screen", 10, 290);

      p.push();
      p.fill(0);
      p.textSize(20);

      let x = t * p.width;
      p.text("Go off one side and\nappear on the other", x - p.width, 100);
      // p.fill(100, 100, 50)
      p.text("Go off one side and\nappear on the other", x, 100);

      p.pop();

      // Output information about where we are in the loop
      p.fill(0);
      drawInformation(p, t, []);
    },
  },

  {
    name: "Loop - sinewave",
    show: true,
    description:
      "Use the sinewave to go back and forth. A sinewave will return to the same point in π radians, but only to the same velocity in 2*π. Use it to drive motion, size, rotation, color or any other value",
    setup(p) {},

    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      p.background(90);

      // Where are we in the loop?
      let t = (p.frameCount / this.loopLength) % 1;
      // Turn that into an angle in radians (2PI is a full rotation)
      let angle = t * Math.PI * 2;

      p.push();
      p.translate(p.width / 2, p.height / 2);

      p.textSize(12);
      // Formula for a circle
      let x0 = 40 * Math.cos(angle);
      let y0 = 04 * Math.sin(angle);

      p.fill(50 + 50 * Math.cos(angle));
      p.circle(x0, y0, 50);

      let x1 = 70 * Math.sin(angle);
      let y1 = 70 * Math.sin(angle * 3);
      p.circle(x1, y1, 20);

      let x2 = 50 * Math.sin(angle * 4);
      let y2 = 50 * Math.sin(angle * 2);
      p.circle(x2, y2, 20);

      let x3 = 120 * Math.sin(angle / 2);
      let y3 = 130;
      p.circle(x3, y3, 20);
      let x4 = 120 * Math.sin(angle);
      let y4 = 100;
      p.circle(x4, y4, 20);

      p.fill(0);
      p.text("Use sin and cos\nto make a circle", -140 + x0, y0);
      p.text("a half-cycle feels like a bounce", -110, 120);
      p.text("a whole cycle slows and stops", -130, 90);

      p.textAlign(p.RIGHT);
      p.text("Multiply the angle by a\nwhole number to go faster", 110, -80);

      p.pop();

      // Output information about where we are in the loop
      drawInformation(p, t, ["sin(angle): " + Math.sin(angle).toFixed(3)]);
    },
  },

  // One sketch
  {
    name: "Loop - Move to next",
    show: true,
    description: "an empty container for you to copy",
    setup(p) {},
    loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,

    draw(p) {
      p.background(80)
      // Where are we in the loop?
      let t = (p.frameCount / this.loopLength) % 1;
      // Turn that into an angle in radians (2PI is a full rotation)
      let angle = t * Math.PI * 2;
      
      p.push()
      // Move to the center
      p.translate(p.width/2, p.height/2)
      let count = 10
      
      let circleCount = 10
      for (var j = 0; j < circleCount; j++) {
        for (var i= 0; i< count; i++) {
          let pct = i/count
         
          let delta = j* t * Math.PI * 2 / count;
      

          let angle0 = pct*Math.PI*2 + j 
          angle0 += delta
          let radius = j*20 + 30

          p.push()
          // WE ARE IN RADIANS
          p.rotate(angle0)
          // p.line(0, 0, radius, 0)
          p.fill(100)
          // if (i == 0)
          //   p.fill(0, 100, 50)
          p.circle(radius, 0, 10)
          
          // Interesting shape
          
          p.fill(150, 100, 50, .3)
          p.beginShape()
          p.vertex(radius, 0)
          
          
          p.vertex(radius*1.2, radius*.3)
          p.curveVertex(radius*1.2, -radius*.3)
           p.curveVertex(radius*1.2 + j*10, -radius*.3 + j*10 + 120*Math.sin(j + 10*t))
            p.curveVertex(radius*5 + j*10, -radius*.3 + j*10 + 120*Math.sin(j + 10*t))
          p.vertex(radius*1.2, radius*.3)
          
          p.endShape()
          
          p.pop()

          

        }
      }
      
      p.pop()
      drawInformation(p, t, []);
   
    },
  },
];
