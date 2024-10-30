Stacks
======

Stack Terminology and Interface
-------------------------------

The :term:`stack` is a list-like structure
in which elements may be inserted or removed from only one end.
While this restriction makes stacks less flexible than lists,
it also makes stacks both efficient (for those operations they can do)
and easier to implement.

Many applications require only the limited form of
insert and remove operations that stacks provide.
In such cases, it is more efficient to use the simpler stack data
structure rather than the generic list.

Despite their restrictions, stacks have many uses.
Thus, a special vocabulary for stacks has developed.
Accountants used stacks long before the invention of the computer.
They called the stack a ":term:`LIFO`" list,
which stands for "Last-In, First-Out."
Note that one implication of the LIFO policy is that stacks
remove elements in reverse order of their arrival.

The accessible element of the stack is called the "top" of the stack.
Elements are not said to be inserted, they are **pushed** onto the stack.
When removed, an element is said to be **popped** from the stack.
Finally, if we want to know what is at the top of the stack without removing it, we can **peek** at it.

Below is a stack interface:

.. codeinclude:: MHC/MHCStack
   :tag: MHCStack

Like we did with the List interface, we will implement the Stack interface in two different ways.

ArrayList-Based Stack
---------------------

Here is a complete implementation of the ``MHCStack`` interface using an ArrayList:

.. codeinclude:: MHC/ArrayListStack
   :tag: ArrayListStack


The arraylist-based stack implementation is essentially a List that has a restricted set of operations.
In particular, we can only add or remove elements from one end of the list. Notice that we initialize
the ``values`` instance variable in the constructor that will hold the stack's values:

.. codeinclude:: MHC/ArrayListStack
   :tag: ArrayListStackConstructor

Since we use an ArrayList to store the stack's values, we can re-use all of the ArrayList's methods, which
will result in shorter code.

.. note::

    Instead of writing the Stack operations from scratch, we can leverage the ArrayList's methods we have already written!



The main important design decision to be made is which end of the array should represent the top of the stack.


.. inlineav:: astackTopCON ss
   :long_name: Array stack top position slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackTopCON.js
   :output: show
   :keyword: Array-based Stack Implementation

ArrayList Push Operation
~~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: astackPushCON ss
   :long_name: Array stack push slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackPushCON.js
   :output: show
   :keyword: Array-based Stack Implementation

ArrayList Pop Operation
~~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: astackPopCON ss
   :long_name: Array stack pop slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackPopCON.js
   :output: show
   :keyword: Array-based Stack Implementation


LinkedList-Based Stack
---------------------

Next, we look at implementing a stack using a LinkedList. Like the ArrayList-based stack, we will treat the **end** of the LinkedList as the top of the stack and use the LinkedList's methods to implement the Stack interface:

.. note::

    This means that ``tail`` is always the top of the stack!

.. codeinclude:: MHC/LinkedListStack
   :tag: LinkedListStack

Note that we use the ``getLast()`` method to implement ``peek()``, which gets the top element of the stack:

.. codeinclude:: MHC/LinkedListStack
   :tag: LinkedListStackPeek

.. note::
    We haven't yet written ``getLast()`` in our LinkedList class thus far this semester, but since we have access to the ``tail`` pointer, its implementation is straightforward:

    .. code-block:: java

        // NOTE: this would be part of the LinkedList class, 
        // where we have access to the tail instance variable
        public E getLast() {
            return tail.getValue();
        }

LinkedList Push Operation
~~~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: lstackPushCON ss
   :long_name: Linked stack push
   :links: DataStructures/DoubleLinkList.css AV/List/lstackCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/List/llist.js AV/List/lstackPushCON.js 
   :output: show
   :keyword: Linked Stack Implementation

LinkedList Pop Operation
~~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: lstackPopCON ss
   :long_name: Linked stack pop
   :links: DataStructures/DoubleLinkList.css AV/List/lstackCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/List/llist.js AV/List/lstackPopCON.js 
   :output: show
   :keyword: Linked Stack Implementation


Comparison of ArrayList-Based and LinkedList-Based Stacks
------------------------------------------------------------

.. table:: Efficiency of Stack Operations
   :align: center

   +--------------+------------------+------------------+
   | Operation    | ArrayList-Based  | LinkedList-Based |
   +==============+==================+==================+
   | push         | O(1)             | O(1)             |
   +--------------+------------------+------------------+
   | pop          | O(1)             | O(1)             |
   +--------------+------------------+------------------+
   | peek         | O(1)             | O(1)             |
   +--------------+------------------+------------------+
   | size()       | O(1)             | O(1)             |
   +--------------+------------------+------------------+
   | isEmpty()    | O(1)             | O(1)             |
   +--------------+------------------+------------------+

All operations for the ArrayList-based and LinkedList-based stack implementations
take constant time, so from a time efficiency perspective,
neither has a significant advantage.

Another basis for comparison is the total **space**
required. The analysis is similar to that done for list implementations.
The ArrayList-based stack must declare a fixed-size array initially, and so some of that space is wasted whenever the stack is not full.
The LinkedList-based stack can shrink and grow but requires the overhead of a
**Node** field for every element.
