$(document).ready(function() {
  "use strict";
  var av = new JSAV("BinNonTreeExamp", {animationMode: "none"});
  // Setup the tree
  var btTop = -5;
  var btLeft = 305;
  var bt = av.ds.binarytree({nodegap: 15, left: btLeft, top: btTop});
  bt.root("A");
  var rt = bt.root();
  rt.left("B");
  rt.left().right("E");

  rt.right("C");
  rt.right().left("E");
  rt.right().left().left("G");
  rt.right().right("F");

  bt.layout();
  av.displayInit();
  av.recorded();
});
