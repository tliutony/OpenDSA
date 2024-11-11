/*global ODSA */
"use strict";
// Written by Pavel Hovhannisyan and Cliff Shaffer
$(document).ready(function () {
    var av_name = "binaryTreeHeight";
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
    interpret = config.interpreter,       // get the interpreter
    code = config.code;                   // get the code object
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]);

    // Slide 1
    av.umsg(interpret("sc1"));
    pseudo.setCurrentLine("sig");
    av.displayInit();


    // Slide 2
    av.umsg(interpret("sc2"));
    pseudo.setCurrentLine("public_return");
    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));
    //pseudo.setCurrentLine("base_case");
    pseudo.highlight("base_case");
    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    pseudo.highlight("recurse");
    pseudo.unhighlight("base_case");
    av.step();

    // Slide 5
    av.umsg(interpret("sc5"));
    pseudo.highlight("max");
    pseudo.unhighlight("recurse");
    av.step();
    // Slide 6
    av.umsg(interpret("sc6"));
    pseudo.highlight("return");
    pseudo.unhighlight("max");
    av.recorded();
});
