Introduction to Inheritance
===========================

Class Hierarchy and Inheritance
-------------------------------

How are classes related to each other?
In Java, and in any other object-oriented language,
classes are organized in a class hierarchy.
    
A **class hierarchy** is like an upside-down tree.
At the very top of the hierarchy is the most general class.
In Java, the most general class is the ``Object`` class.
The classes below ``Object`` in the hierarchy are known as its **subclasses**.
Since all of the objects we use in our programs belong to some class or other,
this is like saying that every object is an ``Object``.


The figure below illustrates the concept of a class hierarchy using some of the classes described in this section.
Notice that the ``Object`` class occurs at the top of the hierarchy.
It is the most general class.
It has features that are common to all Java objects.

.. odsafig:: Images/jjj_classhier.png
   :align: center

As you move down the hierarchy,
the classes become more and more specialized.
An ``Account`` is an ``Object`` but it contains attributes -- customerID and balance -- that
it more specialized than its parent class (``Object``). 

Notice that we have added a ``Person`` class to the hierarchy as the **superclass** of ``Customer``.
Customers are more specialized than persons: they have bank accounts.       

A subclass is said to **inherit** the attributes (variables) and actions (methods) of its superclass. Thus,
a ``Customer`` would inherit things like a name, address, phone number and other attributes from the ``Person``
class. The subclass is said to **extend** the superclass by adding attributes and actions to those it
inherits. 

This **class inheritance** is similar to the classification of natural things.
A horse is a mammal. Horses inherit the characteristic of being warm blooded by virtue of 
also being mammals. But they also have specialized attributes -- manes, hooves -- that
distinguish them from other mammals, such as cows and humans.

java.lang.Object toString()
--------------------------

The most general class in Java's class hierarchy is the **java.lang.Object** class.
It is the superclass of all classes that occur in Java programs.
By default, it is the direct superclass of any class that does not explicitly specify a pedigree in its class definition.

All subclasses of ``Object`` **inherit**
the ``public`` and ``protected`` methods contained in ``Object``, so all such methods can be thought of as belonging to the subclasses.
This means that all classes inherit the methods of the ``Object`` class,
because every class is a subclass of it.
In this section,
let's look briefly at how we can use an inherited method and also at how we can
**override** it--that is,
redefine the method--if it doesn't exactly suit our purposes.


One of the most useful methods in the ``Object`` class is the
``toString()`` method:

.. code-block:: java
    :linenos:
    public class Object {
        public String toString();
    }

The ``toString()`` method returns a ``String`` representation of its object.
For example, ``o1.toString()`` will return a ``String`` that in some sense describes ``o1``.

Suppose we have the following class written:

.. code-block:: java
    :linenos:

     class Student {
       private String name;
       private String email;
       private int id;
    
       public Student(String initName, String initEmail, int initId) {
          name = initName;
          email = initEmail;
          id = initId;
       }
    }

.. note::
    Remember that all Java classes are a subclass of ``Object``!

Because ``Student`` is a subclass of ``Object``, it inherits the
``toString()`` method.
To illustrate the default behavior of ``toString()``, let's use it with a ``Student`` instance:


.. code-block:: java
    :linenos:

    Student stu = new Student("Mary Lyon", "mlyon22@mtholyoke.edu", 42);
    System.out.println(stu.toString());

This code segment creates one ``Student`` instance, named ``stu``. The inherited ``toString()`` method is then invoked on the ``Student`` instance,
which produces the following output:


.. code-block:: java

    Student@7ad041f3

What this experiment shows is that the default definition of ``toString()`` returns some kind of internal representation of its object.
It looks as if it returns the name of the object's class concatenated with its memory address.
This may be useful for some applications.
But for most objects we will want to override the default definition to make the ``toString()`` method return a string that is more appropriate for ``OneRowNim``.


What ``String`` should the ``g1.toString()`` method return?
Let's have it return a ``String`` that reports the ``Student`` instances's current state,
which are the values stored in the two instance variables.

To **override** a method,
you simply define a method with the same signature in the subclass.
If you call ``toString()`` with an instance of the subclass,
its version of the method will be used.
In this way, the subclass method overrides the superclass version.
Thus, ``Student.toString()`` will have the following signature:

.. code-block:: java

    public String toString()

Let us describe the state of a ``Student`` instance very briefly in the string returned by the ``toString()`` method:

.. code-block:: java

    public String toString() { 
        return "Name: " + name + ", email: " + email + ", id: " + id;
    }


If we add the previous ``toString()`` method to the ``Student`` class and then run the following main method:

.. code-block:: java
    :linenos:

    public static void main(String[] args) {
        Student stu = new Student("Mary Lyon", "mlyon22@mtholyoke.edu", 42);
        System.out.println(stu.toString());
    }

We get the following output:

.. code-block::

    Name: Mary Lyon, email: mlyon22@mtholyoke.edu, id:42

Since ``System.out.println`` looks for a String to print out, 
it will automatically look for a toString() method of an object and invoke it. 
It is possible to leave out the method call to toString() inside ``System.out.println`` methods.

.. code-block:: java
    :linenos:

    // Equivalent code
    System.out.println(stu.toString());
    System.out.println(stu);

While this new method may not play an important role in the
``Student`` class,
it does provide a very brief,
understandable description of the state of the object.
This is the reason that the
``toString()`` method was included in the ``Object`` class.

Motivating Inheritance and Polymorphism
---------------------------------------

Among the most important concepts in object oriented programming are the concepts of 
**inheritance** and **polymorphism**.
We first compared inheritance to the natural form of inheritance,
in which horses and cows share certain inherited characteristics,
such as being warm-blooded, by virtue of their being mammals.


We took a more technical look at inheritance above, where we talked about the ``toString()`` method and how it is inherited from the ``Object`` class.
We illustrated there how subclasses of ``Object`` could override the inherited ``toString()`` method in order to customize it for their purposes.
We also introduced the idea of polymorphism, in which a method call,
such as ``obj.toString()``, can have different behaviors depending on the type of object, ``obj``, on which it is called.

In following sections we will take a much closer look at these important object-oriented concepts.
We will learn how Java's **dynamic binding**
mechanism works and how it makes polymorphism possible.
Most importantly, we will see why inheritance and polymorphism are important elements of object-oriented design.


