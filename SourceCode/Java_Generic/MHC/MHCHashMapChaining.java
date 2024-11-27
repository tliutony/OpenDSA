
import java.util.ArrayList;
import java.util.List;

/* *** ODSATag: MHCHashMapChaining *** */
/**
 * A hash table implementation of a Map.  
 * K is the type of the keys used
 * V is the type of the values associated with the keys.
 */


/* *** ODSATag: instanceVars *** */
public class MHCHashMapChaining<K, V> implements MHCMap<K, V> {
    // Size of the table.
    private static final int CAPACITY = 100;

    // Holds the key-value pairs that have been inserted
    private List<KeyValuePair<K,V>>[] entries;
    /* *** ODSAendTag: instanceVars *** */

    @SuppressWarnings("unchecked")
    public MHCHashMapChaining() {
        entries = new ArrayList[CAPACITY];
    }

    /* *** ODSATag: get *** */
    /** 
     * Get the value associated with a key
     * @param key the key to look up
     * @return the value associated with the key or null if the key is not
     * in the map.
     */
    @Override
    public V get(K key) {
        KeyValuePair<K,V> pair = getPair(key);
        if (pair == null) {
            return null;
        }
        else {
            return pair.getValue();
        }
    }
    /* *** ODSAendTag: get *** */

    /* *** ODSATag: getPair *** */
    /**
     * Get the key-value pair for the given key
     * @param key the key to search for 
     * @return the key-value pair with the right key, 
     *   or null if the key is not in the table
     */
    private KeyValuePair<K, V> getPair (K key) {
        // Get the entry at the given index
        int index = getIndex(key);
        List<KeyValuePair<K,V>> entry = entries[index];

        // There is no entry at this index
        if (entry == null) {
            return null;
        }

        // There is a list at the index.  Search for
        // the right key
        for (int i = 0; i < entry.size(); i++) {
            KeyValuePair<K,V> pair = entry.get(i);
            if (pair.getKey().equals(key)) {
                return pair;
            }
        }

        // The key was not in the list
        return null;
    }
    /* *** ODSAendTag: getPair *** */
    
    /**
     * Find the index into the array for the given key
     * @param key the key being looked up
     * @return the position in the table for the key
     */
    private int getIndex(K key) {
        // Get the hash code for the key.
        int hashValue = key.hashCode();

        // Mod the hashvalue by the capacity of the array to
        // get a valid index
        int index = Math.abs(hashValue) % CAPACITY;

        System.out.println (key + " hashes to " + hashValue);
        System.out.println ("index is " + index);
        return index;
    }

    /** 
     * Associates a value with a key.
     * @param key the key whose value is set
     * @param value the value to be associated with the key
     * @return if the key previously had a value, return the previous value.  If the key
     * was not in the table, return null.
     */
    @Override
    public V put(K key, V value) {
        KeyValuePair<K, V> pair = getPair(key);

        if (pair == null) {
            int index = getIndex(key);
            List<KeyValuePair<K, V>> entry = entries[index];
    
            // No entry at that index currently
            if (entry == null) {
                entry = new ArrayList<>();
                entry.add(new KeyValuePair<>(key, value));
                entries[index] = entry;
                return null;
            }
    
            // Entry already exists at that index.  Add to the end of the list.
            else {
                entry.add(new KeyValuePair<>(key, value));
                return null;
            }
    
        }
        
        else {
            V oldValue = pair.putValue(value);
            return oldValue;
        }

    }

    /** 
     * Returns true if the map has an entry for the key
     * @param key the key to look up
     * @return true if the key is in the table.  Otherwise return false.
     */
    @Override
    public boolean containsKey(K key) {
        return getPair(key) != null; 
    }

    /** 
     * Removes the entry for the key.
     * @param key the key for the entry to remove
     * @return If the key was in the table, the value previously associated with 
     *  the key is returned.  If the key was not in the table, null is returned.
     */
    @Override
    public V remove(K key) {
        int index = getIndex(key);
        List<KeyValuePair<K, V>> entry = entries[index];

        // No entry at that index; just return
        if (entry == null) {
            return null;
        }

        // Entry exists.  Search for the right key
        for (int i = 0; i < entry.size(); i++) {
            KeyValuePair<K, V> pair = entry.get(i);
            if (pair.getKey().equals(key)) {
                //Save the value currently stored 
                // so it can be returned
                V oldValue = pair.getValue();
                entry.remove(i);
                return oldValue;
            }
        }
        
        // Key not found
        return null;
    }
}
/* *** ODSAendTag: MHCHashMapChaining *** */