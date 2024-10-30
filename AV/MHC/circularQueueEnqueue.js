$(document).ready(function() {
    "use strict";
    var av_name = "circularQueueEnqueue";
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter,       // get the interpreter
        code = config.code;                   // get the code object
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]);
  
    // Relative offsets
    var leftMargin = 10;
    var topMargin = 0;
  
    var arr = av.ds.array(["", "", "", "", "", "", "", "", 20, 5, 12, 17],
                          {indexed: true, left: leftMargin + 50, top: topMargin});
    arr.addClass([0, 1, 2, 3, 4, 5, 6, 7], "unused");
    // Create the graphics for front and rear boxes
    var arrFront = av.ds.array([8], {indexed: false, left: leftMargin + 50, top: topMargin + 60});
    av.label("first", {left: leftMargin + 10, top: topMargin + 64});
    arrFront.addClass([0], "special");
    arr.addClass([8], "special");
    var arrRear = av.ds.array([11], {indexed: false, left: leftMargin + 50, top: topMargin + 100});
    av.label("last", {left: leftMargin + 10, top: topMargin + 104});
    arrRear.addClass([0], "processing");
    arr.addClass([11], "processing");
    var arrSize = av.ds.array([4], {indexed: false, left: leftMargin + 50, top: topMargin + 140});
    av.label("size", {left: leftMargin + 10, top: topMargin + 144});
    var arrCapacity = av.ds.array([12], {indexed: false, left: leftMargin + 50, top: topMargin + 180});
    av.label("capacity", {left: leftMargin - 5, top: topMargin + 184});
  
    // Slide 1
    av.umsg(interpret("sc1"));
    av.displayInit();
    pseudo.setCurrentLine("sig");
  
    // Slide 2
    av.umsg(interpret("sc2"));
    pseudo.setCurrentLine("grow");
    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));
    pseudo.setCurrentLine("lastUpdate");
    arr.removeClass(11  , "processing");
    arr.addClass(0, "processing");
    arr.removeClass(0, "unused");
    arrRear.value(0, 0);
    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    pseudo.setCurrentLine("valueUpdate");
    arr.value(0, "3");
    av.step();

    // Slide 5
    av.umsg(interpret("sc5"));
    pseudo.setCurrentLine("sizeUpdate");
    arrSize.value(0, 5);
    arrSize.highlight();
    av.recorded();

    // arr.value(3, "");
    // arr.removeClass(3, "special");
    // arr.addClass(3, "unused");
    // arr.addClass(4, "special");
    // arrSize.value(0, 3);
    // arrFront.value(0, 4);
    // av.step();
  
    // // Slide 3
    // av.umsg(interpret("sc3"));
    // arr.removeClass(7, "unused");
    // arr.removeClass(6, "processing");
    // arr.addClass(7, "processing");
    // arr.value(7, "3");
    // arrSize.value(0, 4);
    // arrRear.value(0, 7);
    // av.step();
  
    // // Slide 4
    // av.umsg(interpret("sc4"));
    // arr.removeClass(8, "unused");
    // arr.removeClass(7, "processing");
    // arr.addClass(8, "processing");
    // arr.value(8, "40");
    // arrSize.value(0, 5);
    // arrRear.value(0, 8);
    // av.step();
  
    // // Slide 5
    // av.umsg(interpret("sc5"));
    // arr.removeClass(9, "unused");
    // arr.removeClass(8, "processing");
    // arr.addClass(9, "processing");
    // arr.value(9, "42");
    // arrSize.value(0, 6);
    // arrRear.value(0, 9);
    // av.step();
  
    // // Slide 6
    // av.umsg(interpret("sc6"));
    // av.step();
  
    // // Slide 7
    // av.umsg(interpret("sc7"));
    // av.recorded();
  });
  