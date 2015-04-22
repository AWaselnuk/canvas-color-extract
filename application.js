// Pixels have an x, y coordinate and rgba colors
function Pixel(x, y, r, g, b, a) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.color = [this.r, this.g, this.b, this.a];
}

// TODO: Use singleton pattern to get context
function getCanvasCtx() {
  var canvas, ctx;
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  return ctx;
}

function getImageDataFromCanvas(imageObj) {
  var ctx, imageData, imageWidth, imageHeight, data;
  imageWidth = imageObj.width;
  imageHeight = imageObj.height;
  ctx = getCanvasCtx();
  ctx.drawImage(imageObj, 0, 0);
  imageData = ctx.getImageData(0, 0, imageWidth, imageHeight).data;
  data = {
    rgba: imageData,
    width: imageWidth,
    height: imageHeight
  };

  return data;
}

function printColors(colors) {
  var divs = "";
  colors.forEach(function(color) {
    var rgba = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
    var div = "<div class='color' style='background-color: " + rgba + ";'></div>";
    divs += div;
  });
  document.getElementById('colors').innerHTML = divs;
}

function printPicture(pixels, size) {
  var divs = "";
  pixels.forEach(function(pixel) {
    var rgba = "rgba(" + pixel.color[0] + "," + pixel.color[1] + "," + pixel.color[2] + "," + pixel.color[3] + ")";
    var top = pixel.y * size;
    var left = pixel.x * size;
    var div = "<div class='pixel animation-pixel' " +
      "style='background-color: " + rgba + "; top: " + top + "px; left: " + left + "px; " +
      "width: " + size + "px; height: " + size + "px;'></div>";
    divs += div;
  });
  document.getElementById('divart').innerHTML = divs;
}

function main(src) {
  var imageData,
      pixels = [],
      uniqueColors = [];

  // Load image object into canvas
  var imageObj = new Image();
  imageObj.onload = function() {
    imageData = getImageDataFromCanvas(this);

    // Loop through image data
    var rgbaSeen = [];
    for(var y = 0; y < imageData.height; y++) {
      for(var x = 0; x < imageData.width; x++) {
        var r, g, b, a, pixel, rgbaSum;
        r = imageData.rgba[((imageData.width * y) + x) * 4];
        g = imageData.rgba[((imageData.width * y) + x) * 4 + 1];
        b = imageData.rgba[((imageData.width * y) + x) * 4 + 2];
        a = imageData.rgba[((imageData.width * y) + x) * 4 + 3];
        pixel = new Pixel(x, y, r, g, b, a);
        pixels.push(pixel);

        // unique colors
        rgbaSum = r + g + b + a;
        if (rgbaSeen.indexOf(rgbaSum) === -1) {
          uniqueColors.push(pixel.color);
        }
        rgbaSeen.push(rgbaSum);
      }
    }

    // do stuff with data
    console.log(imageData);
    console.log(pixels);
    console.log(uniqueColors);

    printColors(uniqueColors);
    printPicture(pixels, 10);
  };
  imageObj.src = src;
}

// Run the program
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var init = function() {
  var imageSrc = document.getElementById('demo').src;
  console.log(imageSrc);
  main(imageSrc);
};

ready(init);
