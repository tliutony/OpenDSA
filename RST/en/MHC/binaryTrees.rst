Binary Trees
============

Introduction
------------

:term:`Tree <tree>` structures enable efficient access and efficient
update to large collections of data.
:term:`Binary trees <binary tree>`, where each node has at most two children,
are widely used and relatively easy to implement.
But binary trees are useful for many things besides searching.
Just a few examples of applications that trees can speed up include prioritizing jobs through the **heap** data structure,
describing mathematical expressions through **expression trees**,
or organizing the information needed to drive **data compression algorithms** through **Huffman trees**.


Binary Tree Terminology
-----------------------

A :term:`binary tree` is made up of a finite set of elements
called :term:`nodes <node>`.
This set either is empty or consists of a node called the
:term:`root` together with two binary trees, called the left and
right 
:term:`subtrees <subtree>`, which are **disjoint** from each other and
from the root. Disjoint here means that they have no nodes in common.

For a given node, the two nodes directly connected to it are called its :term:`children <child>`.
There is an :term:`edge` from a node to each of its children, and a node is said to be the :term:`parent` of its children.

If there is a path from node A to node B, 
then A is an :term:`ancestor` of B, and B is a :term:`descendant` of A. 
For example, if you can follow edges down from node A to eventually reach node B, then A is an ancestor of B, and B is a descendant of A. Thus, all nodes in the tree are descendants of the root of the tree, while the root is the ancestor of all nodes. 

The :term:`depth` of a node in the tree is the length of the path from the root of the tree to that node. The :term:`depth` of a node :math:`M` in the tree is the length
of the path from the root of the tree to :math:`M`.
All nodes of depth :math:`d` are at :term:`level` :math:`d` in the tree. The :term:`height` of a tree is the depth of the deepest node in the tree. A :term:`leaf node` is any node that has no children.


.. inlineav:: BinExampCON dgm
   :links: AV/Binary/BinExampCON.css
   :scripts: AV/Binary/BinExampCON.js
   :align: justify
   :keyword: Binary Trees; Binary Tree Terminology

.. note::

    The tree above has the following properties:

    - Node A is the root of the tree.
    - Nodes B and C are children of A.
    - Nodes A, C, and E are ancestors of G.
    - Nodes D, G, H, and I are leaves.
    - The height of this tree is 4.

Two specific forms of binary trees are particularly important and have special names:

- A **full binary tree** is a binary tree in which every node has either zero or two children.
- A **complete binary tree** is a binary tree of height :math:`d` where all levels except possibly level :math:`d` are completely full. The bottom level has its nodes filled in from the left side. In the figure below, tree (a) on the left is a full binary tree, while tree (b) on the right is a complete binary tree. 

.. inlineav:: FullCompCON dgm
   :links: AV/Binary/FullCompCON.css
   :scripts: AV/Binary/FullCompCON.js
   :align: center
   :keyword: Binary Trees; Binary Tree Terminology

.. note::

   Notice that a complete binary tree is not necessarily a full binary tree -- tree (a) is full but not complete, while tree (b) is complete but not full. We'll see complete binary trees in the heap data structure later on.

