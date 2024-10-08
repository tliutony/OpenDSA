/*global ODSA, setPointer, addEdge */
// Written by Jun Yang and Cliff Shaffer
// Dlist Append method
$(document).ready(function() {
  "use strict";
  var av_name = "doubleLinkedListAddLast";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Relative offsets
  var leftMargin = 150;
  var topMargin = 35;

  // Box "it"
  var itBox = av.ds.array([15], {indexed: false, left: 60, top: topMargin});
  av.label("element", {left: 0, top: topMargin + 2});
  itBox.highlight();

  var l = av.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst(10).addFirst(35).addFirst(8).addFirst(23);
  l.layout();
  // var Vline = l.get(5).addVLine();
  // var Vline1 = l.get(5).addVLine({left: l.get(2).element.outerWidth() / 2 + 15});
  // var Vline2 = l.get(5).addVLine({top: 25});
  // Vline1.hide();
  // Vline2.hide();
  av.pointer("head", l.get(0));
  var tail = av.pointer("tail", l.get(3));

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();


  // Slide 2
  av.umsg(interpret("sc2"));
  var node = l.newNode("15");
  node.css({top: 0, left: 360});
  node.highlight();
  //l.get(3).next(node);
  //node.prev(l.get(3));
  // l.get(3).edgeToNext().hide();
  
  // l.layout({updateTop: false});
  // var longEdge = addEdge(l.get(), l.get(6));
  // Vline.hide();
  // Vline1.show();
  pseudo.setCurrentLine("createNode");
  av.step();

  // // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.setCurrentLine("ifEmpty");
  av.step();


  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.setCurrentLine("newTail");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.setCurrentLine("setNext");  
  l.get(3).next(node);
  l.layout({updateTop: false});
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudo.setCurrentLine("setPrev");
  node.prev(l.get(3));
  l.layout({updateTop: false});
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudo.setCurrentLine("updateTail");
  tail.target(l.get(4));
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo.setCurrentLine("numElements");
  av.recorded();

  // // Slide 4
  // av.umsg(interpret("sc4"));
  // l.get(5).edgeToNext().show();
  // l.get(5).edgeToPrev().show();
  // position.target(l.get(2));
  // av.step();

  // // Slide 5
  // av.umsg(interpret("sc5"));
  // longEdge.bottomEdge.hide();
  // l.get(6).edgeToPrev().show();
  // l.get(5).unhighlight();
  // l.get(6).highlight();
  // av.step();

  // // Slide 6
  // av.umsg(interpret("sc6"));
  // Vline1.hide();
  // Vline2.show();
  // l.get(4).highlight();
  // l.get(6).unhighlight();
  // l.get(4).edgeToNext().show();
  // longEdge.topEdge.hide();
  // pseudo.setCurrentLine("setNext");
  // av.step();

  // // Slide 7
  // av.umsg(interpret("sc7"));
  // l.layout();
  // l.get(4).unhighlight();
  // l.get(5).highlight();
  // Vline.show();
  // Vline2.hide();
  // av.step();

  // // Slide 8
  // av.umsg(interpret("sc8"));
  // l.get(5).unhighlight();
  // pseudo.setCurrentLine("size");
  // av.recorded();
});
