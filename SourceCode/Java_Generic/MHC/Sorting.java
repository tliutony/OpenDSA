public class Sorting<T extends Comparable<T>> {
    /**
     * Selection sort algorithm.  Buiilds up the sorted part of the
     * array by searching for the smallest value in the unsorted portion
     * of the array and swapping so it is the last value in the sorted
     * portion.
     * @param values the values to sort
     */
    /* *** ODSATag: selectionSort *** */
    public void selectionSort (T[] values) {
        // Grow the sorted part of the array
        for (int fill = 0; fill < values.length-1; fill++) {
            // Find the smallest value in the unsorted portion
            T minValue = values[fill];
            int minPos = fill;
            for (int i = fill; i < values.length; i++) {
                if (values[i].compareTo(minValue) < 0) {
                    minPos = i;
                    minValue = values[i];
                }
            }

            // Swap the smallest value with the first value in the unsorted portion
            T temp = values[fill];
            values[fill] = values[minPos];
            values[minPos] = temp;
        }
    }
    /* *** ODSAendTag: selectionSort *** */
    /* *** ODSATag: insertionSort *** */
    public void insertionSort (T[] values) {
        // Grow the sorted part of the array
        for (int fill = 1; fill < values.length; fill++) {
            // save the next value and its position to insert
            T nextValue = values[fill];
            int pos = fill;

            // Move values to the right to make room for nextValue
            while (pos > 0 && nextValue.compareTo(values[pos-1]) < 1) {
                values[pos] = values[pos-1];
                pos--;
            }
            // Put the next value in the correct location
            values[pos] = nextValue;
        }
    }
    /* *** ODSAendTag: insertionSort *** */
    /*******  Mergesort code starts here *********/
    /**
     * Merge two sorted arrays, so that the new merged array is sorted.
     * @param result the array to place the sorted result in
     * @param a the first sorted array
     * @param b the second sorted array
     */
    /* *** ODSATag: merge *** */
    private void merge(T[] result, T[] a, T[] b) {
        // Index of next value to compare in a
        int left = 0;

        // Index of next value to compare in b
        int right = 0;

        // Index of next slot to fill in sorted
        int next = 0;

        // Keep comparing values in a and b until we run out of values in one
        // of the arrays
        while (left < a.length && right < b.length) {
            // Move the smaller value to sorted
            if (a[left].compareTo(b[right]) < 0) {
                result[next] = a[left];
                left++;
            } else {
                result[next] = b[right];
                right++;
            }
            next++;
        }

        // If there are values left in a, copy the rest of them to sorted
        for (; left < a.length; left++) {
            result[next] = a[left];
            next++;
        }

        // If there are values left in b, copy the rest of them to sorted
        for (; right < b.length; right++) {
            result[next] = b[right];
            next++;
        }
    }
    /* *** ODSAendTag: merge *** */

    /**
     * mergesort is a recursive sorting algorithm that involves repeatedly splitting
     * an array in half, sorting the halves, and merging the sorted halves togethern
     * @param values the values to sort.  On return, the values will be in sorted order.
     */

    /* *** ODSATag: mergesort *** */
    public void mergesort(T[] values) {
        // Base case:  values contains 0 or 1 int.  Return without
        // doing anything since values is already sorted in that case.
        if (values.length <= 1) {    
            return;
        }
        // Recursive case:  there are at least 2 values, so we need to sort them
        else {
            // Split the array into 2 equal-sized parts
            int middle = values.length / 2;
            T[] left = (T[]) (new Comparable[middle]);
            T[] right = (T[]) (new Comparable[values.length - middle]);
            System.arraycopy(values, 0, left, 0, left.length);
            System.arraycopy(values, middle, right, 0, right.length);
            
            // Recursively sort the halves
            mergesort(left);
            mergesort(right);
            
            // Merge the sorted halves together
            merge(values, left, right);
        }
    }
    /* *** ODSAendTag: mergesort *** */


    /*******  Quicksort code starts here *********/
    
    /**
     * Sort an array of values
     * 
     * @param values the array to sort
     */
    public void quicksort(T[] values) {
        quicksort(values, 0, values.length - 1);
    }

    /**
     * Sort the portion of the array between first and last
     * 
     * @param values the array to sort
     * @param first  the index of the first value in the subarray to sort
     * @param last   the index of the last value in the subarray to sort
     */
    private void quicksort(T[] values, int first, int last) {
        // Base case:  the subarray to sort has 0 or 1 value in it.  In that case,
        // return without doing anything.  It is already sorted.
        
        // Recursive case
        if (first < last) {
            // Partition the values in the array.  pivotPos is the position of the
            // value that the array is partitioned around.  All values below pivotPos
            // will be less than the value at pivotPos.  All values above pivotPos
            // will be greater than the value at pivotPos.
            int pivotPos = partition(values, first, last);
            
            // Recursively sort the values in the subarray from first up to, but
            // not including the pivot.
            quicksort(values, first, pivotPos - 1);
            
            // Recursively sort the values in the subarray from the position 
            // following pivotPos through last.
            quicksort(values, pivotPos + 1, last);

            // Output the subarray so we can see that it got sorted.
            System.out.println(
                    "Sorted subarray in positions " + first + " to " + last);
            for (int i = first; i <= last; i++) {
                System.out.print(values[i] + "  ");
            }
            System.out.println("\n");
        }
    }

    /**
     * Partition a subarray such that all values below a selected "pivot" are less than 
     * the pivot, and all values after the pivot are greater than the pivot.
     * @param values the values to partition
     * @param first the lowest index in values being partitioned
     * @param last the highest index in values being partitioned
     * @return the index where the pivot is on return
     */
    private int partition(T[] values, int first, int last) {
        // Select the first value in the subarray as the pivot
        T pivot = values[first];
        System.out.println("pivot = " + pivot);
        
        // up will search from the pivot to the right for a value larger than the pivot
        int up = first;
        
        // down will search from the last index left for a value smaller than the pivot
        int down = last;
        
        // Keep going until the smaller and larger values found are in the right relative
        // order
        while (up < down) {
            // Search to the left for a value larger than the pivot
            for (; values[up].compareTo(pivot) <= 0 && up < last; up++) {
                ;
            }
            
            // Search from the end to the left for a value smaller than the pivot
            for (; values[down].compareTo(pivot) > 0 && down > first; down--) {
                ;
            }
            
            // If the smaller and larger values found are out of order.  Swap them and
            // keep looking
            if (up < down) {
                System.out.println ("Swapping " + values[up] + " and " + values[down]);
                T temp = values[up];
                values[up] = values[down];
                values[down] = temp;
                printArray(values);
            }
        }

        // Now, we just need to put the pivot in the right place.  Swap it with the 
        // smaller value found.
        values[first] = values[down];
        values[down] = pivot;
        
        // Print out the subarray so we can see that it is partitioned around the pivot.
        for (int i = first; i <= last; i++) {
            System.out.print(values[i] + "  ");
        }
        System.out.println("\n");
        
        // Return the position where the pivot was moved to.
        return down;
    }

    private void printArray (T[] values) {
        for (int i = 0; i < values.length; i++) {
            System.out.print (values[i] + "  ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Sorting<Integer> intSorter = new Sorting<>();

        System.out.println ("** Selection sort");
        Integer[] values = {17, 5, 14, 9, 11, 3, 10, 18};
        intSorter.selectionSort(values);

        Sorting<String> stringSorter = new Sorting<>();
        String[] strValues = {"Laura", "Sam", "Eli", "Hilary", "Will", 
            "Charlotte", "Ariel", "Michael", "Greg", "Lia"};
        stringSorter.selectionSort(strValues);

        System.out.println ("\n** Insertion sort");
        Integer[] values2 = {17, 5, 14, 9, 11, 3, 10, 18};
        intSorter.insertionSort(values2);

        String[] strValues2 = {"Laura", "Sam", "Eli", "Hilary", "Will", 
            "Charlotte", "Ariel", "Michael", "Greg", "Lia"};
        stringSorter.insertionSort(strValues2);

        System.out.println ("\n** Merge sort");
        // Test merge on already sorted arrays.
        Integer[] a = { 3, 6, 9 };
        Integer[] b = { 1, 2, 13 };
        Integer[] sorted = new Integer[a.length + b.length];
        intSorter.merge(sorted, a, b);
        intSorter.printArray(sorted);
        
        // Test mergesort on an unsorted array.
        Integer[] c = {17, 5, 14, 9, 11, 3, 10, 18};
        intSorter.mergesort(c);
        intSorter.printArray(c);

        // Test quicksort on an unsorted array.
        System.out.println ("\n** Quicksort");
        Integer[] d = { 9, 5, 14, 17, 11, 3, 10, 18 };
        System.out.print("Unsorted array:  ");
        intSorter.printArray(d);
        intSorter.quicksort(d);
        System.out.print("\nSorted array:  ");
        intSorter.printArray(d);

        
    }
}