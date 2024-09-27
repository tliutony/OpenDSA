.. Sourced from "Problem Solving with Algorithms and Data Structures using Java"
.. https://runestone.academy/ns/books/published/javads/oop_generics.html

Java Generics 
=============

Primitives vs Object Wrappers
-----------------------------

.. note::

    This subsection is a recap of the Section 1.4.1 reading, as the difference between
    primitives and object wrappers become important when we talk about generics.

In Java, some of the most basic data types like integers and floating point
numbers are not objects. The benefit of having these primitive data
types be non-objects is that operations on the primitives are fast. The
problem is that it became difficult for programmers to combine objects
and non-objects, which we will soon . So, eventually all the
non-object primitives ended up with Object versions.

================== ========
         Primitive   Object
================== ========
               int  Integer
             float    Float
            double   Double
              char     Char
           boolean  Boolean
================== ========

In older versions of Java, it was the programmers responsibility to
convert back and forth from a primitive to an object whenever necessary.
This process of converting a primitive to an object was called
“boxing.” The reverse process is called “unboxing.” In Java 5, the
compiler became smart enough to know when to convert back and forth for us automatically 
and is called “autoboxing”:

.. code-block:: java

    // We can switch between the Object and primitive versions
    Integer[] numbers = new Integer[2];
    numbers[0] = 4;
    numbers[1] = new Integer(2);
    Integer first = numbers[0];
    int second = numbers[1];

We'll use the Object wrapper versions for the rest of this section.

Java Generics
-------------

Consider the code for a sequential search through an array of 
``Integer`` objects, returning the index where the object was found, or -1 if not found:

.. code-block:: java

    public int search(Integer[] arr, Integer target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i].equals(target)) {
                return i;
            }
        }
        return -1;
    }

If we want a sequential search through an array of Strings, we need to make a completely new method that has a lot of the same code:

.. code-block:: java

    public int search(String[] arr, String target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i].equals(target)) {
                return i;
            }
        }
        return -1;
    }

There must be a better way! Java solves this problem by using **generic types**. We use a class like this:

.. code-block:: java

    public class Searcher <T> {
        public int search(T[] arr, T target) {
            for (int i = 0; i < arr.length; i++) {
                if (arr[i].equals(target)) {
                    return i;
                }
            }
            return -1;
        }
    }

The ``<T>`` is a **type parameter**. It serves as a placedholder for a "generic" type while we are implementing the code. We will fill it in with the type we want when creating a ``Searcher`` object:

.. code-block:: java

    public static void main(String[] args) {
        Searcher<Integer> searchInt = new Searcher<Integer>();
        Integer [] arr = {3, 5, 7, 2, 9};
        int found = searchInt.search(arr, 9);
        System.out.println("9 found at index " + found);

        Searcher<String> searchStr = new Searcher<String>();
        String[] words = {"cat", "elk", "dog", "fox"};
        found = searchStr.search(words, "elk");
        System.out.println("elk found at index " + found);
    }

Thus, just as you fill in a method's parameter between parentheses with an actual argument, you fill in the type parameter between the angle brackets with an actual type name. All of Java's Collection framework uses type parameters. You can create an ``ArrayList`` of ``Integer``, ``String``, etc., or any Object that you define yourself. All of the ArrayList methods will work on these lists, and there is no need for Java to have separate libraries for each data type.

The only condition is that the data type you provide must be an object type rather than a primitive type. You cannot write ``ArrayList<double>``. Instead you must use the object wrapper class: ``ArrayList<Double>``.