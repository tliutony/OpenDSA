Binary Tree Traversals
======================

Often we wish to process a binary tree by "visiting" each of its
nodes, each time performing a specific action such as printing the
contents of the node.
Any process for visiting all of the nodes in some order is
called a :term:`traversal`.
Any traversal that lists every node in the tree exactly once is
called an :term:`enumeration` of the tree's nodes.
Some applications do not require that the nodes be visited in any
particular order as long as each node is visited precisely once.
For other applications, nodes must be visited in an order that
preserves some relationship.

In the following examples, we will be calling the ``visit()`` method
on each node. The definition below simply prints the value of the node, but other actions can be performed:

.. code-block:: java

   public void visit(BinaryTreeNode<T> node) {
       System.out.print(node.getValue() + " ");
   }


.. note::

    In lecture, our "visit" action was simply a ``System.out.println()`` of the current node's value.

Preorder Traversal
------------------
For example, we might wish to make sure that we visit any given node
*before* we visit its children.
This is called a :term:`preorder traversal`.

.. _BinTravExample:

.. inlineav:: BinExampCON dgm
   :links: AV/Binary/BinExampCON.css
   :scripts: AV/Binary/BinExampCON.js
   :align: center
   :keyword: Binary Tree Traversals; Preorder Traversal

   A binary tree for traversal examples.


.. topic:: Example

   The preorder enumeration for the tree of
   Figure :num:`Figure #BinTravExample` is
   **A B D C E G F H I**.

   The first node printed is the root.
   Then all nodes of the left subtree are printed (in preorder) before
   any node of the right subtree.

.. inlineav:: preorderCON ss
   :long_name: Preorder Traversal Slideshow
   :links: AV/Binary/BTCON.css
   :scripts: AV/Binary/preorderCON.js
   :output: show
   :keyword: Binary Tree Traversals; Preorder Traversal


Postorder Traversal
-------------------

Alternatively, we might wish to visit each node only
*after* we visit its children (and their subtrees).
For example, this would be necessary if we wish to return all nodes
in the tree to free memory.
We would like to delete the children of a node before deleting the
node itself.
But to do that requires that the children's children be deleted
first, and so on.
This is called a :term:`postorder traversal`.

.. topic:: Example

   The postorder enumeration for the tree of
   Figure :num:`Figure #BinTravExample` is
   **D B G E H I F C A**.

.. inlineav:: postorderCON ss
   :long_name: Postorder Traversal Slideshow
   :links: AV/Binary/BTCON.css
   :scripts: AV/Binary/postorderCON.js
   :output: show
   :keyword: Binary Tree Traversals; Postorder Traversal


Inorder Traversal
-----------------

An :term:`inorder traversal` first visits the left child
(including its entire subtree), then visits the node, and finally
visits the right child (including its entire
subtree).
The :ref:`binary search tree <binary search tree> <BST>` makes use of
this traversal to print all nodes in ascending order of value.

.. topic:: Example

   The inorder enumeration for the tree of
   Figure :num:`Figure #BinTravExample` is
   **B D A G E C H F I**.

.. inlineav:: inorderCON ss
   :long_name: Inorder Traversal Slideshow
   :links: AV/Binary/BTCON.css
   :scripts: AV/Binary/inorderCON.js
   :output: show
   :keyword: Binary Tree Traversals; Inorder Traversal
