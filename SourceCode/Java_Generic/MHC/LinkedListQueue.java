/* *** ODSATag: LinkedListQueue *** */
import java.util.LinkedList;
import java.util.NoSuchElementException;

/* *** ODSATag: values *** */
public class LinkedListQueue<E> implements MHCQueue<E> {
    private LinkedList<E> values;
    /* *** ODSAendTag: values *** */
    public LinkedListQueue() {
        values = new LinkedList<>();
    }

    /* *** ODSATag: enqueue *** */
    public void enqueue(E item) {
        values.addLast(item);
    }
    /* *** ODSAendTag: enqueue *** */

    /* *** ODSATag: front *** */
    public E front() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        return values.getFirst();
    }
    /* *** ODSAendTag: front *** */

    /* *** ODSATag: dequeue *** */
    public E dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        
        return values.removeFirst();
    }
    /* *** ODSAendTag: dequeue *** */
    
    public boolean isEmpty() {
        return values.isEmpty();
    }

    public int size() {
        return values.size();
    }
}
/* *** ODSAendTag: LinkedListQueue *** */