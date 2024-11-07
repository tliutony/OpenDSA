import java.io.*;

// Tester for binary search function
public class Sequential {

static boolean SUCCESS = true;

/* *** ODSATag: Sequential *** */
// Return the position of an element in array array with the given value.
// If value is not in array, return -1.
static int linearSearch(int[] array, int value) {
    for (int i=0; i<array.length; i++) {
        // If we find the value, return the index
        if (array[i] == value) {               
            return i;                 
        }
    }
    // If we complete the loop without finding the value, return -1
    return -1;
}
/* *** ODSAendTag: Sequential *** */

public static void main(String args[]) throws IOException {
  int[] A = {2, 3, 4, 5, 7, 10};

  int pos = sequential(A, 4);
  if (pos != 2) {
    SUCCESS = false;
  }

  pos = sequential(A, 6);
  if (pos != 6) {
    SUCCESS = false;
  }

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
