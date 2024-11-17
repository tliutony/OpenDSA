Binary Search Trees Continued
=============================

We'll now wrap up our discussion of binary search trees by looking at how to search and delete nodes.

Below is the completed ``BinarySearchTree`` class with implementations for ``contains()`` and ``remove()``.

.. codeinclude:: MHC/BinarySearchTree
   :tag: BinarySearchTreeComplete

BST contains
------------

The ``contains()`` method leverages the ordered structure of the BST to search for the 
presence of a value in the tree.

.. inlineav:: BSTsearchCON ss
   :long_name: BST Search Slideshow
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTsearchCON.js
   :output: show
   :keyword: Binary Search Tree