Loops and Iteration
===================

This section will serve as a reference for the differences
in syntax between Python and Java for loops and iteration.

Definite Loop
-------------

In Python the easiest way to write a definite loop is using the for loop
in conjunction with the range function. For example:

::

    for i in range(10):
       print(i)

In Java we would write this as:

::

    for (Integer i = 0; i < 10; i++ ) {
        System.out.println(i);
    }

Recall that the ``range`` function provides you with a wide variety of
options for controlling the value of the loop variable.

::

    range(stop)
    range(start,stop)
    range(start,stop,step)

The Java for loop is really analogous to the last option giving you
explicit control over the starting, stopping, and stepping in the three
clauses inside the parenthesis. You can think of it this way:

::

    for (start clause; stop clause; step clause) {
        statement1
        statement2
        ...
    }

If you want to start at 100, stop at 0 and count backward by 5 the
Python loop would be written as:

::

    for i in range(100,-1,-5):
        print(i)

In Java we would write this as:

::

    for (int i = 100; i >= 0; i -= 5)
        System.out.println(i);

In Python the for loop can also iterate over any sequence such as a
list, a string, or a tuple. Java also provides a variation of its for
loop that provides the same functionality in its so called ``for each``
loop.

In Python we can iterate over a list as follows:

::

    l = [1, 1, 2, 3, 5, 8, 13, 21]
    for fib in l:
       print(fib)

In Java we can iterate over an array of integers too:


::

    int l[] = {1,1,2,3,5,8,13,21};
    for(int i : l) {
        System.out.println(i);
    }


.. note::
    More on arrays in Java next week!
Indefinite Loops
----------------

Both Python and Java support the while loop. Recall that in Python the
while loop is written as:

::

    while  condition:
       statement1
       statement2
       ...

In Java we add parenthesis and curly braces to get:

::

    while (condition) {
        statement1
        statement2
        ...
    }

Java adds an additional variation of the while loop
called the "do while" loop. The do-while loop is very similar to while except that the
condition is evaluated at the end of the loop rather than the beginning.
This ensures that a loop will be executed at least one time. Some
programmers prefer this loop in some situations because it avoids an
additional assignment prior to the loop. For example:

::

    do {
        statement1
        statement2
        ...
    } while (condition);
