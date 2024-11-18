
/*global ODSA */
"use strict";
// Remove slideshow
$(document).ready(function () {
  var av_name = "BSTremoveTwoChildren";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);
  var temp1;

  var bstTop = 50;
  var bt = av.ds.binarytree({visible: true, nodegap: 15, top: bstTop, left: 0});
  bt.root(37);
  var rt = bt.root();
  rt.left(24);
  rt.left().left(7);
  rt.left().left().left(2);
  rt.left().right(32);
  rt.left().right().left(30);
  rt.right(42);
  rt.right().left(42);
  rt.right().left().left(40);
  rt.right().right(120);

  bt.layout();

  av.label("toRemove", {left: 60, top: 250});
  var toRemoveBox = av.ds.array([37], {indexed: false, top: 247, left: 130});

  var rt1 = av.pointer("node", bt.root(), {anchor: "left top"})

  av.umsg("Let's walk through the process of removing a node with two children from a BST. Here, we will remove the value 37.");
  pseudo.unhighlight("end");
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 38
  av.umsg("The root node contains the value that we want to delete.");
  pseudo.setCurrentLine("found");
  av.step();

  // Slide 39
  av.umsg("The left and right children are not null, so we are in the case where the node has two children.");
  pseudo.setCurrentLine("twochildren");
  av.step();

  av.umsg("We check and see that the left child does have a right child.");
  pseudo.setCurrentLine("leftnoright");
  av.step();

  av.umsg("Thus, we're in the case where we need to replace the root value with the maximum value in the left subtree.");
  pseudo.setCurrentLine("getmax");
  av.step();


  // Slide 42
  // av.umsg("");
  // pseudo.setCurrentLine("getmax");
  
  // tnode.addClass("processing");
  // //var rt2 = av.pointer("temp", tnode, {anchor: "right top", top: -10});
  // av.step();

  // Slide 43
  av.umsg("We call our removeMax method, which sets <code>node</code>'s value to be the largest value in the left subtree, 32.");
  var tnode = rt.left().right();
  tnode.addClass("processing");
  pseudo.setCurrentLine("removemax");
  av.effects.moveValue(tnode, rt);
  rt.addClass("rednode");
  av.step();

  // Slide 44
  av.umsg("removeMax will also remove the node with the maximum value, 32, in the left subtree.");
  // pseudo.setCurrentLine("returnmaxnode");
  rt.left().right(rt.left().right().left());
  var temp = rt.left().edgeToRight();
  temp.addClass("rededge");
  temp1 = rt.edgeToLeft();
  temp1.addClass("rededge");
  bt.layout();
  av.step();

  // Slide 45
  av.umsg("Now return the value of <code>node</code> (root of the updated subtree).");
  pseudo.setCurrentLine("returnmaxnode");
  rt1.arrow.addClass("thinredline");
  // This line should not be needed, but it is here to fix Raphael bug with arrows
  rt1.arrow.css({"stroke": "red"});
  av.step();
  
  // Slide 46
  av.umsg("We are now done deleting the old root node.");
  av.recorded();
});
