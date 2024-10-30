/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// LStack push slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "lstackPushCON";

  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Relative offsets
  var leftMargin = 20;
  var topMargin = 35;
  
  var l = av.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst(10).addFirst(81).addFirst(5).addFirst(45).addFirst(12);
  l.layout();


  // var list = av.ds.list({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  // list.addFirst(15).addFirst(12).addFirst(8).addFirst("");
  var newnode = l.get(4);
  l.get(3).edgeToNext().hide();
  newnode.edgeToPrev().hide();
  newnode.hide();
  var headPointer = av.pointer("head", l.get(0));
  var tailPointer = av.pointer("tail", l.get(3));

  // Dummy hidden array for copy effect
  var arr = av.ds.array([10]);
  arr.hide();

  // // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("new");

  av.step();
  
  
  
  // Slide 3
  av.umsg(interpret("sc3"));
  newnode.show();
  l.get(3).edgeToNext().show();
  newnode.edgeToPrev().show();
  tailPointer.target(newnode);
  l.layout();
  av.recorded();
  // newnode.show();
  // list.layout();
  // newnode.highlight();
  // pseudo.setCurrentLine("new");
  // av.step();

  // // Slide 3
  // av.umsg(interpret("sc3"));
  // av.effects.copyValue(arr, 0, newnode);
  // av.step();

  // // Slide 4
  // av.umsg(interpret("sc4"));
  // newnode.edgeToNext().show();
  // av.step();

  // // Slide 5
  // av.umsg(interpret("sc5"));
  // //topPointer.target(newnode);
  // av.step();

  // // Slide 6
  // av.umsg(interpret("sc6"));
  // newnode.unhighlight();
  // pseudo.setCurrentLine("size");
  // av.recorded();
});
