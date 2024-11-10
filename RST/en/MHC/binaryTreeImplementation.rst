Binary Tree Implementation
==========================

Nodes in a Binary Tree
----------------------

Much like how we implemented :ref:`linked lists <LinkedList>`, we define a ``BinaryTreeNode`` class to represent a node in a binary tree. 


.. codeinclude:: MHC/BinaryTreeNode
    :tag: BinaryTreeNode


Like our previous node classes, this class has a ``value`` instance variable to store the value of the node. Now, we store pointers to the node's left and right children in ``left`` and ``right`` instance variables.

There are also the usual getters and setters for the ``value`` and ``left`` and ``right`` instance variables. The one method additional method to note here is ``isLeaf()``, which returns ``true`` if the node is a leaf node (i.e. it has no children) and ``false`` otherwise:

.. codeinclude:: MHC/BinaryTreeNode
    :tag: isLeaf

BinaryTree class
----------------

Carrying over the same idea of our linked list implementations holding a ``head`` and ``tail`` pointer, our binary tree implementation will hold a ``root`` pointer. The ``root`` pointer will point to the root node of the binary tree. Below is a partial implementation of the ``BinaryTree`` class:

.. codeinclude:: MHC/BinaryTree
    :tag: BinaryTree


.. note::
    Notice that the ``size()`` and ``height()`` methods are defined recursively. We'll go over their implementations during lecture!

Binary Tree as a Recursive Data Structure
-----------------------------------------

A :term:`recursive data structure` is a data structure that is partially
composed of smaller or simpler instances of the same data structure.
For example, :term:`linked lists <linked list>` and
:term:`binary trees <binary tree>` can be viewed as recursive
data structures. 
A list is a recursive data structure because a list can be defined as
either (1) an empty list or (2) a node followed by a list.
A binary tree is typically defined as
(1) an empty tree or
(2) a node pointing to two binary trees, one its left child and the
other one its right child.

.. _ListRecDS:

.. inlineav:: ListRecDSCON dgm
   :links: AV/Binary/RecursiveDSCON.css
   :scripts: AV/Binary/ListRecDSCON.js
   :align: justify
   :keyword: Binary Trees; Binary Tree Terminology


.. _BinRecDS:

.. inlineav:: BinRecDSCON dgm
   :links: AV/Binary/RecursiveDSCON.css
   :scripts: AV/Binary/BinRecDSCON.js
   :align: justify
   :keyword: Binary Trees; Binary Tree Terminology
   
The recursive relationships used to define a structure provide a
natural model for any recursive algorithm on the structure.

.. inlineav:: SumBinaryTreeCON ss
   :long_name: Sum values in a Binary Tree Slide Show
   :links: AV/Binary/RecursiveDSCON.css
   :scripts: AV/Binary/SumBinaryTreeCON.js
   :output: show
   :keyword: Binary Trees; Binary Tree Terminology

Recursively implementing height()
---------------------------------

.. inlineav:: binaryTreeHeight ss
   :long_name: Binary Tree Height Slide Show
   :links: AV/Binary/RecursiveDSCON.css
   :scripts: AV/MHC/binaryTreeHeight.js
   :output: show
   :keyword: Binary Trees; Binary Tree Terminology
