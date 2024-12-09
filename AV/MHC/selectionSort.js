/*global ODSA */
$(document).ready(function() {
    "use strict";
    var av_name = "selectionSort";
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
    interpret = config.interpreter,       // get the interpreter
    code = config.code;                   // get the code object
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]);
  
    var theArray1 = [20, 10, 15, 54, 55, 11, 78, 14];
    var arr = av.ds.array(theArray1, {indexed: true, top:0, left:300});
  
    var minValueBox = av.ds.array([""], {indexed: false, left: 200,
      top: 0});
    var minValueLabel = av.label("minValue", {left: 130, top: 3});
  
    var fillBox = av.ds.array([0], {indexed: false, left: 60,
      top: 0});
    var fillLabel = av.label("fill", {left: 30, top: 3});
  
    // Slide 1
    av.umsg(interpret("sc1"));
    pseudo.highlight("sig");
    av.displayInit();

    av.umsg(interpret("sc2"));
    pseudo.unhighlight("sig");
    pseudo.highlight("outerloop");
    av.step();

    av.umsg(interpret("sc3"));
    pseudo.unhighlight("outerloop");
    pseudo.highlight("minValue");
    arr.highlight([0]);
    av.effects.copyValue(arr, 0, minValueBox, 0);
    minValueBox.highlight([0]);
    av.step();

    av.umsg(interpret("sc4"));
    minValueBox.unhighlight([0]);
    pseudo.unhighlight("minValue");
    pseudo.highlight("innerloop");
    av.step();

    av.umsg(interpret("sc5"));
    av.effects.copyValue(arr, 1, minValueBox, 0);
    pseudo.unhighlight("innerloop");
    pseudo.highlight("minPos");
    minValueBox.highlight([0]);
    arr.unhighlight([0]);
    arr.highlight([1]);
    av.step();

    // walk through the rest of the array
    for (var i = 2; i < theArray1.length; i++) {
        pseudo.unhighlight("minPos");
        pseudo.highlight("innerloop");
        minValueBox.unhighlight([0]);
        av.umsg(interpret("sc6"));
        arr.unhighlight([i-1]);
        arr.highlight([i]);
        av.step();
    }

    av.umsg(interpret("sc7"));
    arr.unhighlight([i-1]);
    pseudo.unhighlight("innerloop");
    pseudo.highlight("swap");
    arr.swap(0, 1);
    av.step();

    av.umsg(interpret("sc8"));
    fillBox.highlight([0]);
    fillBox.value(0, 1);
    pseudo.unhighlight("swap");
    pseudo.highlight("outerloop");
    arr.highlightBlue(0);
    av.step();

    av.umsg(interpret("sc3"));
    fillBox.unhighlight([0]);
    pseudo.unhighlight("outerloop");
    pseudo.highlight("minValue");
    av.effects.copyValue(arr, 1, minValueBox, 0);
    minValueBox.highlight([0]);
    arr.highlight([1]);
    av.step();

    av.umsg(interpret("sc4"));
    minValueBox.unhighlight([0]);
    pseudo.unhighlight("minValue");
    pseudo.highlight("innerloop");
    av.step();


    av.umsg(interpret("sc9"));
    arr.unhighlight([1]);
    arr.highlight([2]);
    av.effects.copyValue(arr, 2, minValueBox, 0);
    minValueBox.highlight([0]);
    av.step();

    var fill = 3;
    while (minValueBox.value(0) < arr.value(fill)) {
        minValueBox.unhighlight([0]);
        av.umsg(interpret("sc6"));
        arr.unhighlight([fill-1]);
        arr.highlight([fill]);
        av.step();
        fill++;
    }

    av.umsg(interpret("sc10"));
    arr.unhighlight([fill-1]);
    arr.highlight([fill]);
    av.effects.copyValue(arr, fill, minValueBox, 0);
    minValueBox.highlight([0]);
    av.step();

    // walk through the rest of the array
    for (var i = fill; i < theArray1.length; i++) {
        pseudo.unhighlight("minPos");
        pseudo.highlight("innerloop");
        minValueBox.unhighlight([0]);
        av.umsg(interpret("sc6"));
        arr.unhighlight([i-1]);
        arr.highlight([i]);
        av.step();
    }

    av.umsg(interpret("sc7"));
    arr.unhighlight([i-1]);
    pseudo.unhighlight("innerloop");
    pseudo.highlight("swap");
    arr.swap(1, 5);
    av.step();

    av.umsg(interpret("sc11"));
    fillBox.highlight([0]);
    fillBox.value(0, 2);
    pseudo.unhighlight("swap");
    pseudo.highlight("outerloop");
    arr.highlightBlue([0, 1]);
    av.recorded();
});
