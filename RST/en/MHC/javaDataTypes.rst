Java Data Types
===============

Primitives
----------

One of the great things about Python is that all of the basic data types
are objects. Integers are objects, floating point numbers are objects,
lists are objects, everything. In Java that is not the case. In Java,
some of the most basic data types like integers and floating point
numbers are not objects. The benefit of having these primitive data
types be non-objects is that operations on the primitives are fast. The
problem is that it became difficult for programmers to combine objects
and non-objects in the way that we do in Python. So, eventually all the
non-object primitives ended up with "Object" versions.

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
“boxing.” The reverse process is called “unboxing.” In modern Java, the
compiler is smart enough to know when to convert back and forth automatically, which is called “autoboxing.” We will talk more about the
Object versions of the primitive data types later in the course, but for
now just know that the Object versions (uppercased) can be used in the same way as the primitive data types.

Let's look at a simple Python function which converts a Fahrenheit
temperature to Celsius.

.. 
    activecode:: tcpython
    :language: python

.. code-block:: python
    :linenos:

    def main():
        fahr = 70 # balmy!
        ("The temperature in F: ", fahr)
        cel = (fahr - 32) * 5.0/9.0
        print("the temperature in C is: ", cel)

    main()

Next, lets look at the Java equivalent:

.. .. activecode:: convert1
..     :language: java
..     :sourcefile: TempConv.java
..     :stdin: 212
.. code-block:: java

    public class TempConv {
        public static void main(String[] args) {
            double fahr;
            double cel;

            fahr = 70; // balmy!
            System.out.println("The temperature in F: " + fahr);

            cel = (fahr - 32) * 5.0/9.0;
            System.out.println("The temperature in C is: " + cel);
        }
    }

There are several new concepts introduced in this example. We will look
at them in the following order:

-  Variable Declaration

-  Import

Declaring Variables
-------------------

Here is where we run into one of the most important differences between
Java and Python. Python is a **dynamically typed** language. In a
dynamically typed language a variable can refer to any kind of object at
any time. When the variable is used, the interpreter figures out what
kind of object it is. Java is a **statically typed** language. In a
statically typed language the association between a variable and the
type of object the variable can refer to is determined when the variable
is **declared**. Once the declaration is made it is an error for a
variable to refer to an object of any other type.

In the example above, lines 5—7 contain variable declarations.
Specifically we are saying that ``fahr`` and ``cel`` are going to
reference objects that are of type ``Double``. The variable ``in`` will
reference a ``Scanner`` object. This means that if we were to try an
assignment like ``fahr = "xyz"`` the compiler would generate an error
because ``"xyz"`` is a string and ``fahr`` is supposed to be a double.

For Python programmers, the following error is likely to be even more
common. Suppose we forgot the declaration for ``cel`` and instead left
line 6 blank. What would happen when we type ``javac TempConv.java`` on
the command line?

::

    TempConv.java:13: cannot find symbol
    symbol  : variable cel
    location: class TempConv
             cel = (fahr - 32) * 5.0/9.0;
             ^
    TempConv.java:14: cannot find symbol
    symbol  : variable cel
    location: class TempConv
             System.out.println("The temperature in C is: " + cel);
                                                              ^
    2 errors

When you see the first kind of error, where the symbol is on the left
side of the equals sign, it usually means that you have not declared the
variable. If you have ever tried to use a Python variable that you have
not initialized the second error message will be familiar to you. The
difference here is that we see the message before we ever try to test
our program.

The general rule in Java is that you must decide what kind of an object
your variable is going to reference and then you must declare that
variable before you use it. There is much more to say about the static
typing of Java, but for now this is enough.

String
------

Strings in Java and Python are quite similar. Like Python, Java strings
are immutable. However, manipulating strings in Java is not quite as
obvious since Strings do not support an indexing or slicing operator.
That is not to say that you can’t index into a Java string, you can. You
can also pull out a substring just as you can with slicing. The
difference is that Java uses method calls where Python uses operators.

In fact, this is the first example of another big difference between Java
and Python. Java does not support any operator overloading. Table 3 maps
common Python string operations to their Java counterparts. For the
examples shown in the table we will use a string variable called “str”

========================== ==================================== =============================================================
                    Python                     Java                                                   Description
========================== ==================================== =============================================================
                ``str[3]``        ``str.charAt(3)``             Return character in index 3 (remember strings are 0-indexed, so this is the 4th character)
              ``str[2:4]``   ``str.substring(2,4)``             Return substring from index 2 up to but not including index 4
              ``str[2:]``   ``str.substring(2)``                Return substring from index 2 to the end of the string
              ``len(str)``         ``str.length()``             Return the length of the string
         ``str.find('x')``     ``str.indexOf('x')``             Find the first occurrence of x and return the index
        ``str.split(',')``       ``str.split(',')``             Split the string at ``','`` into a list/array of strings
             ``str + str`` ``str + str`` or ``str.concat(str)`` Concatenate two strings together
           ``str.strip()``           ``str.trim()``             Remove any whitespace at the beginning or end
========================== ==================================== =============================================================
