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

Recursively implementing height()
---------------------------------

.. inlineav:: binaryTreeHeight ss
   :long_name: Binary Tree Height Slide Show
   :links: AV/Binary/RecursiveDSCON.css
   :scripts: AV/MHC/binaryTreeHeight.js
   :output: show
   :keyword: Binary Trees; Binary Tree Terminology
