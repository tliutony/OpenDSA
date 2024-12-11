/* *** ODSATag: KeyValuePair *** */
/**
 * A key-value pair to be stored in a hash table entry.
 * K is the type of the key.  V is the type of the value.
 */
public class KeyValuePair<K, V> {
    // The key
    private K key;

    // The value
    private V value;

    public KeyValuePair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public V getValue() {
        return value;
    }

    // similar to a setter, but we're returning the old value
    public V putValue(V newValue) {
        // Remember the value so it can be returned.
        V oldValue = this.value;

        // Update the value
        this.value = newValue;

        // Return its original value
        return oldValue;
    }

    public K getKey() {
        return key;
    }
}
/* *** ODSAendTag: KeyValuePair *** */