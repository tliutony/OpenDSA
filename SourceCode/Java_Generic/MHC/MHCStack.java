/* *** ODSATag: MHCStack *** */
public interface MHCStack<E> {
    // Add item to end
    public void push (E item);

    // Get last item added
    public E peek();

    // Remove last item added
    public E pop();

    // Is it empty?
    public boolean isEmpty();

    // How many items are in it?
    public int size();    
}
/* *** ODSAendTag: MHCStack *** */
