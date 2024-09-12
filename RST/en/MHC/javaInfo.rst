Additional Java Information
===========================

Naming Conventions
------------------

Java has some very handy naming conventions.

-  Class names always start with an upper case letter. For example,
   ``Scanner``, ``System``, ``Hello``

-  Method names always start with a lower case letter, and use camelCase
   to represent multiword method names. for example ``nextInt()``

-  Instance variables of a class start with a lower case letter and use
   camelCase

-  Constants are in all upper case letters. for example ``Math.MAXINT``


Common Mistakes
---------------

**Common mistake #1: Forgetting to declare your variables**

::

    Histo.java:21: cannot find symbol
    symbol  : variable count
    location: class Histo
        count = new ArrayList<Integer>(10);
        ^

**Common mistake #2: Not importing a class**

::

    Histo.java:9: cannot find symbol
    symbol  : class Scanner
    location: class Histo
        Scanner data = null;
        ^

**Common mistake #3: Forgetting to use the new keyword to create an object**

Here’s an example of the error message that occurs when you forget to
use the new keyword. Notice that the message is pretty unhelpful.
Java *thinks* you are trying to call the Method Scanner, but
there are two problems. First Scanner is not really a method it
is a constructor.:

::

    Histo.java:14: cannot find symbol
    symbol  : method Scanner(java.io.File)
    location: class Histo
        data = Scanner(new File("test.dat"));
               ^

**Common mistake #4: Forgetting a Semicolon**

::

    Histo.java:19:
    ';' expected
        System.exit(0);
        ^

**Common mistake #5: Forgetting to declare the kind of object in a container**

::

    Note: Histo.java uses unchecked or unsafe operations. Note:
    Recompile with -Xlint:unchecked for details.

Java Documentation
------------------

All Java class libraries are documented and available online. The official `Java API specification <https://docs.oracle.com/en/java/javase/17/docs/api/index.html>`_ is a good resource to use.

In general the Javadoc page for any class contains information about:

-  Where this class falls in the class hierarchy. What classes are its
   parents and what classes are its decendents.

-  A summary and some examples of using the class.

-  A summary listing of instance variables

-  A summary listing of Constructors

-  A summary listing of Methods

-  Detailed documentation on constructors and methods.

Typically the Javadoc pages are constructed from the source code where
the class is implemented. This encourages Java programmers to do a good
job of documenting their code, while providing a user friendly way to
read the documentation without looking at the code directly.