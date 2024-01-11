///
/// Generating computational pallettes.
/// by Thouficul Chowdhury <tchow004@gold.ac.uk>
//
/// - Demonstrating how to use HSB to create pallettes.
/// - Use this as a template for your assignment.


/// Different pallettes are implemented in separate functions
/// so you can choose which to run in your main draw() loop.
/// Each one takes in a start x and y coordinate and the size
/// of the pallette to draw on the screen, so you can draw 
/// multiple pallettes at the same time in different areas.

///---------------------------------------------------------
///---------------YOUR TASK-----------------------------------
///---------------------------------------------------------

/// 1. Experiment with drawMonochromaticPallette() to see what it does
/// 2. Make a modified version of drawMonochromaticPallette() to use
///    that uses brightness AND saturation
/// 3. Experiment with drawAnalogousPallette()
/// 4. Make another version of drawAnalogousPallette() using different
///    colour intervals.
/// 5. Create another pallette function using another system. See
///    class readings and 
///    http://printingcode.runemadsen.com/lecture-color/



///---------------------------------------------------------

// A monochromatic color scheme using fixed intervals
// of brightness for a specific hue and saturation.
// For a more advanced version, try changing *both* brightness
// and saturation.

/**
 * @param {Number} hue Hue angle for this color range, from 0-359
 * @param {Number} startX Start x coordinate for pallette
 * @param {Number} startY Start y coordinate for pallette
 * @param {Number} size Size of pallette in pixels
 */
//pallette that is changed by changing the brightness
function drawMonochromaticPallette(hue, startX, startY, size)
{
  let numberOfColors = 6; // number of colors in this pallette
  let saturation = 80; // how "colorful" or gray this color is, from 0-100
  let maxBrightness = 80; // maximum brightness value

  // size of each of the pallette's color swatches in pixels
  let swatchSize = size/numberOfColors; 

  noStroke();
  rectMode(CORNER);

  push(); // save drawing state
  translate(startX,startY); // move to start x,y position

  for (let colorIndex=0; colorIndex < numberOfColors; colorIndex++)
  {
    let currentBrightness = maxBrightness * colorIndex/numberOfColors;
    let currentColor = color(hue, saturation, currentBrightness);
    
    // draw color square
    fill(currentColor);
    rect(0,0, swatchSize, swatchSize);
    
    // move drawing cursor to next position for next loop
    translate(swatchSize,0);
  }

  pop(); // return to original drawing state
}

//pallette that is changed by changing the brightness
function drawMonochromaticpallette(hue, startX, startY, size)
{
  let numberOfColors = 6; // number of colors in this pallette
  let saturation = 80; // how "colorful" or gray this color is, from 0-100
  let maxBrightness = 80; // maximum brightness value

  // size of each of the pallette's color swatches in pixels
  let swatchSize = size/numberOfColors; 

  noStroke();
  rectMode(CORNER);

  push(); // save drawing state
  translate(startX,startY); // move to start x,y position

  for (let colorIndex=0; colorIndex < numberOfColors; colorIndex++)
  {
    let currentBrightness = (maxBrightness) * (colorIndex/numberOfColors);
    let currentSaturation = (saturation*2) * (colorIndex/numberOfColors);
    let currentColor = color(hue, currentSaturation, currentBrightness);
    
    // draw color square
    fill(currentColor);
    rect(0,0, swatchSize, swatchSize);
    
    // move drawing cursor to next position for next loop
    translate(swatchSize,0);
  }
  

  pop(); // return to original drawing state
}


///---------------------------------------------------------
/// Fix this function!
///---------------------------------------------------------

// Analogous colors. This is a polychromatic color scheme using
// fixed intervals of changing hue angles to generate a pallette
// of multiple hues (colors) that are close to one another.
//
// In other words, to create a pallette of 6 colours, start with
// a hue angle (say 0) and increase it by a fixed amount (say
// 30 degrees) 6 times to create 6 different color swatches.    

/**
 * @param {Number} hue starting hue angle for this color range, from 0-359
 * @param {Number} startX Start x coordinate for pallette
 * @param {Number} startY Start y coordinate for pallette
 * @param {Number} size Size of pallette in pixels
 */
//first analogous pallette
function drawAnalogousPallette(hue, startX, startY, size)
{
  let numberOfColors = 6; // number of colors in this pallette
  let saturation = 80; // how "colorful" or gray this color is, from 0-100
  let brightness = 80; // brightness value, form 0-100 (black to white)
  let hueInterval = 30; //??? Experiment with this!

  // size of each of the pallette's color swatches in pixels
  let swatchSize = size/numberOfColors; 

  noStroke();
  rectMode(CORNER);

  push(); // save drawing state
  translate(startX,startY); // move to start x,y position

  for (let colorIndex=0; colorIndex < numberOfColors; colorIndex++)
  {
    ///-------------------------------------------
    ///----------FIXME----------------------------
    ///-------------------------------------------
    ///
    /// Make this line of code work properly
    //current hue is affect by multiplying the hue interval by the colour
    //index by the number of colours that have been assigned.
    //So at each iteration of number of colors the hueInterval gets called
    //and pulls the color index and gives the output of a color set.
    let currentHue = hueInterval * colorIndex/numberOfColors;
    ///-------------------------------------------

    let currentSaturation = saturation/colorIndex * numberOfColors;

    let currentColor = color(currentHue, currentSaturation, brightness);
    
    // draw color square
    fill(currentColor);
    rect(0,0, swatchSize, swatchSize);
    
    // move drawing cursor to next position for next loop
    translate(swatchSize,0);
  }
  pop(); // return to original drawing state
}

//second analogous patter with different intervals
function drawAnalogouspallette(hue, startX, startY, size)
{
  let numberOfColors = 6; // number of colors in this pallette
  let saturation = 80; // how "colorful" or gray this color is, from 0-100
  let brightness = 80; // brightness value, form 0-100 (black to white)
  let hueInterval = 90; //??? Experiment with this!

  // size of each of the pallette's color swatches in pixels
  let swatchSize = size/numberOfColors; 

  noStroke();
  rectMode(CORNER);

  push(); // save drawing state
  translate(startX,startY); // move to start x,y position

  for (let colorIndex=0; colorIndex < numberOfColors; colorIndex++)
  {
    ///-------------------------------------------
    ///----------FIXME----------------------------
    ///-------------------------------------------
    ///
    /// Make this line of code work properly
    //current hueInterval changes a lot to create the affect of a rainbow and multiplying it by 2 allow it go through the hue cycle a lot quicker
    let currentHue = (hueInterval*1.25) *colorIndex/numberOfColors;
    ///-------------------------------------------

    let currentColor = color(currentHue, saturation, brightness);
    
    // draw color square
    fill(currentColor);
    rect(0,0, swatchSize, swatchSize);
    
    // move drawing cursor to next position for next loop
    translate(swatchSize,0);
  }
  pop(); // return to original drawing state
}

//triadic color pattern
//triadic pattern occurs when there is angle difference of 120 degrees from each hue angle
function drawTriadicPallete(hue, startX, startY, size)
{
  let numberOfColors = 3; // number of colors in this pallette
  let saturation = 80; // how "colorful" or gray this color is, from 0-100
  let brightness = 80; // brightness value, form 0-100 (black to white)
  let hueInterval = 120; //??? Experiment with this!
    // size of each of the pallette's color swatches in pixels
  let swatchSize = size/numberOfColors; 

  noStroke();
  rectMode(CORNER);

  push(); // save drawing state
  translate(startX,startY); // move to start x,y position

  for (let colorIndex=0; colorIndex < numberOfColors; colorIndex++)
  {
    /// Make this line of code work properly
    //hue changes in rotation of 120 degrees, the hue is affected by
    //the hue set in at the bottom to indicate where it starts from and the interval
    //is added to that specific hue, which is dedicated.
    //modulo to make sure it doesn't exceed 360degree 
    let currentHue = (hueInterval)*colorIndex %360;
    ///-------------------------------------------
    // controlling the hue by adding to it allows the current hue to be at a specific to change to the next hue
    let currentColor = color(currentHue + hue, saturation, brightness);
    
    // draw color square
    fill(currentColor);
    rect(0,0, swatchSize, swatchSize);
    
    // move drawing cursor to next position for next loop
    translate(swatchSize,0);
  }
  pop(); // return to original drawing state
  
}

///-------------------------------------------
///----------SETUP----------------------------
///-------------------------------------------

function setup() {

  /// You can change the size of your drawing canvas if needed!
  createCanvas(400, 500);
  
  // We can use HSB mode as follows 
  // from (https://p5js.org/reference/#/p5/colorMode):
  // Setting colorMode(HSB) lets you use the HSB system instead.
  // By default, this is colorMode(HSB, 360, 100, 100, 1). 
  // You can also use HSL instead of HSB.

  colorMode(HSB); 
}

///-------------------------------------------
///----------DRAW----------------------------
///-------------------------------------------

/// draw the pallettes.

function draw() {

  background(0);

  let hue = 160;


  // Label the pallette. See https://p5js.org/reference/#/p5/text
  fill(180); // gray
  textSize(24);
  text("Monochromatic with hue = " + hue, 10, 48-12);

  // draw with hue = 160
  drawMonochromaticPallette(hue, 10, 48, 200);

  hue = 220; // update hue for next pallette

  fill(180); // gray
  textSize(24);
  text("Monochromatic with hue = " + hue, 10, 128-12);
  // draw with hue = 220
  drawMonochromaticPallette(hue, 10, 128, 200);


  /// draw other pallettes below -- possibly resize your canvas.

  hue = 280; // update hue for next pallette

  fill(180); // gray
  textSize(24);
  text("Monochromatic with hue = " + hue, 10, 208-12);
  // draw with hue = 280
  drawMonochromaticpallette(hue, 10, 208, 200);


  hue = 0; // update hue for next pallette

  fill(180); // gray
  textSize(24);
  text("Analogous with hue = " + hue, 10, 288-12);
  // draw with hue = 0
  drawAnalogousPallette(hue, 10, 288,200);

  hue = 0 //hue
  fill(180); // gray
  textSize(24);
  text("Analogous with hue = " + hue, 10, 368-12);
  // draw with hue = 0

  drawAnalogouspallette(hue,10, 368,200);

  hue = 18; //hue
  fill(180); // gray
  textSize(24);
  text("Triadic with hue = " + hue, 10, 448-12);
  // draw with hue = 18

  drawTriadicPallete(hue,10, 448,150);
}
