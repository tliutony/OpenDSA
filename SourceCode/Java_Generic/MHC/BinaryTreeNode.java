/* *** ODSATag: BinaryTreeNode *** */
//Represents a node in a binary tree as a recursive data structure.
public class BinaryTreeNode<T> {
    private T value;
    private BinaryTreeNode<T> left;
    private BinaryTreeNode<T> right;

    public BinaryTreeNode(T value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    
    public T getValue() {
        return this.value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public BinaryTreeNode<T> getLeft() {
        return this.left;
    }

    public BinaryTreeNode<T> getRight() {
        return this.right;
    }

    public void setLeft(BinaryTreeNode<T> left) {
        this.left = left;
    }

    public void setRight(BinaryTreeNode<T> right) { 
        this.right = right;
    }

    /* *** ODSATag: isLeaf *** */
    // Checks if the node is a leaf node, which means it has no children.
    public boolean isLeaf() {
        return this.left == null && this.right == null;
    }
    /* *** ODSAendTag: isLeaf *** */
}   
/* *** ODSAendTag: BinaryTreeNode *** */