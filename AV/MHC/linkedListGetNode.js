/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Bad representation version for linked list
$(document).ready(function() {
    "use strict";
    var av_name = "linkedListGetNode";
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter,       // get the interpreter
        code = config.code;                   // get the code object
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]);
  
    // Set up the list
    // Box "it"
    av.label("index", {left: 0, top: -10});
    var itBox = av.ds.array(["2"], {indexed: false, top: -15, left: 40});

    av.label("i", {left: 20, top: 25});
    var iBox = av.ds.array([""], {indexed: false, top: 20, left: 40});

    var l = av.ds.list({nodegap: 30, top: 35, left: 257});
    l.addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20);
    l.layout();
    //l.get(2).addVLine();
  
    // Set up the various pointers
    var head = av.pointer("head", l.get(0));
    head.hide();
    var nextNode = av.pointer("nextNode", l.get(0));
    nextNode.hide();
    var tail = av.pointer("tail", l.get(4));
    tail.hide();
  
    // Slide 1
    av.umsg(interpret("sc1"));
    head.show();
    tail.show();
    pseudo.setCurrentLine("sig");
    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("sc2"));
    pseudo.setCurrentLine("checkIndex");
    av.step();
  
    // Slide 3
    av.umsg(interpret("sc3"));
    pseudo.setCurrentLine("nextNode");
    head.hide();
    nextNode.show();
    l.get(0).highlight();
    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    pseudo.setCurrentLine("for1");
    pseudo.highlight("for2");
    pseudo.highlight("for3");
    iBox.highlight();
    iBox.value(0, "0");
    //iBox.get(0) = "0";
    av.step();

    head.show();
    nextNode.target(l.get(1));
    l.get(0).unhighlight();
    l.get(1).highlight();
    iBox.value(0, "1");
    av.step();

    av.umsg(interpret("sc4"));
    nextNode.target(l.get(2));
    l.get(1).unhighlight();
    l.get(2).highlight();
    iBox.value(0, "2");
    av.step();

    // l.layout(); // resets the animations
    av.umsg(interpret("sc5"));
    pseudo.unhighlight("for2");
    pseudo.unhighlight("for3");
    pseudo.setCurrentLine("return");
    iBox.unhighlight();
    av.recorded();
  });
  