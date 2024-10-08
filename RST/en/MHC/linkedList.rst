Linked Lists
============

Nodes
-----

In this module we present one of the two traditional implementations
for lists, usually called a :term:`linked list`.
The linked list uses **dynamic memory allocation**,
that is, it allocates memory for new list elements as needed.
The following diagram illustrates the linked list concept.
Here there are three :term:`nodes <node>` that
are "linked" together.
Each node has two boxes.
The box on the right holds a link to the next node in the list.
Notice that the rightmost node has a diagonal slash through its link
box, signifying that there is no link coming out of this box.

.. _LinkedListNodes:

.. inlineav:: llistRepCON dgm
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistRepCON.js
   :align: center
   :keyword: Linked List

Because a list node is a distinct object (as opposed to simply a cell
in an array), it is good practice to make a separate list node class.
(We can also re-use the list node class to implement linked
implementations for the :ref:`stack <stack> <Stack>` and
:ref:`queue <queue> <Queue>` data structures.)
Here is an implementation for list nodes, called the ``Node`` class.
Objects in the ``Node`` class contain an ``data`` field to
store the element value, and a ``next`` field to store a pointer to
the next node on the list.
The list built from such nodes is called a :term:`singly linked list`,
or a :term:`one-way list`, because each list node
has a single pointer to the next node on the list.

.. codeinclude:: MHC/Node
   :tag: Node

The ``Node`` class is quite simple.
There are two forms for its constructor, one with
an initial element value and one without.
Methods allow the Node user to get or set the ``data``
and ``next`` fields.

Now, let's take a conceptual look at a LinkedList:

.. inlineav:: llistBadCON ss
   :long_name: Linked List Slideshow 1
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistBadCON.js
   :output: show
   :keyword: Linked List


.. Why This Has Problems
.. ~~~~~~~~~~~~~~~~~~~~~

.. There are a number of problems with the representation just
.. described.
.. First, there are lots of special cases to code for.
.. For example, when the list is empty we have
.. no element for ``head``, ``tail``, and ``curr`` to point to.
.. Implementing special cases for ``insert`` and ``remove``
.. increases code complexity, making it harder to understand,
.. and thus increases the chance of introducing bugs.

.. .. inlineav:: llistBadDelCON ss
..    :long_name: Linked List Slideshow 2
..    :links: AV/List/llistCON.css
..    :scripts: AV/List/llist.js AV/List/llistBadDelCON.js
..    :output: show
..    :keyword: Linked List
   

.. A Better Solution
.. ~~~~~~~~~~~~~~~~~

.. Fortunately, there is a fairly easy way to deal with all of the
.. special cases, as well as the problem with deleting the last node.
.. Many special cases can be eliminated by implementing
.. linked lists with an additional :term:`header node`
.. as the first node of the list.
.. This header node is a link node like any other, but its value is
.. ignored and it is not considered to be an actual element of the list.
.. The header node saves coding effort because we no longer need to
.. consider special cases for empty lists or when the current position is
.. at one end of the list.
.. The cost of this simplification is the space for the header node.
.. However, there are space savings due to smaller code size,
.. because statements to handle the special cases are omitted.
.. We get rid of the remaining special cases related to being at the end
.. of the list by adding a "trailer" node that also never stores a
.. value.

.. The following diagram shows initial conditions for a linked list
.. with header and trailer nodes.


.. .. _LinkedListInit:

.. .. inlineav:: llistInitCON dgm
..    :links: AV/List/llistCON.css
..    :scripts: AV/List/llist.js AV/List/llistInitCON.js
..    :align: center
..    :keyword: Linked List

.. Here is what a list with some elements looks like with the header and
.. trailer nodes added.
   
.. .. _LinkedListTailer:

.. .. inlineav:: llistHeaderCON dgm
..    :links: AV/List/llistCON.css
..    :scripts: AV/List/llist.js AV/List/llistHeaderCON.js
..    :align: center
..    :keyword: Linked List

.. Adding the trailer node also solves our problem with deleting the last
.. node on the list, as we will see when we take a closer look at the
.. remove method's implementation.


Linked List Partial Implementation
----------------------------------

Now let's look at a (partial) implementation for the linked list class,
named ``MHCLinkedList``.

.. note::

    We'll go over the rest of the implementation in lecture and in Lab 5!

.. codeinclude:: MHC/MHCLinkedList
   :tag: MHCLinkedList

|

Linked List Instance Variables
------------------------------

.. inlineav:: llistVarsCON ss
   :long_name: Linked List Variables Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistVarsCON.js
   :output: show
   :keyword: Linked List

|

.. .. inlineav:: llistConsCON ss
..    :long_name: Linked List Constructors Slideshow
..    :links: AV/List/llistCON.css
..    :scripts: AV/List/llist.js AV/List/llistConsCON.js
..    :output: show
..    :keyword: Linked List

.. |

addFirst() and addAfter()
-------------------------

In order to get to implementing the ``add(int position, E element)`` method of the ``List`` interface, it is
useful to first think about how to add to the beginning of the list, and also how to add after a particular node:


.. inlineav:: linkedListAddFirst ss
   :long_name: Linked List addFirst Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/MHC/linkedListAddFirst.js
   :output: show
   :keyword: Linked List
   
.. inlineav:: linkedListAddAfter ss
   :long_name: Linked List addAfter Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/MHC/linkedListAddAfter.js
   :output: show
   :keyword: Linked List   

Linked List Traversal and getNode()
-----------------------------------

Unlike ArrayLists, we don't have direct access to elements at a specified index position.
Instead, we have to traverse and walk down the Linked List to find the element at a position:

.. inlineav:: linkedListGetNode ss
   :long_name: Linked List getNode
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/MHC/linkedListGetNode.js
   :output: show
   :keyword: Linked List


Linked List add(int position, E element)
----------------------------------------

Putting everything together, we can implement the List ``add(int position, E element)`` method:

.. codeinclude:: MHC/MHCLinkedList
   :tag: add


.. .. inlineav:: linkedListAdd ss
..    :long_name: Linked List add
..    :links: AV/List/llistCON.css
..    :scripts: AV/List/llist.js AV/MHC/linkedListAdd.js
..    :output: show
..    :keyword: Linked List


.. Linked List Remove
.. ------------------

.. .. inlineav:: llistRemoveCON ss
..    :long_name: Linked List Remove Slideshow
..    :links: AV/List/llistCON.css
..    :scripts: AV/List/llist.js AV/List/llistRemoveCON.js
..    :output: show
..    :keyword: Linked List

.. .. avembed:: Exercises/List/LlistRemovePRO.html ka
..    :long_name: Linked List Remove Exercise
..    :keyword: Linked List