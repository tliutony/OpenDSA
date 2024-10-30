Queues
======

Queue Terminology and Interface
-------------------------------

Like the stack, the :term:`queue` is a list-like structure that
provides restricted access to its elements.
Queue elements may only be inserted at the back (called an
**enqueue** operation) and removed from the
front (called a **dequeue** operation).
Queues operate like standing in line at a movie theater ticket
counter.

If nobody cuts in line, then newcomers go to the back of the line.
The person at the front of the line is the next to be served.
Thus, queues release their elements in order of arrival.
In Britain, a line of people is called a "queue",
and getting into line to wait for service is called "queuing up".
This behavior is called "First-In, First-Out" (**FIFO**), contrasting with
the "Last-In, First-Out" behavior of the stack.

This section presents two implementations for queues:
a LinkedList-based and (circular) array-based queue. We first show the interface we will implement:

.. codeinclude:: MHC/MHCQueue
   

The main operations we will focus on are ``enqueue``, ``dequeue``, and ``front``:

- ``enqueue``: Add an item to the end of the queue
- ``dequeue``: Remove and return the item at the front of the queue
- ``front``: Return the item at the front of the queue without removing it

LinkedList Queue
----------------

We can use some of our existing functionality from the linked list to implement a queue. Below is a full implementation of the ``MHCQueue`` interface:

.. codeinclude:: MHC/LinkedListQueue
   :tag: LinkedListQueue

A singly linked list is a good choice to implement a queue because we can add to the end of the list in constant time, and remove from the front of the list in constant time.
We also maintain references to both ``head`` and ``tail`` pointers, which correspond naturally to the front and back of the queue!

We store this backing singly linked list in the ``values`` instance variable:


.. codeinclude:: MHC/LinkedListQueue
   :tag: values

front()
~~~~~~~

The ``front()`` method returns the item at the front of the queue without removing it:


.. codeinclude:: MHC/LinkedListQueue
   :tag: front

Like the stack, we need to check if the queue is empty. If it is, we throw a ``NoSuchElementException``. Otherwise, we return the item at the front of the queue using the LinkedList ``getFirst()`` method, which simply returns the value stored at the ``head`` node.

enqueue()
~~~~~~~~~

The ``enqueue()`` method adds an item to the end of the queue:

.. inlineav:: lqueueEnqueueCON ss
   :long_name: Linked Queue Enqueue
   :links: AV/List/lqueueCON.css
   :scripts: AV/List/llist.js AV/List/lqueueEnqueueCON.js
   :output: show   
   :keyword: Linked Queues


dequeue()
~~~~~~~~

The ``dequeue()`` method removes and returns the item at the front of the queue:

.. inlineav:: lqueueDequeueCON ss
   :long_name: Linked Queue Dequeue
   :links: AV/List/lqueueCON.css
   :scripts: AV/List/llist.js AV/List/lqueueDequeueCON.js
   :output: show 
   :keyword: Linked Queues