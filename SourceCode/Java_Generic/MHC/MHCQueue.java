public interface MHCQueue<E> {
    // Add an item to end of queue
    public void enqueue(E item); 

    // Get item waiting the longest
    public E front();    

    // Remove and return item from front of queue
    public E dequeue();

    // Check if queue is empty, are there any items waiting?
    public boolean isEmpty();

    // Return number of items in queue
    public int size();
}
