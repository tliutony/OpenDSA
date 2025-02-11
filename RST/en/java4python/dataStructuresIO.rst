Java Data Structures and File I/O
============================

Continuing from last time's reading, here is the code example we will be looking at again:

.. code-block:: java
    :linenos:

    import java.util.Scanner;

    public class TempConv {
        public static void main(String[] args) {
            Double fahr;
            Double cel;
            Scanner in;

            in = new Scanner(System.in);
            System.out.println("Enter the temperature in F: ");
            fahr = in.nextDouble();

            cel = (fahr - 32) * 5.0/9.0;
            System.out.println("The temperature in C is: " + cel);
        }
    }

Imports
-------

In Java, you can use any class that is available without having to import
the class, subject to two very important conditions:

1. The ``javac`` and ``java`` commands must know that the class exists.

2. You must use the full name of the class

Your first question might be how do the ``java`` and ``javac`` commands
know that certain classes exist. The answer is the following:

1. Java knows about all the classes that are defined in .java and .class
   files in your current working directory.

2. Java knows about all the classes that are shipped with Java.

3. Java knows about all the classes that are included in your
   ``CLASSPATH`` environment variable. Your ``CLASSPATH`` environment
   variable can name two kinds of structures.

   1. A .jar file that contains Java classes

   2. Another directory that contains Java class files

You can think of the import statement in Java as working a little bit
like the ``from module import xxx`` statement in Python. However, behind
the scenes, the two statements actually do very different things. The
first important difference to understand is that the class naming system
in Java is very hierarchical. The *full* name of the Scanner class is
really ``java.util.Scanner``. You can think of this name as having two
parts: The first part ``java.util`` is called the **package** and the
last part is the **class**. We’ll talk more about the class naming system a
bit later. The second important difference is that it is the Java class
loader’s responsibility to load classes into memory, not the import
statement’s.

So, what exactly does the import statement do? What it does is tell the
compiler that we are going to use a shortened version of the class’s
name. In this example we are going to use the class
``java.util.Scanner`` but we can refer to it as just ``Scanner``. We
could use the ``java.util.Scanner`` class without any problem and
without any import statement, provided that we always referred to it by
its full name. As an experiment, you may want to try this yourself.
Remove the import statement and change the string Scanner to
``java.util.Scanner`` in the rest of the code. The program should still
compile and run.

Input / Output / Scanner
------------------------

In the previous section we created a ``Scanner`` object. In
Java, ``Scanner`` objects make getting input from the user, a file, or even
over the network relatively easy. In our case we simply want to ask the
user to type in a number at the command line, so in line 9 we construct
a ``Scanner`` by calling the constructor and passing it the ``System.in``
object. Notice that this ``Scanner`` object is assigned to the name ``in``,
which we declared to be a ``Scanner`` on line 7. ``System.in`` is
similar to ``System.out`` except, of course, it is used for input. If you
are wondering why we must create a ``Scanner`` to read data from
``System.in`` when we can write data directly to ``System.out`` using
``println``, you are not alone. We will talk about the reasons why this
is so later when we talk in-depth about Java streams. You will also see
in other examples that we can create a ``Scanner`` by passing the ``Scanner`` a
``File`` object. You can think of a ``Scanner`` as a kind of “adapter” that
makes low level objects easier to use.

On line 11 we use the ``Scanner`` object to read in a number. Here again we
see the implications of Java being a strongly typed language. Notice
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



List
----

Next, let's look at a program which reads numbers from a file and produces a histogram showing the frequency of the numbers.
The data file we will use has one number between 0 and 9 on each line of the file.
Here is a simple Python program that creates and prints a histogram.

.. 
    activecode:: histopy
    :language: python

.. code-block:: python
    :linenos:

    def main():
        count = [0]*10
        data = open('test.dat')

        for line in data:
            count[int(line)] = count[int(line)] + 1

        idx = 0
        for num in count:
            print(idx, " occured ", num, " times.")
            idx += 1
    
    main()


Test running the program. It will read this data:

.. datafile:: test.dat

   1
   2
   3
   9
   1

Lets review what is happening in this little program. First, we create a list
and initialize the first 10 positions in the list to be
0. Next we open the data file called ``test.dat``. Third, we have a loop
that reads each line of the file. As we read each line we convert it to
an integer and increment the counter at the position in the list
indicated by the number on the line we just read. Finally we iterate
over each element in the list, printing out both the position in the list
and the total value stored in that position.

To write the Java version of this program we will have to introduce
several new Java concepts. First, you will see the Java equivalent of a
list, called an ``ArrayList.`` Next, you will see three different kinds
of loops used in Java. Two of the loops we will use are going to be very
familiar, the third one is different from what you are used to in Python
but is easy when you understand the syntax:

- ``while (condition) { code }``

  - The ``code`` will be repeatedly executed until the ``condition`` becomes false.

- ``for (initialization statement; condition; loop statement) { code }``

  - The ``code`` will be repeatedly executed until the ``condition`` becomes false. As shown in the example below, the ``initialization statement`` and ``loop statement`` make this form useful for iterating over a range of numbers, similar to how you might use ``for i in range(10)`` in Python. 

- ``for (Type variable : collection) { code }``

  - The ``code`` will be executed once for each element in the ``collection``. Each execution, ``variable`` will be assigned to the next element of ``collection``. Known as the "for-each" loop. This form is useful for iterating over members of a collection, similar to how you might use ``for a in array`` in Python.

.. note::
    For the first lectures as we get used to Java, we'll focus on the ``while`` loop and standard ``for`` loop. We'll touch on the for-each loop more later in the semester.

Here is the Java code needed to write the exact same program:

.. .. activecode:: histojava
..     :language: java
..     :sourcefile: Histo.java
..     :datafile: test.dat

.. code-block:: java
    :linenos:

    import java.util.Scanner;
    import java.util.ArrayList;
    import java.io.File;
    import java.io.IOException;

    public class Histo {

        public static void main(String[] args) {
            Scanner data = null;
            ArrayList<Integer> count;
            Integer idx;

            try {
                    data = new Scanner(new File("test.dat"));
            }
            catch ( IOException e) {
                System.out.println("Unable to open data file");
                e.printStackTrace();
                System.exit(0);
            }

            count = new ArrayList<Integer>(10);
            for (Integer i = 0; i < 10; i++) {
                count.add(i,0);
            }

            while(data.hasNextInt()) {
                idx = data.nextInt();
                count.set(idx,count.get(idx)+1);
            }

            idx = 0;
            for(Integer i : count) {
                System.out.println(idx + " occured " + i + " times.");
                idx++;
            }
        }
    }




Before going any further, I suggest you try to compile the above program
and run it on some test data that you create.

Now, let's look at what is happening in the Java source. As usual, we
declare the variables we are going to use at the beginning of the
method. In this example we are declaring a ``Scanner`` variable called ``data``,
an integer called ``idx`` and an ``ArrayList`` called ``count``. However, there
is a new twist to the ``ArrayList`` declaration. Unlike Python where
lists can contain just about anything, in Java we let the compiler know
what kind of objects our array list is going to contain. In this case
the ``ArrayList`` will contain ``Integers``. The syntax we use to declare
what kind of object the list will contain is the ``<Type>``
syntax.

Technically, you don’t *have* to declare what is going to be in an array
list. The compiler will allow you to leave the ``<``*Type*``>`` off the
declaration. If you don’t tell Java what kind of object is going to be
on the list Java will give you a warning message like this:

::

    Note: Histo.java uses unchecked or unsafe operations.
    Note: Recompile with -Xlint:unchecked for details.

Without the ``<Integer>`` part of the declaration Java simply assumes that
*any* object can be on the list. However, without resorting to an ugly
notation called casting, you cannot do anything with the objects on a
list like this! So, if you forget you will surely see more errors later
in your code. (Try it and see what you get)

Exception Handling with try/catch
-------------------------------------

Lines 13—20 are required to open the file. Why so many lines to open a
file in Java? The additional code mainly comes from the fact that Java
forces you to reckon with the possibility that the file you want to open
is not going to be there. If you attempt to open a file that is not
there you will get an error. A try/catch construct allows us to try
things that are risky, and gracefully recover from an error if one
occurs. The following example shows the general structure of a try/catch
block.

.. code-block:: java
    :linenos:

    try {
       // Put some risky code in here, like opening a file
    }
    catch (Exception e) {
       // If an error happens in the try block an exception is thrown.
       // We will catch that exception here!
    }

Notice that in line 16 we are catching an ``IOException``. In fact, we
will see later that we can have multiple catch blocks to catch different
types of exceptions. If we want to be lazy and catch any old exception
we can catch an ``Exception`` which is the parent of all exceptions.
However, catching ``Exception`` is a terrible practice, since you may inadvertently catch exceptions you do not intend to, making it harder to identify bugs in your program.

On line 22 we create our ``ArrayList`` and give it an initial size of 10.
Strictly speaking, it is not necessary to give the ``ArrayList`` any
size. It will grow or shrink dynamically as needed, just like a list in
Python. On line 23 we start the first of three loops. The for loop on
lines 23–25 serves the same purpose as the Python statement
``count = [0]*10``, that is it initializes the first 10 positions in the
``ArrayList`` to hold the value 0.

The syntax of this for loop probably looks very strange to you, but in
fact it is not too different from what happens in Python using range. In
fact ``for (Integer i = 0; i < 10; i++)`` is exactly equivalent to the
Python ``for i in range(10)`` The first statement inside the parenthesis
declares and initializes a loop variable ``i``. The second statement is a
Boolean expression that is our exit condition. In other words we will
keep looping as long as this expression evaluates to true. The third
clause is used to increment the value of the loop variable at the end of
iteration through the loop. In fact ``i++`` is Java shorthand for
``i = i + 1`` Java also supports the shorthand ``i--`` to decrement the
value of i. Like Python, you can also write ``i += 2`` as shorthand for
``i = i + 2`` Try to rewrite the following Python for loops as Java for
loops:

-  ``for i in range(2,101,2)``

-  ``for i in range(1,100)``

-  ``for i in range(100,0,-1)``

-  ``for x,y in zip(range(10),range(0,20,2))`` [hint, you can
   separate statements in the same clause with a ,]

The next loop (lines 27–30) shows a typical Java pattern for reading
data from a file. Java while loops and Python while loops are identical
in their logic. In this case, we will continue to process the body of the
loop as long as ``data.hasNextInt()`` returns true.

Line 29 illustrates another important difference between Python and
Java. Notice that in Java we can not write
``count[idx] = count[idx] + 1``. This is because in Java there is no
overloading of operators. Everything except the most basic math and
logical operations is done using methods. So, to set the value of an
``ArrayList`` element we use the ``set`` method. The first parameter of
``set`` indicates the index or position in the ``ArrayList`` we are
going to change. The next parameter is the value we want to set. Notice
that, once again, we cannot use the indexing square bracket operator to
retrieve a value from the list, but we must use the ``get`` method.

The last loop in this example is similar to the Python for loop where
the object of the loop is a Sequence. In Java we can use this kind of
for loop over all kinds of sequences, which are called Collection
classes in Java. The for loop on line 33 ``for(Integer i : count)`` is
equivalent to the Python loop ``for i in count:`` This loop iterates
over all of the elements in the ArrayList called count. Each time
through the loop the Integer variable ``i`` is bound to the next element of
the ``ArrayList``. If you tried the experiment of removing the
``<Integer>`` part of the ``ArrayList`` declaration you probably noticed
that you had an error on this line. Why?

Arrays
------

As I said at the outset of this section, we are going to use Java
``ArrayLists`` because they are easier to use and more closely match the
way that Python lists behave. However, if you look at Java code on the
internet or even in your Core Java books you are going to see examples
of something called arrays. In fact you have already seen one example of
an array declared in the ‘Hello World’ program. Lets rewrite this
program to use primitive arrays rather than array lists.

.. note::
    This section moves a little quickly through arrays. In the course we will be practicing more with arrays in the assignments before moving on to 
    ``ArrayLists``.

.. .. activecode:: primarrays
..     :language: java
..     :sourcefile: HistoArray.java
..     :datafile: test.dat
.. code-block:: java
    :linenos:

    import java.util.Scanner;
    import java.io.File;
    import java.io.IOException;

    public class HistoArray {
        public static void main(String[] args) {
            Scanner data = null;
            Integer[] count = {0,0,0,0,0,0,0,0,0,0};
            Integer idx;

            try {
                data = new Scanner(new File("test.dat"));
            }
            catch ( IOException e) {
                System.out.println("Unable to open data file");
                e.printStackTrace();
                System.exit(0);
            }

            while(data.hasNextInt()) {
                idx = data.nextInt();
                count[idx] = count[idx] + 1;
            }

            idx = 0;
            for(Integer i : count) {
                System.out.println(idx + " occured " + i + " times.");
                idx++;
            }
        }
    }

The main difference between this example and the previous example is
that we declare ``count`` to be an ``Array`` of integers. We also can initialize
short arrays directly using the syntax shown on line 8. Then notice that
on line 22 we can use the square bracket notation to index into an
array.

Dictionary
----------

Just as Python provides the dictionary when we want to have easy access
to key-value pairs, Java also provides us a similar mechanism. Rather
than the dictionary terminology, Java calls these objects Maps. Java
provides two different implementations of a map, one is called the
``TreeMap`` and the other is called a ``HashMap``. As you might guess
the ``TreeMap`` uses a balanced binary tree behind the scenes, and the
``HashMap`` uses a hash table.

.. note::
    We will cover the details of maps, binary trees, and hash tables later in the 
    semester, so you don't have to worry about the details of them right now --
    just know that Java Maps are similar to the functionality of Python 
    dictionaries.

Lets stay with a simple frequency counting example, only this time we
will count the frequency of words in a document. A simple Python program
for this job could look like this:

.. .. activecode:: pywordcount
..    :language: python
.. code-block:: python
    :linenos:

    def main():
        data = open('alice30.txt')
        wordList = data.read().split()
        count = {}
        for w in wordList:
            w = w.lower()
            count[w] = count.get(w,0) + 1

        keyList = sorted(count.keys())
        for k in keyList:
            print("%-20s occurred %4d times" % (k, count[k]))

    main()


.. datafile:: alice30.txt

   Down, down, down.  Would the fall NEVER come to an end!  'I
   wonder how many miles I've fallen by this time?' she said aloud.
   'I must be getting somewhere near the centre of the earth.  Let
   me see:  that would be four thousand miles down, I think--' (for,
   you see, Alice had learnt several things of this sort in her
   lessons in the schoolroom, and though this was not a VERY good
   opportunity for showing off her knowledge, as there was no one to
   listen to her, still it was good practice to say it over) '--yes,
   that's about the right distance--but then I wonder what Latitude
   or Longitude I've got to?'  (Alice had no idea what Latitude was,
   or Longitude either, but thought they were nice grand words to
   say.)


.. note::
    If you want to try out this program yourself, copy the above text into a file
    called ``alice30.txt`` and save it to same folder as the program.

Notice that the structure of the program is very similar to the numeric
histogram program.

.. .. activecode:: dictjava
..     :language: java
..     :sourcefile: HistoMap.java
..     :datafile: alice30.txt

.. code-block:: java
    :linenos:

    import java.util.Scanner;
    import java.util.ArrayList;
    import java.io.File;
    import java.io.IOException;
    import java.util.TreeMap;

    public class HistoMap {

        public static void main(String[] args) {
            Scanner data = null;
            TreeMap<String,Integer> count;
            Integer idx;
            String word;
            Integer wordCount;

            try {
                    data = new Scanner(new File("alice30.txt"));
            }
            catch ( IOException e) {
                System.out.println("Unable to open data file");
                e.printStackTrace();
                System.exit(0);
            }

            count = new TreeMap<String,Integer>();

            while(data.hasNext()) {
                word = data.next().toLowerCase();
                wordCount = count.get(word);
                if (wordCount == null) {
                    wordCount = 0;
                }
                count.put(word,++wordCount);
            }

            for(String i : count.keySet()) {
                System.out.printf("%-20s occured %5d times\n", i, count.get(i) );
            }
        }
    }
