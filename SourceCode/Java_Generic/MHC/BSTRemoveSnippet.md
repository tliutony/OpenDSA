```java
/* *** ODSATag: BSTremoveLeaf *** */
private BinaryTreeNode<T> remove(BinaryTreeNode<T> node, 
                                 T toRemove) {
    // base case:  value is not in the tree
    if (node == null) {
        return null;
    }
    // compare the value to the current node's value
    int comparison = toRemove.compareTo(node.getValue());

    // base case:  we found the value in the current node
    if (comparison == 0) {
        // removal case 1: node has no children
        if (node.getLeft() == null 
            && node.getRight() == null) {
            return null;
        }
        // other removal cases omitted for brevity
    }
    // Recursive case: toRemove < current node
    else if (comparison < 0) {
        node.setLeft(remove(node.getLeft(), toRemove));
    }
    // Recursive case: toRemove > current node
    else {
        node.setRight(remove(node.getRight(), toRemove));
    }
    // return the updated subtree
    return node;
}
/* *** ODSAendTag: BSTremoveLeaf *** */
```
