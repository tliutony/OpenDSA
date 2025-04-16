/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "insertionSortCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  var theArray1 = [20, 10, 15, 54, 55, 11, 78, 14];
  var arr = av.ds.array(theArray1, {indexed: true, top:0, left:300});

  var nextValueBox = av.ds.array([""], {indexed: false, left: 200,
    top: 0});
  var nextValueLabel = av.label("nextValue", {left: 130, top: 3});

  var fillBox = av.ds.array([1], {indexed: false, left: 60,
    top: 0});
  var fillLabel = av.label("fill", {left: 30, top: 3});



  // Slide 1
  av.umsg(interpret("sc1"));
  arr.addClass([1, 2, 3, 4, 5, 6, 7], "deemph");
  pseudo.highlight("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2")); 
  arr.removeClass([1], "deemph");
  pseudo.unhighlight("sig");
  pseudo.highlight("outerloop");
  arr.highlightBlue(0);
  arr.highlight(1);
  fillBox.highlight();
  av.step();

  av.umsg(interpret("sc3"));
  arr.unhighlightBlue(0);
  fillBox.unhighlight();
  av.effects.copyValue(arr, 1, nextValueBox, 0);
  pseudo.unhighlight("outerloop");
  pseudo.highlight("nextValue");
  nextValueBox.highlight();
  av.step();

  av.umsg(interpret("sc4"));
  pseudo.unhighlight("nextValue");
  pseudo.highlight("innerloop");
  nextValueBox.unhighlight();
  av.step();

  av.umsg(interpret("sc5"));
  arr.unhighlight(1).highlight(0);
  pseudo.unhighlight("innerloop");
  pseudo.highlight("moveRight");
  av.effects.copyValue(arr, 0, arr, 1);
  av.step();

  av.umsg(interpret("sc6"));
  pseudo.unhighlight("moveRight");
  pseudo.highlight("insert");
  av.effects.copyValue(nextValueBox, 0, arr, 0);
  av.step();

  av.umsg(interpret("sc7"));
  arr.unhighlight(0);
  pseudo.unhighlight("insert");
  pseudo.highlight("outerloop");
  fillBox.highlight();
  fillBox.value(0, 2);
  arr.highlightBlue([0, 1]);
  av.step();

  av.umsg(interpret("sc8"));
  fillBox.unhighlight();
  arr.unhighlightBlue([0, 1]);
  av.effects.copyValue(arr, 2, nextValueBox, 0);
  arr.removeClass([2], "deemph");
  pseudo.unhighlight("outerloop");
  pseudo.highlight("nextValue");
  nextValueBox.highlight();
  arr.highlight(2);
  av.step();
  
  av.umsg(interpret("sc9"));
  av.effects.copyValue(arr, 1, arr, 2);
  pseudo.unhighlight("nextValue");
  pseudo.highlight("innerloop");
  pseudo.highlight("moveRight");
  nextValueBox.unhighlight();
  arr.unhighlight(2);
  arr.highlight(1);
  av.step();

  av.umsg(interpret("sc10"));
  pseudo.unhighlight("moveRight");
  pseudo.unhighlight("innerloop");
  pseudo.highlight("insert");
  av.effects.copyValue(nextValueBox, 0, arr, 1);
  av.step();

  av.umsg(interpret("sc11"));
  arr.unhighlight(1);
  pseudo.unhighlight("insert");
  pseudo.highlight("outerloop");
  fillBox.highlight();
  fillBox.value(0, 3);
  arr.highlightBlue([0, 1, 2]);
  av.step();

  av.umsg(interpret("sc12"));
  fillBox.unhighlight();
  arr.unhighlightBlue([0, 1, 2]);
  av.effects.copyValue(arr, 3, nextValueBox, 0);
  arr.removeClass([3], "deemph");
  pseudo.unhighlight("outerloop");
  pseudo.highlight("nextValue");
  nextValueBox.highlight();
  arr.highlight(3);
  av.step();

  av.umsg(interpret("sc13"));
  pseudo.unhighlight("nextValue");
  pseudo.highlight("innerloop");
  pseudo.highlight("insert");
  nextValueBox.unhighlight();
  av.step();

  av.umsg(interpret("sc14"));
  pseudo.unhighlight("insert");
  pseudo.unhighlight("innerloop");
  pseudo.highlight("outerloop");
  arr.highlightBlue([0, 1, 2, 3]);
  arr.unhighlight(3);
  av.recorded();

  // // Slide 3
  // av.umsg(interpret("sc3"));
  // arr.unhighlight(0);
  // av.step();

  // // Slide 4
  // av.umsg(interpret("sc4"));
  // arr.highlight(2);
  // arr.removeClass(2, "deemph");
  // av.step();


  // // Slide 5
  // av.umsg(interpret("sc5"));
  // arr.highlightBlue(1);
  // av.step();

  // // Slide 6
  // av.umsg(interpret("sc6"));
  // arr.swap(1, 2);
  // arr.unhighlightBlue(1);
  // arr.highlight(1);
  // arr.unhighlight(2);
  // av.step();

  // // Slide 7
  // av.umsg(interpret("sc7"));
  // arr.highlightBlue(0);
  // av.step();

  // // Slide 8
  // av.umsg(interpret("sc8"));
  // arr.unhighlight(1);
  // arr.unhighlightBlue([0, 1]);
  // av.step();

  // // Slide 9
  // av.umsg(interpret("sc9"));
  // arr.highlight(3);
  // arr.removeClass(3, "deemph");
  // av.step();

  // // Slide 10
  // av.umsg(interpret("sc10"));
  // arr.highlightBlue(2);
  // av.step();

  // // Slide 11
  // av.umsg(interpret("sc11"));
  // arr.unhighlightBlue(2);
  // arr.unhighlight(3);
  // av.recorded();
});

/*
"sc4": "Since this is smaller than the value to its left, swap them.",
      "sc5": "Now we are done with this record since it can't move further left.",
      "sc6": "Now we are ready to process the record in position 2.",
      "sc7": "We will compare it to the record in position 1.",
      "sc8": "Since the record in position 2 is smaller, swap them.",
      "sc9": "Now compare against the record in position 0.",
      "sc10": "Since the record currently in position 1 is not smaller than the one in position 0, we are done with it.",
      "sc11": "Now we are ready to process the record in position 3.",
      "sc12": "We will compare it to the record in position 2.",
      "sc13": "Since the record in position 2 is smaller, nothing changes and we are done with the record in position 3."
*/
