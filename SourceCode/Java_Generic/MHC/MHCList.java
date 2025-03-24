/* *** ODSATag: MHCList *** */
public interface MHCList<E> {

    // Replaces the element at the specified position in this list with the specified element.
    public void set (int index, E o);
    
    // Returns the element at the specified position in this list.
    public E get (int index);
    
    // Returns the number of elements in this list.
    public int size();
    
    // Appends the specified element to the end of this list.
    public boolean add (E o);
    
    // Inserts the specified element at the specified position in this list.
    public void add (int index, E o);
    
    // Removes the element at the specified position in this list, and returns it.
    public E remove (int index);

    // Returns true if this list contains no elements.
    public boolean isEmpty();

    // Returns a string representation of the list elements.
    public String toString();

}
/* *** ODSAendTag: MHCList *** */