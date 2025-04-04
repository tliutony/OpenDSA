/* *** ODSATag: MHCArrayList *** */
import java.util.Arrays;

/**
 * Array-based list implementation of the MHCList interface.
 */
/* *** ODSATag: MHCArrayListVars *** */
public class MHCArrayList<E> implements MHCList<E> {
    private E[] elements;   // Array holding list elements
    private int capacity;     // Maximum number of values that fit in the array
    private int size;    // Current number of elements in the list
    /* *** ODSAendTag: MHCArrayListVars *** */

    /* *** ODSATag: MHCArrayListConstructor *** */
    // Constructor: creates a list with a default capacity of 10
    @SuppressWarnings("unchecked") // Generic array allocation
    public MHCArrayList() {
        elements = (E[]) new Object[10];  // Initialize elements array to 10 by default
        capacity = elements.length;
        size = 0;
    }
    /* *** ODSAendTag: MHCArrayListConstructor *** */

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
    public boolean add(E o) {
        // If the array is full, make it bigger.
        if (size >= capacity) {
            grow();
        }
        elements[size] = o;
        size++; // We've added an element, increase the size of the list
        
        // indicate that the add was successful
        return true;
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

    public boolean isEmpty() {
        return this.size == 0;
    }

    // Returns a string representation of the list elements
    public String toString() {
        // use square brackets to indicate beginning/end of list
        String out = "[";
        for(int i = 0; i < this.size; i++) {
            out = out + this.elements[i].toString();

            if (i < this.size - 1) {
                out = out + ", "; // add a comma separator if this is not the last element
            }
        }
        out = out + "]";

        return out;
    }
}
/* *** ODSAendTag: MHCArrayList *** */