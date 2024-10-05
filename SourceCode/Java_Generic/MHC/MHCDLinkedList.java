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
    Node<E> newNode = new Node<>(element, null, null);
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
    
        Node(Node<E> prevNode, Node<E> nextNode) {
            prev = prevNode;
            next = nextNode;
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