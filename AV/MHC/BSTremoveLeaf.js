/*global ODSA */
"use strict";
// Remove slideshow
$(document).ready(function () {
  var av_name = "BSTremoveLeaf";
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
  var toRemoveBox = av.ds.array([30], {indexed: false, top: 247, left: 130});

  var rt1 = av.pointer("node", bt.root(), {anchor: "left top"});

  // Slide 1
  av.umsg("Let's start with the case where the node we want to delete is a leaf node. Here we want to delete the node with value 30.");
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg("The first thing that we do is check if the root is null. Since it is not, we are going to be recursively descending the tree until we find the value that we are looking for (if it exists).");
  pseudo.setCurrentLine("checknull");
  av.step();


  // Slide 6
  av.umsg("Compare <code>node</code>'s value of 37 against the <code>toRemove</code> value of 30. ");
  pseudo.setCurrentLine("compare");
  av.step();

  // Slide 3
  av.umsg("Since 37 is greater than the value we want to delete (30), we will go left.");
  pseudo.highlight("checkless");
  pseudo.highlight("visitleft");
  av.step();

  // Slide 4
  rt.addClass("processing");
  pseudo.unhighlight("checkless");
  pseudo.unhighlight("visitleft");
  rt1.target(rt.left());
  av.umsg("Now we start the recursive call on remove() with 24 as the current node.");
  pseudo.setCurrentLine("sig");
  av.step();

  // Slide 5
  av.umsg("The subtree is not null.");
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 6
  av.umsg("Compare <code>node</code>'s value of 24 against the <code>toRemove</code> value of 30. ");
  pseudo.setCurrentLine("compare");
  av.step();

  // Slide 8
  av.umsg("Since 24 is less than the value we want to delete (30), we wil make a recursive call on the right subtree.");
  pseudo.setCurrentLine("visitright");
  av.step();

  // Slide 9
  rt.left().addClass("processing");
  rt1.target(rt.left().right(), {anchor: "right top"});
  av.umsg("Now we start the recursive call on remove() with 32 as the current node.");
  pseudo.setCurrentLine("sig");
  av.step();

  // Slide 10
  av.umsg("The subtree is not null.");
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 11
  av.umsg("Since 32 is greater than the value we want to delete (30), we will go left.");
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 12
  rt.left().right().addClass("processing");
  rt1.target(rt.left().right().left(), {anchor: "left top"});
  pseudo.setCurrentLine("sig");
  av.umsg("Start the recursive call again. As usual, we are going to check if the root is null, then if its value is greater or less than what we want to delete.");
  av.step();

  // Slide 13
  av.umsg("This time, we have found the value that we want to delete.");
  pseudo.setCurrentLine("found");
  av.step();

  // Slide 14
  av.umsg("Since the node with value 30 is a leaf node, we can just return null to remove it from the tree.");
  pseudo.unhighlight("found");
  pseudo.highlight("returnnull");
  av.step();
  
  // Slide 15
  av.umsg("Unwind the recursion, and set the left pointer of the node with value of 32 to null.");
  pseudo.unhighlight("returnnull");
  rt.left().right().removeClass("processing");
  rt1.target(rt.left().right(), {anchor: "right top"});
  rt.left().right().left(null);
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 16
  av.umsg("Now return the value of <code>node</code> (root of the updated subtree).");
  pseudo.setCurrentLine("returnrt");
  av.step();
  
  // Slide 17
  av.umsg("Unwind the recursion, and set the right pointer of the node with value of 24.");
  var temp = rt.left().edgeToRight();
  temp.addClass("rededge");
  rt.left().removeClass("processing");
  rt1.target(rt.left(), {anchor: "left top"});
  pseudo.setCurrentLine("visitright");
  av.step();

  // Slide 18
  av.umsg("Now return the value of <code>node</code> (root of the updated subtree).");
  pseudo.setCurrentLine("returnrt");
  av.step();
  
  // Slide 19
  av.umsg("Unwind the recursion, and set the left pointer of the node with value of 37.");
  temp1 = rt.edgeToLeft();
  temp1.addClass("rededge");
  rt.removeClass("processing");
  rt1.target(rt);
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 20
  av.umsg("Now return the value of <code>node</code> (root of the updated subtree).");
  pseudo.setCurrentLine("returnrt");
  av.step();
  
  // Slide 21
  av.umsg("Now we return from the initial call to remove(), setting the root of the tree to the result.");
  rt1.arrow.addClass("thinredline");
  // This line should not be needed, but it is here to fix Raphael bug with arrows
  rt1.arrow.css({"stroke": "red"});
  pseudo.setCurrentLine("returnrt");
  av.recorded();
});
