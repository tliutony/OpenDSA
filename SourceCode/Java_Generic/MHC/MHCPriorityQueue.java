/* *** ODSATag: MHCPriorityQueue *** */
public interface MHCPriorityQueue<T extends Comparable<T>> {
    // insert an item into the queue
    void insert(T item);
    // remove and return the item with the highest priority
    T remove();
    // return the item with the highest priority without removing it
    T peek();
}
/* *** ODSAendTag: MHCPriorityQueue *** */

