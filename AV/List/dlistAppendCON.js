/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// Dlist Append method
$(document).ready(function () {
  var av_name = "dlistAppendCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  // Relative offsets
  var leftMargin = 150;
  var topMargin = 35;

  // Box "it"
  var itBox = av.ds.array([15], {indexed: false, left: 40, top: topMargin});
  var itLabel = av.label("it", {left: 20, top: topMargin + 2});
  itBox.highlight();

  var l = av.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst("null").addFirst(10).addFirst(35).addFirst(8).addFirst(23).addFirst("null");
  l.layout();
  l.get(0).addSlash("left");
  var tailSlash = l.get(5).addSlash();
  var Vline = l.get(5).addVLine();
  var Vline1 = l.get(5).addVLine({ left: l.get(2).element.outerWidth() / 2 + 15 });
  var Vline2 = l.get(5).addVLine({ top: 25 });
  Vline1.hide();
  Vline2.hide();
  setPointer("head", l.get(0));
  var curr = setPointer("curr", l.get(2));
  setPointer("tail", l.get(5));

  // Slide 1
  av.umsg(interpret("av_c1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  var node = l.newNode("");
  node.css({
    top: 50,
    left: 410
  });
  node.highlight();
  node.next(l.get(5));
  l.get(5).prev(node);
  l.get(4).next(node);
  node.prev(l.get(1));
  l.get(4).edgeToNext().hide();
  l.get(5).edgeToNext().hide();
  l.get(5).edgeToPrev().hide();
  l.get(6).edgeToPrev().hide();
  l.layout({ updateTop: false });
  var longEdge = addEdge(l.get(4), l.get(6));
  tailSlash.hide();
  Vline.hide();
  Vline1.show();
  var newTailSlash = l.get(6).addSlash();
  pseudo.setCurrentLine("setPrev");
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  av.effects.copyValue(itBox, 0, node);
  av.step();

  // Slide 4
  av.umsg(interpret("av_c4"));
  l.get(5).edgeToNext().show();
  l.get(5).edgeToPrev().show();
  curr.target(l.get(2));
  av.step();

  // Slide 5
  av.umsg(interpret("av_c5"));
  longEdge.bottomEdge.hide();
  l.get(6).edgeToPrev().show();
  l.get(5).unhighlight();
  l.get(6).highlight();
  av.step();

  // Slide 6
  av.umsg(interpret("av_c6"));
  Vline1.hide();
  Vline2.show();
  l.get(4).highlight();
  l.get(6).unhighlight();
  l.get(4).edgeToNext().show();
  longEdge.topEdge.hide();
  pseudo.setCurrentLine("setNext");
  av.step();

  // Slide 7
  av.umsg(interpret("av_c7"));
  l.layout();
  l.get(4).unhighlight();
  l.get(5).highlight();
  Vline.show();
  Vline2.hide();
  av.step();

  // Slide 8
  av.umsg(interpret("av_c8"));
  l.get(5).unhighlight();
  pseudo.setCurrentLine("size");
  av.recorded();
});
