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
-------------------

Below is a complete implementation for the array-based list, named ``MHCArrayList``.
``MHCArrayList`` must implement all of the methods of the ``MHCList`` interface.

.. note::

    We provide the full implementation for completeness, but we will focusing on only a few methods
    in the following sections.

.. codeinclude:: MHC/MHCArrayList
   :tag: MHCArrayList

.. inlineav:: alistVarsCON ss
   :long_name: Array-based List Variables Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistVarsCON.js
   :output: show
   :keyword: Array-based List

Accessing elements using get()
------------------------------------

.. inlineav:: alistIntroCON ss
   :long_name: Array-based List Intro Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistIntroCON.js
   :output: show
   :keyword: Array-based List


Adding elements to a given position
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

Adding elements to end of list
------------------------------

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

Removing elements at a given position
-------------------------------------


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

In the average case, insertion or removal each requires moving half
of the elements, which is :math:`O(n/2) = O(n)`.

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
