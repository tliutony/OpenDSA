/* *** ODSATag: MHCLinkedList *** */
/* *** ODSATag: MHCLinkedListVars *** */
public class MHCLinkedListTemp<E> {
    private Node<E> head = null;
    private Node<E> tail = null;
    private int numElements = 0;
    /* *** ODSAendTag: MHCLinkedListVars *** */

    /* *** ODSATag: addFirst *** */
    // Adds to the beginning of the list.
    private void addFirst(E value) {
        head = new Node<E>(value, head);
        
        if (tail == null) {
            tail = head;
        }

        numElements++;
    }
    /* *** ODSAendTag: addFirst *** */

    /* *** ODSATag: addAfter *** */
    // Adds element after the specified Node.
    private void addAfter(Node<E> node, E value) {
        Node<E> newNode = new Node<>(value, node.getNext());
        node.setNext(newNode);
        if (tail == node) {
            tail = newNode;
        }
        numElements++;
    }
    /* *** ODSAendTag: addAfter *** */

    /* *** ODSATag: getNode *** */
    // Find and return the node at the specified index.
    public Node<E> getNode(int index) {
        if (index < 0 || index > numElements) {
            throw new IndexOutOfBoundsException(index);
        }

        Node<E> nextNode = head;
        for (int i = 0; i < index; i++) {
            nextNode = nextNode.getNext();
        }
        return nextNode;
    }
    /* *** ODSAendTag: getNode *** */

    /* *** ODSATag: add *** */
    // Inserts the specified element at the specified position in this list.
    public void add(int index, E value) {
        if (index < 0 || index > numElements) {
            throw new IndexOutOfBoundsException(index);
        }

        // adding at index 0 is addFirst()
        if (index == 0) {
            addFirst (value);
        }

        // otherwise call addAfter() on index-1 node
        else {
            Node<E> prevNode = getNode(index-1);
            addAfter (prevNode, value);
        }
    }
    /* *** ODSAendTag: add *** */

    public void add(E value) {
        Node<E> newNode = new Node<>(value);
        if (tail == null) {
                head = newNode;
                tail = newNode;
        }
        else {
                tail.setNext(newNode); 
                tail = newNode; 
        }
            numElements++;
    } 

    // Removes the element at the specified position in this list, and returns it.
    public E remove(int position) {
        // if position is invalid, throw error
        if (position < 0 || position >= numElements) {
            throw new IndexOutOfBoundsException(position);
        }   

        // Case where we're removing the head element, call our removeFirst method.
        if(position == 0) {
            return removeFirst();
        }  
        else {
            // Otherwise, find the node just before the one we want to remove
            Node<E> prevNode = getNode(position - 1);
            Node<E> toRemove = prevNode.getNext();

            // Update prevNode's "next" pointer to refer to toRemove's "next" pointer
            prevNode.setNext(toRemove.getNext());

            // If we're removing the last element, make sure to update "tail"
            if (toRemove == tail) {
                tail = prevNode;
            }

            // Decrease the size of the list
            numElements--; 

            // Return the value removed
            return toRemove.getValue();
        }
    }


    private E removeFirst() {
            Node<E> toRemove = head;
            head = toRemove.getNext();
        if (head == null) {
                tail = null;
        }
            numElements--;
        return toRemove.getValue();
    }

    public E get(int position) {
        return getNode(position).getValue();
    }

    public int size() {
        return numElements;
    }
}
/* *** ODSAendTag: MHCLinkedList *** */

