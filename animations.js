// You can change this,
// but will need to change swatch-holder's tile settings in CSS
const SWATCH_SIZE = 300;

let animations = [
  //================================================
  // An example
  {
    title: "splatter",
    description:
      "Basic drawing and randomness. See how using the full spectrum, a partial spectrum, or two different spectrums, or driving it based on time, can affect how the art looks",
    isActive: false,

    /**
     * TODO: Read this!
     * Setup and draw both have a "p" parameter
     * This is the P5 object.
     *
     * All of the built-in drawing tools from P5
     *  are methods on this object
     *
     * If you use any P5 tutorials, usually you will have to
     *  add "p." in front of their commands
     * e.g.  "rect(0,0,100,300)" => "p.rect(0,0,100,300)"
     *
     * "t" is the seconds that this app has been open
     * You can use that do drive location color, etc
     */

    setup(p) {
      p.background(0, 0, 0);
    },

    draw(p, t) {
      // Fun trick: make a semi-transparent background (opacity .02)
      //  in order to have the older parts of the drawing "fade away"
      // p.background(0, 0, 0, .02)

      // Any color in the rainbow
      let hue = Math.random() * 360;

      // Use this line instead for just blue circles
      // let hue = Math.random()*100 + 150

      // Ternary operator: there's a 30% chance of orange, 70% chance of green
      // let hue = Math.random()*30 + (Math.random()<.3?20:170)

      // Use the time
      // let hue = t*100

      let sat = 100;
      let brightness = 50;
      let opacity = Math.random();

      p.noStroke();
      p.fill(hue % 360, sat, brightness, opacity);

      let r = Math.random() * 10 + 10;
      let x = Math.random() * p.width;
      let y = Math.random() * p.height;
      p.circle(x, y, r);
    },
  },

  //================================================
  // An example

  {
    title: "movement",
    description:
      "How can you control movement? We can time to drive the animation, using functions like the sine wave and perlin noise",
    isActive: false,

    setup(p) {
      // Draw this once at the beginning
      p.background(0, 0, 0);
    },

    draw(p, t) {
      // The center of the swatch is at (p.width/2, p.height/2)
      let x = p.width * (0.5 + 0.5 * Math.sin(t));
      let y = p.height * 0.5;
      // let y = p.height * (.5 + .5 * Math.sin(10*t))
      let r = 100;

      // Perlin noise
      // A way to get smooth motion, but not predictable
      // let x = p.width * p.noise(t)
      // let y = p.height * p.noise(t + 100)
      // let r = 100

      p.fill(100);
      p.circle(x, y, r);
    },
  },

  //================================================
  // An example

  {
    title: "polar coordinates",
    description:
      "By using polar coordinates, you can get interesting radial patterns. Look at the difference between sine, noise, and constant radiuses",
    isActive: false,

    setup(p) {
      p.background(0, 0, 0, 0);

      // You can also store information on the swatch
      this.theta = 0;
    },
    draw(p, t) {
      p.background(0, 0, 0, 0.02);
      this.theta += 0.04;

      let centerX = p.width / 2;
      let centerY = p.height / 2;

      // let radius = 100
      let radius = 100 * Math.sin(t);
      // let radius = 100*p.noise(t)
      // let radius = 100*p.noise(t*10)

      let x = radius * Math.cos(this.theta) + centerX;
      let y = radius * Math.sin(this.theta) + centerY;
      let r = 10;

      p.noStroke();
      p.fill(100);
      p.circle(x, y, r);
    },
  },

  //================================================
  // For-Loops example

  {
    title: "For-loops",
    description: "a red dot moving <p>another paragraph</p>",
    isActive: true,

    setup(p) {
      this.loopTime = 5;
    },
    draw(p, t) {
      p.background(70);
      p.fill(0);
      p.text(t.toFixed(2), 10, 40);
      //       How many tiles and how big are they?
      let count = 10;
      let tileSize = p.width / count;

      for (let i = 0; i < count; i++) {
        let x = tileSize * (i + .5);
        let y = p.height / 2;

        let hue = i * 20 + t * 100;
        
        p.fill(hue, 100, 20);
        p.noStroke();
        p.ellipse(x, y + tileSize/2, tileSize, tileSize*.5);

        hue %= 360; // Wrap the hue around 360 degrees, P5 can't handle >360 hues
        p.fill(hue, 100, 50);
        p.stroke(hue, 100, 90);
        p.circle(x, y, tileSize);
        
        
      }

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          let x = tileSize * i;
          let y = tileSize * j;

          let hue = i * 20 + t * 100;

          hue %= 360; // Wrap the hue around 306 degrees, P5 can't handle >360 hues
          p.fill(hue % 360, 100, 50, .3);
          p.noStroke()
          p.rect(x, y, tileSize);
        }
      }
    },
  },

  //================================================
  // Seamless Looping example

  {
    title: "Looping",
    description: "a red dot moving <p>another paragraph</p>",
    isActive: true,

    setup(p) {
      this.loopTime = 5;
    },
    draw(p, t) {
      // Remember how I said % (modulo) was good for looping?
      // This turns t, a value that goes up indefinitely
      // into pct, a value that loops from 0 to 1
      let pct = (t % this.loopTime) / this.loopTime;

      p.background(180, 50, 90);

      // Printing text is a great way to debug
      p.text("Time: " + t.toFixed(2), 10, 20);
      p.text("Loop: " + pct.toFixed(2), 10, 40);

      let x = pct * p.width;
      let y = pct * p.height;
      let r = 10;
      p.fill(0);
      p.circle(x, y, r);
    },
  },

  //================================================
  // An example

  {
    title: "Looping",
    description: "a red dot moving <p>another paragraph</p>",
    isActive: true,

    setup(p) {},
    draw(p, t) {},
  },
];
