Inheritance
===========

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

.. odsafig:: Images/classhier.png
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