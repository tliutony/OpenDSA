Hash Tables
===========

Hashing Introduction
--------------------

Hashing is a method for storing and retrieving records from a database.
It lets you insert, delete, and search for records based on a search
key value.
When properly implemented, these operations can be performed
in constant time :math:`O(1)`.
In fact, a properly tuned hash system typically looks at only
**one or two records** for each search, insert, or delete operation.
This is far better than the :math:`O(\log n)` average cost required
to do a binary search on a sorted array of :math:`n` records,
or the :math:`O(\log n)` average cost required to do an operation
on a binary search tree.
However, even though hashing is based on a simple idea,
it is surprisingly difficult to implement properly.
Designers need to pay careful attention to all of the details
involved with implementing a hash system.

A hash system stores records in an array called a :term:`hash table`.

Hashing works by performing a computation on a search key
``key`` in a way that is intended to identify the position in
the hash table that contains the record with a given key ``key``.
The function that does this calculation is called the
:ref:`hash function <hash function> <HashFuncExamp>`, which
is denoted by ``hashCode()``.
Since hashing schemes place records in the table in whatever order
satisfies the needs of the address calculation, records are
not ordered by value.
A position in the hash table is also known as a :term:`slot`.
The number of slots in a hash table will be denoted by the
**capacity** with slots numbered from 0 to **capacity-1**.

The goal for a hashing system is to arrange things such that,
for any key ``key`` and some hash function ``hashCode()``, we map the key to a slot ``i`` in the table such that
``0 <= i < capacity``,
and we have the key of the record stored at position ``i`` in the table equal to ``key``.

Hashing is not good for applications where multiple
records with the same key value are permitted.
Hashing is not a good method for answering range searches.
In other words, we cannot easily find all records (if any) whose key
values fall within a certain range.
Nor can we easily find the record with the minimum or maximum key
value, or visit the records in key order.
Hashing is most appropriate for answering the question, 'What record,
if any, has the given ``key``?'
**For applications where all search is done by exact-match queries,
hashing is the search method of choice because it is extremely
efficient when implemented correctly.**

As a simple illustration of hashing, we can actually think of the indices of an array as a hash code. If the key is an integer, then the hash function is just the key itself:

.. code-block:: java

   int hashCode(int key) {
       return key;
   }


To find the record with key value ``key``, we look in ``array[key]``.

.. inlineav:: hashIntroCON ss
   :long_name: Hashing Intro Slideshow
   :links: AV/Hashing/hashIntroCON.css
   :scripts: AV/Hashing/hashIntroCON.js
   :output: show
   :keyword: Hashing


In general, the ``hashCode()`` function can produce any integer value from the ``key`` input, so we'll need to additionally ensure that the resulting index is within the bounds of the array. We accomplish this by taking the modulus of the ``hashCode()`` with the capacity of the array. Assuming that the capacity of the array is ``CAPACITY``, we have the follwing method ``getIndex()`` that computes the index for any key:

.. codeinclude:: MHC/MHCHashMap
   :tag: getIndex

.. note::

    The use of the modulo ``%`` operator ensures that the resulting index is within the bounds of the array, just like how we did for our circular array implementation of queues.
    
In practice, we may have more sophisticated hash functions that map keys to indices, as the ``key`` can be of any type. We ideally want a hash function that distributes keys uniformly across the array, so that we avoid two keys mapping to the same slot (called a **collision**). Conveniently, Java provides a reasonable built-in ``hashCode()`` method for all objects, so we can use that as our hash function. Just like how every object in Java has a ``toString()`` method, every object also has a ``hashCode()`` method!

Hash Table Implementation
-------------------------

Hash tables are a good data structure choice for implementing the Map interface we saw before. To begin our implementation, we first need a way to represent key-value pairs, which we do through the ``KeyValuePair`` class:

.. codeinclude:: MHC/KeyValuePair
   :tag: KeyValuePair

.. note::

    Notice that the ``putValue()`` method returns the previous value associated with the key, or ``null`` if the key was not in the map. This matches the behavior of the ``put()`` method in the ``MHCMap`` interface!

Next, let's take a look at our ``MHCHashMap`` instance variables:

.. codeinclude:: MHC/MHCHashMap
   :tag: instanceVars


The ``entries`` array holds ``KeyValuePair`` objects, and the capacity of the hash table is given by ``CAPACITY``. 

MHCHashMap get()
----------------

Let's now take a look at the ``get()`` method:

.. codeinclude:: MHC/MHCHashMap
   :tag: get

We first compute the index for the key using the ``getIndex()`` method we saw above, and then we check if the entry at that index is ``null``. If it is, then the key is not in the map, so we return ``null``. 

.. note::

    Remember that array slots are initialized to ``null`` to indicate an empty slot in the array!

Otherwise, we return the value associated with the key by calling ``getValue()`` on the ``KeyValuePair`` object at the computed index.

MHCHashMap put()
----------------

Next, let's look at the ``put()`` method:

.. codeinclude:: MHC/MHCHashMap
   :tag: put

Like with ``get()``, we first compute the index for the key using ``getIndex()``, and then we check if the entry at that index is ``null``. If it is, then the key is not in the map, so we create a new ``KeyValuePair`` with the given key and value, and place it in the ``entries`` array at the computed index.

Otherwise, we update the value associated with the key by calling ``putValue()`` on the ``KeyValuePair`` object at the computed index.

MHCHashMap Complete Reference
----------------------------

We focus on the ``get()`` and ``put()`` methods for our hash table implementation in our discussions, but the complete implementation can be found in the code block below:

.. codeinclude:: MHC/MHCHashMap
   :tag: MHCHashMap
