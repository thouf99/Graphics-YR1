///
/// by Evan Raskob

let img;
let clr;
let pixelCoord = [0, 0];

//
// do all the pixel calculations
//
function doCalc() {
  let w = parseInt(document.getElementById("w").value);
  let h = parseInt(document.getElementById("h").value);
  let x = parseInt(document.getElementById("x").value);
  let y = parseInt(document.getElementById("y").value);

  pixelCoord = [x, y];
  clr = img.get(x, y); // color at pixel

  document.getElementById("r").value = red(clr);
  document.getElementById("g").value = green(clr);
  document.getElementById("b").value = blue(clr);
  document.getElementById("a").value = alpha(clr);

  let calculation =
    (y * w + x) *
      parseInt(document.getElementById("channels").selectedOptions[0].value) +
    parseInt(document.getElementById("channel").selectedOptions[0].value);
  document.getElementById("result").innerHTML = calculation;
  document.getElementById("channel-result").innerHTML = document.getElementById("channel").selectedOptions[0].label;
  document.getElementById("coords").innerHTML = x + "," + y;
}

function preload() {
  // preload() runs once
  // 424x720
  img = loadImage("img/Tastee-Candy-Apple-Red-Caramel-wPeanuts.jpg");
}

function setup() {
  createCanvas(820, 1440);
  clr = color(0, 0, 0);

  imageMode(CORNER);
  noStroke();
  background(255);
  img.loadPixels();

  let channels = document.getElementById("channels");
  let channel = document.getElementById("channel");
  let calcButton = document.getElementById("calculate");

  //
  // setup interactions with drop-down list and button
  //
  channels.addEventListener("change", function () {
    //            let maxOffset = getChannels()-1;
    doCalc();
  });

  channel.addEventListener("change", function () {
    doCalc();
  });

  calcButton.addEventListener("click", doCalc);

  // update calculation visualisation whenever numbers are changed
  document.getElementById("x").addEventListener("change", doCalc);
  document.getElementById("y").addEventListener("change", doCalc);
  document.getElementById("w").addEventListener("change", doCalc);
  document.getElementById("h").addEventListener("change", doCalc);
}

function draw() {
  image(img, 0, 0, img.width * 2, img.height * 2);
  //noStroke();

  stroke(0, 64 * (1.5 + sin(millis() / 150) / 2));

  line(pixelCoord[0] * 2 + 1, 0, pixelCoord[0] * 2 + 1, img.height * 2);
  line(0, pixelCoord[1] * 2 + 1, img.width * 2, pixelCoord[1] * 2 + 1);
  //noStroke();
  fill(clr);
  rectMode(CENTER);
  rect(pixelCoord[0] * 2, pixelCoord[1] * 2, 8, 8);
}

function mouseClicked() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    // we're scaling x2
    document.getElementById("x").value = round(constrain(mouseX, 0, width) / 2);
    document.getElementById("y").value = round(
      constrain(mouseY, 0, height) / 2
    );
    doCalc();
  }
}
