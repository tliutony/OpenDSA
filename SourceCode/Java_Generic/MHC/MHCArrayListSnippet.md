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

```java
/* *** ODSATag: MHCArrayListAddEnd *** */
// Appends the specified element to the end of this list.
public boolean add(E o) {
  // If the array is full, make it bigger.
  if (size >= capacity) {
      grow();
  }
  elements[size] = o;
  // We've added an element, increase the size of the list
  size++; 

  // indicate that the add was successful
  return true;
}
/* *** ODSAendTag: MHCArrayListAddEnd *** */
```


```java
/* *** ODSATag: MHCArrayListRemove *** */
// Removes the element at the given position and returns it.
public E remove(int position) {
  // Check that the position is valid
  if (position < 0 || position >= size) {
      throw new IndexOutOfBoundsException(position);
  }
  E removedElement = elements[position];
  // Shift elements to the left
  for (int i = position; i < size - 1; i++) {
      elements[i] = elements[i + 1];
  }
  size--; // Update size
  return removedElement;
}
/* *** ODSAendTag: MHCArrayListRemove *** */
```
