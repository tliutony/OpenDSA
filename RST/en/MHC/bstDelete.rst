Binary Search Trees Continued
=============================

We'll now wrap up our discussion of binary search trees by looking at how to search and delete nodes.

Below is the completed ``BinarySearchTree`` class with implementations for ``contains()`` and ``remove()``.

.. codeinclude:: MHC/BinarySearchTree
   :tag: BinarySearchTreeComplete

BST contains()
---------------

The ``contains()`` method leverages the ordered structure of the BST to search for the 
presence of a value in the tree.

.. note::

    This idea of recursively searching either the left or right subtree is similar to how 
    we split the array in half to search for an element in binary search!

.. inlineav:: BSTsearchCON ss
   :long_name: BST Search Slideshow
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTsearchCON.js
   :output: show
   :keyword: Binary Search Tree


BST remove()
------------

Removing a node from a binary search tree is trickier than inserting a node, but
we will see how we can break down the problem into a series of cases.


removeMax()
~~~~~~~~~~~

Before tackling the general node removal process, we will first see
how to remove the maximum value in a given subtree: ``removeMax()``. This method will be used later in our general ``remove()`` method.

.. inlineav:: BSTdeletemaxCON ss
   :long_name: BST deletemax Slideshow
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTdeletemaxCON.js
   :output: show
   :keyword: Binary Search Tree
