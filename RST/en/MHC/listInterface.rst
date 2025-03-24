.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

The List Interface
==================

Introduction
------------

If your program needs to store a few things |---| numbers,
payroll records, or job descriptions for example |---| the simplest
and most effective approach might be to put them in a list.
Only when you have to organize and search through a large number of
things do more sophisticated data structures like
:term:`search trees <search tree>`
become necessary.
Many applications don't require any form of search,
and they do not require that an ordering be placed on the objects
being stored.
Some applications require that actions be performed in a strict
chronological order, 
processing objects in the order that they arrived,
or perhaps processing objects in the reverse of the order that they
arrived.
For all these situations, a simple list structure is appropriate.

.. This chapter describes representations both for lists and for
.. two important list-like structures called the :term:`stack` and the
.. :term:`queue`.

Along with presenting the list as a fundamental data structure, the other
goals of this section are to:

1. Give examples that show the separation of a logical representation
   in the form of an interface from a realized implementation as a data
   structure.

2. Illustrate the use of asymptotic analysis in the context of
   simple operations that you might already be familiar with.
   In this way you can begin to see how asymptotic
   analysis works, without the complications that arise when analyzing
   more sophisticated algorithms and data structures.

We begin by defining an interface for lists, and then discuss an array-based implementation of the list.


.. note::

    Next week, we will cover an alternative implementation called the **linked list**.

We all have an intuitive understanding of what we mean by a "list".
We want to turn this intuitive understanding into a concrete data
structure with implementations for its operations.
The most important concept related to lists is that of
:term:`position`.
In other words, we perceive that there is a first element in the list,
a second element, and so on.
So, define a :term:`list` to be a finite, ordered
sequence of data items known as :term:`elements <element>`.
This is close to the mathematical concept of
a :term:`sequence`.

"Ordered" in this definition means that each element has a
position in the list.
So the term "ordered" in this context does **not** mean that the list
elements are sorted by value.
(Of course, we can always choose to sort the elements on the list if
we want; it's just that keeping the elements sorted is not an inherent
property of being a list.)

Each list element must have some data type.

.. In the simple list implementations discussed in this chapter, all
.. elements of the list are usually assumed to have the same data type,
.. although there is no conceptual objection to lists whose elements have
.. differing data types if the application requires it.

The operations defined as part of the list **interface** do not
depend on the elemental **data type**.
For example, the list interface can be used for lists of integers, lists of
characters, lists of payroll records, even lists of lists.

A list is said to be :term:`empty` when it contains no elements.
The number of elements currently stored is called the
**size** of the list.

.. The beginning of the list is called the :term:`head`,
.. the end of the list is called the :term:`tail`.

.. We need some notation to show the contents of a list,
.. so we will use the same angle bracket notation that is normally used
.. to represent :term:`sequences <sequence>`.
.. To be consistent with standard array indexing, the first position
.. on the list is denoted as 0.
.. Thus, if there are :math:`n` elements in the list, they are given
.. positions 0 through :math:`n-1` as
.. :math:`\langle\ a_0,\ a_1,\ ...,\ a_{n-1}\ \rangle`.
.. The subscript indicates an element's position within the list.
.. Using this notation, the empty list would appear as
.. :math:`\langle\ \rangle`.


Defining the Interface
----------------------

What basic operations do we want our lists to support?
Our common intuition about lists tells us that a list should be able
to grow and shrink in size as we insert and remove elements.
We should be able to insert and remove elements from anywhere in
the list.
We should be able to gain access to any element's value,
either to read it or to change it.

.. We must be able to create and clear (or reinitialize)
.. lists.
.. It is also convenient to access the next or previous
.. element from the "current" one.

Now we can define the interface for a list object in terms of a set
of operations on that object.
``MHCList`` defines the member functions that any list
implementation inheriting from it must support, along with their
parameters and return types.

.. note::
    
    We call this interface ``MHCList`` so as to not confuse it with the interface defined by `java.util.List <https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html>`_. Our ``MHCList`` interface will specify a subset of the java.util.List interface to implement.

As we have previously discussed, an interface
does not specify how operations are implemented.
We will discuss two complete implementations, the **array list** and the **linked list**,
both of which use the same list interface to define their operations.
However they are considerably different in approaches and in their
space/time tradeoffs.

The code below presents our list interface, which should
be able to support different data types for the elements. Languages that support generics, like Java, give us more control over the element types:

.. TL note: I removed these methods from the interface because they will require some discussion of .equals()
.. // Removes the first occurrence of the specified element from this list, if it is present.
.. public boolean remove (Object o);
.. // Returns true if this list contains the specified element.
.. public boolean contains (Object o);
.. // Returns the index of the first occurrence of the specified element in this list,
.. // or -1 if this list does not contain the element.
.. int indexOf (Object o);

.. codeinclude:: MHC/MHCList
   :tag: MHCList
   
|

.. The comments given with each member function describe what it is
.. intended to do.
.. However, an explanation of the basic design should help make this
.. clearer.
.. Given that we wish to support the concept of a sequence, with access
.. to any position in the list, the need for many of the member
.. functions such as ``insert`` and ``moveToPos`` is clear.
.. The key design decision embodied in this ADT is support for the
.. concept of a :term:`current position`.
.. For example, member ``moveToStart`` sets
.. the current position to be the first element on the list, while
.. methods ``next`` and ``prev`` move the current position
.. to the next and previous elements, respectively.
.. The intention is that any implementation for this ADT support the
.. concept of a current position.
.. The current position is where any action such as insertion or deletion
.. will take place.
.. An alternative design is to factor out position as a separate position
.. object, sometimes referred to as an :term:`iterator`.

.. .. codeinclude:: Lists/List
..    :tag: ListADT

.. |

.. .. inlineav:: listADTposCON ss
..    :long_name: List ADT Positions Slideshow
..    :links: AV/List/listADTCON.css
..    :scripts: AV/List/listADTposCON.js
..    :output: show
..    :keyword: List ADT

The ``MHCList`` member methods allow you to build a list with elements
in any desired order, and to access any desired position in the list.

.. You might notice that the ``clear`` method is a "convenience" method,
.. since it could be implemented by means of the other
.. member functions in the same asymptotic time.

Using a List
------------

We can modify a List using the methods defined in the ``MHCList`` interface:

.. code-block:: java

    MHCList<String> theList = new MHCArrayList<>(); // Create a new empty ArrayList
    System.out.println(theList.size()); // Output: 0
    System.out.println(theList.isEmpty()); // Output: true

    theList.add("Hello"); // add "Hello" to the beginning of the list
    theList.add("World"); // add "World" to the end of the list
    theList.add(1, "There"); // add "There" to the second position in the list, which shifts "World" to the third position
    System.out.println(theList); // Output: [Hello, There, World]

    String removedElement = theList.remove(theList.size() - 1); // remove the last element from the list, and return it
    System.out.println(removedElement); // Output: World
    System.out.println(theList); // Output: [Hello, There]

    theList.set(0, "Hi"); // replace the first element with "Hi"
    System.out.println(theList); // Output: [Hi, There]


A List can be iterated through as follows:

.. code-block:: java
    
    MHCList<String> theList; // assume theList is initialized previously
    String curElement;

    // size() returns the number of elements in the list
    for (int i = 0; i < theList.size(); i++) {

        // get() returns the element at the specified position in the list
        curElement = theList.get(i);

        // take some action with the current element
        doSomething(curElement);    
    }

In this example, each element of the list in turn is stored
in ``curElement``, and passed to the ``doSomething`` function.
The loop terminates when the index ``i`` reaches the end of the
list. 

.. note::

    None of this code needs to know about the specific list implementation -- all we need to know is the ``MHCList`` interface!

Next class, we will look at a standard approach of implementing lists, the array-based list or ArrayList.

.. The list class declaration presented here is just one of
.. many possible interpretations for lists.
.. Our list interface provides most of the operations that one
.. naturally expects to perform on lists and serves to illustrate the
.. issues relevant to implementing the list data structure.
.. As an example of using the list ADT, here is a function to
.. return ``true`` if there is an occurrence of a given integer in the
.. list, and ``false`` otherwise.
.. The ``find`` method needs no knowledge about the specific list
.. implementation, just the list ADT.

.. .. codeinclude:: Lists/ListTest
..    :tag: listfind

.. In languages that support it, this implementation for ``find`` could
.. be rewritten as a generic or template with respect to the element
.. type.
.. While making it more flexible, even generic types still
.. are limited in their ability to handle different data types stored on
.. the list.
.. In particular, for the ``find`` function generic types would only work
.. when the description for the object being searched for (``k`` in the
.. function) is of the same type as the objects themselves.
.. They also have to be comparable when using the ``==`` operator.
.. A more realistic situation is that we are searching for a record that
.. contains a :term:`key` field whose value matches ``k``.
.. Similar functions to find and return a :term:`composite type` based
.. on a key value can be created using the list implementation, but to do
.. so requires some agreement between the list ADT and the ``find``
.. function on the concept of a key, and on
.. :ref:`how keys may be compared <comparable> <Comparison>`.

.. There are two standard approaches to implementing lists, the
.. :ref:`array-based list <ListArray>`, and the
.. :ref:`linked list <linked list> <ListLinked>`.


.. List ADT Programming Exercise
.. -----------------------------

.. .. extrtoolembed:: 'List ADT Programming Exercise'
..    :workout_id: 62
