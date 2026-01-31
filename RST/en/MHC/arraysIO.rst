Arrays and Scanner I/O
============================

Below is a modification of the program from the `Java Data Types section <https://opendsa.localhost.devcom.vt.edu/Books/comsc205_public/html/javaDataTypes.html>`_.
Now, the program asks the user to enter the temperature in Fahrenheit and prints the temperature in Celsius. If this program were run on the command-line, you would enter the temperature when prompted and the program would print the temperature in Celsius.

.. code-block:: java
    :linenos:

    import java.util.Scanner;

    public class TempConv {
        public static void main(String[] args) {
            double fahr;
            double cel;
            Scanner in;

            in = new Scanner(System.in);
            System.out.println("Enter the temperature in F: ");
            fahr = in.nextDouble();

            cel = (fahr - 32) * 5.0/9.0;
            System.out.println("The temperature in C is: " + cel);
        }
    }

There are two new concepts introduced in this program: **imports** and **input/output**.

Imports
-------

In Java, you can use any class that is available without having to import
the class, subject to two very important conditions:

1. The ``javac`` and ``java`` commands must know that the class exists.

2. You must use the full name of the class

Your first question might be how do the ``java`` and ``javac`` commands
know that certain classes exist. The answer is the following:

1. Java knows about all the classes that are defined in .java and .class
   files in your current working directory, which is the folder inside your computer where you are running the ``javac`` and ``java`` commands.

2. Java knows about all the classes that are shipped with Java.

3. Java knows about all the classes that are included in your
   ``CLASSPATH`` environment variable. Your ``CLASSPATH`` environment
   variable can name two kinds of structures.

   1. A .jar file that contains Java classes

   2. Another directory that contains Java class files

You can think of the import statement in Java as working a little bit
like the ``from module import xxx`` statement in Python. However, an important difference is that the class naming system
in Java is very hierarchical. The *full* name of the Scanner class is
really ``java.util.Scanner``. You can think of this name as having two
parts: The first part ``java.util`` is called the **package** and the
last part is the **class**. 

So, what exactly does the import statement do? It tells the compiler that we are going to use a shortened version of the class's name. In this example we are going to use the class ``java.util.Scanner`` but we can refer to it as just ``Scanner``. We could use the ``java.util.Scanner`` class without any problem and without any import statement, provided that we always referred to it by its full name. As an experiment, you may want to try this yourself. by removing the import statement and changing ``Scanner`` to ``java.util.Scanner`` in the rest of the code. The program should still compile and run.

Input / Output / Scanner
------------------------

In the previous section we created a ``Scanner`` object. In
Java, ``Scanner`` objects make getting input from the user, a file, or even
over the network relatively easy. In our case we simply want to ask the
user to type in a number at the command line, so in line 9 we construct
a ``Scanner`` by calling the constructor and passing it the ``System.in``
object. Notice that this ``Scanner`` object is assigned to the name ``in``,
which we declared to be a ``Scanner`` on line 7. ``System.in`` is
similar to ``System.out`` except it is used for input.

On line 11 we use the ``Scanner`` object to read in a number. Here again we
see the implications of Java being a **typed** language. Notice
that we must call the method ``nextDouble`` because the variable
``fahr`` was declared as a double. So, we must have a function that is
guaranteed to return each kind of object we might want to read. In this
case, we need to read a Double so we call the function ``nextDouble``. The
compiler matches up these assignment statments and if you try to assign
the results of a method call to the wrong kind of variable it will be
flagged as an error.

The table below shows some commonly used methods of the ``Scanner`` class. There
are many more methods supported by this class and we will talk about how
to find them in our chapter about :ref:`Java Documentation`.

==================== ================ ======================================================
         Return type      Method name                                            Description
==================== ================ ======================================================
             boolean        hasNext()                   returns true if more data is present
             boolean     hasNextInt()   returns true if the next thing to read is an integer
             boolean   hasNextFloat()      returns true if the next thing to read is a float
             boolean  hasNextDouble()     returns true if the next thing to read is a double
             Integer        nextInt()           returns the next thing to read as an integer
               Float      nextFloat()              returns the next thing to read as a float
              Double     nextDouble()             returns the next thing to read as a Double
              String           next()             returns the next thing to read as a String
==================== ================ ======================================================


Arrays
------

An array is the first **data structure** we will learn about, which is an organized collection of data. In an array, data are arranged in a linear or sequential structure, with one element following another. When referencing elements in an array, we refer to the position of the particular element within the array. For example, if the array is named ``arr``, then the elements are accessed as ``arr[0]``, ``arr[1]``, ``arr[2]``, ... ``arr[n-1]``, where ``n`` gives the number of elements in the array. This naming also reflects the fact that the array's data are contained in storage locations that are next to each other. In Java, as in C, C++, and some other programming languages, the first element of an array has **index 0.** 

The figure below shows an array named ``arr`` that contains 15 ``int`` elements. The syntax for referring to elements of an array is ``arr[i]``, where ``i`` is the index of the element.

.. odsafig:: Images/jjj_arrays.png
   :align: center
   :width: 800


For a given array, a valid array subscript must be in the range ``0 ... n-1``, where ``n`` is the number of elements in the array or it is considered out-of-bounds. An out-of-bounds subscript creates a run-time error — that is, an error that occurs when the program is running — rather than a compile-time error.

For the most part, arrays in Java are treated as objects. Like objects, they are instantiated with the ``new`` operator and they have instance variables (for example, ``length``).  The primary difference between arrays and full-fledged objects is that arrays aren't defined in terms of an Array class. Thus, arrays don't fit into Java's Object hierarchy. They don't inherit any properties from Object and they cannot be subclassed.

.. note::
    This portion of the reading talks about arrays in terms of objects and the Java class hierarchy. We will cover these topics in more detail in the coming lectures!

You can think of an array as a container that contains a number of **elements** that are of the same type. When declaring an array, you have to indicate both the array's element type and its length. Just as in declaring and creating other kinds of objects, creating an array object requires that we create both a name for the array and then the array itself. The following statements create an empty array of 15 ``int`` elements:

.. code-block:: java

    int arr[];          // Declare a name for the array
    arr = new int[15];  // Create the array itself

These two steps can be combined into a single statement as follows:

.. code-block:: java

    int arr[] = new int[15];

In this example, the array's element type is ``int`` and its length is 15, which is **fixed and cannot be changed** after the array is created. This means that the array contains 15 variables of type ``int``, which will be referred to as ``arr[0]``, ``arr[1]``, … ``arr[14]``. The fact that the array's length is fixed will be a limitation of the array data structure, and we will see how to overcome this limitation in the coming weeks!