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
  createCanvas(waveImage.width, waveImage.height); // create a canvas EXACTLY the size of our image
}

function draw() {

  background(0);

  // draw the image to fill the canvas exactly
  image(waveImage, 0, 0);

  noStroke();
  textSize(12);

  fill(0);
  // round the mouse values, otherwise we get too many decimals
  text('('+ round(mouseX) +',' + round(mouseY)+ ')', mouseX,mouseY+4);

  waveImage.loadPixels();
  /// This is such a pain: mouseX and mouseY are FRACTIONS
  /// and if you don't round them, you won't get an error
  /// but also this won't work and you'll never see why!
  /// The pixels[] array needs INTEGERS (whole numbers)!
  let bValue = (round(mouseX) + round(mouseY)*waveImage.width)*4 + 0;
  waveImage.pixels[bValue] = 0;
  waveImage.pixels[bValue+1] = 0;
  waveImage.pixels[bValue+2] = 0;
   
  waveImage.updatePixels();
}