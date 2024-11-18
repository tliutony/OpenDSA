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


remove() case 2: removing a node with one child
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The second case is when the node we wish to remove has one child. In this case, we replace the node with its child, either left or right:

.. code-block:: java

    // removal case 2: node has one child, so return the child to replace it
    else if (node.getLeft() == null) {
        return node.getRight();
    }
    else if (node.getRight() == null) {
        return node.getLeft();
    }

.. inlineav:: BSTremoveOneChild ss
   :long_name: BST removeOneChild Slideshow
   :links: AV/Binary/BSTCON.css
   :scripts: AV/MHC/BSTremoveOneChild.js
   :output: show
   :keyword: Binary Search Tree


remove() case 3: removing a node with two children
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The third case is when the node we wish to remove has two children. In this case, we replace the node with the **maximum value in its left subtree**. This allows us to maintain the binary search tree property, since the maximum value in the left subtree is less than the removed node's value, making all values in the right subtree greater than it. 

We will use the ``removeMax()`` method we defined earlier to find the maximum value in the left subtree, and then replace the node with that value. Because of how we defined ``removeMax()``, we need to separately handle the case where the left child of the node we are removing does not have a right child (case 3a). Otherwise, we can recursively call ``removeMax()`` on the left subtree to remove the maximum value (case 3b):

.. code-block:: java

    // removal case 3a: left child has no right child, so replace node with left child
    if (node.getLeft().getRight() == null) {
        // replace node's value with left child's value
        node.setValue(node.getLeft().getValue());
    }

    // removal case 3b: left child has a right child, so 
    // replace node with left child's right child
    else {
        // replace node's value with left child's maximum value
        // and remove the maximum value from the left subtree
        node.setValue(removeMax(node.getLeft()));
        return node;
    }

.. inlineav:: BSTremoveTwoChildren ss
   :long_name: BST removeTwoChildren Slideshow
   :links: AV/Binary/BSTCON.css
   :scripts: AV/MHC/BSTremoveTwoChildren.js
   :output: show
   :keyword: Binary Search Tree

BST operation costs
-------------------

The cost for ``findhelp`` and ``inserthelp`` is the depth of
the node found or inserted.
The cost for ``removehelp`` is the depth of the node being
removed, or in the case when this node has two children,
the depth of the node with smallest value in its right subtree.
Thus, in the worst case, the cost for any one of these operations is
the depth of the deepest node in the tree.
This is why it is desirable to keep BSTs
:term:`balanced <balanced tree>`, that is, with least possible
height :math:`h`.

.. note::

    We sometimes use the notation :math:`O(h)` to represent the cost of an operation in a BST, where :math:`h` is the height of the tree.

If a binary tree is balanced, then the height for a tree of :math:`n`
nodes is approximately :math:`\log n`.
However, if the tree is completely unbalanced, for example in the
shape of a linked list, then the height for a tree with :math:`n`
nodes can be as great as :math:`n`.
Thus, a balanced BST will in the average case have operations costing
:math:`O(\log n)`, while a badly unbalanced BST can have
operations in the worst case costing :math:`O(n)`.
Consider the situation where we construct a BST of :math:`n` nodes
by inserting records one at a time.
If we are fortunate to have them arrive in an order that results in a
balanced tree (a "random" order is likely to be good
enough for this purpose), then each insertion will cost on average
:math:`O(\log n)`, for a total cost of
:math:`O(n \log n)`.
However, if the records are inserted in order of increasing value,
then the resulting tree will be a chain of height :math:`n`.
The cost of insertion in this case will be
:math:`O(n^2)`.

Traversing a BST costs :math:`O(n)` regardless of the shape of
the tree, since we must visit every node once.

.. table:: Efficiency of BST Operations
    :align: center

    +--------------+-----------------------+------------------------+
    | Operation    | Balanced Case         | Worst Case             |
    +==============+=======================+========================+
    | contains()   | O(log n)              | O(n)                   |
    +--------------+-----------------------+------------------------+
    | insert()     | O(log n)              | O(n)                   |
    +--------------+-----------------------+------------------------+
    | remove()     | O(log n)              | O(n)                   |
    +--------------+-----------------------+------------------------+
    | traversal    | O(n)                  | O(n)                   |
    +--------------+-----------------------+------------------------+