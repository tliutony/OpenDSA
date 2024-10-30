import java.util.NoSuchElementException;

public class CircularArrayQueue<E> implements MHCQueue<E> {
    int first;     // index of front of queue
    int last;      // index of last element of queue
    int size;      // how many items are in queue
    int capacity;  // maximum number of items queue can hold
    E[] values;    // array for data

    @SuppressWarnings("unchecked")
    public CircularArrayQueue() {
        capacity = 10; // default capacity to 10
        values = (E[]) new Object[capacity];
        first = 0;
        last = 0;
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

    public void enqueue(E item) {
        if (size == capacity) {
            grow();
        }
        // add item to the end of the queue
        values[last] = item;
        last = (last + 1) % capacity;
        // increment size
        size++;
    }

    public E front() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        return values[first];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }

    public E dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        // remove item from the front of the queue
        E item = values[first];
        first = (first + 1) % capacity;
        // decrement size
        size--;
        return item;
    }
}
