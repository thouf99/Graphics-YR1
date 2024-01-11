/**
 * Template for making an image collage. Demonstrates compositing, 
 * cropping, filtering, and image blending:
 * 
 * 1. Compositing using blendMode() and tint()
 * 2. Masking using filter() to create a masks,
 *    blend modes to apply them
 * 3. Cropping and scaling using the image() function
 * 4. Cropping and scaling using shapes and texture()
 * 
 * This example uses a few images:
 * 
 * 1. An illustrated wave background image
 * 2. A portrait of Angela Merkel, from which we
 *    copy her eye
 * 3. A PNG image of Mrs. Merkel's nose, with transparency
 * 
 * Image function reference: https://p5js.org/reference/#group-Image
 *  
 * by Evan Raskob 2021 <e.raskob@gold.ac.uk>
 */


///--- THE ASSIGNMENT ---------------------------
///
/// You will use the collage or photomontage art technique
/// to gain experience using different imaging techniques,
/// so you can understand what they do and how to apply them 
/// in practice.
/// 
/// 0. Have a conversation with a group member about their hobbies,
///  dreams, etc. and write down some keywords (cats, football, activism, etc.). 
/// 1. Find some images to use from public domain or Creative Commons 
///    sources (see below) 
/// 2. Using this sketch for inspiration (good or bad), using those images
///    to make a cut-and-paste collage or 'photomontage'
/// 3. Make sure to use one or more:
///   - filters
///   - blend modes   
///   - copying parts of images (see function drawAngelaEye() below)
///   - for much more advanced copying, trying coping from the image pixels[]
///     array directly onto the canvas, or into a new image.
/// 4. For a more advanced task, try tinting the images according to a colour scheme,
///   and drawing more complex patterns using translate and rotate.
/// 5. Another advanced task is to use shape and texture coordinates
///   to crop and scale your composite images.
/// 
/// NOTES: This is fun if you use images with transparent backgrounds, 
///   like nose.png. You can use GIMP or PhotoShop or other means to edit the 
///   images, although this isn't a requirement.


/// ----- 1. Put some images here! -------------
/// You need to download them from somewhere, try and find
/// a source that has proper usage rights (Creative Commons 
/// non-commercial, or public domain)

/// ---- MAKE SURE TO PUT THE URL YOU FOUND THEM AT HERE, 
/// ---- OR LET US KNOW THE SOURCE ------------------------

// Under the Wave off Kanagawa by Katsushika Hokusai 
// source: https://www.metmuseum.org/art/collection/search/45434 
let waveImage; 

// Angela Merkel, from https://en.wikipedia.org/wiki/Angela_Merkel#/media/File:Angela_Merkel_2019_cropped.jpg
let angela;

let angelaNose; // her nose, partially transparent


// Metal Inrō with Flower Medallions
// https://www.metmuseum.org/art/collection/search/58506?searchField=All&amp;sortBy=Relevance&amp;deptids=6&amp;ft=*&amp;offset=0&amp;rpp=20&amp;pos=18
let inro;


///-------------------------------------------------------
/// --- MASKING-------------------------------------------
///
/**
 * Turn an image into a black and white mask using a threshold
 * filter to make all lighter pixels white and all darker ones black.
 * This permanently modifies the image, in memory!
 * 
 * @param {p5.Image} srcImage Source image to turn into a black/white mask image 
 */
function createMask(srcImage) {
  //-------------------------------------------------------
  // --- FILTERING ----------------------------------------
  // filter images -- must be done AFTER create canvas
  // https://p5js.org/reference/#/p5/filter
  //
  srcImage.filter(BLUR,2); // make this image slightly blurry
  srcImage.filter(THRESHOLD); // turn white/black only
  srcImage.filter(ERODE); // reduce light areas
}


/// --- PRELOAD ------------------------
/// This is useful to load an image  or do a task that is important to run
/// *before* the sketch is loaded. preload() runs once *before* setup

function preload() {  
  // load images from the assets folder
  waveImage = loadImage('assets/wave.jpg');

  angela = loadImage('assets/angela.jpg');

  inro = loadImage('assets/inro.jpg');

  angelaNose = loadImage('assets/nose.png'); // PNG files have transparency, JPGs don't

  pixelDensity(1); // if you are on a very large screen, this can
  // help your images scale to the proper size when drawn
}


///
/// Setup -------------------------
///
function setup() {  

  // tell us something out out images
  console.info('Image dimensions');
  console.info('----------------');
  
  console.info('waveImage:' + waveImage.width + '/' + waveImage.height);

  console.info('angela:' + angela.width + '/' + angela.height);

  console.info('inro:' + inro.width + '/' + inro.height);

  createCanvas(waveImage.width, waveImage.height); // create a canvas EXACTLY the size of our image

  // turn the inro into a mask image:
  createMask(inro);

  // why not... make it surreal?
  angelaNose.filter(INVERT); // opposite colors
}


/**
 * This is a slightly more convenient way to
 *  draw Angela's eye on the canvas.
 * 
 * @param {Number} x center coordinate on canvas to start drawing 
 * @param {Number} y center coordinate on canvas to start drawing 
 * @param {Number} w (optional) width of image to draw on canvas 
 * @param {Number} h (optional) height of image to draw on canvas
 */
function drawAngelaEye(x,y, w,h)
{
  // https://p5js.org/reference/#/p5/image

  image(angela, x-w/2,y-h/2, // subtracting 1/2 the dimensions 
                             // centers the image
                w,h,              
                262,308, // start coordinates of her left eye 
                112,82 // width and height of eye    
    );
}



/**
 * Draw a mask image onto the screen using SCREEN blend mode.
 * This means the black parts of this image will white out the
 * pixels below it, and the white parts of this image will let the 
 * pixels below show through unaltered.
 * 
 * @param {p5.Image} img Mask image
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 */
function drawMask(img, x, y, w, h){
    // or try screen
    blendMode(SCREEN);
    imageMode(CENTER); // draw using center coordinate
    image(img, x, y, w, h);
}

///-----------------------------
///--- DRAW --------------------
///-----------------------------

function draw() {

  tint(255,255); // reset tint to full color and no transparency

  // make it so images don't blend, they replace what is under them
  blendMode(REPLACE);

  imageMode(CORNER);
  // draw the image to fill the canvas exactly
  image(waveImage, 0, 0);  

  // draw the mask image onto the background image
  drawMask(inro, width/2, height/2, width, height);
  
  // blend using transparency (alpha)
  blendMode(BLEND);
  colorMode(RGB);

  tint(255,180); // make everything after this a little transparent

  imageMode(CORNER);

  // draw cropped eyes
  drawAngelaEye(width/3, height/2, 100,80);
  drawAngelaEye(width/3, height/2+80, 100,80);

  // Draw upside-down eyes.
 
  // Gene Kogan has a nice explanation: https://genekogan.com/code/p5js-transformations/

  // save current drawing state
  push();
  // Move to designed drawing position
    translate(2*width/3, height/2);
    // rotate 180 degrees (PI)
    rotate(PI);
    // draw at current drawing position
    drawAngelaEye(0, 0, 100,80);

    // draw one below it (we're upside-down now!)
    drawAngelaEye(0, -80, 100,80);

    // reset transformations (drawing state) to original
  pop();


  // use transparency again
  blendMode(BLEND);

  // draw some noses, to be weird
  push();
  
  let maxNoses = 4;

  // start position
  translate(angelaNose.width, height/3);

  for (let noses = 0; noses < maxNoses; noses++)
  {
    image(angelaNose, 0, 0);
    translate(angelaNose.width,0); 
  }
  pop();

} // end draw()
