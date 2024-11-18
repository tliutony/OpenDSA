/* *** ODSATag: BinaryTree *** */
public class BinaryTree<T> {
    private BinaryTreeNode<T> root;

    public BinaryTree() {
        this.root = null;
    }
    public BinaryTreeNode<T> getRoot() {
        return this.root;
    }

    public void setRoot(BinaryTreeNode<T> root) {
        this.root = root;
    }

    public int size() {
        return this.size(this.root);
    }

    private int size(BinaryTreeNode<T> node) {
        if (node == null) {
            return 0;
        }

        return 1 + this.size(node.getLeft()) + this.size(node.getRight());
    }

    /* *** ODSATag: height *** */
    public int height() {
        return this.height(this.root);
    }

    private int height(BinaryTreeNode<T> node) {
        // base case: empty node has height 0
        if (node == null) {
            return 0;
        }

        // recursive case: height is 1 (for the current node),
        // plus the height of the taller subtree
        int leftHeight = this.height(node.getLeft());
        int rightHeight = this.height(node.getRight());
        
        if (leftHeight > rightHeight) {
            return 1 + leftHeight;
        } else {
            return 1 + rightHeight;
        }
    }
    /* *** ODSAendTag: height *** */

    public boolean isEmpty() {
        return this.root == null;
    }
}
/* *** ODSAendTag: BinaryTree *** */