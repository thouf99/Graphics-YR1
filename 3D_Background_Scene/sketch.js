/**
 * Draw a row of spheres relatively and absolutely
 *
 * by Evan Raskob, 2021
 **/

// my work was inspired by kyttenjanae in which she created a numbe of different layers of backgrounds
// to create a movement effect. I have done this in a different way by using image textures
// to create that affect and using different colours.
let fovSlider; // changes fov angle
let eyeZ; // camera eye position (z coord)
let img; //this will store img of aot wall
let img1; // this will store img of grass
let img2; //this will store img of bark
let img3; //this will store img of tree leaves
let img4; //this will store img of stones for the mountains


function sliderToRadians(sliderObj) {
  return PI/sliderObj.value();
}
function setup() {
  createCanvas(1024, 576, WEBGL);
  //image of aotWall created by Hajime Isayama, taken from: 
  https://www.cbr.com/attack-on-titan-wall-titans-rumbling/
  img = loadImage('assets/AotWall.jpg');
  //image of grass created by Joseph Truini, taken from:
  https://www.popularmechanics.com/home/lawn-garden/a32130743/types-of-grass/
  img1 = loadImage('assets/grass.jpg');
  //image of bark for the trees taken from:
  https://www.treehugger.com/how-identify-tree-its-bark-4869743
  img2 = loadImage('assets/bark.jpg');
  //image of tree leaves taken from:
  https://unsplash.com/backgrounds/nature/leaf
  img3 = loadImage('assets/leaves.jpg');
  //image of stones taken from:
  https://www.loc.gov/everyday-mysteries/item/how-does-a-stone-skip-across-water/
  img4 = loadImage('assets/stones.jpg');
  
  // can't use decimals, so we'll divide PI by this to get a fraction like PI/1, PI/3, PI/12
  fovSlider = createSlider(1, 12, 3); 
  
  fovSlider.position(8,16);  
  
  eyeZ = (height/2) / tan(sliderToRadians(fovSlider)/2); // 120 degree angle FOV / 2
}

function draw() {
  background(10);
  // orbitControl();
  noStroke();
  let fov = sliderToRadians(fovSlider);
  
  eyeZ = (height/2) / (fov/8); // 120 degree angle FOV / 2

  angleMode(RADIANS);
  // set up camera
  perspective(fov, width/height, eyeZ/10.0, eyeZ*10.0);
  
  
  lights();
  // let totalSpheres = 10;
  // fill(0,220,0);
  // sphere(2); // mark centre point
  // drawSpheresRowAbsolutely(totalSpheres);
  
  
  //floor of the background to stand on
  push();
  translate(0,100,0);
  fill(0,255,0);
  texture(img1);
  box(1000,10,1000);
  pop();
  
  
  let totalBoxes = 10;
  //back wall starting at 0
  for (var i = 0; i < 8; i++){
    let intervalX = 120;
    push();
    translate(i*intervalX,45,-475);
    fill(255,0,0);
    texture(img);
    drawBoxAbsolutely(totalBoxes);
    pop();
  }   

   //rotation of the back wall to the top right hand corner
   for(var r = 0; r < 4;r++){
    let intervalZ = 120;
    push();
    translate(480,45,-475 - r*intervalZ);
    rotateY(PI/2);
    fill(255,0,0);
    texture(img);
    drawBoxAbsolutely(totalBoxes);
    pop();
   }
   //rotation of the back wall to the bottom right hand corner
   for(var j = 0; j <= 4;j++){
    let intervalZ = 120;
    push();
    translate(480,45,-475 + j*intervalZ);
    rotateY(PI/2);
    fill(255,0,0);
    texture(img);
    drawBoxAbsolutely(totalBoxes);
    pop();
   }
   //rotation of the back wall to the top left hand corner
   for(var s = 0; s < 4;s++){
    let intervalZ = 120;
    push();
    translate(-480,45,-475 - s*intervalZ);
    rotateY(PI/2);
    fill(255,0,0);
    texture(img);
    drawBoxAbsolutely(totalBoxes);
    pop();
    
   }
   //rotation of the back wall to the bottom left hand corner
   for(var s = 0; s <= 4;s++){
    let intervalZ = 120;
    push();
    translate(-480,45,-475 + s*intervalZ);
    rotateY(PI/2);
    fill(255,0,0);
    texture(img);
    drawBoxAbsolutely(totalBoxes);
    pop();
   }
   


  //front walls leaving space for the entrance
  for (var f = 0; f < 3; f++){
    let intervalX = 120;
    push();
    translate(840-f*intervalX,45,475);
    fill(255,0,0);
    drawBoxAbsolutely(totalBoxes);
    pop();

    push();
    translate(f*intervalX,45,475);
    fill(255,0,0);
    texture(img);
    drawBoxAbsolutely(totalBoxes);
    pop();
  }
  //cylinder for entrance L
  for(var t = 0; t < 4;t++){
    let intervalZ = 50;
    push();
    translate(-100,45,475-t*intervalZ);
    cylinder(20,100);
    pop();
    //cylinder for entrance R
    push();
    translate(100,45,475-t*intervalZ);
    cylinder(20,100);
    pop();
    //cylinder for entrance top
    push();
    translate(0,-5,475-t*intervalZ);
    rotate(PI/2)
    cylinder(20,200);
    pop();
   }
  
  //tree1
  
  push();
  translate(350,45,300);
  fill(139,69,19);
  texture(img2);
  box(30,100,40);
  pop();

  push();
  translate(350,-25,300);
  fill(40, 139, 34);
  texture(img3);
  ellipsoid(50,55);
  pop();

  //mountain1
  
  push();
  translate(-120,120,-100);
  fill(105,105,105);
  texture(img4)
  ellipsoid(250,80);
  pop();

  push();
  translate(-100,-5,-100);
  fill(105,105,105);
  texture(img4)
  cone(120,-200);
  pop();

  push();
  translate(-50,-5,-50);
  fill(105,105,105);
  texture(img4)
  cone(120,-150);
  pop();

  push();
  translate(-150,-5,-50);
  fill(105,105,105);
  texture(img4)
  cone(120,-150);
  pop();

  //tree2
  push();
  translate(-350,45,300);
  fill(139,69,19);
  texture(img2);
  box(30,100,40);
  pop();

  push();
  translate(-350,-25,300);
  fill(40, 139, 34);
  texture(img3);
  ellipsoid(50,55);
  pop();

  //tree2
  push();
  translate(-250,45,0);
  fill(139,69,19);
  texture(img2);
  box(30,100,40);
  pop();

  push();
  translate(-250,-25,0);
  fill(40, 139, 34);
  texture(img3);
  ellipsoid(50,55);
  pop();

  //tree3
  push();
  translate(0,45,150);
  fill(139,69,19);
  texture(img2);
  box(30,100,40);
  pop();

  push();
  translate(0,-25,150);
  fill(40, 139, 34);
  texture(img3);
  ellipsoid(50,55);
  pop();

  //tree4
  push();
  translate(0,45,-400);
  fill(139,69,19);
  texture(img2);
  box(30,100,40);
  pop();

  push();
  translate(0,-25,-400);
  fill(40, 139, 34);
  texture(img3);
  ellipsoid(50,55);
  pop();

   //mountain2
  
   push();
   translate(170,120,100);
   fill(105,105,105);
   texture(img4)
   ellipsoid(250,80);
   pop();
 
   push();
   translate(150,-5,100);
   fill(105,105,105);
   texture(img4)
   cone(120,-200);
   pop();
 
   push();
   translate(100,-5,50);
   fill(105,105,105);
   texture(img4)
   cone(120,-150);
   pop();
 
   push();
   translate(200,-5,50);
   fill(105,105,105);
   texture(img4)
   cone(120,-150);
   pop();
  
}

///
/// Draw a row of spheres by positioning each one
///
function drawBoxAbsolutely(numberOfboxes){

  for (let index=0; index < numberOfboxes; index++)
  {

    let percentFinished = index/numberOfboxes;

    push(); // save current drawing transformation matrix  
    translate( map(percentFinished, 
                   0, numberOfboxes-1,// why -1 here? (hint, what's the max value of index?)
                    -width/2+50,width/2-50),
              0);
    
  
    box(30,100,40);
    pop(); // go back to original drawing matrix
  }
}

function drawCylinderAbsolutely(numberOfcylinders){

  for (let index=0; index < numberOfcylinders; index++)
  {

    let percentFinished = index/numberOfcylinders;

    push(); // save current drawing transformation matrix  
    translate( map(index, 
                   0, numberOfcylinders-1,// why -1 here? (hint, what's the max value of index?)
                    -width/2+150,width/2-150),
              0);
    
  
    cylinder(10,50);
    pop(); // go back to original drawing matrix
  }
}
