Binary Search Trees
===================

Binary Search Tree Definition
-----------------------------

A :term:`binary search tree` (:term:`BST`)
is a :term:`binary tree` that conforms to the
following condition, known
as the :term:`binary search tree property`:

- All :term:`nodes <node>` stored in the left subtree of a node whose :term:`key` value is :math:`K` have key values less than or equal to :math:`K`.

- All nodes stored in the right subtree of a node whose key value is :math:`K` have key values greater than :math:`K`.

Figure :num:`Figure #BSTShape` shows two BSTs for a collection of
values.
One consequence of the binary search tree property is that if the BST
nodes are printed using an
:ref:`inorder traversal <inorder traversal> <BinaryTreeTraversal>`,
then the resulting enumeration will be in
sorted order from lowest to highest.

.. _BSTShape:

.. inlineav:: BSTShapeCON dgm
   :links: AV/Binary/BSTShapeCON.css
   :scripts: AV/Binary/BSTShapeCON.js
   :align: justify
   :keyword: Binary Search Tree

   Two Binary Search Trees for a collection of values.
   Tree (a) results if values are inserted
   in the order 37, 24, 42, 7, 2, 42, 40, 32, 120.
   Tree (b) results if the same values are inserted in the
   order 120, 42, 42, 7, 2, 32, 37, 24, 40.

Below is a partial class declaration for a Binary Search Tree.

.. note::

    We will cover other methods in the BinarySearchTree class in following sections.

.. codeinclude:: MHC/BinarySearchTree
   :tag: BinarySearchTree


BST insert()
----------

We first look at how to insert a new node into a Binary Search Tree.

.. inlineav:: BSTinsertCON ss
   :long_name: BST Insert Slideshow
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTinsertCON.js
   :output: show
   :keyword: Binary Search Tree

Note that, except for the last node in the path, the recursive call to
``insert()`` will not actually change the child pointer for any of the
nodes that are visited.
In that sense, many of the assignments seem redundant.
However, the cost of these additional assignments is worth paying to
keep the insertion process simple.
The alternative is to check if a given assignment is necessary, which
is probably more expensive than the assignment!

The shape of a BST depends on the order in which elements are inserted.
A new element is added to the BST as a new leaf node,
potentially increasing the depth of the tree.
Figure :num:`Figure #BSTShape` illustrates two BSTs for a collection
of values.
It is possible for the BST containing :math:`n` nodes to be a chain of
nodes with height :math:`n`.
This would happen if, for example, all elements were inserted in
sorted order.
In general, it is preferable for a BST to be as shallow as
possible.
This keeps the average cost of a BST operation low.

