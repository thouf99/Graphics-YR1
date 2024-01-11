/**
 * Edge detection using convolution example.
 * 
 * By Evan Raskob 2021 <e.raskob@gold.ac.uk>
 * 
 * This example is in the public domain.
 */


let jellyFish; // original image
let edgyJellyFish; // edge detected image

///
/// -- PRELOAD ------------------------------------------
///
function preload() {
  jellyFish = loadImage("assets/medusae.png");
}

///
/// -- SETUP ------------------------------------------
///
function setup() {
  createCanvas(jellyFish.width * 2 + 20, jellyFish.height);

  // this can help with large displays:
  pixelDensity(1);

  // works best with gray images
  jellyFish.filter(GRAY);

  edgyJellyFish = edgeDetection(jellyFish);
}

///
/// -- DRAW ------------------------------------------
///
function draw() {
  background(255);

  image(jellyFish, 0, 0);
  image(edgyJellyFish, jellyFish.width + 20, 0);
  noLoop();
}



///----------------------------------------------------------
/// Further work -- make your own blur function!
/// There is only a single matrix for blur, across all pixels.
/// No need to calculate them separately. Try using the blur matrix
/// instead of the edge detection matrix below.
///
/// The matrix for a blur function is:

const blurMatrix = [
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9]
  ];
///----------------------

// also: gaussian blur
const gaussBlurMatrix = [
    [1/16, 2/16, 1/16],
    [2/16, 4/16, 2/16],
    [1/16, 2/16, 1/16]
];

// also: sharpen
const sharpMatrix = [[ -1, -1, -1 ],
              [ -1,  9, -1 ],
              [-1, -1, -1 ]];
///--------------------------------------------


/**
 * Run the edge detection algorithm on this image, return result as a
 * new image of same dimensions.
 *
 * @param {p5.Image} img Image to edge detect
 * @returns {p5.Image} new image
 */

function edgeDetection(img) {
  const matrixSize = 3; // using 3x3 matrices, below

  // pixel weights for horizontal (x) pixels
  const matrixX = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ];

  //pixel weights for vertical (y) pixels
  const matrixY = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ];

  const colorChannels = 4;

  // create a new image to return
  let resultImage = createImage(img.width, img.height);

  // load pixels into memory so we have access to them
  img.loadPixels();
  resultImage.loadPixels();

  // run over all pixels in the image:

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let pixelsIndex = (x + y * img.width) * colorChannels;

      let vX = convolution(img, x, y, matrixX, matrixSize);
      let vY = convolution(img, x, y, matrixY, matrixSize);
      let result = constrain(vX + vY, 0, 255); // clip to 255 == max color value

      // black and white image is output so all channels are the same:
      resultImage.pixels[pixelsIndex + 0] = result;
      resultImage.pixels[pixelsIndex + 1] = result;
      resultImage.pixels[pixelsIndex + 2] = result;
      resultImage.pixels[pixelsIndex + 3] = 255;
    }
  }
  resultImage.updatePixels();

  return resultImage;
}

/**
 * Perform a convolution on the pixel color value in an image, given a matrix, 
 * image, and location in the image, and return a single composite color value.
 *
 * @param {p5.Image} img
 * @param {Number} x
 * @param {Number} y
 * @param {Number} matrix
 * @param {Number} matrixSize
 *
 * @returns {Number} Pixel color channel value after convolution
 */

function convolution(img, x, y, matrix, matrixSize) {
  let total = 0.0;
  let offset = floor(matrixSize / 2);

  //Loop through convolution matrix
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      // What pixel are we testing
      let xloc = x + i - offset;
      let yloc = y + j - offset;
      let index = (xloc + img.width * yloc) * 4;
      // Make sure we have not walked off the edge of the pixel array
      index = constrain(index, 0, img.pixels.length - 1);
      // Calculate the convolution
      // We sum all the neighboring pixels multiplied by the values in the convolution matrix.
      total += img.pixels[index + 0] * matrix[i][j];
    }
  }
  // Make sure RGB is within range
  total = constrain(total, 0, 255);

  // Return the resulting color
  return total;
}
