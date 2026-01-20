Sorting II
==========

Merge Sort
----------

A natural approach to problem solving is divide and conquer.
To use divide and conquer when sorting, we might consider breaking the
list to be sorted into pieces, process the pieces, and then put them
back together somehow.
One way to do this would be to split the list in half, sort
the halves, and then merge the sorted halves together.
This is the idea behind **merge sort**. We give the pseudocode for the process below:

.. code-block:: java

   public static void mergesort(T[] values) {
      if (values.length <= 1) return; // base case, array is sorted

      else {
         // split the array into two halves and copy their contents
         left = left half of the items from values;
         right = right half of the items from values;
         
         // recursively sort the halves
         mergesort(left);
         mergesort(right);

         // merge the halves together and store the result in values
         merge(values, left, right);
      }
   }

merge()
~~~~~~

We first look at the merge operation, which takes two smaller, sorted arrays and combines them into a single larger sorted array. It begins by examining the first record of each
smaller array and picks the smaller value as the smallest record overall.
This smaller value is then copied into the output array. Merging continues in this way, comparing the next records of the smaller arrays and continually appending the smaller to the output array until no more input records remain:

.. codeinclude:: MHC/Sorting.java
   :tag: merge


.. inlineav:: mergesortCON ss
   :long_name: Merging Slideshow
   :scripts: AV/Sorting/mergesortCON.js
   :output: show
   :keyword: Sorting; Mergesort

In the worst case, the two halves of the array are of size :math:`n/2`, so the merge operation requires :math:`O(n)` time as there are :math:`n` records to be copied.

mergesort() implementation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Below is the complete implementation of mergesort:

.. note::

   We use the built-in System.arraycopy() method to copy the values into the smaller left and right arrays. This is an :math:`O(n)` operation!

.. codeinclude:: MHC/Sorting.java
   :tag: mergesort

.. inlineav:: MergeSortAnalysisCON ss
   :long_name: Mergesort Analysis Slideshow
   :links: AV/Sorting/MergeSortAnalysisCON.css
   :scripts: AV/Sorting/MergeSortAnalysisCON.js
   :output: show
   :keyword: Sorting; Mergesort

Runtime comparisons between sorting algorithms
----------------------------------------------

.. note::

   We will not cover bubble sort or quick sort this semester -- they are listed here for reference.

+-------------------+------------------------+----------------+
| Sorting Algorithm | Time Complexity        | Memory Usage   |
+===================+========================+================+
| Selection sort    | $O(n^2)$               | In-place swaps |
+-------------------+------------------------+----------------+
| Insertion sort    | $O(n^2)$               | In-place swaps |
+-------------------+------------------------+----------------+
| Bubble sort       | $O(n^2)$               | In-place swaps |
+-------------------+------------------------+----------------+
| Merge sort        | $O(n \log n)$          | Copies array   |
+-------------------+------------------------+----------------+
| Quick sort        | $O(n \log n)$ on avg.  | In-place swaps |
+-------------------+------------------------+----------------+
