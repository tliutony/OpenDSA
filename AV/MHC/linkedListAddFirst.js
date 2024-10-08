/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Special cases for Linked list insertion
// This visualization basically needs to build a list, then rebuild it again.
// Because of this, some of the code in the second half is a bit ugly,
// things did not seem to work as smoothly as expected. This shows itself
// especially in weird offsets.
$(document).ready(function() {
    "use strict";
    var av_name = "linkedListAddFirst";
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter,       // get the interpreter
        code = config.code;                   // get the code object
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]);
  
    // Relative offsets
    var leftMargin = 27;
    var topMargin = 80;
  
    // Box "it"
    av.label("value", {left: 0, top: -10});
    var itBox = av.ds.array(["15"], {indexed: false, top: -15, left: 40});
    var l = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin});
    l.addFirst(42).addFirst(20).addFirst(12).addFirst(15);
    l.layout();
  
    var head = av.pointer("head", l.get(1));
    // var curr = av.pointer("curr", l.get(2), {anchor: "left top",
    //                                          myAnchor: "right bottom", left: 15});
    var tail = av.pointer("tail", l.get(3), {anchor: "right top",
                                             myAnchor: "left bottom", left: -10});
  

    l.get(0).hide();
    l.get(0).edgeToNext().hide();


    // Slide 1
    av.umsg(interpret("sc1"));
    itBox.highlight(0);
    pseudo.setCurrentLine("sig");
    av.displayInit();

    // Slide 2
    l.get(0).show();
    l.get(0).edgeToNext().show();
    l.get(0).highlight();
    av.umsg(interpret("sc2"));
    // var newNode = l.newNode(15);
    // newNode.css({top: 0, left: -60});
    // newNode.highlight();
    pseudo.setCurrentLine("sethead");
    // newNode.next(l.get(0));
    av.step();


    av.umsg(interpret("sc3"));
    head.target(l.get(0));
    av.step();


    av.umsg(interpret("sc4"));
    pseudo.setCurrentLine("nulltail");
    av.step();
    
    av.umsg(interpret("sc5"));
    pseudo.setCurrentLine("numElements");
    av.recorded();

    // // Slide 1
    
    // itBox.highlight(0);
    // 
  
    // // Slide 2
    
    // // Set the position for the new node
  
    // // Slide 3
    // av.umsg(interpret("sc3"));
    // av.step();
  
    // // Slide 4
    // av.umsg(interpret("sc4"));
    // av.step();
  
    // // Slide 5
    // var node = l.get(2).next();
    // l.get(2).edgeToNext();
    // l.get(2).next(newNode);
    // newNode.next(node);
    // newNode.unhighlight();
    // l.get(2).highlight();
    // l.layout({updateTop: false}); // Do not recalculate top coordinate
    // av.umsg(interpret("sc5"));
    // av.step();
  
    // // Slide 6
    // av.effects.copyValue(itBox, 0, l.get(2));
    // itBox.unhighlight(0);
    // av.umsg(interpret("sc6"));
    // pseudo.setCurrentLine("setelem");
    // av.step();
  
    // // Slide 7
    // l.layout();
    // tail.target(l.get(3), {anchor: "left top", myAnchor: "right bottom",
    //                        left: 15, top: -20});
    // l.get(2).unhighlight();
    // l.get(3).highlight();
    // av.umsg(interpret("sc7"));
    // pseudo.setCurrentLine("tail");
    // av.step();
  
    // // Slide 8
    // l.get(3).unhighlight();
    // av.umsg(interpret("sc8"));
    // pseudo.setCurrentLine("listSize");
    // av.step();
  
    // // Slide 9
    // // Reset the list for the next example
    // pseudo.setCurrentLine(0);
    // pseudo.setCurrentLine("sig");
    // av.umsg(interpret("sc9"));
    // l.removeFirst();
    // l.removeFirst();
    // l.removeFirst();
    // l.removeFirst();
    // l.addFirst("null");
    // l.addFirst("null");
    // bar1.hide();
    // itBox.highlight(0);
    // l.get(0).addVLine({left: 74});
    // head.target(l.get(0));
    // //curr.target(l.get(1));
    // tail.target(l.get(1));
    // l.layout();
    // av.step();
  
    // // Slide 10
    // var newNode2 = l.newNode("");
    // // Set the position for the new node
    // newNode2.css({top: 55, left: 148});
    // newNode2.highlight();
    // av.umsg(interpret("sc10"));
    // pseudo.setCurrentLine("setnext");
    // av.step();
  
    // // Slide 11
    // av.effects.copyValue(l.get(1), newNode2);
    // av.umsg(interpret("sc11"));
    // av.step();
  
    // // Slide 12
    // av.umsg(interpret("sc12"));
    // av.step();
  
    // // Slide 13
    // var node2 = l.get(1).next();
    // l.get(1).edgeToNext();
    // l.get(1).next(newNode2);
    // newNode2.next(node2);
    // newNode2.unhighlight();
    // l.get(1).highlight();
    // l.layout({updateTop: false}); // Do not recalculate top coordinate
    // av.umsg(interpret("sc13"));
    // av.step();
  
    // // Slide 14
    // av.effects.copyValue(itBox, 0, l.get(1));
    // itBox.unhighlight(0);
    // av.umsg(interpret("sc14"));
    // pseudo.setCurrentLine("setelem");
    // av.step();
  
    // // Slide 15
    // l.layout();
    // tail.target(l.get(2), {anchor: "left top", myAnchor: "right bottom",
    //                        left: 15, top: -20});
    // l.get(1).unhighlight();
    // l.get(2).highlight();
    // av.umsg(interpret("sc15"));
    // pseudo.setCurrentLine("tail");
    // av.step();
  
    // //step 16
    // l.get(2).unhighlight();
    // av.umsg(interpret("sc16"));
    // pseudo.setCurrentLine("listSize");
    // av.recorded();
  });
  