/**
 * Image Mash-up activity: load two images and mix up their 
 * colour channels so one has the red channel of the other
 * 
 * Image function reference: https://p5js.org/reference/#group-Image
 *
 * Image credit: Under the Wave off Kanagawa by Katsushika Hokusai (1830–32)
 * From https://www.metmuseum.org/art/collection/search/45434
 *
 * by Evan Raskob 2021 <e.raskob@gold.ac.uk>
 */

let waveImage; // our wave image
let sunflowerImage; // sunflower

/// This is useful to load an image
/// or do a task that is important to run
/// *before* the sketch is loaded.
/// preload() runs once *before* setup

function preload() {
  // we can load an image locally:
  waveImage = loadImage("assets/wave.jpg");
  sunflowerImage = loadImage("assets/sunflower.jpg");

  pixelDensity(1); // if you are on a very large screen, this can
  // help your images scale to the proper size when drawn
}

///
/// Setup -------------------------
///
function setup() {
  createCanvas(800, 538); // create a canvas EXACTLY the size of our image

  sunflowerImage.filter(GRAY); // make it gray (all colours same)
  replaceChannel(waveImage, sunflowerImage, 0);
}

/**
 * Replace the red channel in one image with one from 
 * a different image.
 *
 * @param {p5.Image} imgToReplace Image to replace red channel
 * @param {p5.Image} channelImage Source of new red channel
 * @param {Number} channelNumber Channel number (0-3 for R,G,B,A)
 */
function replaceChannel(imgToReplace, channelImage, channelNumber=0) {
  const colorChannels = 4; // this it type 'const' because it doesn't change

  // copy pixels into memory so we can access them below
  imgToReplace.loadPixels();
  channelImage.loadPixels();

  ///
  /// Note: you can loop over columns or rows first in this
  /// example, it doesn't matter, but rows makes more
  /// sense to me because pixels start in the first row
  /// and go left to right across each column and then on to
  /// the next row.
  /// 

  // loop through all original image pixels

  for (let row = 0; row < imgToReplace.height; row++) {
    for (let column = 0; column < imgToReplace.width; column++) {
      // the formula: add the current column number to the number of pixels in
      // all the rows that came before (there are waveImage.width pixels in each row)
      // and multiply by color channels per pixel (R,G,B,A):
      let pixelStartIndex = (column + row * imgToReplace.width) * colorChannels + 2;

      // the tricky bit is we need to scale (or map) the
      // image size of the new channel image to the original image:

      let channelImgColumn = round(map(column, 
        0, imgToReplace.width,
        0, channelImage.width
        ));
      let channelImgRow = round(map(row,
        0, imgToReplace.height,
        0, channelImage.height));

      // pixel color channel index in channel image
      let channelImgStartIndex = (channelImgColumn + channelImgRow * channelImage.width) * colorChannels;
      
      // replace with other image channel's pixel colour value
      imgToReplace.pixels[pixelStartIndex + channelNumber] = channelImage.pixels[channelImgStartIndex + channelNumber];
    }
  }
  imgToReplace.updatePixels(); // save changes
}

function draw() {
  blendMode(REPLACE);

  // draw the image to fill the canvas exactly
  image(waveImage, 0, 0);
}
