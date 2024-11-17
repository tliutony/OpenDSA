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


remove() high-level structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Like the ``contains()`` and ``insert()`` methods, the ``remove()`` method has a recursive structure where we search the left or right subtree depending on the comparison between the value we wish to remove and the current node's value. We show the high-level structure of the method below, with the removal cases omitted:

.. code-block:: java

    public T remove(T toRemove) {
        // if the value is not in the tree, return null
        if (!contains(toRemove)) {
            return null;
        }

        // otherwise, call recursive helper method
        root = remove(root, toRemove);
        return toRemove;
    }

    private BinaryTreeNode<T> remove(BinaryTreeNode<T> node, T toRemove) {
        // base case:  value is not in the tree
        if (node == null) {
            return null;
        }
        // compare the value to the current node's value
        int comparison = toRemove.compareTo(node.getValue());

        // base case:  we found the value in the current node
        if (comparison == 0) {
            // Removal cases omitted, see below
        }
        // Recursive case:  the value is less than the current node's value, so we search the left subtree
        else if (comparison < 0) {
            node.setLeft(remove(node.getLeft(), toRemove));    
        }
        // Recursive case:  the value is greater than the current node's value, so we search the right subtree
        else {
            node.setRight(remove(node.getRight(), toRemove));
        }
        // return the updated subtree
        return node;
    }

Now, let's break down the removal cases.

.. note::

    The following code snippets omit the cases not considered for clarity. You can find the full remove() implementation in the completed class at the top of this page.

remove() case 1: removing a leaf node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The first case is when the node we wish to remove is a leaf node, meaning it has no children. In this case, we return ``null`` to remove it from the tree as part of the recursive call chain:

.. code-block:: java

    // removal case 1: node has no children, so return null to remove it
    if (node.getLeft() == null && node.getRight() == null) {
        return null;
    }

Here is an example of removing a leaf node from a BST:

.. inlineav:: BSTremoveLeaf ss
   :long_name: BST removeLeaf Slideshow
   :links: AV/Binary/BSTCON.css
   :scripts: AV/MHC/BSTremoveLeaf.js
   :output: show
   :keyword: Binary Search Tree

