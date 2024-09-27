```java
/* *** ODSATag: MHCArrayListAddPos *** */
// Inserts the specified element at position in this list.
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
  // We've added an element, increase the size of the list
  size++; 
}
/* *** ODSAendTag: MHCArrayListAddPos *** */
```
