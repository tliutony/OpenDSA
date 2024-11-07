import java.io.*;

// Tester for binary search function
public class Bsearch {

static boolean SUCCESS = true;

/* *** ODSATag: BinarySearch *** */
public static int binarySearch(int[] values, int value) {
  // Base case - empty array
  if (values.length == 0) {
      return -1;
  }

  // Recursive case - call helper method
  return binarySearchHelper(values, value, 0, values.length - 1);
}

private static int binarySearchHelper(int[] values, int value, int low, int high) {
  // Base case - value not found
  if (low > high) {
      return -1;
  }

  // Find the middle index
  int middle = (low + high) / 2;
  // Base case - value found
  if (values[middle] == value) {
      return middle;
  }

  // Recursive case - search lower half
  if (values[middle] > value) {
      return binarySearchHelper(values, value, low, middle - 1);
  }
  else {
      // Recursive case - search upper half
      return binarySearchHelper(values, value, middle + 1, high);
  }
}
/* *** ODSAendTag: BinarySearch *** */

public static void main(String args[]) throws IOException {
  int[] A = {2, 3, 4, 5, 7, 10};

  int pos = binarySearch(A, 4);
  if (pos != 2)
    SUCCESS = false;

  pos = binarySearch(A, 6);
  if (pos != 6)
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Binary Search Testing failed");
  }
}

}
