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
  createCanvas(500, 400);

  regularRandomDots(); // see below
}

function draw() {
  background(220);
  fill(20);

  colorMode(HSB);

  let saturation = 80; // how "colorful" or gray this color is, from 0-100
  let maxBrightness = 80; // maximum brightness value
  //to loop over the brightness and currentColor for each dot that is generated for dots
  for (let colorIndex=0; colorIndex < dots_x.length; colorIndex++)
  {
    let currentBrightness = maxBrightness * colorIndex/dots_x.length;
    let currentColor = color(20, saturation, currentBrightness);
    
    // draw pattern 
    fill(currentColor);
    ellipse(dots_x[colorIndex], dots_y[colorIndex], 50,60);
    ellipse(dots_x[colorIndex] + 40, dots_y[colorIndex], 50,60);
    ellipse(dots_x[colorIndex] + 80, dots_y[colorIndex], 50,60);
    ellipse(dots_x[colorIndex] - 40, dots_y[colorIndex], 50,60);
    ellipse(dots_x[colorIndex] - 80, dots_y[colorIndex], 50,60);
    ellipse(dots_x[colorIndex] - 120, dots_y[colorIndex], 50,60);
  }
}

//
// create regular random dots in a line
// 
function regularRandomDots()
{
  dots_x = []; // clear array
  dots_y = []; //clear array
  // Place dots 1/10 the width of the screen, starting 1/10 width of screen
  // That means we can only draw 9 dots!
  for (var i=0; i < 10; i++) {
     var spacing = width/10;
     var start_x = width/10;
    
     var x = i*spacing + start_x; // new x position
    
     // add some noise to the x position
     x = x + random( -spacing/2, spacing/10);
    
    // put x position into dots_x array
    dots_x.push(x);
  }
  // Place dots 1/10 the height of the screen, starting 1/10 height of screen
  // That means we can only draw 10 dots!
  for (var i=0; i < 10; i++) {
    var spacing = height/12;
    var start_y = height/12;
   
    var y = i*spacing + start_y; // new x position
   
    // add some noise to the x position
    y = y + random( -spacing/2, spacing/10);
   
   // put x position into dots_x array
   dots_y.push(y);
 }
}

//
// Create new positions when mouse is clicked
//
function mouseClicked() {
  regularRandomDots();
}
