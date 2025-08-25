.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.
Maps
====

The Map Interface
-----------------

The ``Map<K, V>`` interface is modeled after looking up definitions for words
in a dictionary. In computer science, you will hear people refer to these
kinds of "look up" structures using names like "map", "dictionary", 
"hash", or even "associative array". You can think of a map as a collection
of *pairs* of elements that are associated with each other. A pair consists
of a **key** that corresponds to a value you can look up, and
a **value** corresponding to the result you will find when you look up its
key. If you think of a dictionary of words, for example, each entry in the
dictionary consists of a "word" and its "definition". We would call the "word"
a "key", and its definition would be a "value", and the dictionary itself is
a collection of pairs of keys and values (words and definitions). You will
sometimes hear the elements in a map referred to as a **key-value pair**
because it contains pairs of connected values.
 
Pairs can be added to maps and can be removed from maps. Maps cannot
have distinct pairs with the same keys; if you attempt to add a pair to a map
that already contains a pair with the same key, the second pair will replace
the first.

The ``Map<K, V>`` interface defines the map operations. It takes two separate
generic type parameters: ``K`` is the
type parameter specifying the key type, and ``V`` is the type parameter
specifying the value type.  For example ``K`` could be ``Integer`` and a
``V`` could be ``String``.  Or ``K`` and ``V`` could both be ``Boolean``.
Or ``K`` could be ``String`` and ``V`` could be ``List<Book>``.  There are no
limits on possible combinations, as long as they are object types and not primitive types.

The most important ``Map`` operations are:

.. note::

    Like we have done with previous interfaces, we only show a subset of the ``java.util.Map`` interface below, which we call ``MHCMap`` to differentiate it from the official ``Map`` interface in the ``java.util`` package.

.. codeinclude:: MHC/MHCMap
   :tag: MHCMap

..    public V put(K key, V val);         // store a given key, value pair. If the key already exists, the value is replaced, and the old value is returned.
..    public V get(K key);                // get the value associated with given key. If the key does not exist, ``null`` is returned.
..    public V remove(K key);             // remove key, value pair for given key, and returns the value that was removed.
..    public boolean containsKey(K key);  // determine whether key exists in Map.

Classes that Implement Map
------------------------------

``HashMap`` and ``TreeMap`` are two classes in the ``java.util`` collections
framework that implement the ``Map`` interface.  They both provide
fast operations to look up a key in a map. They also
provide quick insertion of a pair into the map or removal of a
pair from a map. For large volumes of data, both are much, much faster
at lookup tasks than storing items in a ``List`` or an array. 
We usually use ``HashMap`` as the default choice when we create new maps, similar to choosing ``ArrayList``
as the default choice for new ``List`` objects. The ``HashMap`` class
works well in most cases.

One situation when you would prefer to use ``TreeMap`` is when you would
like to iterate over all the keys in the map in **sorted order**. For example,
in a dictionary, you might expect words to be stored in alphabetical order,
and in a phone book, you might expect names to be stored in alphabetical order.
If keys have a natural ordering, the ``TreeMap`` class will use this order
when iterating over keys, although his can slightly impact the overall
performance of the map by a small amount. The ``HashMap`` does not keep keys
in any predictable order.

.. note::

    We'll focus on the ``HashMap`` implementation in the upcoming classes.

Using a Map
-----------

Let's think about a simple example for using a map data structure.
Suppose that a programmer is developing an application for a large
company for maintaining a no-call list. The programmer wishes to
store pairs of names and phone numbers. We could represent both using
strings, so we could use a ``Map<String, String>`` to store these
pairs. The resulting map will act sort of like a phone book, associating
names (keys) with phone numbers (values) in pairs.

.. code-block:: java

   public static void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();
   }



Adding and Accessing Pairs in a Map
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now, let's add some values to our ``noCallMap``.  To add something to
a Map, we'll call the ``put()`` method:

.. code-block:: java

   public static void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();

       noCallMap.put("Roger M", "090−997−2918");
       noCallMap.put("Jane Q", "999-777-1234");
   }

``put()`` takes in two parameters: first a key, and then an associated value.
The two calls to ``put()`` above create two key-value pairs, each with a name
and a phone number.

To access those pairs, we use the ``get()`` method:

.. code-block:: java

   public static void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();

       noCallMap.put("Roger M", "090−997−2918");
       noCallMap.put("Jane Q", "999-777-1234");

       System.out.print("Jane Q's number is: " + noCallMap.get("Jane Q"));
   }

When we run the code above, the following message would be printed out:

.. raw:: html

   <pre>"Jane Q's number is: 999-777-1234"</pre>


Checking for and Removing Pairs in a Map
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As you saw with ``get()``, when accessing values in a map, you usually use
the key to specify which pair you wish to work on. In fact, sometimes one
might say "index into a map" using a key. The alternate name of "associative
array" comes from the fact that a map uses keys as unique identifiers for the
pairs it contains, and you can think of the key as being similar to the
"position" of a pair in a map, just like numeric positions are used to
refer to positions in a ``List``.

So when checking to see if a pair is stored in a map, or to remove the pair
from the map, it is natural to use the key as the identifier. Maps provide
a ``remove()`` method where you specify a key, and the pair with that key
will be removed from the map. Maps also provide a ``containsKey()`` method that
takes a key value and returns a boolean result indicating whether a pair
with the corresponding key is present in the map. For both of these operations,
since keys must be unique in a map, we really only need a key.

.. code-block:: java

   public static void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();

       noCallMap.put("Roger M", "090−997−2918");
       noCallMap.put("Jane Q", "999-777-1234");

       noCallMap.remove("Jane Q");
       System.out.print(noCallMap.containsKey("Jane Q"));
   }

Here, we add "Jane Q" and her phone number to the Map, remove it, then the value ``false``
would be printed out as there is no longer a key called "Jane Q" in our Map.

In the next section, we'll look at how Hash Maps (also known as Hash Tables) implement the ``Map`` interface.
