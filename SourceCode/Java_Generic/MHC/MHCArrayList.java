/* *** ODSATag: MHCArrayList *** */
import java.util.Arrays;

/**
 * Array-based list implementation of the MHCList interface.
 */
/* *** ODSATag: MHCArrayListVars *** */
public class MHCArrayList<E> implements MHCList<E> {
    private E[] elements;   // Array holding list elements
    private static final int DEFAULT_CAPACITY = 10; // Default capacity
    private int capacity;     // Maximum number of values that fit in the array
    private int size;    // Current number of elements in the list
    /* *** ODSAendTag: MHCArrayListVars *** */

    // Constructor
    @SuppressWarnings("unchecked") // Generic array allocation
    public MHCArrayList(int capacity) {
        this.capacity = capacity;
        size = 0;
        elements = (E[]) new Object[capacity];  // Create elements
    }

    // Create a list with the default capacity
    public MHCArrayList() {
        this(DEFAULT_CAPACITY);  // Just call the other constructor
    }  

    // Replaces the element at the specified position in this list with the specified element.
    public void set(int position, E o) {
        // Check that the position is valid
        if (position < 0 || position >= size) {
            throw new IndexOutOfBoundsException(position);
        }
        elements[position] = o;
    }

    // Returns the element at the specified position in this list.
    public E get(int position) {
        if (position < 0 || position >= size) {
            throw new IndexOutOfBoundsException(position);
        }
        return elements[position];
    }

    // Returns the number of elements in this list.
    public int size() {
        return size;
    }

    // Helper method to resize the array when it's full
    private void grow() {
        capacity = 2 * capacity;

        // Utility method that copies elements into a new array with the larger capacity
        elements = Arrays.copyOf(elements, capacity);
    }

    // Appends the specified element to the end of this list.
    public void add(E o) {
        // If the array is full, make it bigger.
        if (size >= capacity) {
            grow();
        }
        elements[size] = o;
        size++; // We've added an element, increase the size of the list
    }

    /* *** ODSATag: MHCArrayListAddPos *** */
    // Inserts the specified element at the specified position in this list.
    public void add(int position, E o) {
        if (position < 0 || position > size) {
            throw new IndexOutOfBoundsException(position);
        }
        // If the array is full, make it bigger.
        if (size >= capacity) {
            grow();
        }
        // Shift elements to the right to make space at the position
        for (int i = size; i > position; i--) {
            elements[i] = elements[i - 1];
        }

        elements[position] = o;
        size++; // We've added an element, increase the size of the list
    }
    /* *** ODSAendTag: MHCArrayListAddPos *** */

    // Removes the element at the specified position in this list, and returns it.
    public E remove(int position) {
        // Check that the position is valid
        if (position < 0 || position >= size) {
            throw new IndexOutOfBoundsException(position);
        }
        
        E removedElement = elements[position];

        // Shift elements to the left
        for (int i = position; i < size - 1; i++) {
            elements[i] = elements[i + 1];
        }
        size--; // Update size
        
        return removedElement;
    }
}
/* *** ODSAendTag: MHCArrayList *** */