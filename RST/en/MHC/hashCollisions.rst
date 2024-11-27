Handling Collisions
===================

In practice, there will be many more possible keys than there are slots in the hash table. Think about our ``MHCHashMap`` implementation where there are only 100 slots by default, but there can be limitless possible keys (such as strings of any length). So, we need to handle the situation where two keys hash to the same slot. This is called a **collision**.

There are two common strategies for resolving collisions: **linear probing** and **chaining**.

- **Linear Probing**: After finding a collision, we place the new key-value pair in the next available slot in the array.
- **Chaining**: After finding a collision, we place the new key-value pair in a secondary List data structure stored at the slot in the array.

Here, we'll focus on chaining as a collision resolution strategy.

Chaining
--------

A straightforward way of implementing chaining is to define each slot in the
hash table to be the beginning of a List.
All records that hash to a particular slot are placed on that slot's list.
The following figure illustrates a hash table where each
slot points to a linked list to hold the records associated with that slot.
The hash function used in the example is just the key itself modulo the array capacity:

.. code-block:: java

    int getIndex(int key) {
        return key % CAPACITY;
    }

.. inlineav:: openhashCON dgm
   :links: AV/Hashing/openhashCON.css
   :scripts: AV/Hashing/openhashCON.js
   :keyword: Hashing; Open Hashing


.. note::

    In the diagram above, we only show the keys in the linked lists for simplicity. In our actual implementation, we will store ``KeyValuePair`` objects in the list entries as well. The capacity of the hash table is 10 so for example, the keys ``100`` and ``930`` both hash to slot ``0``: 
    
    - ``100 % 10 = 0`` 
    - ``930 % 10 = 0``
    
    Thus these two keys will be stored in the linked list at slot ``0``.

Given a table of capacity :math:`M` storing :math:`N` records,
the hash function will (ideally) spread the records evenly among the
:math:`M` positions in the table, yielding on average :math:`N/M` records for each list.
Assuming that the table has more slots than there are records to be
stored, we can hope that few slots will contain more than one record.
In the case where a list is empty or has only one record,
a search requires only one access to the list.
Thus, the average cost for hashing should be :math:`O(1)`.
However, if a poor hash function causes many records to hash to only a few of
the slots, then the cost to access a record will be much higher
because many elements on the linked list must be searched.

MHCHashMap, with chaining
-------------------------

We modify our ``MHCHashMap`` implementation to use chaining, which we call ``MHCHashMapChaining``:

.. codeinclude:: MHC/MHCHashMapChaining
   :tag: instanceVars

The main difference is the type of our ``entries`` array. Instead of maintaining an array of ``KeyValuePair`` objects, we maintain an array of ``List`` objects. Each ``List`` object stores the ``KeyValuePair`` objects that hash to the same slot.

MHCHashMapChaining get()
------------------------

We focus on how the ``get()`` method implementation differs from the ``MHCHashMap`` implementation:

.. codeinclude:: MHC/MHCHashMapChaining
   :tag: get

You'll notice that the ``get()`` method calls a helper method ``getPair()`` to get the ``KeyValuePair`` object for the given key. Otherwise, it closely mirrors the implementation of ``get()`` in ``MHCHashMap``.

We'll look at the implementation of ``getPair()`` next.

.. codeinclude:: MHC/MHCHashMapChaining
   :tag: getPair

The ``getPair()`` method takes a key as input and returns the ``KeyValuePair`` object associated with that key. If the key is not found, it returns ``null``. It begins by computing the index for the key using ``getIndex()``, and then it retrieves the ``List`` object at that index.

If the ``List`` object is ``null``, then the key is not in the map, so the method returns ``null``.

Otherwise, the method iterates through the ``List`` to find the ``KeyValuePair`` with the matching key. If it finds a match, it returns the ``KeyValuePair`` object. If it doesn't find a match, it returns ``null``.

Hash Table Operation Analysis
-----------------------------

How efficient is hashing?
We can measure hashing performance in terms of the number of
record accesses required when performing an operation.

When the hash table is empty, the first record inserted will always
find its home position free.
Thus, it will require only one record access to find a free slot.
If all records are stored in their home positions, then successful
searches will also require only one record access.
As the table begins to fill up, the probability that a record can be
inserted into its home position decreases.
If a record hashes to an occupied slot, then the collision resolution
policy must locate another slot in which to store it.
Finding records not stored in their home position also requires
additional record accesses as the record is searched for along its probe
sequence.
As the table fills up, more and more records are likely to be located
ever further from their home positions.

From this discussion, we see that the expected cost of hashing is a
function of how full the table is. We define the :term:`load factor`
of the table as :math:`N/M`, where :math:`N` is the number of records currently in the table.

The load factor tells us about the tradeoff between the speed of operations and the memory usage of the hash table. A low load factor means that the hash table is not very full, so operations are fast but the memory usage is high as there are many empty slots in the table. A high load factor means that the hash table is very full, so operations are slow but the memory usage is low as there are fewer empty slots in the table. Below is a plot showing the theoretical growth rate of the cost for insertion and deletion into a hash table as the load factor increases. The horizontal axis is the value of the load factor, while the vertical axis is the expected number of accesses to the hash table. The solid lines show a theoretical lower bound on the cost, while the dashed lines show the upper bound on the cost, so the two lines together give us a range of expected costs for both inserting and deleting:

.. odsafig:: Images/hashplot.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Hashing analysis plot

From the figure, we can see that the cost for hashing when the table is not too full is typically close to one
record access.
This is extraordinarily efficient, much better than
binary search which requires :math:`O(\log n)` record accesses.
As the load factor increases, so does the expected cost. A typical rule of thumb is to keep the load factor around 0.75, which means that the hash table is about 75% full. This ensures that the hash table is not too full, so operations are fast, but also not too empty, so memory usage is low.

This requires that the implementor have some idea of how many records
are likely to be in the table at maximum loading, and select the
table size accordingly. The goal should be to make the table small enough so that it does not
waste a lot of space on the one hand, while making it big enough to
keep performance good on the other.

Below is a table comparing the time complexities of the operations for three data structures we've discussed: a sorted ``ArrayList``, a balanced ``BST``, and a hash table with a low load factor:

.. table:: Data Structure Operation Comparison

   +-------------------+------------------+---------------+---------------------------+
   | Operation         | Sorted ArrayList | Balanced BST  | Hash Table w/ low load    |
   |                   |                  |               | factor                    |
   +===================+==================+===============+===========================+
   | Get at position   | O(1)             | N/A           | N/A                       |
   +-------------------+------------------+---------------+---------------------------+
   | Can change size?  | Yes              | Yes           | Yes                       |
   +-------------------+------------------+---------------+---------------------------+
   | Insert            | O(n)             | O(log(n))     | O(1)                      |
   +-------------------+------------------+---------------+---------------------------+
   | Remove            | O(n)             | O(log(n))     | O(1)                      |
   +-------------------+------------------+---------------+---------------------------+
   | Find value        | O(log(n))        | O(log(n))     | O(1)                      |
   +-------------------+------------------+---------------+---------------------------+
   | Produce sorted    | O(n)             | O(n)          | N/A                       |
   | order             |                  |               |                           |
   +-------------------+------------------+---------------+---------------------------+
   | Memory            | Often has unused | Each node     | .75 load => 1/4 empty,    |
   |                   | entries          | requires left | nodes in chain need next  |
   |                   |                  | & right fields| field                     |
   +-------------------+------------------+---------------+---------------------------+


MHCHashMapChaining Complete Reference
-------------------------------------

The complete implementation of ``MHCHashMapChaining`` can be found in the code block below as a reference:

.. codeinclude:: MHC/MHCHashMapChaining
   :tag: MHCHashMapChaining
