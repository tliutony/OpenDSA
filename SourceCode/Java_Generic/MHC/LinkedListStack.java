/* *** ODSATag: LinkedListStack *** */
import java.util.EmptyStackException;
import java.util.LinkedList;

public class LinkedListStack<E> implements MHCStack<E> {
    private LinkedList<E> values = new LinkedList<>();

    /* *** ODSATag: LinkedListStackPush *** */
    public void push(E item) {
        values.add(item);
    }
    /* *** ODSAendTag: LinkedListStackPush *** */

    /* *** ODSATag: LinkedListStackPop *** */
    public E pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }

        return values.removeLast();
    } 
    /* *** ODSAendTag: LinkedListStackPop *** */

    /* *** ODSATag: LinkedListStackPeek *** */
    public E peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return values.getLast();
    } 
    /* *** ODSAendTag: LinkedListStackPeek *** */
    
    public boolean isEmpty () {
        return values.isEmpty();
    }
    
    public int size() {
        return values.size();
    }
}
/* *** ODSAendTag: LinkedListStack *** */