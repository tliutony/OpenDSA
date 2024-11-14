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
}
/* *** ODSAendTag: BinarySearchTree *** */