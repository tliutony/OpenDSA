/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Show off the private data members
$(document).ready(function() {
  "use strict";
  var av_name = "alistVarsCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("sig");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.setCurrentLine("listArray");
  av.step();

  // Slide 4
  // av.umsg(interpret("sc4"));
  // pseudo.setCurrentLine("default");
  // av.step();
  //"sc4": "An optional parameter is declared for the <code>MHCArrayList</code> constructor. With this parameter, the user can indicate the maximum number of elements permitted in the list. If no parameter is given, then it takes the value <code>DEFAULT_CAPACITY</code>, which is assumed to be a suitably defined constant value.",


  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.setCurrentLine("capacity");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudo.setCurrentLine("listSize");
  av.step();

  // Slide 7
  // av.umsg(interpret("sc7"));
  // pseudo.setCurrentLine("curr");
  // av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudo.setCurrentLine(0);    // Clear highlighting
  pseudo.unhighlight("listSize");
  av.recorded();
});
