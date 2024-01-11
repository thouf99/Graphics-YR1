/**
 * Simple example to show how to load an image
 * and access the color channels through the pixels[] array.
 * Calls a function to remove the blue channel (set to 0).
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
  waveImage = loadImage("assets/wave.jpg");

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

  removeBlueChannel(waveImage);
}

/**
 * Remove the blue channel from an image.
 *
 * @param {p5.Image} img Image to remove blue from
 */
function removeBlueChannel(img) {
  const colorChannels = 4; // this it type 'const' because it doesn't change

  // copy pixels into memory so we can access them below
  img.loadPixels();

  ///
  /// Note: you can loop over columns or rows first in this
  /// example, it doesn't matter, but rows makes more
  /// sense to me because pixels start in the first row
  /// and go left to right across each column and then on to
  /// the next row.
  /// 
  for (let row = 0; row < img.height; row++) {
    for (let column = 0; column < img.width; column++) {
      // the formula: add the current column number to the number of pixels in
      // all the rows that came before (there are waveImage.width pixels in each row)
      // and multiply by color channels per pixel (R,G,B,A):
      let pixelStartIndex = (column + row * img.width) * colorChannels;

      let blueIndex = pixelStartIndex + 2; // R=0,G=1,B=2,A=3

      // no red! Or replace with something else
      img.pixels[blueIndex] = 0;

      // uncomment this for a fun gradient affect..
      //img.pixels[pixelStartIndex+1] = 255*sin(PI*row/img.height);
    }
  }
  img.updatePixels(); // save changes
}

function draw() {
  blendMode(REPLACE);

  // draw the image to fill the canvas exactly
  image(waveImage, 0, 0);
}
