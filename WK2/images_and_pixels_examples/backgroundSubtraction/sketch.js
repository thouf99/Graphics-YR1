/**
 * Background subtraction example.
 * Click the mouse to save the background image.
 */
var video;
var backImg;
var diffImg;
var threshold = 80;

function setup() {
    createCanvas(640 * 2, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    background(0);
    image(video, 0, 0);

    diffImg = createImage(video.width, video.height);
    diffImg.loadPixels();

    if (backImg) { // only do this if we've saved a background
        backImg.loadPixels();
        video.loadPixels();
        for (var x = 0; x < video.width; x += 1) {
            for (var y = 0; y < video.height; y += 1) {
                var index = (x + (y * video.width)) * 4;
                var redSource = video.pixels[index + 0];
                var greenSource = video.pixels[index + 1];
                var blueSource = video.pixels[index + 2];

                var redBackground = backImg.pixels[index + 0];
                var greenBackground = backImg.pixels[index + 1];
                var blueBackground = backImg.pixels[index + 2];

                var d = dist(redSource, greenSource, blueSource, 
                    redBackground, greenBackground, blueBackground);

                if (d > threshold) {
                    diffImg.pixels[index + 0] = redSource;
                    diffImg.pixels[index + 1] = greenSource;
                    diffImg.pixels[index + 2] = blueSource;
                    diffImg.pixels[index + 3] = 255;
                } else {
                    diffImg.pixels[index + 0] = 0;
                    diffImg.pixels[index + 1] = 255;
                    diffImg.pixels[index + 2] = 0;
                    diffImg.pixels[index + 3] = 255;
                }
            }
        }
    }
    diffImg.updatePixels();
    image(diffImg, 640, 0);
}

function mousePressed() {
    backImg = createImage(640,480);
    backImg.copy(video, 0, 0, 640, 480, 0, 0, 640, 480);
    backImg.filter(BLUR,2);
    console.log("saved new background");
}
