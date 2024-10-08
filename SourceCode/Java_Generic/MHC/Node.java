/* *** ODSATag: Node *** */
class Node<E> {
    private E data;          // Value for this node
    private Node<E> next;    // Point to next node in list

    // Constructors
    public Node(E element, Node<E> nextNode) { 
        data = element;
        next = nextNode;
    
    }

    public Node(E element) { 
        data = element;
        next = null;     
    }
  
    // Return the value held in Node
    E getValue() { 
        return data; 
    }
    
    // set value held in Node
    void setValue(E newData) { 
        data = newData; 
    }            
    
    // Return next Node
    Node<E> getNext() { 
        return next; 
    }              

    // Set next Node
    void setNext(Node<E> nextNode) { 
        next = nextNode;
    } 

}
/* *** ODSAendTag: Node *** */
