/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Array-based circular queue
$(document).ready(function() {
  "use strict";
  var av_name = "aqueueCircularCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Add labels for first, last, and size
  var arrFront = av.ds.array([8], {indexed: false, left: 200, top: 4});
  var arrRear = av.ds.array([11], {indexed: false, left: 200, top: 39});
  var arrSize = av.ds.array([4], {indexed: false, left: 200, top: 74});
  var firstLabel = av.label("first", {left: 163, top: 4});
  var lastLabel = av.label("last", {left: 168, top: 39});
  var sizeLabel = av.label("size", {left: 147, top: 74});

  // center coordinate
  var cx = 400, cy = 150;

  // radius
  var r1 = 50, r2 = 100;
  var fx = cx, fy = cy - r2 - 15;
  var tx = cx + r2 + 15, ty = cy;
  var fx1 = fx + 70, ty2 = ty - 70;
  var path = "M" + fx + "," + fy;
  path += " C" + fx1 + "," + fy;
  path += " " + tx + "," + ty2;
  path += " " + tx + "," + ty;
  var curve = av.g.path(path, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var cir = av.circular(cx, cy, r1, r2, 12, {"stroke-width": 2});
  curve.hide();


  arrFront.hide();
  arrRear.hide();
  arrSize.hide();
  firstLabel.hide();
  lastLabel.hide();
  sizeLabel.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  curve.show();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arrFront.show();
  arrRear.show();
  arrSize.show();
  firstLabel.show();
  lastLabel.show();
  sizeLabel.show();
  curve.hide();
  cir.value(8, "20");
  cir.value(9, "5");
  cir.value(10, "12");
  cir.value(11, "17");
  var frontP = cir.pointer("first", 8);
  var rearP = cir.pointer("last", 11);
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  cir.value(8, " ");
  frontP.arrow.hide();
  frontP.label.hide();
  frontP = cir.pointer("first", 9);
  arrFront.value(0, 9);
  arrSize.value(0, 3);
  arrFront.highlight();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  arrFront.unhighlight();
  rearP.arrow.hide();
  rearP.label.hide();
  rearP = cir.pointer("last", 0);
  arrRear.value(0, 0);
  cir.value(0, "3");
  arrRear.highlight();
  arrSize.value(0, 4);
  av.recorded();
});
