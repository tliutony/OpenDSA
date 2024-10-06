/* *** ODSATag: MHCList *** */
public interface MHCList<E> {

    public void set (int index, E o);
    
    public E get (int index);
    
    public int size();
    
    public boolean add (E o);
    
    public void add (int index, E o);
    
    public E remove (int index);

    public boolean isEmpty();

    public String toString();
}
/* *** ODSAendTag: MHCList *** */