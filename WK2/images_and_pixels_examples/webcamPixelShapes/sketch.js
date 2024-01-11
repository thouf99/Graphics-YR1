/**  
 * Load a webcam image, convert some pixels to vector box shapes.
 * 
 * Why? Webcam images are large, how do we handle all those pixels?
 * 
 * Security note: A new browser security specification requires that
 * getUserMedia, which is behind createCapture(), only works when
 * you're running the code locally, or on HTTPS.
 * Source: https://p5js.org/reference/#/p5/createCapture
 *  
 * by Evan Raskob 2021 <e.raskob@gold.ac.uk>
 * /// This file is in the public domain.
*/

// the scale (percent of total width) of each box that 
// makes up the image: larger means less boxes 
// 0.05 = 5% of the total image width
let boxScale = 0.05; 

let webcamImage; // our webcam image

/// This is useful to load an image 
/// or do a task that is important to run
/// *before* the sketch is loaded. 
/// preload() runs once *before* setup

function preload() {  
  // we can load a webcam or other video source:
  webcamImage = createCapture(VIDEO);
  webcamImage.hide(); // hide, otherwise it shows automatically
}

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
}

///
/// --- DRAW -------------------------------------------
///
function draw() {
  background(55);


  // load pixels array, or we won't have any values!
  // This copies the pixels into memory so we can access them
  webcamImage.loadPixels();
  
  // convert percentages to boxes of pixels
  let xOffset = round(boxScale * webcamImage.width);
  let yOffset = round(boxScale * webcamImage.height);

  // loop through pixels in image, using only the first pixel
  // as the box colour and skipping the rest
  for (let x = 0; x < webcamImage.width; x += xOffset) {
    for (let y = 0; y < webcamImage.height; y += yOffset) {
      let index = (x + y * webcamImage.width) * 4;
      let redChannel = webcamImage.pixels[index + 0];
      let greenChannel = webcamImage.pixels[index + 1];
      let blueChannel = webcamImage.pixels[index + 2];

      // draw using the colour of the first pixel (top right)
      fill(color(redChannel, greenChannel, blueChannel, 255));
      rect(x, y, xOffset, yOffset);
    }
  }
}
