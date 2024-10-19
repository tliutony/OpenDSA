Exceptions
===========

Introduction
------------

Mistakes happen.
Making mistakes is the norm rather than the exception.
This is not to say that we make mistakes more often than we get it right.
It is to say that (almost) nothing we do or build is ever perfectly correct,
least of all computer software.
No matter how well-designed a program is,
    there is always the chance that some kind of error will arise during its execution.

An **exception** is an erroneous or anomalous condition that arises  while a program is running.
Examples of such conditions that we have discussed in this text include attempting to divide by 0
(arithmetic exception),
reading a decimal value when an integer is expected
(number format exception),
attempting to write to a file that doesn't exist (I/O exception),
or referring to a nonexistent character in a string
(index out of bounds exception).
The list of potential errors and anomalies is endless.

A well-designed program should include code to guard against errors and other exceptional conditions when they arise.
This code should be incorporated into the program from the very first stages of its development.
That way it can help identify problems during development.
In Java, the preferred way of handling such conditions is to use
**exception handling**, a  divide-and-conquer approach that separates a program's normal code from its error-handling code.

This section describes Java's exception handling features.
We begin by contrasting the traditional way of handling errors within a program with Java's default exception-handling mechanism.
We show how exceptions are raised (thrown) and handled (caught) within a program and identify the rules that apply to different kinds of exceptions.
We then focus on some of the key design issues that govern when, where,
and how to use exceptions in your programs.

Handling Exceptional Conditions
-------------------------------

Introducing an Exception
~~~~~~~~~~~~~~~~~~~~~~~~

To introduce you to handling exceptional conditions, the code snippet below shows a method that computes the average of the first *N* integers, an admittedly contrived example. We use it mainly to illustrate the basic concepts involved in exception handling. As its precondition suggests, the ``avgFirstN()`` method expects that *N* will be greater than 0. If *N* happens to be 0, an error will occur in the expression ``sum/N``, because you cannot divide an integer by 0. Try it to see this error.

.. code-block:: java

    /**
    * Precondition:  N > 0
    * Postcondition: avgFirstN() = (1+2+...+N)/N
    */
    public double avgFirstN(int N) {
        int sum = 0;
        for (int k = 1; k <= N; k++)
            sum += k;
        return sum/N;         // What if N is 0?
    } 

.. .. avembed:: AV/MHC/avgFirstN-error.html ka
..    :long_name: avgFirstN Error Example

Traditional Error Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~

The method above should not simply ignore the possibility that *N* might be 0. The code snippet below shows a revised version of the method, which includes code that takes action if the method's precondition fails. Because there is no way to compute an average of 0 elements, the revised method decides to abort the program. Aborting the program appears to be a better alternative than returning 0 or some other default value (like -1) as the method's result and thereby allowing an erroneous value to spread throughout the program. That would just compound the error.

.. code-block:: java

   /**
     * Precondition:  N > 0
     * Postcondition: avgFirstN() equals (1+2+...+N) divided by N
     */
   public double avgFirstN(int N) {
       int sum = 0;
       if (N <= 0) {
         System.out.println(
              "ERROR avgFirstN: N <= 0. Program terminating.");
         System.exit(0);
       }
       for (int k = 1; k <= N; k++)
           sum += k;
       return sum/N;         // What if N is 0?
     }

The revised ``avgFirstN()`` method takes the traditional approach to error handling: Error-handling code is built right into the algorithm. If *N* happens to be 0 when ``avgFirstN()`` is called, the following output will be generated:

.. code-block:: java

   ERROR avgFirstN: N <= 0. Program terminating.


Java's Default Exception Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To help detect and handle common runtime errors, Java's creators incorporated an exception-handling model into the language itself. In the case of our divide-by-zero error, the Java Virtual Machine (JVM) would detect the error and abort the program. To see this, consider the program in :ref:`list-calcavg`.

.. _list-calcavg:

.. .. avembed:: AV/MHC/calcavg.html ka
..    :long_name: CalcAverage Example

Note that the ``avgFirstN()`` method is passed an argument of 0 in the ``CalcAvgTest.main()``. When the JVM detects the error, it will abort the program and print the following message:

.. code-block:: java

   Exception in thread "main"
      java.lang.ArithmeticException:  / by zero
           at CalcAverage.avgFirstN(Compiled Code)
           at CalcAvgTest.main(CalcAvgTest.java:5)

The error message describes the error and provides a trace of the method calls, from last to first, that led to the error. This trace shows that the error occurred in the ``CalcAverage.avgFirstN()`` method, which was called by the ``CalcAvgTest.main()`` method.

As this example suggests, Java's default exception handling is able to detect and handle certain kinds of errors and exceptional conditions. In the next section, we will identify what kinds of conditions are handled by the JVM.

Java's Exception Hierarchy
--------------------------

Java Predefined Exceptions
~~~~~~~~~~~~~~~~~~~~~~~~~~

The Java class library contains a number of predefined exceptions, some of which are shown below. The most general type of exception, ``java.lang.Exception``, is located in the ``java.lang`` package, but most of its subclasses are contained in other packages. Some of the various ``IOException`` classes are contained in the ``java.io`` package, while others are contained in the ``java.net`` package. In general, exception classes are placed in the package that contains the methods that throw those exceptions.

.. note::

    This section goes into a lot of detail about the exception hierarchy. The main thing to take away from this section is that there are many predefined exception classes, and that ``IOException`` and its subclasses are **checked exceptions**, so they must be declared in a ``throws`` clause or caught and handled within the method. 
    
    Unchecked exceptions do not have to be declared in a ``throws`` clause, and they do not have to be caught and handled within the method.

.. odsafig:: Images/jjj_exchier.png
   :align: center

Each of the classes in the figure identifies a particular type of exception, and each is a subclass of the ``Exception`` class. Obviously a subclass defines a more specific exception than its superclass. Thus, both ``ArrayIndexOutOfBoundsException`` and ``StringIndexOutOfBoundsException`` are more specific than ``IndexOutOfBoundsException``.

=================================== ====================================================
Class                               Description
=================================== ====================================================
``ArithmeticException``             Division by zero or some other kind of arithmetic problem
``ArrayIndexOutOfBoundsException``  An array index is less than zero or greater than or equal to the array's length
``FileNotFoundException``           Reference to a file that cannot be found
``IllegalArgumentException``        Calling a method with an improper argument
``IndexOutOfBoundsException``       An array or string index is out of bounds
``NullPointerException``             Reference to an object that has not been instantiated
``NumberFormatException``           Use of an illegal number format, such as when calling a method
``StringIndexOutOfBoundsException``  A ``String`` index is less than zero or greater than or equal to the ``String``'s length
=================================== ====================================================

The table above gives a brief summary of some of the most important exceptions. You've probably encountered some of these exceptions already in the course!

Checked and Unchecked Exceptions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java's exception hierarchy is divided into two types of exceptions. A **checked exception** is one that can be analyzed by the Java compiler. Checked exceptions are thrown by methods such as the ``BufferedReader.readLine()`` method, in which there is a substantial likelihood that something might go wrong. When the compiler encounters one of these method calls, it checks whether the program either handles or declares the exception. Compile-time checking for these exceptions is designed to reduce the number of exceptions that are not properly handled within a program. This improves the security of Java programs.

.. note::

   A checked exception, such as an ``IOException``, must either be handled or declared within the program.

The ``throws`` Clause
~~~~~~~~~~~~~~~~~~~~~

The ``IOException``, which we encountered earlier in the semester, is a checked exception. The Java compiler knows that ``readLine()`` is a method that can throw an ``IOException``. A method that contains an expression that might throw a checked exception must either handle the exception or declare it. Otherwise, the compiler would generate a syntax error. The simplest way to avoid such a syntax error is to *declare the exception*, in our case that means qualifying the method header with the expression ``throws IOException``.

In general, any method that contains an expression that might throw a checked expression must declare the exception. However, because one method can call another method, declaring exceptions can get a little tricky. If a method calls another method that contains an expression that might throw an unchecked exception, then both methods must have a ``throws`` clause. For example, consider the following program:

.. code-block:: java

   import java.io.BufferedReader;
   import java.io.IOException;
   import java.io.InputStreamReader;

   public class Example {
       BufferedReader input = new BufferedReader
               (new InputStreamReader(System.in));
       public void doRead() throws IOException {
           // May throw IOException
           String inputString = input.readLine();
       }
       public static void main(String argv[])
                           throws IOException {
           Example ex = new Example();
           ex.doRead();
       }
     }

In this case, the ``doRead()`` method contains a ``readLine()`` expression, which might throw an ``IOException``. Therefore, the ``doRead()`` method must declare that it ``throws IOException``. However, because ``doRead()`` is called by ``main()``, the ``main()`` method must also declare the ``IOException``.

.. note:: 

   **Where to Use ``throws``**: Unless a checked exception, such as an ``IOException``, is caught and handled by a method, it must be declared with a ``throws`` clause within the method and within any method that calls that method.

The alternative approach would be to *catch* the ``IOException`` within the body of the method. We will discuss this approach in the next section.

Unchecked Exceptions
~~~~~~~~~~~~~~~~~~~~~

An **unchecked exception** is any exception belonging to a subclass of ``RuntimeException``. Unchecked exceptions are not checked by the compiler. The possibility that some statement or expression will lead to an ``ArithmeticException`` or ``NullPointerException`` is extremely difficult to detect at compile time. The designers of Java decided that forcing programmers to declare such exceptions would not significantly improve the correctness of Java programs.

Therefore, unchecked exceptions do **not** have to be handled within a program. And they do not have to be declared in a ``throws`` clause. As shown in the chapter's early divide-by-zero exception example, unchecked exceptions are handled by Java's default exception handlers, unless your program takes specific steps to handle them directly. In many cases leaving the handling of such exceptions up to Java may be the best course of action, as we will see in :ref:`sec-robust`.

The ``Exception`` Class
~~~~~~~~~~~~~~~~~~~~~~~

The ``java.lang.Exception`` class itself is quite simple, consisting of just two constructor methods (see the figure below). The ``Throwable`` class, from which ``Exception`` is derived, is the root class of Java's exception and error hierarchy. It contains definitions for the ``getMessage()`` and ``printStackTrace()`` methods, which are two methods that we will use frequently in our error-handling routines.

.. odsafig:: Images/jjj_excuml.png
   :align: center
   :width: 20%


Trying, Throwing, and Catching an Exception
-------------------------------------------

This section will describe how to handle exceptions within the program rather than leaving them to be handled by the JVM. In Java, errors and other abnormal conditions are handled by throwing and catching exceptions. When an error or an exceptional condition is detected, you can *throw an exception* as a way of signaling the abnormal condition. This is like pulling the fire alarm. When an exception is thrown, an exception handler will catch the exception and deal with it (see the figure below).

.. figure:: Images/jjj_exchand.png
   :width: 25%
   :align: center

If we go back to our ``avgFirstN()`` example, the typical way of handling this error in Java would be to throw an exception in the ``avgFirstN()`` method and catch it in the calling method. Of course, the calling method could be in the same object or it could belong to some other object. In the latter case, the detection of the error is separated from its handling. This division of labor opens up a wide range of possibilities. For example, a program could dedicate a single object to serve as the handler for all its exceptions. The object would be sort of like the program's fire department.

To illustrate Java's ``try/throw/catch`` mechanism, let's revisit the ``CalcAvgTest`` program. The version shown below mimics the way Java's default exception handler works. If the ``avgFirstN()`` method is called with an argument that is zero or negative, an ``IllegalArgumentException`` is thrown. The exception is caught by the ``catch`` clause in the ``CalcAvgTest.main()`` method.

.. code-block:: java

   try {
     CalcAverage ca = new CalcAverage();
     System.out.println( "AVG + " + ca.avgFirstN(0));
   }
   catch (IllegalArgumentException e) { // Exception Handler
     System.out.println(e.getMessage());
     e.printStackTrace();
     System.exit(0);
   }

.. code-block:: java

    class CalcAverage {
        /**
        * Precondition:  N > 0
        * Postcondition: avgFirstN() equals the average of (1+2+...+N)
        */
        public double avgFirstN(int N) {
            int sum = 0;
            if (N <= 0) {
                throw new IllegalArgumentException("ERROR: Can't average 0 elements");
            }
            for (int k = 1; k <= N; k++) {
                sum += k;
            }
            return sum/N;         // What if N is 0?
        } 
    } 

    public class CalcAvgTest {
        public static void main(String args[]) {
            try {
                CalcAverage ca = new CalcAverage();
                System.out.println("AVG + " + ca.avgFirstN(0));
            }
            catch (IllegalArgumentException e) { // Exception Handler
                System.out.println(e.getMessage());
                e.printStackTrace();
                System.exit(0);
            }
        }
    }



In this version of the ``calcAvgTest`` program, an ``IllegalArgumentException`` thrown in ``CalcAverage.avgFirstN()``, would be handled by the catch clause in ``CalcAvgTest.main()``.

Let's go through this example step by step. The first thing to notice is that if the ``CalcAverage.avgFirstN()`` method has a zero or negative argument, it will ``throw`` an exception:

.. code-block:: java

   if (N <= 0)
      throw new IllegalArgumentException("ERROR: Illegal argument");

Note the syntax of the ``throw`` statement. It creates a new ``IllegalArgumentException`` object and passes it a message that describes the error. This message becomes part of the exception object. It can be retrieved using the ``getMessage()`` method, which is inherited from the ``Throwable`` class (Figure 2).

When a ``throw`` statement is executed, the JVM interrupts the normal execution of the program and searches for an exception handler. We will describe the details of this search shortly. In this case, the exception handler is the ``catch`` clause contained in the ``CalcAvgTest.main()`` method:

.. code-block:: java

   catch (IllegalArgumentException e) {  // Exception Handler
      System.out.println(e.getMessage());
      e.printStackTrace();
      System.exit(0);
   }

When an ``IllegalArgumentException`` is thrown, the statements within this ``catch`` clause are executed. The first statement uses the ``getMessage()`` method to print a copy of the error message. The second statement uses the ``printStackTrace()`` method, which is defined in ``Throwable`` and inherited by all ``Exception``s, to print a trace of the method calls leading up to the exception. The last statement causes the program to terminate.

When we run this program, the following output will be generated as a result of the illegal argument error:

.. code-block:: java

    ERROR: Can't average 0 elements
    java.lang.IllegalArgumentException: ERROR: Can't average 0 elements
            at CalcAverage.avgFirstN(CalcAverage.java:9)
            at CalcAvgTest.main(CalcAvgTest.java:6)

Thus, as in the previous example of Java's default exception handler, our exception handler also prints out a description of the error and a trace of the method calls that led up to the error. However, in this example, we are directly handling the exception rather than leaving it up to Java's default exception handler. Of course, this example is intended mainly for illustrative purposes. It would make little sense to write our own exception handler if it does nothing more than mimic Java's default handler.

Finally, note that the ``catch`` clause is associated with a ``try`` block. The handling of exceptions in Java takes place in two parts: First, we *try* to execute some statements, which may or may not lead to an exception. These are the statements contained within the ``try`` clause:

.. code-block:: java

   try {
       CalcAverage ca = new CalcAverage();
       System.out.println( "AVG + " + ca.avgFirstN(0));        
     }

Second, we provide one or more ``catch`` clauses to handle particular types of exceptions. In this case, we are only handling ``IllegalArgumentException``s.

As we said earlier, throwing an exception is like pulling a fire alarm. The throw occurs somewhere within the scope of the ``try`` block. The "fire department" in this case is the code contained in the ``catch`` clause that immediately follows the try block. This is the exception handler for this particular exception. There's something like a game of catch going on here: Some method within the try block throws an ``Exception`` object, which is caught and handled by the catch block located in some other object (Figure 2).

.. figure:: Images/jjj_exccatch.png
   :width: 40%
   :align: center


**Playing catch:** in this design, the ``IllegalArgumentException`` is thrown by the ``CalcAverage.avgFirstN()`` method and caught by the catch clause within ``CalcAvgTest.main()`` method.

Separating Error Checking from Error Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As we see in the ``CalcAvgTest`` example, an important difference between Java's exception handling and more traditional approaches is that error handling can be separated from the normal flow of execution within a program. The ``CalcAverage.avgFirstN()`` method still checks for the error and it still ``throws`` ``IllegalArgumentException`` if *N* does not satisfy the method's precondition. But it does not contain code for handling the exception. The exception-handling code is located in the ``CalcAvgTest`` class.

Thus, the ``CalcAvgTest`` program creates a clear separation between the normal algorithm and the exception-handling code. One advantage of this design is that the normal algorithm is uncluttered by error-handling code and, therefore, easier to read.

Another advantage is that the program's response to errors has been organized into one central location. By locating the exception handler in ``CalcAvgTest.main()``, one exception handler can be used to handle other errors of that type. For example, this catch clause could handle *all* ``IllegalArgumentException``s that get thrown in the program. Its use of ``printStackTrace()`` will identify exactly where the exception occurred. In fact, because a Java application starts in the ``main()`` method, encapsulating all of a program's executable statements within a single ``try`` block in the ``main()`` method will effectively handle all the exceptions that occur within a program.

A key element of Java's exception-handling mechanism is that the exception handler—the catch block—is distinct from the code that throws the exception—the try block. The try block contains the normal algorithm. The catch block contains code for handling exceptional conditions.

Syntax and Semantics of Try/Throw/Catch
---------------------------------------

A *try block* begins with the keyword ``try`` followed by a block of code enclosed within curly braces. A *catch clause* or *catch block* consists of the keyword ``catch``, followed by a parameter declaration that identifies the type of ``Exception`` being caught, followed by a collection of statements enclosed within curly braces. These are the statements that handle the exception by taking appropriate action.

Once an exception is thrown, control is transferred out of the try block to an appropriate catch block. Control does not return to the try block.

The complete syntax of the ``try/catch`` statement is summarized below.

.. code-block:: java

   try {
         // Block of statements
         // At least one of which may throw an exception
         if ( /* Some condition obtains */ )
             throw new ExceptionName();
    } catch (ExceptionName ParameterName) {
        // Block of statements to be executed
        // If the ExceptionName exception is thrown in try
    }  catch (ExceptionName2 ParameterName) {
        // Block of statements to be executed
        // If the ExceptionName2 exception is thrown in try
   ...  // Possibly other catch clauses
   } finally {
        // Optional block of statements that is executed
        // Whether an exception is thrown or not
    }

The try block is meant to include a statement or statements that might throw an exception. The catch blocks—there can be one or more—are meant to handle exceptions that are thrown in the try block. A catch block will handle any exception that matches its parameter class, including subclasses of that class. The *finally block* clause is an optional clause that is always executed, whether an exception is thrown or not.

The statements in the try block are part of the program's normal flow of execution. By encapsulating a group of statements within a try block, you thereby indicate that one or more exceptions may be thrown by those statements, and that you intend to catch them. In effect, you are *trying* a block of code with the possibility that something might go wrong.

If an exception is thrown within a try block, Java exits the block and transfers control to the first ``catch`` block that matches the particular kind of exception that was thrown. Exceptions are thrown by using the ``throw`` statement, which takes the following general form:

.. code-block:: java

   throw new ExceptionClassName(OptionalMessageString);

The keyword ``throw`` is followed by the instantiation of an object of the ``ExceptionClassName`` class. This is done the same way we instantiate any object in Java: by using the ``new`` operator and invoking one of the exception's constructor methods. Some of the constructors take an ``OptionalMessageString``, which is the message that gets returned by the exception's ``getMessage()`` method.

A ``catch`` block has the following general form:

.. code-block:: java

   catch (ExceptionClassName ParameterName) {
       // Exception handling statements
     }

A ``catch`` block is very much like a method definition. It contains a parameter, which specifies the class of exception that is handled by that block. The *ParameterName* can be any valid identifier, but it is customary to use ``e`` as the ``catch`` block parameter. The parameter's scope is limited to the catch block, and it is used to refer to the caught exception.

The *ExceptionClassName* must be one of the classes in Java's exception hierarchy (see Figure 2). A thrown exception will match any parameter of its own class or any of its superclasses. Thus, if an ``ArithmeticException`` is thrown, it will match both an ``ArithmeticException`` parameter and an ``Exception`` parameter, because ``ArithmeticException`` is a subclass of ``Exception``.

Note that there can be multiple ``catch`` clauses associated with a given ``try`` block, and the order with which they are arranged is important. A thrown exception will be caught by the first ``catch`` clause it matches. Therefore, ``catch`` clauses should be arranged in order from most specific to most general (See the exception hierarchy in Figure 2). If a more general catch clause precedes a more specific one, it will prevent the more specific one from executing. In effect, the more specific clause will be hidden by the more general one. You might as well just not have the more specific clause at all.

To illustrate how to arrange catch clauses, suppose an ``ArithmeticException`` is thrown in the following ``try/catch`` statement:

.. code-block:: java

   try {
        // Suppose an ArithmeticException is thrown here
   } catch (ArithmeticException e) {
        System.out.println("ERROR: " + e.getMessage() );
        e.printStackTrace();
        System.exit(1);
   } catch (Exception e) {
        System.out.println("ERROR: " + e.getMessage() );
       }

In this case, the exception would be handled by the more specific ``ArithmeticException`` block. On the other hand, if some other kind of exception is raised, it will be caught by the second catch clause. The ``Exception`` class will match any exception that is thrown. Therefore, it should always occur last in a sequence of ``catch`` clauses. Catch clauses should be arranged from most specific to most general. The ``Exception`` clause should always be the last in the sequence.

   
Restrictions on the ``try/catch/finally`` Statement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are several important restrictions that apply to Java's exception-handling mechanism. We'll describe these in more detail later in this chapter.

* A try block must be immediately followed by one or more catch clauses and a catch clause may only follow a try block.

* A ``throw`` statement is used to throw both checked exceptions and unchecked exceptions, where unchecked exceptions are those belonging to ``RuntimeException`` or its subclasses. Unchecked exceptions need not be caught by the program.


.. note::

   **Try/Catch Syntax**: A try block must be followed immediately—with no intervening code—by one or more catch blocks. A catch block can only be preceded by a try block or by another catch block. You may not place intervening code between catch blocks.

Exception Propagation: Searching for a Catch Block
--------------------------------------------------

When an exception is thrown, Java searches for a catch clause to handle it. This search process involves looking through the program's structure and method calls to find an appropriate exception handler.

Java uses a method call stack to keep track of the program's execution. A *method call stack* is a data structure that behaves like a stack of dishes in a cafeteria. For each method call, a *method call block* is placed on top of the stack (like a dish), and when a particular method call returns, its block is removed from the top of the stack. In the figure below, the method call stack for the ``Propagate`` program is shown. The curved arrows give a trace of the method calls leading to the program's present state.

.. figure:: Images/jjj_stack.png
   :width: 50%
   :align: center


An important feature of the method call stack is that the current executing method is always represented by the top block on the method call stack. If an exception occurs during that method call, Java can trace backward through the method calls to find an exception handler for that exception. In this figure, you can visualize this back trace as a matter of reversing the direction of the curved arrows.

To find a matching catch block for an exception, Java performs a *method stack trace*. The basic idea is that Java traces backward through the program until it finds an appropriate catch clause. The search begins within the block that threw the exception. If the exception is not caught by the block in which it is thrown, Java searches the enclosing block. If it is not caught within the enclosing block, Java searches the next higher enclosing block, and so on.

If the exception is not caught at all within the method in which it was thrown, Java uses the method call stack to search backward through the method calls that were made leading up to the exception. In the case of our ``CalcAvgTest()`` example, Java would search backward to the ``CalcAvgTest.main()`` method, which is where ``avgFirstN()`` was called, and it would find the ``catch`` clause there for handling ``IllegalArgumentException``s. It would, therefore, execute that catch clause.

