/// Graphics: Noisy Pattern
/// by Thouficul Chowdhury <tchow004@gold.ac.uk>
//
/// Draw a pattern of slightly noise dots in a line
///
/**
 * @param {Number} hue Hue angle for this color range, from 0-359
 * @param {Number} startX Start x coordinate for pallette
 * @param {Number} startY Start y coordinate for pallette
 * @param {Number} size Size of pallette in pixels
 */
//pallette that is changed by changing the brightness

// array of dots' x positions
var dots_x;

function setup() {
  createCanvas(400, 200);

  regularRandomDots(); // see below
}

function draw() {
  background(0);
  fill(20);

  //colorMode in HSB
  colorMode(HSB);
  let hue =30;//hue is set to 30
  let saturation = 80; // how "colorful" or gray this color is, from 0-100
  let brightness = 80; // brightness value, form 0-100 (black to white)
  let hueInterval = 120; //??? Experiment with this!
    // size of each of the pallette's color swatches in pixels

  for (let colorIndex=0; colorIndex < dots_x.length; colorIndex++)
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
    
    // draw triadic pattern here
    noStroke();
    fill(currentColor);
    //character pattern
    //body of pattern
    ellipse(dots_x[colorIndex], dots_y[colorIndex]-27,30,35);
    //left leg of body
    rect(dots_x[colorIndex]-10,dots_y[colorIndex]-17,5,20);
    //right leg of body
    rect(dots_x[colorIndex]+5,dots_y[colorIndex]-17,5,20);
    //head of body
    triangle(dots_x[colorIndex]-25,dots_y[colorIndex]-47,dots_x[colorIndex]+25,dots_y[colorIndex]-47, 
       dots_x[colorIndex]-3,dots_y[colorIndex]-17);
  }
}

//
// create regular random dots in a line
// 
function regularRandomDots()
{
  dots_x = []; // clear array
  //changes the dots on the y-axis and makes noise as well
  dots_y = [];// clear array 

  
  // Place dots 1/10 the width of the screen, starting 1/10 width of screen
  // That means we can only draw 3 dots!
  for (var i=0; i < 3; i++) {
     var spacing = width/3;
     var start_x = width/10;
    
     var x = i*spacing + start_x; // new x position
    
     // add some noise to the x position
     x = x + random( -spacing/5, spacing/10);

    
    // put x position into dots_x array
    dots_x.push(x);
  }
  // Place dots 1/10 the height of the screen, starting 1/10 height of screen
  // That means we can only draw 3 dots!
  for (var i=0; i < 3; i++) {
    var spacing = height/6;
    var start_y = height/3;
   
    var y = i*spacing + start_y; // new x position
   
    // add some noise to the y position
    y = y + random( -spacing/5, spacing/10);

   
   // put x position into dots_y array
   dots_y.push(y);
 }
}

//
// Create new positions when mouse is clicked
//
function mouseClicked() {
  regularRandomDots();
}
