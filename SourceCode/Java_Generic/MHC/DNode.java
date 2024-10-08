/* *** ODSATag: DNode *** */
// Node class implementation for doubly linked list
class Node<E> {
    private E data; // Value for this node
    private Node<E> next; // Pointer to next node in list
    private Node<E> prev; // Pointer to previous node in list

    // Constructors
    Node(E element, Node<E> prevNode, Node<E> nextNode) {
        data = element;
        prev = prevNode;
        next = nextNode;
    }

    Node(E element) {
        data = element;
        prev = null;
        next = null;
    }

    // return the value held in Node
    public E getValue() {
        return data;
    }

    // set value held in Node
    public void setValue(E newData) {
        data = newData;
    }

    // return the next node
    public Node<E> getNext() {
        return next;
    }

    // set next Node
    public void setNext(Node<E> nextNode) {
        next = nextNode;
    }

    // return the previous node
    public Node<E> getPrev() {
        return prev;
    }

    // set the previous node
    public void setPrev(Node<E> prevNode) {
        prev = prevNode;
    }
}
/* *** ODSAendTag: DNode *** */
