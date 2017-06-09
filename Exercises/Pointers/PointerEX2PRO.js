/*global JSAV, window */
(function() {
  "use strict";

  var av, // The JSAV object
      nullNode, // Used to trace the node pointed by 'third' pointer.
      johnNode, // Used to trace the node pointed by 'first' pointer.
      samNode, // Used to trace the node pointed by 'second' pointer.
      first,
      second,
      third,
      selected_pointer, // Remember pointer object that has been selected by user for swap
      selected_node; // Remember node that has been selected by user for swap

  var pointerEX2PRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    // Helper function for setting pointer
    setPointer: function(pname, newnode, oldpointer) {
      // Click the node that the pointer is already pointing
      if (oldpointer) {
        if (newnode === oldpointer.target()) { return null; }
      }

      // Two pointers are already pointing the node
      if (newnode.llist_pleft && newnode.llist_pright) { return null; }

      //Create Right Pointer
      var pointerRight = {visible: true, anchor: "right top",
                          myAnchor: "left bottom",
                          left: -5, top: -20};

      //Create Left Pointer
      var pointerLeft = {visible: true, anchor: "left top",
                         myAnchor: "right bottom",
                         left: 15, top: -20};

      //Remove old pointer and copy it to create again
      if (oldpointer) {
        if (oldpointer.target().llist_pleft === oldpointer) {
          oldpointer.target().llist_pleft = null;
        } else if (oldpointer.target().llist_pright === oldpointer) {
          oldpointer.target().llist_pright = null;
        }
        // Remove the old pointer
        oldpointer.element.remove();
        oldpointer.arrow.element.remove();
      }

      // If nothing is pointhing (left pointer is empty), insert left poitner.
      // Otherwise, insert right pointer
      // (when there is already left pointer for the node)
      if (!newnode.llist_pleft) {
        newnode.llist_pleft = newnode.jsav.pointer(pname, newnode, pointerLeft);
        newnode.llist_pleft.click(pointerEX2PRO.pclick);
        return newnode.llist_pleft;
      } else if (!newnode.llist_pright) {
        newnode.llist_pright = newnode.jsav.pointer(pname, newnode, pointerRight);
        newnode.llist_pright.click(pointerEX2PRO.pclick);
        return newnode.llist_pright;
      }
    },

        // Handler for clicking on a pointer object
    pclick: function(pointer) {
      if (selected_pointer === null) { // No currently selected pointer object
        if (selected_node !== null) { // Release previously selected node value
          selected_node.removeClass(0, "bgColor");
          selected_node = null;
        }
        selected_pointer = pointer;
        selected_pointer.element.addClass("highlight");
      } else if (selected_pointer === pointer) { // Re-clicked slected pointer
        selected_pointer.element.removeClass("highlight");
        selected_pointer = null;
      } else { // Reselecting a new pointer
        selected_pointer.element.removeClass("highlight");
        selected_pointer = pointer;
        selected_pointer.element.addClass("highlight");
      }
      pointerEX2PRO.userInput = true;
    },

    clickHandler: function(){
      if(selected_pointer !== null){
        if(selected_pointer.target() !== this){
          pointerEX2PRO.setPointer(selected_pointer.element.text(), this, selected_pointer);
        }
          selected_pointer.removeClass("highlight");
          selected_pointer = null;
      }

      pointerEX2PRO.userInput = true;
    },

    setSalaryClickHandler: function(){
      if(selected_pointer !== null){
        if(selected_pointer.target() === johnNode){
          johnNode[0].label("John, 3000")
        }
          selected_pointer.removeClass("highlight");
          selected_pointer = null;
      }
      pointerEX2PRO.userInput = true;
    },

    labelClickHandler: function(){
      if(selected_pointer !== null){
        if(this.hasClass("samLabel")){
          if(selected_pointer.target() !== samNode){
            pointerEX2PRO.setPointer(selected_pointer.element.text(), samNode, selected_pointer);
          }
        } else if(this.hasClass("johnLabel")){
          if(selected_pointer.target() !== johnNode){
            pointerEX2PRO.setPointer(selected_pointer.element.text(), johnNode, selected_pointer);
          }
        }
          selected_pointer.removeClass("highlight");
          selected_pointer = null;
      }
      pointerEX2PRO.userInput = true;
    },



      // Reinitialize the exercise.
    reset: function() {
      // JSAV-List position.
      var leftMargin = 50,
          topMargin = 250;
      // Reset the value of global variables.
      pointerEX2PRO.userInput = false;
      selected_node = null;
      selected_pointer = null;

      // Clear the old JSAV canvas.
      if ($("#PointerEX2PRO")) { $("#PointerEX2PRO").empty(); }

      // Set up the display
      av = new JSAV("PointerEX2PRO");
      var codes = [];
      codes[0] = "third = first;";
      codes[1] = "third.setSalary(3000);";
      av.code(codes);

      var width = 60;
      var wGap = 170;

      var topP = topMargin;

      var johnP = leftMargin;
      var samP = johnP + wGap;
      var nullP = samP + wGap;

      // Create nodes
      nullNode = av.ds.array([""], {top: topP, left: nullP});
      johnNode = av.ds.array(["John, 1000"], {top: topP, left: johnP});
      samNode = av.ds.array(["Sam, 2000"], {top: topP, left: samP});
      nullNode.css(0, {"box-shadow": "none", "border-width": 0, "background-color": "transparent"});

      // Create pointers
      first = pointerEX2PRO.setPointer("first", johnNode);
      second = pointerEX2PRO.setPointer("second", samNode);
      third = pointerEX2PRO.setPointer("thrid", nullNode);

      av.displayInit();
      av.recorded();

      johnNode.click(pointerEX2PRO.clickHandler);
      samNode.click(pointerEX2PRO.clickHandler);
    },

    // Initialise the exercise
    initJSAV: function() {

      pointerEX2PRO.reset();

      $("#setSalary").click(function() {
        pointerEX2PRO.setSalaryClickHandler();
      });

      // Set up handler for reset button
      $("#reset").click(function() {
        pointerEX2PRO.reset();
      });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      if(nullNode.llist_pleft != null ^ nullNode.llist_pright != null){
        if(nullNode.llist_pleft != null){
            if(nullNode.llist_pleft.element.text() != "first"){
              return false;
            }
          } else {
            if(nullNode.llist_pright.element.text() != "first"){
              return false;
            }
          }
        } else {
          return false;
        }

        if(johnNode.llist_pleft != null ^ johnNode.llist_pright != null){
          if(johnNode.llist_pleft != null){
              if(johnNode.llist_pleft.element.text() != "third"){
                return false;
              }
            } else {
              if(johnNode.llist_pright.element.text() != "third"){
                return false;
              }
            }
          } else {
            return false;
          }

          if(samNode.llist_pleft != null ^ samNode.llist_pright != null){
            if(samNode.llist_pleft != null){
                if(samNode.llist_pleft.element.text() != "second"){
                  return false;
                }
              } else {
                if(samNode.llist_pright.element.text() != "second"){
                  return false;
                }
              }
            } else {
              return false;
            }
        return true;
    },
  };

  window.pointerEX2PRO = window.pointerEX2PRO || pointerEX2PRO;
}());
