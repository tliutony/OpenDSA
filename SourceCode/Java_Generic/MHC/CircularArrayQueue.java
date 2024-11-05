/* *** ODSATag: CircularArrayQueue *** */
import java.util.NoSuchElementException;

/* *** ODSATag: CircularArrayQueueInstanceVars *** */
public class CircularArrayQueue<E> implements MHCQueue<E> {
    int first;     // index of front of queue
    int last;      // index of last element of queue
    int size;      // how many items are in queue
    int capacity;  // maximum number of items queue can hold
    E[] values;    // array for data
/* *** ODSAendTag: CircularArrayQueueInstanceVars *** */

    // Don't worry about the suppress warnings, it is a weird quirk of Java to 
    // get the generic array working.
    @SuppressWarnings("unchecked")
    public CircularArrayQueue() {
        capacity = 10; // default capacity to 10
        values = (E[]) new Object[capacity];
        first = 0;
        last = capacity - 1;
        size = 0;
    }

    @SuppressWarnings("unchecked")
    private void grow() {
        // double the capacity
        capacity = 2 * capacity;

        E[] newValues = (E[]) new Object[capacity];

        // copy elements from old array to new array, maintaining order and placing first at the beginning
        int j = first;
        for (int i = 0; i < size; i++) {
            newValues[i] = values[j];
            j = (j + 1) % size;
        }

        // update instance variables
        first = 0;
        last = size - 1;
        values = newValues;
    }

    public E front() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        return values[first];
    }

    /* *** ODSATag: enqueue *** */
    public void enqueue(E item) {
        // Grow values array if needed
        if (size == capacity) {
            grow();
        }
        
        // Update last to next position,
        // wrapping around if necessary
        last = (last + 1) % capacity;
        
        // Add item to the end of the queue
        values[last] = item;
        
        // Increment size
        size++; 
    }
    /* *** ODSAendTag: enqueue *** */
    
    /* *** ODSATag: dequeue *** */
    public E dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException();
        }
        
        // get item from the front of the queue
        E item = values[first];
        
        // "remove" item from the front 
        // of the queue by updating first
        first = (first + 1) % capacity;
        
        // decrement size
        size--;
        
        return item;
    }
    /* *** ODSAendTag: dequeue *** */
    
    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }

}
/* *** ODSAendTag: CircularArrayQueue *** */