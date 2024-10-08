/*global ODSA, arrowAround */
// Written by Jun Yang and Cliff Shaffer
// Dlist Remove method
$(document).ready(function() {
  "use strict";
  var av_name = "doubleLinkedListRemoveNode";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Relative offsets
  var leftMargin = 225;
  var topMargin = 35;

  // "it" box and label
  var itBox = av.ds.array([""], {indexed: false, left: leftMargin + 70,
                                                 top: topMargin + 50}).hide();
  itBox.highlight();
  var itLabel = av.label("it", {left: leftMargin + 50, top: topMargin + 53}).hide();

  var l = av.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst(35).addFirst(8).addFirst(23);
  l.layout();
  av.pointer("head", l.get(0));
  var curr = av.pointer("node", l.get(1));
  av.pointer("tail", l.get(2));

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("headCheck");
  pseudo.highlight(4);
  av.step();


  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.unhighlight(4);
  pseudo.setCurrentLine("tailCheck");
  pseudo.highlight(8);
  av.step();


  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight(8);
  pseudo.setCurrentLine("else");
  l.get(2).edgeToPrev().addClass("dashline");
  l.get(1).edgeToPrev().addClass("dashline");
  l.get(1).edgeToNext().addClass("dashline");
  l.get(0).edgeToNext().addClass("dashline");
  av.step()

  // Slide 5
  av.umsg(interpret("sc5"));
  //l.get(2).edgeToPrev().removeClass("dashline");
  pseudo.setCurrentLine("setNextsPrev");
  var dashLineDown = arrowAround(l.get(1), "down");
  l.get(2).edgeToPrev().hide();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudo.setCurrentLine("setPrevsNext");
  var dashLineTop = arrowAround(l.get(1), "top");
  l.get(0).edgeToNext().hide();
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  dashLineTop.hide();
  dashLineDown.hide();  
  l.get(2).edgeToPrev().removeClass("dashline");
  l.get(0).edgeToNext().removeClass("dashline");
  l.get(0).edgeToNext().show();
  l.get(2).edgeToPrev().show();

  l.remove(1);
  curr.hide();
  l.layout();
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo.setCurrentLine("numElements");
  av.recorded();

  // // Slide 2
  // av.umsg(interpret("sc2"));
  // l.get(2).highlight();
  // pseudo.setCurrentLine("tailcheck");
  // l.get(3).edgeToPrev().addClass("dashline");
  // l.get(2).edgeToPrev().addClass("dashline");
  // l.get(2).edgeToNext().addClass("dashline");
  // l.get(1).edgeToNext().addClass("dashline");
  // av.step();

  // // Slide 3
  // av.umsg(interpret("sc3"));
  // itBox.show();
  // itLabel.show();
  // av.effects.copyValue(l.get(2), itBox, 0);
  // l.get(2).unhighlight();
  // pseudo.setCurrentLine("elem");
  // av.step();

  // // Slide 4
  // av.umsg(interpret("sc4"));
  // var dashLineTop = arrowAround(l.get(2), "top");
  // l.get(1).edgeToNext().hide();
  // Vline.hide();
  // itBox.unhighlight(0);
  // pseudo.setCurrentLine("setNext");
  // av.step();

  // // Slide 5
  // av.umsg(interpret("sc5"));
  // var dashLineDown = arrowAround(l.get(2), "down");
  // l.get(3).edgeToPrev().hide();
  // pseudo.setCurrentLine("setPrev");
  // av.step();

  // // Slide 6
  // av.umsg(interpret("sc6"));
  // curr.target(l.get(3));
  // pseudo.setCurrentLine("curr");
  // av.step();

  // // Slide 7
  // av.umsg(interpret("sc7"));
  // av.step();

  // // Slide 8
  // av.umsg(interpret("sc8"));
  // l.get(2).edgeToPrev().removeClass("dashline");
  // l.get(1).edgeToNext().removeClass("dashline");
  // l.remove(2);
  // l.get(1).edgeToNext().show();
  // l.layout();
  // dashLineTop.hide();
  // dashLineDown.hide();
  // Vline.show();
  // pseudo.setCurrentLine("size");
  // av.step();

  // // Slide 9
  // av.umsg(interpret("sc9"));
  // itBox.highlight(0);
  // pseudo.setCurrentLine("return");
  // av.recorded();
});
