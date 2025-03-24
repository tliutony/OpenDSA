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


ArrayList Implementation
===============================

Full Implementation
-------------------

Below is a complete implementation for the array-based list, named ``MHCArrayList``.
``MHCArrayList`` must implement all of the methods of the ``MHCList`` interface.

.. note::

    We provide the full implementation for completeness, but we will focusing on only a few methods
    in the following sections.

.. codeinclude:: MHC/MHCArrayList
   :tag: MHCArrayList


How ArrayLists internally represent data
----------------------------------------

.. note::

    Make sure to click through all the animations until the green check mark shows up to see all the content!

.. inlineav:: alistIntroCON ss
   :long_name: Array-based List Intro Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistIntroCON.js
   :output: show
   :keyword: Array-based List

Instance variables and constructors
------------------------------------

.. inlineav:: alistVarsCON ss
   :long_name: Array-based List Variables Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistVarsCON.js
   :output: show
   :keyword: Array-based List



Below is the constructor for our ``MHCArrayList`` class:

.. codeinclude:: MHC/MHCArrayList
   :tag: MHCArrayListConstructor

We create a new empty array named ``elements`` that can hold 10 elements and initialize the ``capacity`` of the ArrayList to the length of the ``elements`` array. Because the programmer is creating a new ``MHCArrayList`` object, there are no data elements stored within it and so the ``size`` of the list begins at 0.

You'll notice that there is something a little unusual going on in the initialization of the ``elements`` array:

.. code-block:: java

   elements = (E[]) new Object[10];  // Initialize elements array to 10 by default


Since the type ``E`` is generic, we actually cannot instantiate an array of type ``E``. 
We instead have to create an array of ``Object`` and **cast** or "convert" it to a type of ``E[]``, which is done with the parentheses: ``(E[])``. 

.. note::

   We generally want to avoid using casting and instead use polymorphism to work with classes and subclasses. This is one of the few times we'll see casting this semester!


You'll also notice a line that begins with ``@`` above the constructor, which is called an **annotation**:

.. code-block:: java
   
   @SuppressWarnings("unchecked") // Generic array allocation

We include this because the Java compiler knows that casting to an unknown type ``E[]`` is a risky operation, so it will display a warning message if we compile the code.
The annotation tells Java not to worry, and that we really do want to make this cast. But this again goes to show that casting should be used sparingly, if at all!

.. note::

   Don't worry about the specific details of this constructor -- we have to use this syntax because of the way Java handles generic types. This is the only time we'll see this syntax this semester.

Adding elements to a given position: add(int index, E o)
-----------------------------------

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the ``add`` and ``remove`` 
methods must maintain this property.

.. inlineav:: alistInsertCON ss
   :long_name: Array-based List Insertion Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistInsertCON.js
   :output: show


add() Interactive Exericse
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistInsertPRO.html ka
   :long_name: Array-based List Insert Exercise
   :keyword: Array-based List

Adding elements to end of list: add(E o)
----------------------------------------

.. note::

    Notice that we can define two methods named ``add()`` with different behaviors. 
    That's because the two methods have different parameters, so Java can differentiate between which method is being called by the parameter types being passed in.
    This is known as **overloading**.


.. inlineav:: alistAppendCON ss
   :long_name: Array-based List Append Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistAppendCON.js
   :output: show
   :keyword: Array-based List

Removing elements at a given position: remove(int position)
-----------------------------------------------------------


Removing an element from the beginning of the list is
similar to ``add()`` in that all remaining elements  must shift toward
the beginning by one position to fill in the gap.
If we want to remove the element at position :math:`i`, then
:math:`n - i - 1` elements must shift toward the head, as shown in the
following widget. 

.. inlineav:: alistRemoveCON ss
   :long_name: Array-based List Remove
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistRemoveCON.js
   :output: show
   :keyword: Array-based List

In the worst case, insertion or removal each requires moving either :math:`n` or :math:`n-1` elements, which is :math:`O(n)`.

remove() Interactive Exericse
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistRemovePRO.html ka
   :long_name: Array-based List Remove Exercise
   :keyword: Array-based List

.. Array-based List Practice Questions
.. -----------------------------------

.. .. avembed:: Exercises/List/ALSumm.html ka
..    :long_name: Array-based List Summary
..    :keyword: Array-based List
