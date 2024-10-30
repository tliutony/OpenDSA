$(document).ready(function() {
    "use strict";
    var av_name = "circularQueueDequeue";
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter,       // get the interpreter
        code = config.code;                   // get the code object
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]);
  
    // Relative offsets
    var leftMargin = 10;
    var topMargin = 0;
  
    var arr = av.ds.array([3, 4, 5, "", "", "", "", "", "", "", "", 17],
                          {indexed: true, left: leftMargin, top: topMargin});
    arr.addClass([3, 4, 5, 6, 7, 8, 9, 10], "unused");
    // Create the graphics for front and rear boxes
    var arrFront = av.ds.array([11], {indexed: false, left: leftMargin + 50, top: topMargin + 60});
    av.label("first", {left: leftMargin + 10, top: topMargin + 64});
    arrFront.addClass([0], "special");
    arr.addClass([11], "special");
    var arrRear = av.ds.array([2], {indexed: false, left: leftMargin + 50, top: topMargin + 100});
    av.label("last", {left: leftMargin + 10, top: topMargin + 104});
    arrRear.addClass([0], "processing");
    arr.addClass([2], "processing");
    var arrSize = av.ds.array([4], {indexed: false, left: leftMargin + 50, top: topMargin + 140});
    av.label("size", {left: leftMargin + 10, top: topMargin + 144});
    var arrCapacity = av.ds.array([12], {indexed: false, left: leftMargin + 50, top: topMargin + 180});
    av.label("capacity", {left: leftMargin - 5, top: topMargin + 184});
  
    av.label("item", {left: leftMargin , top: topMargin + 234});
    var arrIt = av.ds.array([" "], {left: leftMargin + 50, top: topMargin + 230});

    // Slide 1
    av.umsg(interpret("sc1"));
    pseudo.setCurrentLine("sig");
    av.displayInit();
    
  
    // Slide 2
    av.umsg(interpret("sc2"));
    pseudo.setCurrentLine("empty");
    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));
    av.effects.copyValue(arr, 11, arrIt, 0);
    pseudo.setCurrentLine("get");
    av.step();

    av.umsg(interpret("sc4"));
    pseudo.setCurrentLine("firstUpdate");
    arr.removeClass(11  , "special");
    arr.addClass(0, "special");
    arr.addClass(11, "unused");
    arrFront.value(0, 0);
    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    pseudo.setCurrentLine("firstUpdate");
    arr.value(0, "3");
    arr.value(11, "");
    av.step();

    // Slide 5
    av.umsg(interpret("sc5"));
    pseudo.setCurrentLine("sizeUpdate");
    arrSize.value(0, 3);
    arrSize.highlight();
    av.step();

    // Slide 6
    av.umsg(interpret("sc6"));
    pseudo.setCurrentLine("return");
    arrSize.unhighlight();
    arrIt.highlight();

    av.recorded();


  });