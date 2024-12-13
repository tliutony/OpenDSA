/* *** ODSATag: MHCHashMap *** */
/**
 * A hash table implementation of a Map.  
 * K is the type of the keys used
 * V is the type of the values associated with the keys.
 */
/* *** ODSATag: instanceVars *** */
public class MHCHashMap<K, V> implements MHCMap<K, V> {
    // Capacity of the table.
    private static final int CAPACITY = 100;

    // Holds the key-value pairs that have been inserted
    private KeyValuePair<K,V>[] entries;   
    /* *** ODSAendTag: instanceVars *** */
    @SuppressWarnings("unchecked")
    public MHCHashMap() {
        entries = new KeyValuePair[CAPACITY];
    }

    /* *** ODSATag: get *** */
    /** 
     * Get the value associated with a key
     * @param key the key to look up
     * @return the value associated with the key or null if the key is not
     * in the map.
     */
    public V get(K key) {
        // get the index for the key
        int index = getIndex(key);

        // check whether the entry at that index exists
        if(entries[index] == null) { // if an array pos is empty, it will be null
            return null;
        }

        // otherwise, return the value in the entry
        return entries[index].getValue();
    }
    /* *** ODSAendTag: get *** */

    /* *** ODSATag: getIndex *** */
    /**
     * Find the index into the array for the given key
     * @param key the key being looked up
     * @return the position in the table for the key
     */
    private int getIndex(K key) {
        // Get the hash code for the key.
        // java has a built-in hashcode method for all objects
        int hashCode = key.hashCode(); 

        // Mod the hashCode by the capacity of the array to get a valid index
        int index = Math.abs(hashCode) % CAPACITY;

        return index;
    }
    /* *** ODSAendTag: getIndex *** */

    /* *** ODSATag: put *** */
    /** 
     * Associates a value with a key.
     * @param key the key whose value is set
     * @param value the value to be associated with the key
     * @return if the key previously had a value, return the previous value.  If the key
     * was not in the table, return null.
     */
    public V put(K key, V value) {        
        // get the index for the key
        int index = getIndex(key);

        // No entry for the key currently
        if(entries[index] == null) { // if an array pos is empty, it will be null
            entries[index] = new KeyValuePair<>(key, value);
            return null;
        }
        // Entry already exists for the key
        else {
            // 1. updates the value at the index
            // 2. returns the old value stored at that index
            return entries[index].putValue(value);
        }
    }
    /* *** ODSAendTag: put *** */

    /** 
     * Returns true if the map has an entry for the key
     * @param key the key to look up
     * @return true if the key is in the table.  Otherwise return false.
     */
    @Override
    public boolean containsKey(K key) {
        int index = getIndex(key);
        return entries[index] != null;
   }

    /** 
     * Removes the entry for the key.
     * @param key the key for the entry to remove
     * @return If the key was in the table, the value previously associated with 
     *  the key is returned.  If the key was not in the table, null is returned.
     */
    public V remove(K key) {
        int index = getIndex(key);

        // No entry for the key; just return
        if (entries[index] == null) {
            return null;
        }

        // Entry exists.  Save the value currently stored 
        // so it can be returned
        V oldValue = entries[index].getValue();

        // Remove the entry
        entries[index] = null;

        // Return the original value
        return oldValue;
    }
}
/* *** ODSATag: MHCHashMap *** */
