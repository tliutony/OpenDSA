Stacks
======

Stack Terminology and Implementation
------------------------------------

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

The accessible element of the stack is called the ``top`` element.
Elements are not said to be inserted, they are :term:`pushed <push>`
onto the stack.
When removed, an element is said to be :term:`popped <pop>` from the
stack.

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

Push Operation
~~~~~~~~~~~~~~~

.. inlineav:: astackPushCON ss
   :long_name: Array stack push slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackPushCON.js
   :output: show
   :keyword: Array-based Stack Implementation

Pop Operation
~~~~~~~~~~~~~

.. inlineav:: astackPopCON ss
   :long_name: Array stack pop slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackPopCON.js
   :output: show
   :keyword: Array-based Stack Implementation

