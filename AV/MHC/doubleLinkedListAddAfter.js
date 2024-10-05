/*global ODSA, addEdge */
// Written by Jun Yang and Cliff Shaffer
// Dlist Insertion
$(document).ready(function() {
  "use strict";
  var av_name = "doubleLinkedListAddAfter";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Relative offsets
  var leftMargin = 150;
  var topMargin = 40;

  // Box "it"
  av.label("it", {left: 23, top: topMargin + 3});
  var itBox = av.ds.array([15], {indexed: false, top: topMargin, left: 40});
  itBox.highlight();

  // JSAV list
  var l = av.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst(10).addFirst(35).addFirst(8).addFirst(23);
  l.layout();
  av.pointer("head", l.get(0));
  av.pointer("tail", l.get(3));
  var position = av.pointer("node", l.get(1));

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("ifTail");
  pseudo.highlight(3);
  av.step();
  
  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.unhighlight(3);
  var newNode = l.newNode(15);
  newNode.css({
    top: 50,
    left: 164
  });
  newNode.highlight();
  newNode.next(l.get(2));
  newNode.prev(l.get(1));
  l.get(2).prev(newNode);
  l.get(1).next(newNode);
  
  l.get(1).edgeToNext().hide();
  l.get(3).edgeToPrev().hide();
  newNode.edgeToNext().hide();
  newNode.edgeToPrev().hide();
  l.layout({updateTop: false});
  var longEdge = addEdge(l.get(1), l.get(3));
  pseudo.setCurrentLine("newNode");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.setCurrentLine("newSetPrev");
  newNode.edgeToPrev().show();
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.setCurrentLine("newSetNext");
  newNode.edgeToNext().show();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudo.setCurrentLine("nodeSetNext");
  longEdge.topEdge.hide();
  l.get(1).edgeToNext().show();
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudo.setCurrentLine("nextSetPrev");
  l.get(3).edgeToPrev().show();
  longEdge.bottomEdge.hide();
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo.setCurrentLine("numElements");
  l.layout();
  av.step();
  
  // // Slide 3
  // av.umsg(interpret("sc3"));
  // av.effects.copyValue(itBox, 0, node);
  // av.step();

  // // Slide 4
  // av.umsg(interpret("sc4"));
  // l.get(2).edgeToNext().show();
  // av.step();

  // // Slide 5
  // av.umsg(interpret("sc5"));
  // l.get(2).edgeToPrev().show();
  // av.step();

  // // Slide 6
  // av.umsg(interpret("sc6"));
  // curr.target(l.get(2));
  // av.step();

  // // Slide 7
  // av.umsg(interpret("sc7"));
  // l.get(1).highlight();
  // l.get(2).unhighlight();
  // l.get(1).edgeToNext().show();
  // longEdge.topEdge.hide();
  // pseudo.setCurrentLine("setNext");
  // av.step();

  // // Slide 8
  // av.umsg(interpret("sc8"));
  // longEdge.bottomEdge.hide();
  // l.get(3).edgeToPrev().show();
  // l.get(1).unhighlight();
  // l.get(3).highlight();
  // pseudo.setCurrentLine("setElem");
  // av.step();

  // // Slide 9
  // av.umsg(interpret("sc9"));
  // l.layout();
  // l.get(3).unhighlight();
  // l.get(2).highlight();
  // pseudo.setCurrentLine("size");
  // av.step();

  // // Slide 10
  // av.umsg(interpret("sc10"));
  // pseudo.setCurrentLine("return");
  // av.step();
  av.recorded();
});
