.. _Common Mistakes:

Common Mistakes
===============

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
