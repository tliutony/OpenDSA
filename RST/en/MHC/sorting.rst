Sorting
=======

We sort many things in our everyday lives:
A handful of cards when playing Bridge;
bills and other piles of paper; jars of spices; and so on.
And we have many intuitive strategies that we can use to do the
sorting, depending on how many objects we have to sort and how hard
they are to move around.
Sorting is also one of the most frequently performed computing tasks.
We might sort the records in a database so that we can search the
collection efficiently.
We might sort customer records by zip code so that when we print an
advertisement we can then mail them more cheaply.

Because sorting is so important, it has been studied
intensively in computer science and many algorithms have been devised.
Some of these algorithms are straightforward adaptations of schemes we
use in everyday life.
For example, a natural way to sort your cards in a bridge hand is to
go from left to right, and place each card in turn in its correct
position relative to the other cards that you have already sorted.
This is the idea behind insertion sort.
After years of study, there are still unsolved problems related to
sorting. New algorithms are still being developed and refined for
special-purpose applications.

We begin by discussing two more straightforward, but relatively slow,
algorithms that require :math:`O(n^2)`
time to sort :math:`n` records: **insertion sort** and **selection sort**. 
We then look at a faster algorithm that only requires :math:`O(n \log n)`
time: **merge sort**.

Insertion Sort
--------------

What would you do if you have a stack of phone bills from the past
two years and you want to order by date?
A fairly natural way to handle this is to look at the first two
bills and put them in order.
Then take the third bill and put it into the right position with
respect to the first two, and so on.
As you take each bill, you would add it to the sorted pile that you
have already made.
This simple approach is the inspiration for **insertion sort**.

Insertion Sort iterates through a list of records.
For each iteration, the current record is inserted in turn at the
correct position within a sorted list composed of those records
already processed.

Call the current record :math:`x`. Insertion sort will make room for :math:`x` by moving other records to the right. As it does so, it will compare :math:`x` with the record immediately preceding it.
As soon as a record value less than or equal to :math:`x` is
encountered, insertion sort knows to insert :math:`x` to the right of that record.

Below we show an implementation of insertion sort alongside an animation that illustrates the algorithm:

.. inlineav:: insertionSortCON ss
   :long_name: Insertion Sort Slideshow
   :links: AV/Sorting/mhcsortCON.css
   :scripts: AV/Sorting/insertionSortCON.js
   :output: show
   :keyword: Sorting; Insertion Sort

In the worst case, insertion sort requires :math:`O(n^2)` time. This is because each record may need to be moved all the way to the left -- think of the case where the smallest record is at the end of the list.

Selection Sort
--------------
