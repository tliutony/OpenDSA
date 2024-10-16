public class MHCDLinkedList<E> {
    private Node<E> head;
    private Node<E> tail;
    private int numElements;

    public MHCDLinkedList() {
        this.head = null;
        this.tail = null;
        this.numElements = 0;
    }

/* *** ODSATag: addLast *** */
private void addLast(E element) {
    Node<E> newNode = new Node<>(element);
    // If the list is empty, the new node is both the head and tail
    if (head == null) {
        head = newNode;
        tail = newNode;
    } else {
        // Otherwise, the new node will be the new tail
        tail.setNext(newNode);
        newNode.setPrev(tail);
        tail = newNode;
    }
    numElements++;
}   
/* *** ODSAendTag: addLast *** */

/* *** ODSATag: addAfter *** */
private void addAfter(Node<E> node, E value) {
    if (node == tail) {
        addLast(value);
    }
    else {
        Node<E> newNode = new Node<E>(value);
        newNode.setPrev(node);
        newNode.setNext(node.getNext());
        node.setNext(newNode);
        newNode.getNext().setPrev(newNode);
        numElements++;
    }
}
/* *** ODSAendTag: addAfter *** */

/* *** ODSATag: removeNode *** */
private void remove(Node<E> node) {
    // If the node is the head, remove it by calling removeFirst()
    if (head == node) { 
        removeFirst(); 
    }
    // If the list has only one element, remove it by calling removeLast()
    else if (head == tail) { 
        removeLast(); 
    }
    // Otherwise, remove the node by updating its prev and next nodes
    else {
        node.getNext().setPrev(node.getPrev());
        node.getPrev().setNext(node.getNext());
        numElements--;
    }
}
/* *** ODSAendTag: removeNode *** */


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
    
}