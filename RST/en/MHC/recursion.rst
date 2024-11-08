Recursion
=========

Introduction
------------

A method is :term:`recursive <recursion>` if it invokes itself to do part of its
work. Recursion makes it possible to solve complex problems using programs
that are concise, easily understood, and algorithmically efficient.
Recursion is the process of solving a large problem by reducing it to
one or more sub-problems which are identical in structure to the
original problem and somewhat simpler to solve.
Once the original subdivision has been made, the sub-problems
divided into new ones which are even less complex.
Eventually, the sub-problems become so simple that they can be then
solved without further subdivision.
Ultimately, the complete solution is obtained by reassembling the
solved components.

For a recursive approach to be successful, the recursive
"call to itself" must be on a smaller problem than the one originally
attempted.
In general, a recursive algorithm must have three parts:

#. The **base case**, which handles a simple input that can be
   solved without resorting to a recursive call.

#. The **recursive case**, which contains one or more recursive calls to the
   algorithm.
   In every recursive call, the parameters must be in some sense "closer"
   to the base case than those of the original call.

#. The **solution to the recursive case**, which reassembles the results of
   the recursive calls into a solution for the current input. Sometimes this
   solution is simply returning a value directly, but more often it
   involves some form of combination or reassembly.


Imagine that someone in a movie theater asks you what row you're
sitting in.
You don't want to count, so you ask the person in front of you what
row they are sitting in, knowing that they will tell you a number one
less than your row number.
The person in front could ask the person in front of them.
This will keep happening until word reaches the front row and it
is easy to respond: "I'm in row 1!"
From there, the correct message (incremented by one each row)
will eventually make it's way back to the person who asked.

Imagine that you have a big task.
You could just do a small piece of it,
and then **delegate** the rest to some helper, as in this example.

.. inlineav:: recurIntroDelegateCON ss
   :long_name: Recursion Introduction Slideshow 1
   :links: AV/RecurTutor/recurIntroCON.css
   :scripts: AV/RecurTutor/recurIntroDelegateCON.js
   :output: show  
   :keyword: Recursion

Let's look deeper into the details of what your friend does when
you delegate the work.

.. inlineav:: recurIntroDetailsCON ss
   :long_name: Recursion Introduction Slideshow 2
   :links: AV/RecurTutor/recurIntroCON.css
   :scripts: AV/RecurTutor/recurIntroDetailsCON.js
   :output: show  
   :keyword: Recursion

Writing Recursive Methods
-------------------------

Solving a "big" problem recursively means to solve one or more smaller
versions of the problem, and using those solutions of the smaller
problems to solve the "big" problem.
In particular, solving problems recursively means that
smaller versions of the problem are solved in a similar way.
For example, consider the problem of summing values of an array.
What's the difference between summing the first 50 elements in an
array versus summing the first 100 elements?
You would use the same technique.
You can even use the solution to the smaller problem to help you solve
the larger problem.

Here are the basic four steps that you need to write any recursive method.

.. inlineav:: recurWriteStepsCON ss
   :long_name: Recursion Code Writing Slideshow 1
   :links: AV/RecurTutor/recurWriteCON.css
   :scripts: AV/RecurTutor/recurWriteStepsCON.js
   :output: show
   :keyword: Recursion

Putting things together, here is the recursive method for summing the
first $n$ elements of an array.

.. code-block:: java

   public static int sum(int[] arr, int n) {
      if (n == 0) {
         return 0;
      }
      int partialSum = sum(arr, n-1);
      return arr[n-1] + partialSum;
   }


Tracing Recursive Code
----------------------

When writing a recursive function, you should think in a top-down
manner. We can think of the smaller recursive calls as if it were already solved, as part of our
"delegation" analogy from the previous section. We can use this smaller result as though we had called some library method,
to correctly solve the original problem.

When we have to read or trace a recursive method, then we do need
to consider how the method is doing its work.
Tracing a few recursive methods is a great way to learn how
recursion behaves.

We know that information can be passed in (using a method
parameter) from one recursive call to another, on ever smaller
problems, until a base case is reached in the winding phase.
Then, a return value is passed back as the series of recursive calls
"unwinds".

.. inlineav:: recurTraceWindCON ss
   :long_name: Recursion Tracing Winding and Unwinding
   :links: AV/RecurTutor/recurTraceCON.css
   :scripts: AV/RecurTutor/recurTraceWindCON.js
   :output: show 
   :keyword: Recursion


During the winding phase, any parameter passed through the recursive
call flows forward until the base case is reached.
During the unwinding phase, the return value of the method (if there
is one) flows backwards to the calling copy of the method.
In the following example, a recursive method to compute factorial
has information flowing forward during the winding phase, and backward
during the unwinding phase.

The recursive method may have information flow for more than one parameter. For example, a recursive
method that sums the values in an array recursively may pass the array itself 
and the index through the recursive call in the winding phase and returns back the summed value so far
in the unwinding phase.

.. inlineav:: recurTraceSumCON ss
   :long_name: Recursion Tracing Sum Function
   :links: AV/RecurTutor/recurTraceCON.css
   :scripts: AV/RecurTutor/recurTraceSumCON.js
   :output: show
   :keyword: Recursion