Software Testing
================

What Is Software Testing?
-------------------------

**Defective code** is a major problem of the software industry, accounting
for a large percentage of downtime and costing U.S. companies billions of
dollars each year (some estimates say as high as **$200 billion**!).
**Software testing** is an important tool used by developers in order to
reduce costs, improve software quality, and reduce computer-system downtime.

We all know testing is an important skill to learn, but
where should we start?

To start out, lets answer some simple questions about **what software testing
really is**.

Software testing is the process of **executing a program** with the
**intent of finding errors**.  Software testing is a verification and
validation technique that ensures software is developed to meet both its
specification and its user's needs.

In other words, testing is all about **discovering defects** (a.k.a., bugs),
that is, showing that a piece of software fails somehow.

As a result, Glenford Myers (author of the classic book
*The Art of Software Testing*) says that a **successful test**
is one that **does** reveal a defect.  Such a test conclusively
proves there is a bug.  In contrast, if we run a test and the software
behaves as we expect, we only know that it behaves correctly in this
one test situation, although bugs may still be hiding elsewhere.  As a
result, Edsger Dijkstra proclaimed that **"Program testing can be used
to show the presence of bugs, but never their absence!"**

This definition of testing contrasts with *debugging*, which
is all about **locating and repairing defects**.  Testing shows
that defects exist, and then debugging is used to find the source of
the defect and fix it.

Test Cases and Suites
~~~~~~~~~~~~~~~~~~~~~

OK, if the goal is to execute a program (or part of one) with the
intent of finding an error, then let's run it!  But what input
value(s) or user interaction sequence(s) should we use?

As an example, suppose you are testing something very simple, like
a single function called ``isEven()`` that takes an integer
value and returns true if the integer is even, or false if it is odd.

Remember that just running the program doesn't really count as
**testing**; instead, we must be trying to demonstrate failures of
some kind.  That means carefully planning out exactly how we are going
to run the program--what input values or situations we will use, and what
specific behavior or result we will be looking for.

A **test case** is a single scenario under which the software
will be run to attempt to demonstrate a failure, and typically has
three basic parts.

1. First, a test case must define all of the **input
   values, conditions, or variables** used in the test.  For example, we
   can imagine a scenario where we wish to test ``isEven()`` on
   the input value 2.
2. Second, a test case must define a **procedure** for
   exercising the software under test.  In the case of
   ``isEven()``, the procedure can be very simple: call the
   method with the given input value, and store the boolean result.  If
   we were testing a larger software part or an entire application,
   however, we may need to perform a longer, more complicated series of
   actions to exercise it, and this procedure is part of the test
   case.
3. Third, a test case must define the **expected behavior** that
   should result when the software is exercised in this way.  For
   example, if we call ``isEven()`` with a value of 2, we would
   expect it to produce the result ``true``.

Further, a test case is worked out (and written down) **before the
test is carried out**.  That is, we figure out what we will do and
what result we expect it to produce before running the test.  That
differentiates testing from simply "running the code to see what
happens".

Of course, it will probably take more than one test case to
determine that some required behavior is fully satisfied.  For
example, an implementation of ``isEven()`` that always
returns true, regardless of the input value, will pass the example
test case described above.  As a result, programmers typically design
collections of test cases that all work together.  A collection of
test cases designed for exercising the same piece of software is
called a **test suite**.

For example, one might design five test cases for
``isEven()``: one test for a positive even integer,
one for a positive odd integer, one for a negative even integer, one
for a negative odd integer, and one for zero.  Another person might
come up with a different test suite for this method, but this group
would have a good chance of successfully demonstrating most of the
simple bugs that could occur in the method in question.


Good Test Cases
~~~~~~~~~~~~~~~

Even when testing a single method like ``isEven()``, there
are a huge number of test cases to choose from.  For 32-bit integers,
there are 2\ :sup:`32` possible input values we could try.  So why
would we pick any one of these values over another to use in a test
case?  What makes a test case a "good" test case?

According to Glenford Myers, a **good test case** is one that:

* **Has a high probability of finding an error**.  Since our
  goal is to demonstrate faults, we should pick test cases that we think
  have the greatest chance of succeeding.
* **Is not redundant**.  If we already have a test case for
  the value 2, we don't need another one.  Further, why not use some
  other integer, like 147652?  Well, is there any reason to think this
  test case will have a high probability of finding an error?  If we
  already have other test cases that cover even numbers, why test this
  number as well?  If it simply retests behavior that has already been
  adequately demonstrated, then it is **redundant**--it exercises
  behavior already tested by other test cases in our test suite.
* **Is most "effective"**.  In other words, if there are several
  redundant test cases you might consider that all cover the same
  behavior, pick the test case that has the highest probability of
  finding errors.  For example, if we want to test ``isEven()``
  on an even negative integer, which value should we pick?  Will any
  random value do?  In this case, it might be better to pick the largest
  negative integer (-2\ :sup:`31`), since it will also check that the
  method works on an extreme boundary of the integer range.
* **Is neither too simple nor too complex**.  Suppose you are
  testing a group of methods on a class, rather than just focusing on
  ``isEven()``.  You could have a test case that called every
  single method in the class in some order (and maybe call some methods
  more than once!).  Such a test case might cover a lot of ground--all
  of the methods would have to work correctly on at least some test
  values in order for this test case to pass.  However, if the test
  reveals a defect, where is it?  It could be in any method, almost
  anywhere.  This is an example of a test case that is too complex,
  since it involves too many behaviors all in the same series of
  actions.  It would be better to use many smaller test cases, each
  focused on examining a single behavior, so that the test results would
  be more meaningful.  Similarly, a test case that simply constructed
  the object and did nothing else might be too simple to reveal any
  defects.  Strive for narrowly focused test cases that are still likely
  to reveal defects in the behavior they are exercising.


Software Testing Approaches
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clearly, exhaustive testing, where every possible execution
sequence is tested, is impractical, even for very simple pieces of
code like ``isEven()``. There are just too many possibilities
to try, and it takes too long.  As a result, we need a way to select
an appropriate set of test cases (a test suite) that has a high
likelihood of revealing the most probable defects.  Many different
testing methods have been developed for devising test cases, all
with the goal of helping you pick an effective test suite.

The two biggest groups of testing approaches are **black-box
testing** approaches and **white-box testing** approaches,
although others exist as well.

Testing activitives are also characterized according to the
nature of the units being tested, and the focus of what you are trying
to verify.  Some of the most common testing activities are **unit
testing**, **integration testing**, and **system testing**.

**Black-box testing** or **functional testing** is a term
used for a family of testing approaches where the test cases are
derived from a specification, an interface definition, or from a
behavioral description.  In using this strategy, the tester views the
software under test as a "black box" whose behavior can only be
determined by studying its inputs and the related outputs. For students,
this is the approach you use when you think about writing tests using
an assignment description.

In contrast, another family of testing approaches is called
**white-box testing**, **glass-box testing**, or
**logic-driven testing**.  White-box testing approaches require the
tester to examine the **internal** structure of the software under
test.  In using such a strategy, the tester derives test cases after
reviewing the program's internal logic and structure.

**Unit testing** is used to describe activities where one is
testing a single software "unit" in isolation, independently of any of
the other code being written. This is usually the technique you use when
you are starting out, writing tests for one class at a time.

**Integration Testing**: Once individual program components or classes
(units) have been tested, they
must be integrated to create a partial or complete system. The
integration process involves **testing combinations of units working
together** for problems that come up with component interaction.
The combination being tested may start out as small as two units
interacting, and grow to be the full application. Usually, this is
the time when pieces of a full system written by different developers
are being tested together.

**System testing** is where an entire, fully integrated program
is tested with respect to its typical working environment. This involves
combining the code from all the developers into the full, complete
software product.


Unit Testing in More Detail
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Unit testing** is used to describe activities where one is
testing a single software "unit" in isolation, independently of any of
the other code being written.

Exactly what **unit** means can vary from one programming
language to another, from one programming paradigm to another, and
from one organization to another, but is intended to mean a
cleanly delimited, identifiable piece of software that can be executed
independently.  In Pascal, a "unit" is typically a procedure or a
function.  In object-oriented languages, a "unit" is often a single
class, although sometimes it can be a single method.  Unless otherwise
specified, from here on out we will interpret "unit" to mean a single
class in an object-oriented language, **unit under test**
(**UUT**) to mean the class we are currently testing or writing
tests for.

Unit testing is usually carried out by the programmer or
programmers that wrote the unit under test (UUT), before
the unit is combined with other pieces of software to form a larger
application.  The goal is to confirm to the greatest extent possible
that the unit has no errors of its own *before* combining it with
other software.  That is because the smaller the piece of software you
are testing, the easier it is to locate and remove defects that are
revealed.

For students, it turns out that most of the testing you do on your
own assignments is unit testing: testing individual classes in
isolation to ensure they meet their individual design requirements.

Software Testing Increases Confidence
"""""""""""""""""""""""""""""""""""""

When you take a more systematic approach to testing your own
software, it increases your own confidence in the correctness of the
code you have written.  To maximize this benefit, it is important to
**write tests as you write code**, rather than saving all the
testing for "the end" once your coding is complete.  If you write new
tests for each small feature or increment you develop as you go, you
can incrementally "grow" a complete test suite piece by piece.


Further, since this test suite covers all the code you've written so
far, you can re-run all your tests (including the new ones) each time
you add a new feature or implement another method.  This is where you
can reap the **biggest increases in confidence**--as you develop skill
writing tests, and as you run and re-run the tests you have so far
against your growing code base, you gain more and more evidence that
the code you have written so far works as intended.  If any tests
fail, you also have a huge leg up in locating the bug, since it is
almost certainly in the (small increment) of code you have added since
you last ran all your tests.  Finally, by writing the tests as you go
and re-running them each time you complete a small change to the code,
you can tell immediately if any new changes actually break old
features that were working before.  In other words, you gain greater
confidence that new changes do not break or conflict with previously
working code.

Testing software in this way promotes incremental development.  It
promotes the concept of always having a **running (although
incomplete) version** of the program on hand.  Most importantly, it
promotes early detection and correction of errors introduced
by coding changes.


Software Testing Increases Understanding of Requirements
""""""""""""""""""""""""""""""""""""""""""""""""""""""""

When you write a new test case, you must write down what output,
result, or behavior you expect to occur when the test is run.  To do
this, you must have a clear understanding of how the program is to
behave.

Further, if you are writing tests for all the bits of code you
write--as you write them--then you continually ask yourself *what is
the correct behavior in this case*?

Sometimes, you will find the answer in the assignment description
(or program specification).  Other times, the desired behavior may be
up to you, as an internal design choice.  Occasionally, the correct
behavior may be ambiguous, and you will have to ask an instructor or
TA for clarification.  The net result is that you will end up with a
better understanding of what is truly required.  In addition, if you
are writing test cases for all these features, you will also end up
with much greater confidence that your solution really does meet all
of the requirements of the assignment.

Thus, writing tests offers more than simply checking your code.  It
also increases the depth of your understanding of the assignment and
its requirements, by forcing you to articulate your understanding of
the behavior you expect in all the test cases you write.  This helps
you understand the overall system requirements as well as the
preconditions and postconditions of every method in your code.

Preempting "Big Bang" Integration
"""""""""""""""""""""""""""""""""

If you incrementally write tests as you go along, it will also help
prevent a specific class of problems that students run into
frequently: those associated with **"big bang" integration**.
"Big bang" integration is a term from software engineering that
refers to a specific strategy for integrating, or combining, the
smaller pieces of your software together to make the final
application.  The "big bang" strategy is simple, and easy to
understand:

* Write code for all the units (or classes)
* Combine them all together into the final system
* Begin performing testing on the whole system, once it is finished

This strategy may seem simple, but it usually results in low
quality results (often projects that don't work at all!).  It gets its
name from the "big bang" that happens at the end when you first start
testing the final system: **nothing works**, and it usually
requires a huge (and draining) burst of time, energy, and effort to
try to squash as many problems as possible before the project's
deadline.  In the end, the project must be turned over as-is, with
many faults still unfixed.

Believe it or not, many commercial software projects used this
strategy long ago, with the same results.  Also long ago, development
organizations learned how to prevent it with incremental integration
and testing.  The root of all the problems is that with the big bang
approach, when system-level tests fail (and they certainly will) there
is **no easy way to locate the defects**.  The bugs you find could
be anywhere in the entire system, and it takes time and skill to
narrow the search until you localize the source of the failure.  This
takes far more time and effort than necessary.

If you **save all your testing until the end**, you definitely
risk suffering this same fate.  Your best tool for preventing "big
bang" integration is to write tests and run them incrementally as you
develop your solution.  Alternate back and forth: "write a
little test, write a little code".  Continually re-run your tests.
Add units (classes) together a few at a time and test their
interactions.  Put together a small (possibly incomplete) final
program and test it, then incrementally integrate and test features, rather
than putting everything together at once.

By taking an **incremental approach** to both testing and
integration, you ensure that you are testing relatively small pieces
of code at any given time.  Thus, defects are easy to localize, since
they are in the newest piece of code you have written, or the newest
unit you have integrated into the system.  This immediately narrows
your focus in finding bugs.  And constantly re-running your existing
tests when you fix bugs helps you ensure that your fixes don't
accidentally break anything else you've written.

When you choose this approach to integration, your software testing
efforts also provide a **lively sense of progress**, because you are
always clearly aware of the growing size of your test suite and how
much of the required behavior is already "in the bag" and verified.

Test Driven Developement (TDD)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Test-driven development** (**TDD**) is a programming technique
that involves constantly alternating between writing one or more small
test cases, and then writing a small increment of code, so that you
can gradually build up a working code base one piece at a time.
There are three principal ideas behind TDD:

* **Test first.**  That is, each time you are about to write
  some part of your solution, *first* write down the test cases
  that are necessary to confirm your solution works the way you want,
  and *only then* write the code.  For this reason, TDD is also
  known as **test-first coding**.

* **Write in tiny increments.**  Rather than writing large chunks
  of code at once, you should add new code in "baby steps": one small
  method, or one small piece of a method at a time, writing a new test
  case or two for each small bit.

  For example, the ``isEven()`` discussed earlier is
  small enough that you could write test cases for it, then
  write the method body in one step (just one line of code is
  needed), and finally run your test cases and debug as
  necessary.

  However, if you were writing a method with more complex behavior,
  it can be far too complex to write in one step. Consider a
  method that takes three numbers representing the lengths of the
  three sides to a triangle, where the method is supposed to
  return whether the corresponding triangle is equilateral,
  isosceles, or scalene, while reporting that the numbers do not
  form a triangle if no triangle exists with those side lengths.

  If you are writing tests for this method, you will need to check
  many distinct types of situations.
  Does it handle zero-length sides?  Does it
  handle negative numbers?  Does it handle lengths that do not form
  any triangle?  What about isosceles?  Equilateral? Scalene?  You
  can separate each of these "cases" or branches in your solution's
  logic into a separate small increment.  Write the test cases you
  want to have for zero length sides.  Then just implement that part
  of the method and run your tests.  Next, add test cases for
  negative numbers, add just the extra code for this case, and
  re-run *all* your tests.  Proceed through the remaining cases
  one step at a time, writing a few tests and then writing the code
  that implements the corresponding behavior.

  Using **case analysis**--that is, breaking a problem down
  into two or more subproblems, and defining the conditions under
  which one or another of these subproblems applies--is a powerful
  problem-solving tool.  It comes up all the time in computer
  science, and provides a neat way to break apart complicated
  methods into smaller steps that can be incrementally tested.

* **"When the bar is green, the code is clean."**
  This maxim of TDD characterizes the third key idea: each time you
  add a small piece of code, you re-run *all* of the tests you
  have for the unit under development, and you do not move on to the
  next step until *all* of your tests pass 100%.

  In short, add
  a small number of tests first, then add the corresponding (small)
  piece of code, run all your tests, and debug any problems
  immediately.  You're never ready to move to the next coding step
  (or finished with your solution, or ready to contribute your code
  to an open source project, etc.) unless all your tests pass.
  Your test cases are your expression of what "correct behavior"
  is for your code.  Thus, these test cases are your **yardstick** for
  measuring your success, and as you incrementally grow your test
  suite, you can see how close you are to completing all the
  required behavior.

  Most testing tools for automatically running your test cases
  will show you a progress bar as the tests run, and color it green
  as long as tests are successful, and red when any tests fail.

A successful test in traditional testing finds one or more
defects. But in TDD, **when a test fails you have made progress**
because you now know that you need to resolve the problem. TDD
increases your confidence that your system actually meets the
requirements defined for it and that your system actually works. It is
said that you should "test with a purpose" and know why you are
testing something and to what extent it needs to be tested. Also with
TDD, when you achieve a well tested program then every single line of
code is tested. In general, this is something that traditional testing
does recommend, but does not guarantee.

A significant advantage provided by TDD is that it enables you
(encourages you!) to take small steps when writing software. For
instance, suppose you add a small piece of new code, compile, and test
it.  Sooner or later when you do this, one or more of your tests will
fail because of one or more defects in your code. However, by
proceeding in small steps, it is much easier to find and fix those
defects.  The problem is most likely in the tiny bit of code you just
wrote, since all the other code passes all the other tests you'd
previously written.  If some previously working behavior breaks, again
it is probably a result of interference caused by the newly added
code.  And bugs are so much easier to find if you have
only written five new lines of code rather than five hundred, or five
thousand.


Writing software tests for each method as you go is your best defense for
confirming you understand what your code does, confirming your code behaves
the way you intend, and finding problems as soon as possible so they won't
cause trouble later. The longer you put off testing, the harder it is to
find problems, and the more bugs you'll have to fix--if you let too many
pile up, it gets increasingly challenging to get your code to work at all.


Example: testing remove(int position) for Linked List
-----------------------------------------------------

Suppose we are testing the ``remove(int position)`` method of our singly linked list ``MHCLinkedList``:

.. code-block:: java
    :linenos:

    // Removes the element at the specified position in this list, and returns it.
    public E remove(int position) {
        // if position is invalid, throw error
        if (position < 0 || position >= numElements) {
            throw new IndexOutOfBoundsException(position);
        }   

        // Case where we're removing the head element, call our removeFirst method.
        if(position == 0) {
            return removeFirst();
        }  
        else {
            // Otherwise, find the node just before the one we want to remove
            Node<E> prevNode = getNode(position - 1);
            Node<E> toRemove = prevNode.getNext();

            // Update prevNode's "next" pointer to refer to toRemove's "next" pointer
            prevNode.setNext(toRemove.getNext());

            // If we're removing the last element, make sure to update "tail"
            if (toRemove == tail) {
                tail = prevNode;
            }

            // Decrease the size of the list
            numElements--; 

            // Return the value removed
            return toRemove.getValue();
        }
    }

When glass-box or white-box testing, we need to cover all possible conditional "if-else" paths through the code. For this remove method, that looks like:

- **Test case 1 [line 4]:** the position is invalid, specifically if the position is negative
- **Test case 2 [line 4]:** the position is invalid, specifically if the position is larger than the number of elements in the list
- **Test case 3 [line 9]:** we're removing the head
- **Test case 4 [line 12]:** we're removing something in the middle
- **Test case 5 [line 21]:** we're removing the tail

We then create a separate class with a main method that will create a LinkedList for us to exercise all of these test cases, 
and include print statements that check what we expect the output to be vs. what actually occurs:

.. code-block:: java

    public class TestLinkedListRemove() {
        public static void main(String args[]) {
            MHCLinkedList<String> list = new MHCLinkedList<>();

            // Prepare the list for testing: "apple" -> "banana" -> "cherry"
            list.add("apple");
            list.add("banana");
            list.add("cherry");

            // Test case 1, invalid negative position
            try {
                list.remove(-1);
                System.out.println("An IndexOutOfBoundsException should have been thrown!");
            }
            catch (IndexOutOfBoundsException e) {
                System.out.println("IndexOutOfBoundsException correctly thrown for remove(-1)");
            }

            // Test case 2, invalid position larger than list
            try {
                list.remove(4);
                System.out.println("An IndexOutOfBoundsException should have been thrown!");
            }
            catch (IndexOutOfBoundsException e) {
                System.out.println("IndexOutOfBoundsException correctly thrown for remove(4)");
            }

            // Test case 3: remove head
            String removedValue = list.remove(0); // removes "apple", list should be "banana" -> "cherry"
            System.out.println("Expected removed value: apple, Actual: " + removedValue);
            System.out.println("Expected new head: banana, Actual: " + list.get(0));

            // Test case 4: remove from middle
            list.add(1, "date"); // list is now: "banana" -> "date" -> "cherry"
            removedValue = list.remove(1); // removes "date", list should be "banana" -> "cherry"
            System.out.println("Expected removed value: date, Actual: " + removedValue);
            System.out.println("Expected new element at position 1: cherry, Actual: " + list.get(1));

            // Test case 5: remove tail
            removedValue = list.remove(1); // removes "cherry", which is the tail
            // list should just be "banana" now
            System.out.println("Expected removed value: cherry, Actual: " + removedValue);
            System.out.println("Expected new tail: banana, Actual: " + list.get(list.size()-1));
        }
    }