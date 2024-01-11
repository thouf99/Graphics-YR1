/**
 * More advanced example showing how to downsample an image using
 * a "pixelate" filter.
 *
 * Downsamples an image (makes it smaller) by going through an image, dividing it
 * into small sections ("boxes") and finding the "average" colour in those boxes
 * by adding together all the pixel colour values and dividing by the total number
 * of pixels.
 *
 * Image credit: Under the Wave off Kanagawa by Katsushika Hokusai (1830–32)
 * From https://www.metmuseum.org/art/collection/search/45434
 *
 * by Evan Raskob 2021 <e.raskob@gold.ac.uk>
 */

let waveImage; // our wave image

let boxesPerRow = 20; // number of pixel 'boxes' or 'bins'
let boxColumns = 1; // calculated later:  number of columns of pixels in a box
let boxRows = 1; // calculated later:  number of rows of pixels in a box

let downsampledColors = []; // array of pixel colours after downsampling
let downsample = true; // lets us turn this on or off

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

/**
 * Function to do all the work of calculating image colours for each box of pixels
 *
 */
function calculateAverageColours() {
  boxColumns = floor(waveImage.width / boxesPerRow); // get number of columns of pixels in a box
  boxRows = floor(waveImage.height / boxesPerRow); // get number of rows of pixels in a box

  //console.log(boxColumns + ',' + boxRows);

  // Important! If we don't do this, we don't have access to the pixels array
  waveImage.loadPixels();

  // the process:
  // 1. Go through every pixel in the image, starting in the first
  //    row and moving across each column in order
  // 2. Go through all the pixels in a block (or "box") of dimensions boxColumns by boxRows
  // 3. Sum up the RGB values of all the pixels in a box (for each color channel)
  // 4. Average those values together (divide by total number of pixels) and store
  // 5. the results in the downsampled colors array
  // 5. Repeat for all boxes

  downsampledColors = []; // array of averaged pixel colours

  // start at first row (index 0)
  let boxRowIndex = 0;

  // from image top to bottom
  while (boxRowIndex < boxesPerRow) {

    // start in 1st column of boxes
    let boxColumnIndex = 0;

    // from left to right
    while (boxColumnIndex < boxesPerRow) {
      // for each box...

      // total pixel values for each channel, to be added to below
      let totalRed = 0,
        totalRedX = 0,
        totalRedY = 0,
        totalGreen = 0,
        totalBlue = 0,
        totalAlpha = 0;

      let colorChannels = 4; // number of color channels (R,G,B,A)

      angleMode(DEGREES); // for hue calculations

      for (let boxRow = 0; boxRow < boxRows; boxRow++) {
        for (let boxColumn = 0; boxColumn < boxColumns; boxColumn++) {
          // for this current box...

          // calculate pixel index for this location = current row + row in the box
          
          let row = boxRowIndex * boxRows + boxRow;
          let column = boxColumnIndex * boxColumns + boxColumn;

          // the formula: add the current column number to the number of pixels in
          // all the rows that came before (there are waveImage.width pixels in each row)
          // and multiply by color channels per pixel (R,G,B,A):
          let pixelStartIndex =
            (column + row * waveImage.width) * colorChannels;
            
            colorMode(RGB);
            let tmpColor = color(waveImage.pixels[pixelStartIndex], waveImage.pixels[pixelStartIndex + 1],
              waveImage.pixels[pixelStartIndex + 2]);
              
              let tmpHue = hue(tmpColor);
              totalRedX += cos(tmpHue);
              totalRedY += sin(tmpHue);

              totalGreen += saturation(tmpColor);
              totalBlue += lightness(tmpColor);
        }
      }

      // Calculate average values: average red per pixel, etc.
      let totalBoxPixels = boxColumns * boxRows;

      // can't just do a normal mean... need circular mean.
      // convert to points on the unit circle and do arithmetic mean

      //let averageRed = totalRed / totalBoxPixels;
      
      let averageRedX = totalRedX / totalBoxPixels;
      let averageRedY = totalRedY / totalBoxPixels;
      let averageRed = atan2(totalRedY,totalRedX);

      // account for negative angles from atan2 (range: -180 to 180 )
      if (averageRed < 0) averageRed += 360;

      // Note: this doesn't really work for saturation, it's more complicated than this...
      // but it does make a nice effect.
      let averageGreen = totalGreen / totalBoxPixels;
      let averageBlue = totalBlue / totalBoxPixels;
      let averageAlpha = totalAlpha / totalBoxPixels;

      colorMode(HSL);
      let averageColor = color(averageRed, averageGreen, averageBlue);

      // add to colour list:
      downsampledColors.push(averageColor);

      // on to next column!
      boxColumnIndex += 1;

    } // done with this row (finished all columns)
    
    boxRowIndex += 1;
  } // done with all rows
}

///
/// Setup -------------------------
///
function setup() {
  createCanvas(800, 538); // create a canvas EXACTLY the size of our image

  colorMode(RGB);

  // extract average colour information
  calculateAverageColours();
}

///
/// ---- DRAW -------------------------
///

function draw() {
  background(0);

  // draw the original image, or use downsampling
  if (!downsample) {
    // draw the image to fill the canvas exactly
    image(waveImage, 0, 0);
  } else {
    noStroke();
    colorMode(HSL);

    // go through downsampled colours and draw boxes with average colour

    let ind = 0;

    for (let r = 0; r < boxesPerRow; r++) {
      for (let c = 0; c < boxesPerRow; c++) {
        ind++;

        let index = c + r * boxesPerRow;
        let clr = downsampledColors[index];
        //console.log(ind + "::" + index + "/" + downsampledColors.length);
        try {
          fill(clr);
        } catch (err) {
          console.error("fill error " + err);
          console.log(index + "/" + downsampledColors.length);
          console.error(clr);
          throw err;
        }
        rect(c * boxColumns, r * boxRows, boxColumns, boxRows);
      }
    }

    //if (boxColumns > 1)
    //  noLoop();
  }
}

function mousePressed() {
  downsample = !downsample;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    boxesPerRow += 1;
  } else if (keyCode === DOWN_ARROW) {
    boxesPerRow -= 1;
  }

  // make sure it doesn't get TOO large -- don't want 1 box per pixel! How about 1 for every 2?
  boxesPerRow = min(
    max(waveImage.width / 2, waveImage.height / 2),
    boxesPerRow
  );

  // make sure it doesn't get TOO big -- 2x2 grid max:
  boxesPerRow = max(
    2,
    boxesPerRow
  );

  // fancy bit that displays the pixel boxes in the index.html page:
  document.querySelector('#boxes').value = boxesPerRow; 

  // recalculate pixel boxes
  calculateAverageColours();

  return false; // prevent default
}
