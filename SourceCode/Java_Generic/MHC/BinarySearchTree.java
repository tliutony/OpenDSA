/* *** ODSATag: BinarySearchTreeComplete *** */
/* *** ODSATag: BinarySearchTree *** */
public class BinarySearchTree<T extends Comparable<T>> {    
    private BinaryTreeNode<T> root;

    public BinarySearchTree() {
        root = null;
    }

    // Inserts a value into the BST
    public void insert(T value) {
        root = insert(root, value);
    }

    /* *** ODSATag: BSTinsert *** */
    private BinaryTreeNode<T> insert(BinaryTreeNode<T> node, T value) {
        // Base case:  node is null - create a node to
        // hold the new value and return it
        if (node == null) {
            return new BinaryTreeNode<T>(value);
        }
        
        // Recursive case 1:  the new value is less than the value in
        // node.  Recurse on the left subtree
        if(value.compareTo(node.getValue()) < 0) {
            node.setLeft(insert(node.getLeft(), value));
        }
        // Recursive case 2:  the new value is greater than or equal to the
        // value in node.  Recurse on the right subtree
        else {
            node.setRight(insert(node.getRight(), value));         
        }

        return node;
    }
    /* *** ODSAendTag: BSTinsert *** */
    /* *** ODSAendTag: BinarySearchTree *** */

    /* *** ODSATag: BSTcontains *** */
    public boolean contains(T value) {
        return contains(root, value);
    }

    private boolean contains(BinaryTreeNode<T> node, T value) {
        // Base case 1:  tree is empty, so we didn't find the value
        if (node == null) {
            return false;
        }
        // Base case 2:  we found the value in the current node
        if (node.getValue().compareTo(value) == 0) {
            return true;
        }
        // Recursive case 1:  the value is less than the current 
        // node's value, so we search the left subtree
        if (value.compareTo(node.getValue()) < 0) {
            return contains(node.getLeft(), value);
        }
        // Recursive case 2:  the value is greater than the current 
        // node's value, so we search the right subtree
        else {
            return contains(node.getRight(), value);
        }
    }
    /* *** ODSAendTag: BSTcontains *** */

    /* *** ODSATag: removeMax *** */
    private T removeMax(BinaryTreeNode<T> node) {
        // base case: if the right child has no right child, 
        // then node.getRight() is the largest value
        if (node.getRight().getRight() == null) {
            T maxValue = node.getRight().getValue();

            // remove the largest value from the right subtree
            node.setRight(node.getRight().getLeft());
            return maxValue;
        }
        // recursive case: continue searching the right subtree
        else {
            return removeMax(node.getRight());
        }
    }
    /* *** ODSAendTag: removeMax *** */

    /* *** ODSATag: BSTremove *** */
    public T remove(T value) {
        if (!contains(value)) {
            return null;
        }

        root = remove(root, value);
        return value;
    }

    private BinaryTreeNode<T> remove(BinaryTreeNode<T> node, T value) {
        //base case:  value is not in the tree
        if (node == null) {
            return null;
        }
        // compare the value to the current node's value
        int comparison = value.compareTo(node.getValue());

        //base case:  we found the value in the current node
        if (comparison == 0) {
            // removal case 1: node has no children, so return null to remove it
            if (node.getLeft() == null && node.getRight() == null) {
                return null;
            }
            // removal case 2: node has one child, so return the child to replace it
            else if (node.getLeft() == null) {
                return node.getRight();
            }
            else if (node.getRight() == null) {
                return node.getLeft();
            }
            // removal case 3: node has two children
            else {
                // removal case 3a: left child has no right child, 
                // so replace node with left child
                if (node.getLeft().getRight() == null) {
                    // replace node's value with left child's value
                    node.setValue(node.getLeft().getValue());

                    // replace node's left child with left child's left child
                    node.setLeft(node.getLeft().getLeft());
                    return node;
                }
                // removal case 3b: left child has a right child, so 
                // replace node with left child's right child
                else {
                    // replace node's value with left child's maximum value
                    // and remove the maximum value from the left subtree
                    node.setValue(removeMax(node.getLeft()));
                    return node;
                }
            }
        }
        // Recursive case:  the value is less than the current node's value, so we search the left subtree
        else if (comparison < 0) {
            node.setLeft(remove(node.getLeft(), value));
            return node;
        }
        // Recursive case:  the value is greater than the current node's value, so we search the right subtree
        else {
            node.setRight(remove(node.getRight(), value));
            return node;
        }
    }
}
/* *** ODSAendTag: BinarySearchTreeComplete *** */
