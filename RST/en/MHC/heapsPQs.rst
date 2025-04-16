Heaps and Priority Queues
=========================


Priority Queues
---------------

There are many situations, both in real life and in computing
applications, where we wish to choose the next "most important"
from a collection of people, tasks, or objects.
For example, doctors in a hospital emergency room often choose to see
next the "most critical" patient rather than the one who arrived
first.
When scheduling programs for execution in a multitasking
operating system, at any given moment there might be several programs
(usually called :term:`jobs <job>`) ready to run.
The next job selected is the one with the highest
:term:`priority`. 
Priority is indicated by a particular value associated with the job
(and might change while the job remains in the wait list).

When a collection of objects is organized by importance or priority,
we call this a :term:`priority queue`. We consider the following operations for our priority queue:

- ``void insert(T element)``: Add an element to the priority queue.
- ``T remove()``: Remove and return the element with the highest priority.
- ``T peek()``: Return the element with the highest priority without removing it.

We can then define a priority queue **interface**:

.. note::

    Notice that the generic type ``T`` must extend ``Comparable<T>``, just like how we did for our binary search tree!

.. codeinclude:: MHC/MHCPriorityQueue
   :tag: MHCPriorityQueue




A normal queue data structure will not implement a priority queue
efficiently because search for the element with highest priority will
take :math:`O(n)` time. A list, whether sorted or not, will also require :math:`O(n)`
time for either insertion or removal.
A BST that organizes records by priority could be used, insert and remove operations
requiring :math:`O(\log n)` time if the BST is balanced. 

However, there is always the possibility that the BST will become
unbalanced, leading to bad performance. Instead, we would like to find a data structure that is guaranteed to have good performance for this special application.

Heap Properties
---------------

A heap is a binary tree defined by two properties:

1. It is a **complete** binary tree, meaning that all levels of the tree are fully filled except for the last level, which is filled from left to right.

2. The values stored in the tree are partially ordered, meaning that there is a relationship between the value stored at any node and the values of its children.

There are two variants of the heap, depending on the definition of this partial ordering:

- A **max heap** has the property that every node stores a value that is **greater than or equal to** the value of either of its children. Because the root has a value greater than or equal to its children, which in turn have values greater than or equal to their children, the root stores the maximum of all values in the tree.

- A **min heap** has the property that every node stores a value that is **less than or equal to** the value of either of its children. Because the root has a value less than or equal to its children, which in turn have values less than or equal to their children, the root stores the minimum of all values in the tree.

.. note::

    In lecture, we will use a min heap, but the readings will use a max heap for the examples. The structure of the code will be the same, we just need to reverse the comparisons in the code!

Note that there is no necessary relationship between the value of a
node and that of its sibling in either the min heap or the max heap.
For example, it is possible that the values for all nodes in the left
subtree of the root are greater than the values for every node of the
right subtree. We can contrast BSTs and heaps by the strength of their ordering
relationships.

A BST defines a :term:`total order` on its nodes in that,
given the positions for any two nodes in the tree, the one to the
"left" (equivalently, the one appearing earlier in an inorder
traversal) has a smaller key value than the one to the "right".
In contrast, a heap implements a **partial order**. Given their positions, we can determine the relative order for the key values of two nodes in the heap *only* if one is adescendant of the other.

Heap insert()
-------------

One way to build a heap is to insert the elements one at a time. Unlike the BST insert, we do not start at the root and work our way down to the appropriate leaf node. Instead, we insert the new value as a leaf node, and then "percolate it up" to its correct position.

.. note::

    The following animations are for a **max heap**, unlike the min heaps we will discuss in lecture. You'll also see that the animations show some array operations. Don't worry about the arrays for now and focus on heap operation concepts -- we will discuss the array-based implementation in the next section.

.. inlineav:: heapinsertCON ss
   :long_name: Heap insert Slideshow
   :links: 
   :scripts: DataStructures/binaryheap.js AV/Binary/heapinsertCON.js
   :output: show
   :keyword: Heap

Since the heap is a **complete** binary tree, it is necessarily balanced, and its height is guaranteed to be the minimum possible.

In particular, a heap containing :math:`n` nodes will have a height of
:math:`O(\log n)`.

Intuitively, we can see that this must be true because each level that
we add will slightly more than double the number of nodes in the tree
(the :math:`i` th level has :math:`2^i` nodes,
and the sum of the first :math:`i` levels is :math:`2^{i+1}-1`).
Starting at 1, we can double only :math:`\log n` times to reach a
value of :math:`n`.

Each call to ``insert`` takes :math:`O(\log n)` time in the
worst case, because the value being inserted can move at most the
distance from the bottom of the tree to the top of the tree.

Heap remove()
-------------

To implement the priority queue ``remove`` operation, we need to remove the root node of the heap. To do this, we replace the root with the last leaf node, and then "trickle it down" to its correct position. Specifically, we compare the new root to its children and swap it with the **larger child** if it is smaller than either of its children. We continue this process until the new root is greater than or equal to both of its children.

.. note::

    Another reminder that this is for a **max heap**. If you are implementing a min heap, you will need to reverse the comparisons in the code!

.. inlineav:: heapmaxCON ss
   :long_name: Remove Max Slideshow
   :links: 
   :scripts: DataStructures/binaryheap.js AV/Binary/heapmaxCON.js
   :output: show
   :keyword: Heap

Again, because the heap is :math:`O(\log n)` levels deep, the cost of removing
the maximum element is :math:`O(\log n)`.


Heap priority queue operation costs
-----------------------------------

Below are the costs of the heap operations for priority queues.

.. table:: Efficiency of Heap Operations
    :align: center

    +--------------+-----------------------+
    | Operation    | Time complexity       |
    +==============+=======================+
    | insert()     | O(log n)              |
    +--------------+-----------------------+
    | remove()     | O(log n)              |
    +--------------+-----------------------+
    | peek()       | O(1)                  |
    +--------------+-----------------------+

