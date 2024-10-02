/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
//Array-Based list introduction
$(document).ready(function() {
  "use strict";
  var arrValues = [13, 12, 20, 8, 3, "", "", ""];
  var av_name = "alistIntroCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);
  var arr = av.ds.array(arrValues, {indexed: true});

  // Slide 1
  av.umsg(interpret("sc1"));
  arr.addClass([5, 6, 7], "unused");
  arr.highlight([0, 1, 2, 3, 4]);
  av.displayInit();

  av.umsg(interpret("sc2"));
  arr.highlight([0, 1, 2, 3, 4, 5, 6, 7]);
  av.step();

  av.umsg(interpret("sc3"));
  arr.unhighlight([0, 1, 2, 4, 5, 6, 7]);
  arr.highlight(3);
  av.step();
  
  av.umsg(interpret("sc4"));
  arr.unhighlight(3);
  arr.highlight(0);
  av.step();
  
  av.umsg(interpret("sc5"));
  arr.highlight([0,1,2,3,4]);
  //arr.unhighlight(0);
  av.step();
  
  av.umsg(interpret("sc6"));
  arr.unhighlight([0,1,2,3,4]);
  arr.highlight([5,6,7]);
  av.recorded();

//"sc5": "Random access to any element in the list is quite easy. Given some position $i$ in the list, the value of the element in that position can be accessed directly through <code>get(i)</code>.",
//"sc6": "Thus, access to any element using the <code>get()</code> method takes constant, or $O(1)$, time."

});
