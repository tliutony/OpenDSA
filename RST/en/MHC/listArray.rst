.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: array-based list
   :topic: Lists
   :keyword: Array-based List Implementation


Array-Based List Implementation
===============================

Full Implementation
-------------------------------

Here is an implementation for the array-based list, named ``MHCArrayList``.
``MHCArrayList`` must implement all of the methods of the ``MHCList`` interface.

.. code-block:: java

   import java.util.Arrays;

    /**
    * Array-based list implementation of the MHCList interface.
    */
    public class MHCArrayList<E> implements MHCList<E> {
        private static final int DEFAULT_CAPACITY = 10; // Default capacity

        private E[] elements;   // Array holding list elements
        private int capacity;     // Maximum number of values that fit in the array
        private int size;    // Current number of elements in the list
        
        //private int curr;        // Position of the current element

        // Constructor
        @SuppressWarnings("unchecked") // Generic array allocation
        public MHCArrayList(int capacity) {
            this.capacity = capacity;
            size = 0;
            elements = (E[]) new Object[capacity];  // Create elements
        }

        // Create a list with the default capacity
        public MHCArrayList() {
            this(DEFAULT_CAPACITY);  // Just call the other constructor
        }  

        // Replaces the element at the specified position in this list with the specified element.
        public void set(int position, E o) {
            // Check that the position is valid
            if (position < 0 || position >= size) {
                throw new IndexOutOfBoundsException(position);
            }
            elements[position] = o;
        }

        // Returns the element at the specified position in this list.
        public E get(int position) {
            if (position < 0 || position >= size) {
                throw new IndexOutOfBoundsException(position);
            }
            return elements[position];
        }

        // Returns the number of elements in this list.
        public int size() {
            return size;
        }

        // Helper method to resize the array when it's full
        private void grow() {
            capacity = 2 * capacity;
            elements = Arrays.copyOf(elements, capacity);
        }

        // Appends the specified element to the end of this list.
        public void add(E o) {
            // If the array is full, make it bigger.
            if (size >= capacity) {
                grow();
            }
            elements[size] = o;
            size++; // We've added an element, increase the size of the list
        }

        // Inserts the specified element at the specified position in this list.
        public void add(int position, E o) {
            if (position < 0 || position > size) {
                throw new IndexOutOfBoundsException(position);
            }
            // If the array is full, make it bigger.
            if (size >= capacity) {
                grow();
            }
            // Shift elements to the right to make space at the position
            for (int i = size; i > position; i--) {
                elements[i] = elements[i - 1];
            }

            elements[position] = o;
            size++; // We've added an element, increase the size of the list
        }

        // Removes the element at the specified position in this list, and returns it.
        public E remove(int position) {
            // Check that the position is valid
            if (position < 0 || position >= size) {
                throw new IndexOutOfBoundsException(position);
            }
            
            E removedElement = elements[position];

            // Shift elements to the left
            for (int i = position; i < size - 1; i++) {
                elements[i] = elements[i + 1];
            }
            size--; // Update size
            
            return removedElement;
        }
    }

.. inlineav:: alistVarsCON ss
   :long_name: Array-based List Variables Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistVarsCON.js
   :output: show
   :keyword: Array-based List

.. inlineav:: alistIntroCON ss
   :long_name: Array-based List Intro Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistIntroCON.js
   :output: show
   :keyword: Array-based List


Add
------

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the ``insert``, ``append``,
and ``remove`` methods must maintain this property.

.. inlineav:: alistInsertCON ss
   :long_name: Array-based List Insertion Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistInsertCON.js
   :output: show


Insert Practice Exericse
~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistInsertPRO.html ka
   :long_name: Array-based List Insert Exercise
   :keyword: Array-based List


Append and Remove
-----------------

.. inlineav:: alistAppendCON ss
   :long_name: Array-based List Append Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistAppendCON.js
   :output: show
   :keyword: Array-based List

Removing an element from the head of the list is
similar to insert in that all remaining elements  must shift toward
the head by one position to fill in the gap.
If we want to remove the element at position :math:`i`, then
:math:`n - i - 1` elements must shift toward the head, as shown in the
following slideshow. 

.. inlineav:: alistRemoveCON ss
   :long_name: Array-based List Remove
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistRemoveCON.js
   :output: show
   :keyword: Array-based List

In the average case, insertion or removal each requires moving half
of the elements, which is :math:`\Theta(n)`.


Remove Practice Exericise
~~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistRemovePRO.html ka
   :long_name: Array-based List Remove Exercise
   :keyword: Array-based List

Aside from ``insert`` and ``remove``, the only other operations that
might require more than constant time are the constructor and
``clear``.
The other methods for Class ``AList`` simply
access the current list element or move the current position.
They all require :math:`\Theta(1)` time.


Array-based List Practice Questions
-----------------------------------

.. avembed:: Exercises/List/ALSumm.html ka
   :long_name: Array-based List Summary
   :keyword: Array-based List
