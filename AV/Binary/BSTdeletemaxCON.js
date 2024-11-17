/*global ODSA */
// deletemax slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "BSTdeletemaxCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);
  var bstTop = 40;
  var bt = av.ds.binarytree({top: bstTop, left: 40, visible: true, nodegap: 15});

  av.label("maxValue", {left: 60, top: 250});
  var maxValueBox = av.ds.array([20], {indexed: false, top: 247, left: 130});
  maxValueBox.hide();

  bt.root(10);
  var rt = bt.root();
  rt.left(5);
  rt.right(20);
  rt.right().left(12);
  rt.right().left().right(15);
  bt.layout();

  var rt1 = av.pointer("node", bt.root(), {anchor: "left top"});

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.highlight("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.unhighlight("sig");
  pseudo.highlight("basecase");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.highlight("storemax");
  bt.root().right().addClass("processing");
  pseudo.unhighlight("basecase");
  maxValueBox.show();
  maxValueBox.highlight(0);
  //av.effects.copyValue(rt.right().right(), maxValueBox, 0);
  av.step();


  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight("storemax");
  pseudo.highlight("setright");
  rt1.target(rt, {anchor: "left top"});
  rt.right(rt.right().left());
  var newedge = rt.edgeToRight();
  newedge.addClass("rededge");
  bt.layout();
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.unhighlight("setright");
  pseudo.highlight("returnmax");
  newedge.removeClass("rededge");

  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  pseudo.unhighlight("returnmax");
  pseudo.highlight("else");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudo.unhighlight("else");
  pseudo.highlight("rightrecursion");
  av.recorded();

  // // Slide 8
  // av.umsg(interpret("sc3"));
  // bt.root().addClass("processing");
  // rt1.target(rt.right(), {anchor: "right top"});
  // pseudo.setCurrentLine("sig");
  // av.step();

  // // Slide 4
  // av.umsg(interpret("sc4"));
  // pseudo.setCurrentLine("checknull");
  // av.step();

  // // Slide 5
  // av.umsg(interpret("sc5"));
  // pseudo.setCurrentLine("setright");
  // bt.root().removeClass("processing");
  // rt1.target(rt, {anchor: "left top"});
  // rt.right(rt.right().left());
  // var newedge = rt.edgeToRight();
  // newedge.addClass("rededge");
  // bt.layout();
  // av.step();

  // // Slide 6
  // av.umsg(interpret("sc6"));
  // rt1.arrow.addClass("thinredline");
  // // This line should not be needed, it is here to fix Raphael bug with arrows
  // rt1.arrow.css({stroke: "red"});
  // av.recorded();
});
