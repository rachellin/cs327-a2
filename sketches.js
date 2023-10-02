const WIDTH = 300;
const HEIGHT = 300;
const DEFAULT_FRAME_RATE = 30;
const DEFAULT_LOOP_LENGTH_IN_FRAMES = 100;

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
    name: "my first sketch",
    show: false,

    draw(p) {
      // Get time in SECONDS
      let t = p.millis() * 0.001;

      // "draw" in p5 draws *each frame*
      // So each frame, we draw a new circle
      // in a random place, in a random color

      // If we save a color for the hue,
      // we can use it for both the fill and the stroke
      // so we can have a circle with an outline of a darker color
      // which looks nice
      // p.background(330, 100, 50);
      // Set the colors
      // The parameters are hue, saturation, and lightness, from 0-100
      // 50% lightness is medium,
      // if you go to 100 it becomes white
      // if you go to 0, it becomes black
      // Here we set a maximum-saturated fill, with a darker stroke
      // let hue = Math.random() * 360;
      // Set hue to some function of the current time
      let hue = (t * 100) % 360;
      p.strokeWeight(5);
      p.stroke(hue, 100, 20);
      p.fill(hue, 100, 50);
      // p.circle(100, 100, 50);

      // Want more about color spaces?
      // "Your Colors Suck (it's not your fault)" (37 min)
      // https://www.youtube.com/watch?v=fv-wlo8yVhk&t=1793s

      // 		// What if we set a less-saturated fill?
      // 		// p.fill(hue, 10, 50)

      // 		// Or a lighter fill?
      // 		// p.fill(hue, 100, 90)

      // Give me a radius between 20 and 60
      let circleRadius = Math.random() * 40 + 20;
      let x = Math.random() * p.width;
      let y = Math.random() * p.height;

      p.circle(x, y, circleRadius);
      p.rect(x, y, circleRadius, circleRadius);
    },
  },
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
    show: false,
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
  // One sketch
  {
    name: "my test sketch",
    show: false,
    description: "an empty container for you to copy",
    setup(p) {
      p.background(50);
    },

    draw(p) {
      p.background(0, 0, 50, .01);

      // let t = p.millis()*.001
      let t = p.frameCount;

      for (var i = 0; i < 10; i++) {
        let hue = 320
        
        let x = t * 10 + i*10;
        let y = 10 + 30 * i;
        
        // Add interesting motion
        y += 40*Math.sin(x*.03)
        
        let rad = 30;
        x = (x - 100) % (p.width + 200);
    
        
        // Draw shadow circle
        p.noStroke();
        p.fill(0, 0, 0, .2)
        p.circle(x, y + 10, rad*1.1);
        
        // Draw main circle
        p.noStroke();
        p.fill(hue, 100, 100 - 10*i)
        p.circle(x, y, rad);
        
        // Text!
        p.text("💖", x, y)
      
      }
      
      // Draw last, be on top
      
      p.fill(0, 0, 0, .4)
      p.text("Dr Kate", 10, 105)
      
      p.fill(0)
      p.textSize(40)
      p.stroke(100)
      p.strokeWeight(5)
      p.text("Dr Kate", 10, 100)
      
      
    },
  },

  
  // One sketch
  {
    name: "empty sketch",
    show: true,
    description: "an empty container for you to copy",
    setup(p) {},

    draw(p) {
      
      p.circle(0, 0, 10)
      
    },
  },
  
  // One sketch
  {
    name: "empty sketch",
    show: false,
    description: "an empty container for you to copy",
    setup(p) {},

    draw(p) {},
  },
];
