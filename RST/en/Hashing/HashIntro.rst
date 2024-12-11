.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: hash intro
   :topic: Hashing
   :keyword: Hashing

.. index:: ! hashing


Introduction
============

Introduction
------------

Hashing is a method for storing and retrieving records from a database.
It lets you insert, delete, and search for records based on a search
key value.
When properly implemented, these operations can be performed
in constant time.
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

A hash system stores records in an array called a :term:`hash table`,
which implements the ``MHCMap`` interface.

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


In general, the ``hashCode()`` function can produce any integer value from the ``key`` input, so we'll need to additionally ensure that the resulting index is within the bounds of the array. Assuming that the capacity of the array is ``CAPACITY``, we have the follwing method ``getIndex()`` that computes the index for any key:

.. codeinclude:: SourceCode/Java_Generic/MHC/MHCHashMap.java
   :method: getIndex

In practice, we may have more sophisticated hash functions that map keys to indices. 


Hash Table Implementation
-------------------------

To have our hash table actually implement the ``MHCMap`` interface, we need a way to store key-value pairs in the backing array. We facilitate this by writing a ``KeyValuePair`` class that maintains a generic key and value:

In most applications, there are many more values in the key range
than there are slots in the hash table.
For a more realistic example, suppose the key can take any value in
the range 0 to 65,535 (i.e., the key is a two-byte unsigned integer),
and that we expect to store approximately 1000 records at any given time.
It is impractical in this situation to use a hash table with
65,536 slots, because then the vast majority of the slots would be
left empty.
Instead, we must devise a hash function that allows us to store the
records in a much smaller table.
Because the key range is larger than the size of the table,
at least some of the slots must be mapped to from multiple key values.
Given a hash function **h** and two keys :math:`k_1` and
:math:`k_2`, if
:math:`\mathbf{h}(k_1) = \beta = \mathbf{h}(k_2)`
where :math:`\beta` is a slot in
the table, then we say that :math:`k_1` and :math:`k_2` have a
:term:`collision` at slot :math:`\beta` under hash function **h**.

Finding a record with key value ``K`` in a database organized by hashing
follows a two-step procedure:

1. Compute the table location :math:`\mathbf{h}(K)`.

2. Starting with slot :math:`\mathbf{h}(K)`, locate the record
   containing key ``K`` using (if necessary) a
   :ref:`collision resolution <collision resolution> <HashCSimple>`
   policy .

