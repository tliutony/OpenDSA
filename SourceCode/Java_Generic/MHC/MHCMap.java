/* *** ODSATag: MHCMap *** */
public interface MHCMap<K, V> {
    /** 
     * Get the value associated with a key
     * @param key the key to look up
     * @return the value associated with the key or null if the key is not
     * in the map.
     */
    public V get (K key);

    /** 
     * Associates a value with a key.
     * @param key the key whose value is set
     * @param value the value to be associated with the key
     * @return if the key previously had a value, return the previous value.  If the key
     * was not in the table, return null.
     */
    public V put (K key, V value);

    /** 
     * Returns true if the map has an entry for the key
     * @param key the key to look up
     * @return true if the key is in the table.  Otherwise return false.
     */
    public boolean containsKey (K key);

    /** 
     * Removes the entry for the key.
     * @param key the key for the entry to remove
     * @return If the key was in the table, the value previously associated with 
     *  the key is returned.  If the key was not in the table, null is returned.
     */
    public V remove (K key);
}
/* *** ODSAendTag: MHCMap *** */