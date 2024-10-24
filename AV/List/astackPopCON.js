/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Astack pop method
$(document).ready(function() {
  "use strict";
  var av_name = "astackPopCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Relative offsets
  var leftMargin = 20;
  var topMargin = 0;
  var arr = av.ds.array([12, 45, 5, 81, "", "", "", ""],
                        {indexed: true, left: leftMargin, top: topMargin + 50});
  arr.addClass([4, 5, 6, 7], "unused");

  var topArr = av.ds.array([3], {left: leftMargin + 120, top: topMargin + 105});
  av.label("top of stack index", {left: leftMargin, top: topMargin + 108});
  var arrReturn = av.ds.array([""], {left: leftMargin + 100,
                                     top : topMargin + 143});
  arrReturn.hide();
  var labelReturn = av.label("return", {left: leftMargin + 55,
                                        top : topMargin + 148});
  labelReturn.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  arr.highlight(3);
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("empty");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.unhighlight(4);
  arr.highlight(3);
  topArr.value(0, 3);
  topArr.highlight(0);
  pseudo.setCurrentLine("return");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arrReturn.show();
  labelReturn.show();
  av.effects.copyValue(arr, 3, arrReturn, 0);
  arrReturn.highlight();
  topArr.unhighlight(0);
  topArr.value(0, 2);
  arr.unhighlight(3);
  arr.value(3, "");
  arr.addClass(3, "unused");
  av.recorded();
});
