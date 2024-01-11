/*
 * @name Load and "glitch" an image 
 * @description Load and draw multiple random copies of parts of an image.
 * <p><em><span class="small"> To run this example locally, you will need an 
 * image file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a>.</span></em></p>
 *
 * @author Evan Raskob <e.raskob@gold.ac.uk> 2021
 *
 */

///
/// Some inspiration from hellocatfood (Antonio Roberts)
/// https://www.hellocatfood.com/#basquiats-brain
///


let moonwalkImage; // Declare variable 'img'.


// Preload image first so we can draw in setup
//
function preload() {
  moonwalkImage = loadImage('assets/moonwalk.jpg'); // Load the image  
}


function setup() {
  createCanvas(720, 400);

  // Displays the original image at its actual size at point (0,0)
  image(moonwalkImage, 0, 0);

  // optional
  blendMode(SCREEN);
  
  for (let count = 0; count < 10; count++) {
    drawRandomImageSection(moonwalkImage);
  }

}

function draw() {
  noLoop(); // stop draw from running, all drawing happen in setup once
}

/**
 * draw a random part of an image at a random place on the screen
 * {p5.Image} img Image to draw
 */
function drawRandomImageSection(img) {
  
  // Make this work to draw smaller parts of this 
  // image using random numbers for location, width, height, then:

  //--------------------------------
  // More things to do:
  // 1. Keep aspect ratio (width/height)?
  // 2. Cycle through blend modes?
  // 3. Use slightly less random patterns?
  
  let sourceX = 0; //???
  let sourceY = 0; //???
  let sourceWidth = 0; //???
  let sourceHeight = 0; //???

  let destX = 0; //???
  let destY = 0; //???
  let destWidth = 0; //???
  let destHeight = 0; //???

  // Displays the image
  image(img,
    sourceX, sourceY,
    sourceWidth, sourceHeight,
    destX, destY,
    destWidth, destHeight);
}