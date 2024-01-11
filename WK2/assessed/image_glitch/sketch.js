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
let designYourselfImage;//Antonio Roberts image
let corruptImage;


// Preload image first so we can draw in setup
//
function preload() {
  moonwalkImage = loadImage('assets/moonwalk.jpg'); // Load the image
  //Reference: https://www.hellocatfood.com/
  //this image is called design yourself and this image represents, what it means to be human in a digital age
  //created by Antonio Roberts
  designYourselfImage = loadImage("assets/design_yourself.jpg");
  //reference: http://www.recyclism.com/corrupt.html
  //image of corrupt file when binary codes are changed
  corruptImage = loadImage('assets/corruptprocessing.jpg');
}


function setup() {
  createCanvas(1500, 900);

  // Displays the original image at its actual size at point (0,0)
  image(moonwalkImage, 0, 0);
  image(designYourselfImage, 0,410,500,400);
  image(corruptImage,720,0, 500,400);
  
  // optional
  //only the lightest color is taken
  blendMode(LIGHTEST);

  for (let count = 0; count < 10; count++) {
    drawRandomImageSection(moonwalkImage);
    drawRandomimageSection(designYourselfImage);
    drawRandomImagesection(corruptImage);
    //tint added to change at each iteration of the draw phase of the count and when called to changed the value
    //of the green color channel by each loop and decrease it by the number loops multiplied by 10
    tint(255, 153 - count *10, 175, 126);
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
  
  let sourceX = random(0, 150); //source image X
  let sourceY = random(0,5); //source image y
  let sourceWidth = random(img.width/1.5, img.width/1.9); //source image width
  let sourceHeight = img.height; //source image height

  let destX = 0; //glitch image x from the source
  let destY = 0; //glitch image y from the source
  let destWidth = 0; //glitch image width
  let destHeight = 0; //glitch image height

  // Displays the image
  image(img,
    sourceX, sourceY,
    sourceWidth, sourceHeight,
    destX, destY,
    destWidth, destHeight);
}
function drawRandomimageSection(img) {
  let sourceX = random(0, 120); //source image X
  let sourceY = random(410,450); //source image y
  let sourceWidth = random(img.width/2, img.width/1.9); //source image width
  let sourceHeight = img.height/3; //source image height

  let destX = random(0,50); //glitch image x from the source
  let destY = random(0,100); //glitch image y from the source
  let destWidth = random(img.width/2, img.width/1.9); //glitch image width
  let destHeight = 0; //glitch image height

  // Displays the image
  image(img,
    sourceX, sourceY,
    sourceWidth, sourceHeight,
    destX, destY,
    destWidth, destHeight);
}
function drawRandomImagesection(img) {
  let sourceX = random(720, 750); //source image X
  let sourceY = random(0,100); //source image y
  let sourceWidth = random(img.width/2, img.width/1.9); //source image width
  let sourceHeight = img.height/3; //source image height

  let destX = random(0,100); //glitch image x from the source
  let destY = random(0,100); //glitch image y from the source
  let destWidth = random(img.width/5, img.width/3); //glitch image width
  let destHeight = random(img.height* 1.5, img.height*2); //glitch image height

  // Displays the image
  image(img,
    sourceX, sourceY,
    sourceWidth, sourceHeight,
    destX, destY,
    destWidth, destHeight);
}
