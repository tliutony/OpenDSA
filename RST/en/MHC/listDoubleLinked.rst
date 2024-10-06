.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

Doubly Linked Lists
===================

Motivating Doubly Linked Lists
------------------------------

The **singly linked list** allows
for direct access from a list node only to the next node in the list.
A **doubly linked list** allows convenient access from a list node
to the next node and also to the preceding node on the list.
The doubly linked list node accomplishes this by
storing **two** pointers instead one: one to the "next" node following it (as in the singly
linked list), and a second pointer to the "previous" node preceding it:

.. inlineav:: doubleLinkedListDiagram dgm
   :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/MHC/doubleLinkedListDiagram.js
   :align: center
   :keyword: Doubly Linked List

While the code for the doubly linked operations tend to be a little longer than for the singly linked version, because we now maintain a previous and next pointer
our methods become more "symmetric," which can make them easier to implement and debug. 
Whether a list implementation is doubly or singly linked should be hidden from the ``List`` class user.
 
Node class implementation
-------------------------

Here is the complete implementation for a
``Node`` class to be used with doubly linked lists.
This code is a little longer than that for the singly linked list node
implementation since the doubly linked list nodes have an extra data member:

.. codeinclude:: MHC/DNode
   :tag: DNode


Note that the ``Node`` class is a generic class, so it can be used to store any type of data.
Also notice that the ``Node`` class has a constructor that takes a single argument, which is the data to be stored in the node -- with this constructor, the ``prev`` and ``next`` variables are set to ``null``.

addLast() implementation
-------------------------

The class declaration and methods for the doubly linked list class are nearly identical to the singly linked list version.

Let's walk through the ``addLast()`` method for a doubly linked list.

.. inlineav:: doubleLinkedListAddLast ss
   :long_name: Doubly Linked List AddLast
   :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/MHC/doubleLinkedListAddLast.js
   :output: show  
   :keyword: Doubly Linked List


.. note::

   It is important to set the new Node's ``prev`` before we change what ``tail`` points to. In general, we should set the new Node's ``prev`` and ``next`` **before** changing the pointers of nodes already in the list.

addAfter() implementation
-------------------------

The following illustrates the ``addAfter()`` method for a doubly linked list.

.. inlineav:: doubleLinkedListAddAfter ss
   :long_name: Doubly Linked List Add After
   :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/MHC/doubleLinkedListAddAfter.js
   :output: show   
   :keyword: Doubly Linked List


remove() a given node
--------------------

Here, we look at a slightly different ``remove`` method, where we pass in the node to be removed as an argument. This method demonstrates the benefit of maintaining a ``prev`` pointer in the node structure.

.. note::

    We haven't shown how to implement ``removeFirst()`` and ``removeLast()`` methods for doubly linked lists. How would you implement them?

.. inlineav:: doubleLinkedListRemoveNode ss
   :long_name: Doubly Linked List Remove
   :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/MHC/doubleLinkedListRemoveNode.js
   :output: show
   :keyword: Doubly Linked List

In a singly linked list, removing a node is not straightforward because you need to somehow locate the node before the node to be removed. This is not necessary in a doubly linked list, as you can directly access the previous node using the ``prev`` pointer.

Summarizing list operation efficiency
--------------------------------------

Here's a summary of the efficiency of common operations for singly and doubly linked lists: TODO decide on which operations to include here

.. Note that for singly linked lists, addLast and removeLast operations are O(n) because they require traversing the entire list to reach the last element. In contrast, doubly linked lists maintain a tail pointer, allowing these operations to be performed in constant time.
.. Add at position and remove at position are O(n) for both list types because in the worst case, you might need to traverse the entire list to reach the desired position.

You'll notice that the doubly linked list has the same efficiency or better for all operations. 
The primary disadvantage of the doubly linked list as compared to the singly linked list is the additional space used.
The doubly linked list requires two pointers per node, and so in the
implementation presented it requires twice as much overhead as the singly linked list.

.. Mangling Pointers
.. ~~~~~~~~~~~~~~~~~

.. There is a space-saving technique that can be employed to eliminate
.. the additional space requirement, though it will complicate the
.. implementation and be somewhat slower.
.. Thus, this is an example of a
.. space/time tradeoff.
.. It is based on observing that, if we store the sum of two values,
.. then we can get either value back by subtracting the other.
.. That is, if we store :math:`a + b` in variable :math:`c`, then
.. :math:`b = c - a` and :math:`a = c - b`.
.. Of course, to recover one of the values out of the stored summation,
.. the other value must be supplied.
.. A pointer to the first node in the list, along with the value of one
.. of its two link fields, will allow access to all of the remaining
.. nodes of the list in order.
.. This is because the pointer to the node must be the same as the value
.. of the following node's ``prev`` pointer, as well as the previous
.. node's ``next`` pointer.
.. It is possible to move down the list breaking apart the
.. summed link fields as though you were opening a zipper.

.. The principle behind this technique is worth remembering, as it
.. has many applications.
.. The following code fragment will
.. swap the contents of two variables without using a temporary variable
.. (at the cost of three arithmetic operations).

.. .. codeinclude:: Lists/DList
..    :tag: XOR

.. A similar effect can be had by using the exclusive-or operator.
.. This fact is widely used in computer graphics.
.. A region of the computer screen can be highlighted by
.. XORing the outline of a box around it.
.. XORing the box outline a second time restores the original
.. contents of the screen.
