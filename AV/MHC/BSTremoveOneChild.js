
/*global ODSA */
"use strict";
// Remove slideshow
$(document).ready(function () {
  var av_name = "BSTremoveOneChild";
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
  var toRemoveBox = av.ds.array([32], {indexed: false, top: 247, left: 130});

  var rt1 = av.pointer("node", bt.root(), {anchor: "left top"});

  // Slide 22
  av.umsg("Now let's see what happens when we remove 32, which has one child. We'll move through the recursive calls a little faster than the last animation.");
  pseudo.setCurrentLine("sig");
  pseudo.unhighlight("end");
  av.displayInit();

  //rt.left().right().left(30);
  //bt.layout();
  

  // Slide 23
  av.umsg("As always, the first thing that we do is check if the root is null. Since it is not, we are going to be recursively descending the tree until we find the value that we are looking for (if it exists).");
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 24
  av.umsg("Since 37 is greater than the value we want to delete (32), we go left.");
  pseudo.setCurrentLine("visitleft");
  rt.addClass("processing");
  rt1.target(rt.left());
  av.step();

  // Slide 25
  av.umsg("Since 24 is less than the value we want to delete (32), we go right.");
  pseudo.setCurrentLine("visitright");
  rt.left().addClass("processing");
  rt1.target(rt.left().right(), {anchor: "right top"});
  av.step();

  // Slide 26
  av.umsg("Now we have found the value that we want to delete.");
  pseudo.setCurrentLine("found");
  av.step();

  // Slide 27
  av.umsg("We check, and the left child is not null.");
  pseudo.setCurrentLine("checkleft");
  av.step();

  // Slide 28
  av.umsg("We check and find that the right child is null.");
  pseudo.setCurrentLine("checkright");
  av.step();

  av.umsg("So, our recursive calls end by returning a pointer to the left child to replace the node with value 32.");
  pseudo.setCurrentLine("returnright");
  av.step();

  // Slide 29
  av.umsg("Now we unwind the recursion, and set the right pointer of the node with value of 24 to the left child of the node with value of 32. This results in 30 being the right child of 24.");
  rt.left().removeClass("processing");
  rt1.target(rt.left(), {anchor: "left top"});
  rt.left().right(rt.left().right().left());
  var temp = rt.left().edgeToRight();
  pseudo.setCurrentLine("visitright");
  temp.addClass("rededge");
  bt.layout();
  av.step();

  // Slide 30
  av.umsg("Now return the value of <code>node</code>, which is the 'root' of the updated subtree.");
  pseudo.setCurrentLine("returnrt");
  av.step();
  
  // Slide 31
  av.umsg("Unwind the recursion, and set the left pointer of the node with value of 37.");
  temp1 = rt.edgeToLeft();
  temp1.addClass("rededge");
  rt.removeClass("processing");
  rt1.target(rt);
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 32
  av.umsg("Now return the value of <code>node</code>, which is the 'root' of the updated subtree.");
  pseudo.setCurrentLine("returnrt");
  av.step();
  
  // Slide 33
  av.umsg("Now we return from the initial call to remove(), setting the root of the tree to the result.");
  rt1.arrow.addClass("thinredline");
  // This line should not be needed, but it is here to fix Raphael bug with arrows
  rt1.arrow.css({"stroke": "red"});
  pseudo.setCurrentLine("returnrt");
  av.recorded();

});
