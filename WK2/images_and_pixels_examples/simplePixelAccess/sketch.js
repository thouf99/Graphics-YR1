/**
 * Simple example to show how to load an image
 * and get the colours of that image.
 * 
 * Image function reference: https://p5js.org/reference/#group-Image
 * 
 * Image credit: Under the Wave off Kanagawa by Katsushika Hokusai (1830–32) 
 * From https://www.metmuseum.org/art/collection/search/45434 
 * 
 * by Evan Raskob 2021 <e.raskob@gold.ac.uk>
 */


let waveImage; // our wave image

/// This is useful to load an image 
/// or do a task that is important to run
/// *before* the sketch is loaded. 
/// preload() runs once *before* setup

function preload() {  
  // we can load an image locally:
  waveImage = loadImage('assets/wave.jpg');

  // You can try to load from another server, but it
  // might now work because of the server settings like here.
  // This example will give you a Cross Origin error:
  // waveImage = loadImage('https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg');

  pixelDensity(1); // if you are on a very large screen, this can
  // help your images scale to the proper size when drawn
}

///
/// Setup -------------------------
///
function setup() {  
  createCanvas(800, 538); // create a canvas EXACTLY the size of our image
}

function draw() {

  blendMode(REPLACE);

  // draw the image to fill the canvas exactly
  image(waveImage, 0, 0);

  // Reference: https://p5js.org/reference/#/p5/get

  // get a single pixel's colour:
  let imgColour = waveImage.get(mouseX, mouseY);
  
  // some variables to help size the pop-up info for this pixel
  let boxHeight = 20;
  let boxWidth = 172;

  blendMode(BLEND);
  fill(imgColour);
  noStroke();
  textSize(12);

  rect(mouseX+4,mouseY-boxHeight/2, boxWidth,boxHeight);
  fill(0);
  // round the mouse values, otherwise we get too many decimals
  text('('+ round(mouseX) +',' + round(mouseY)+ '): ' + imgColour, mouseX+4,mouseY+4);
}