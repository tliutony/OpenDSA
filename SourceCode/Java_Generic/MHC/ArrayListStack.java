/* *** ODSATag: ArrayListStack *** */
import java.util.ArrayList;
import java.util.EmptyStackException;

/* *** ODSATag: ArrayListStackConstructor *** */
public class ArrayListStack<E> implements MHCStack<E> {
    private ArrayList<E> values;

    public ArrayListStack() {
        values = new ArrayList<E>();
    }

/* *** ODSAendTag: ArrayListStackConstructor *** */
    public E peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return values.get(values.size() - 1);
    } 
    
    public boolean isEmpty () {
        return values.size() == 0;
    }
    
    public int size() {
        return values.size();
    }

    /* *** ODSATag: ArrayListStackPush *** */
    public void push(E item) {
        values.add(item);
    }
    /* *** ODSAendTag: ArrayListStackPush *** */

    /* *** ODSATag: ArrayListStackPop *** */
    public E pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return values.remove(size() - 1);
    }
    /* *** ODSAendTag: ArrayListStackPop *** */
}
/* *** ODSAendTag: ArrayListStack *** */