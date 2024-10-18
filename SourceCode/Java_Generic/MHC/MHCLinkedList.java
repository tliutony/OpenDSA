/* *** ODSATag: MHCLinkedList *** */
/* *** ODSATag: MHCLinkedListVars *** */
public class MHCLinkedList<E> implements MHCList<E> {
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
        Node<E> newNode = new Node<E>(value, node.getNext());
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
}
/* *** ODSAendTag: MHCLinkedList *** */
