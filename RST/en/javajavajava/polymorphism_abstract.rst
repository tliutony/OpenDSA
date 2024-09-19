Abstract Classes, Interfaces, and Polymorphism
==============================================

In Java, there are three kinds of **polymorphism**:

    
* **Overriding** an inherited method.
    
* Implementing an **abstract** method.
    
* Implementing a Java **interface**.

In the previous section we saw examples of the first type of polymorphism.
All forms of polymorphism are based on Java's dynamic binding mechanism.
In this section we will develop an example that illustrates the other two types of polymorphism and discuss some of the design implications involved in choosing one or the other approach.

Implementing an Abstract Method
-------------------------------

As we all know from our childhood,
animals have distinctive ways of speaking.
A cow goes "moo"; a pig goes "oink"; and so on.
Let's design a hierarchy of animals that simulates this characteristic by printing the characteristic sounds that these animals make.

We want to design our classes so that any given animal will return something like
"I am a cow and I go moo," when we invoke the ``toString()`` method.
Moreover, we want to design this collection of classes so that it is extensible -- that is, so that we can continue to add new animals to our menagerie without having to change any of the code in the other classes. The figure below provides
a summary of the design:

.. odsafig:: Images/jjj_animals.png
   :align: center

The ``Animal`` class is an **abstract** class.
That's why its name is italicized in the UML diagram.
The reason that this class is abstract is because its ``speak()`` method is an
**abstract method**,
which is a method definition that does not contain an implementation.
That is, the method definition contains just the method's signature,
not its body.
Any class that contains an abstract method,
must itself be declared abstract.

Here is the definition of the ``Animal`` class:

.. code-block:: java
    :linenos:

    public abstract class Animal {
        private String kind; // Cow, pig, cat, etc.
        
        public Animal(String kind)  {
            this.kind = kind;
        }
     
        public String toString() {
            return "I am a " + kind + " and I go " + speak();
        }
     
        public abstract String speak();   // Abstract method
    }

Note how we declare the abstract method (``speak()``) and the abstract class.
Because one or more of its methods is not implemented,
an abstract class cannot be instantiated. That is, you cannot say:

.. code-block:: java

    Animal animal = new Animal("animal"); // Error: Animal is abstract

.. Even though it is not necessary,
.. we give the ``Animal`` class a constructor.
.. If we had left this off, Java would have supplied a default constructor that would be invoked when ``Animal`` subclasses are created.

Java has the following rules on using abstract methods and  classes.

* Any class containing an ``abstract`` method must be declared an abstract class.
        
* An ``abstract`` class cannot be instantiated. It must be subclassed.
    
* A subclass of an ``abstract`` class may be instantiated only if it implements **all** of the superclass's ``abstract`` methods. A subclass that implements only some of the ``abstract`` methods must itself be declared ``abstract``.
            
* A class may be declared ``abstract`` even it contains no ``abstract`` methods. It could, for example, contain instance variables that are common to all its subclasses.

Even though an abstract method is not implemented in the superclass,
it can be called in the superclass.
Indeed, note how the ``toString()`` method calls the abstract ``speak()`` method.
The reason that this works in Java is due to the dynamic binding mechanism.
The polymorphic ``speak()`` method will be defined in the various ``Animal`` subclasses.
When the ``Animal.toString()`` method is called, Java will decide which actual ``speak()`` method to call based on what subclass of ``Animal`` is involved.


Definitions for two such subclasses are shown below:

.. code-block:: java

    public class Cat extends Animal {
        public Cat() {
            super("cat");
        }
        public String speak() {
            return "meow";
        }
    }
    public class Cow extends Animal {
        public Cow() {
            super("cow");
        }
        public String speak() {
            return "moo";
        }
    }

In each case the subclass extends the ``Animal`` class and provides its own 
constructor and its own implementation of the ``speak()`` method.
Note that in their respective constructors,
we can refer to the ``kind`` instance variable,
which is inherited from the ``Animal`` class.
.. TODO confirm this is the change we want
Note that  ``kind`` is declared as a ``private`` variable -- if ``kind`` had been declared
``public``, it would be inherited by subclasses but it would also be 
accessible to every other class, which would be an undesired exposure of information that should be hidden.

.. it is inherited by all ``Animal`` subclasses but hidden from all other classes.


Given these definitions, we can now demonstrate the power and flexibility of inheritance and polymorphism. Run the code below to see it in action.

.. note::

    Try copying the code below into VS Code and running it.
    
.. code-block:: java

    /** A main class to test the animal hierarchy */
    public class AnimalRunner {

        // Create Animal instances invoke their speak() methods, 
        // illustrating inheritance and polymorphism.

        public static void main(String args[]) {
            Animal animal = new Cow();
            System.out.println(animal.toString());
            
            animal = new Cat();
            System.out.println(animal.toString());
        }
    }

    // Abstract class with abstract speak()
    abstract class Animal {
        protected String kind;     // Cow, pig, cat, etc.

        public Animal(String kind)  {
            this.kind = kind;
        }

        public String toString() {  // Overrides toString()
            return "I am a " + kind + " and I go " + speak();
        }

        // Abstract method, to be implemented in subclasses.
        public abstract String speak(); 
    }

    class Cat extends Animal {  // Extends Animal, implements speak()
        public Cat() {
            super("cat");
        }
        public String speak() {
            return "meow";
        }
    }

    class Cow extends Animal { // Extends Animal, implements speak()
        public Cow() {
            super("cow");
        }
        public String speak() {
            return "moo";
        }
    }

Consider the following code segment from the ``main()`` method:

.. code-block:: java
    :linenos:

    Animal animal = new Cow();
    System.out.println(animal.toString()); // A cow goes moo
    animal = new Cat();
    System.out.println(animal.toString()); // A cat goes meow

We first create a ``Cow`` object and then invoke its (inherited) ``toString()`` method. It returns, "I am a cow and I go moo."
We then create a ``Cat`` object and invoke its (inherited)
``toString()`` method, which returns, "I am a cat and I go meow."


As this example shows, Java is able to determine the appropriate implementation 
of ``speak()`` at run time in each case.
The invocation of the abstract ``speak()`` method in 
the ``Animal.toString()`` method is a second form of  **polymorphism**.

What is the advantage of polymorphism here?
The main advantage is the  **extensibility** that it affords our ``Animal`` hierarchy.
We can define and use completely new ``Animal`` subclasses without redefining or 
recompiling the rest of the classes in the hierarchy.
Java's **dynamic binding mechanism** enables the ``Animal.toString()`` method 
to determine the type of ``Animal`` at run time subclass so that it will call
the appropriate ``speak()`` method for that type of  ``Animal``.


To get a better appreciation of the flexibility and extensibility of this design,
it might be helpful to consider an alternative design that does not use polymorphism.
One such alternative would be to define each
``Animal`` subclass with its own speaking method.
A ``Cow`` would have a ``moo()`` method;
a ``Cat`` would have a ``meow()`` method;
and so forth.

Given this design, we could use a sequence of conditional statements to select the appropriate method call. For example, consider the following method definition:

.. code-block:: java
    :linenos:

    public String talk(Animal a) {
    if (a instanceof Cow) {
        return "I am a " + kind + " and I go " + a.moo();
    }
    else if (a instanceof Cat) {
        return "I am a " + kind + " and I go " + a.meow();
    }
    else {
        return "I don't know what I am";
    }


In this example,  we introduce the ``instanceof`` operator,
which is a built-in boolean operator. It returns true if the object on its left-hand side is an instance of the class on its right-hand side.

.. note::
    Generally, if you're using ``instanceof`` to check the type of the object, that is a signal that your code could potentially be improved to make use of polymorphism.

The ``talk()`` method would produce more or less the same result as our polymorphic approach.
If you call ``talk(new Cow())``, it will return
"I am a cow and I go moo."

However, with this design, it is not possible to extend the
``Animal`` hierarchy without rewriting and recompiling the ``talk()`` method.
Imagine how unwieldy this would become if we want to add many different animals.

.. note::
    Try it yourself! Define an ``Animal`` subclass named ``Pig``, which goes "oink." Click the drop down below for the solution!

.. TODO make this a button
.. raw:: html

    <style type="text/css">
    /* Fix details summary arrow
    not shown in Firefox
    due to bootstrap
    display: block;
    */
    summary {
        display: list-item;
    }
    </style>

   <details>
   <summary><b>Click me for the solution</b></summary>

.. code-block:: java
    :linenos:

    public class Pig extends Animal {
        public Pig() {
            kind = "pig";
        }
        public String speak() {
            return "oink";
        }
    }

.. raw:: html

   </details>
            
.. <exercise label="talk">
.. <title>Pig talk</title>
.. <statement>Modify the ``talk()`` method  
.. to incorporate the ``Pig`` class.</statement>
.. <program language="java" interactive="activecode"><input>
.. /** A main class to test the animal hierarchy */
.. public class AnimalRunner {

..     public static void main(String args[]) {
..     Animal animal = new Cow();
..     System.out.println( animal.talk(animal) );
    
..     animal = new Cat();
..     System.out.println( animal.talk(animal) );
..     }
.. }

.. class Animal {      
..     protected String kind; // Cow, pig, cat, etc.

..     public String talk(Animal a) {
..     if (a instanceof Cow)
..         return "I am a " + kind + " and I go " + a.moo();
..     else if (a instanceof Cat)
..         return "I am a " + kind + " and I go " + a.meow();
..     else
..         return "I don't know what I am";
..     }
.. }

.. class Cat extends Animal {
..     public Cat() {
..     kind = "cat";
..     }
..     public String meow() {
..     return "meow";
..     }
.. }
.. class Pig extends Animal {
..     public Pig() {
..     kind = "pig";
..     }
..     public String oink() {
..     return "oink";
..     }  
.. } 
.. class Cow extends Animal {
..     public Cow() {
..     kind = "cow";
..     }
..     public String moo() {
..     return "moo";
..     }
.. }
.. </input>
.. </program>
.. <solution>  
.. <program language="java"><input>
..     // A non-polymorphic design
..     public String talk(Animal a) {
..     if (a instanceof Cow)
..         return "I am a " + kind + " and I go " + a.moo();
..         else if (a instanceof Cat)
..         return "I am a " + kind + " and I go " + a.meow();
..         else if (a instanceof Pig)
..         return "I am a " + kind + " and I go " + a.oink();
..         else
..         return "I don't know what I am";
..     }
..     </input></program>    
.. </solution>  
.. </exercise>  
.. </exercises>


Implementing a Java Interface
-----------------------------

A third form of polymorphism results through the implementation of Java **interfaces**,
which are like classes but contain only abstract method definitions and constants 
(i.e., ``final`` variables). An  interface cannot contain instance variables.
The designer of an interface specifies what methods will be implemented by classes that
**implement** the interface.
This is similar to what we did when we implemented the abstract ``speak()`` method in the animal example.
The difference between implementing a method from an interface and from an abstract superclass is that a subclass **extends**
an abstract superclass but it **implements** an interface.


To see how this works, we will provide an alternative design for our animal hierarchy.
Rather than defining ``speak()`` as an abstract method within the ``Animal`` superclass, we will define it as an abstract method in the ``Speakable`` interface, which individual subclasses will implement. 
See how we define the interface in the code below:

.. code-block:: java
    :linenos:

    public interface Speakable {
        public String speak();
    }

    public class Animal {
        private String kind; // Cow, pig, cat, etc.
        public Animal(String kind) {
            this.kind = kind;
        }

        public String toString() {
            return "I am a " + kind;
        }
    }

Note the differences between this definition of ``Animal`` and the previous definition.
This version no longer contains the abstract ``speak()`` method, as well as a modified ``toString()`` method.
Therefore, the class itself is not an abstract class. The ``speak()`` method is 
not declared in this class, and we instead leave that functionality for the subclasses
``Cow`` and ``Cat`` to implement directly. 

.. This version no longer contains the abstract ``speak()`` method.
.. Therefore, the class itself is not an abstract class.
.. However, because the ``speak()`` method is not declared in this class,
.. we cannot call the ``speak()`` method in the ``toString()`` method,
.. unless we cast this object into a ``Speakable`` object.

.. We encountered the cast operation in Chapter<nbsp/>5,
.. where we used it with  primitive types such as ``(int)`` and ``(char)``.
.. we use it to specify the actual type of some object.
.. In this ``toString()`` example, ``this`` object is some type of ``Animal`` subclass,
.. such as a ``Cat``. The cast operation, ``(Speakable)``, changes the object's actual type to ``Speakable``, which syntactically allows its ``speak()`` method to be called.


To do this, ``Animal`` subclasses will now ``extend`` the ``Animal`` class and ``implement`` the ``Speakable`` interface:

.. code-block:: java

    public class Cat extends Animal implements Speakable {
        public Cat() { 
            super("cat"); 
        }

        public String speak() {
            return "meow";
        }

        public String toString() {
            return super.toString() + " and I go " + speak();
        }
    }

    public class Cow extends Animal implements Speakable {
        public Cow() { 
            super("cow"); 
        }

        public String speak() {
            return "moo";
        }

        public String toString() {
            return super.toString() + " and I go " + speak();
        }
    }

To implement a Java interface,
one must provide a method implementation for each of the abstract methods in the interface.
In this case there is only one -- the ``speak()`` method.


.. Note, again,
.. the expression from the ``Animal.toString()`` class

.. .. code-block:: java

..     ((Speakable)this).speak();


.. which casts ``this`` object into a ``Speakable`` object.
.. The cast is required because the ``Animal`` class does not have 
.. a ``speak()`` method.  Therefore, in order to invoke ``speak()`` on 
.. an object from one of the ``Animal`` subclasses,
.. the object must actually be a ``Speakable``. 

In this approach, we allow the ``Cat`` and ``Cow`` subclasses to implement the 
``Speakable`` interface and override the ``toString()`` method. 
The base class Animal only defines general behavior common to all animals, such as identifying their ``kind``, as not all animals speak (worms and fish are animals, but what do they say?). 
The subclasses are responsible for overriding the speak() method and incorporating that behavior into their own toString() implementation.

As defined above, a ``Cat``, by virtue of extending  the ``Animal`` class and 
implementing the ``Speakable`` interface, is both an ``Animal`` and a ``Speakable``.

In general, a class that implements an interface, has that interface as one of its types.
Interface implementation is itself a form of inheritance. A Java class can be a direct subclass of only one superclass. But it can implement any number of interfaces.

.. note::
    A key distinction between extending a superclass and implementing an interface is that a class can implement multiple interfaces.

Given these definitions of the ``Cow`` and ``Cat`` subclasses,
the following code segment will produce the same results as in the previous section.

.. code-block:: java

    Animal animal = new Cow();
    System.out.println(animal.toString()); // A cow goes moo
    animal = new Cat();
    System.out.println(animal.toString()); // A cat goes meow

Although the design is different, both approaches produce the same result.

.. NOTE: this was adapted from Java, Java, Java section 8.7.8
Interfaces or Abstract Classes
------------------------------

With this Animal example, we see that you can get the same functionality from an 
abstract interface and from an abstract superclass method. 
When should we put the abstract method in the superclass and when does it belong in an interface?

One important distinction is that Java interfaces provides a means of associating useful methods with a variety of different types of objects, leading to a more flexible object-oriented design.
Methods defined in an interface exist independently of a particular class hierarchy. By their very nature, interfaces can be attached to any class, which makes them very flexible to use. 
For example, we may have classes otherwise unrelated to ``Animal`` implement the ``Speakable`` interface, providing us a useful way to associate the functionality of a variety of objects:

.. code-block:: java
    :linenos:

    public class Cow extends Animal implements Speakable {
        public Cow() { 
            super("cow"); 
        }

        public String speak() {
            return "moo";
        }

        public String toString() {
            return super.toString() + " and I go " + speak();
        }
    }

    public class VoiceAssistant implements Speakable {
        private String name;

        public VoiceAssistant(String name) {
            this.name = name;
        }

        public String speak() {
            return "Hi, my name is " + name + " and I am your virtual assistant. How can I help?";
        }
    }

    public class DogOwner implements Speakable {
        private String dogName;

        public DogOwner(String dogName) {
            this.dogName = dogName;
        }

        public String speak() {
            return "Come here, " + dogName + "!";
        }
    }

If we then run the following main method:

.. code-block:: java
    :linenos:

    public class Main {
        public static void main(String[] args) {
            Speakable[] arr = new Speakable[3];

            arr[0] = new Cow();
            arr[1] = new VoiceAssistant("Siri");
            arr[2] = new DogOwner("Spot");

            for (int i = 0; i < arr.length; i++) {
                System.out.println(arr[i].speak());
            }
        }
    }


We would see the following output:

.. code-block:: java

    moo
    Hi, my name is Siri and I am your virtual assistant. How can I help?
    Come here, Spot!

Another useful guideline for deciding between an abstract method and an interface is that the superclass should contain the basic shared attributes and methods that define a certain type of object. 
Thus, when we define methods as abstract in a superclass, they should contribute in a fundamental way toward the basic definition of that type of object, not merely toward one of its **roles** or its functionality. In the case of our Animal class example, we may prefer to have the ``speak()`` method
be defined in an interface as opposed to being defined as an abstract method in ``Animal`` as not all animals make noise! We might have a ``Fish`` class that extends ``Animal`` but does not implement ``Speakable``:

.. code-block:: java

    public class Fish extends Animal {
        public Fish() { 
            super("fish"); 
        }

        public String toString() {
            return super.toString() + " and I swim but don't speak";
        }
    }

Our previous design where ``speak()`` was an abstract method in the ``Animal`` class would have forced us to unnaturally have our ``Fish`` class implement ``speak()``. We can then
organize and group various ``Animal`` objects together in our data structures,
regardless of whether they speak or not:

.. code-block:: java
    :linenos:

    public class Main {
        public static void main(String[] args) {
            Animal[] arr = new Animal[3];

            arr[0] = new Cow();
            arr[1] = new Cat();
            arr[2] = new Fish();

            for (int i = 0; i < arr.length; i++) {
                System.out.println(arr[i]);
            }
        }
    }


.. code-block:: java

    // Output
    I am a cow and I go moo
    I am a cat and I go meow
    I am a fish and I swim but don't speak


.. <exercises>
.. <exercise label="animalsInterface">
.. <title>Speakable interface</title>
.. <statement>
.. Modify the code below to add a ``Pig`` to the hierarchy 
..     using the interface implementation.
.. </statement>
.. <program language="java" interactive="activecode"><input>
.. /** A main class to test the animal hierarchy */
.. public class AnimalRunner {    
.. public static void main(String args[]) {
..     Animal animal = new Cow();
..     System.out.println(animal.toString());
    
..     animal = new Cat();
..     System.out.println(animal.toString());
.. }
.. }

.. class Animal {
..     protected String kind;  // Cow, pig, cat, etc.

..     public Animal()  {  }

..     public String toString() {
..         return "I am a " + kind + " and I go " 
..         + ((Speakable) this).speak();
..     }
.. }

.. interface Speakable {
..     public abstract String speak();  
.. }

.. class Cat extends Animal implements Speakable {
.. public Cat() { kind = "cat"; }

.. public String speak() { return "meow"; }
.. }

.. class Cow extends Animal implements Speakable {
.. public Cow() { kind = "cow"; }

.. public String speak() { return "moo"; }
.. }   
.. </input></program>
.. <solution>
.. The ``Pig`` class:
..     <pre>
..     class Pig extends Animal implements Speakable {
..         public Pig() {
..             kind = "pig";
..         }
..         public String speak() {
..             return "oink";
..         }
..     }
..     </pre>
..     The ``main()`` method:
..     <pre>
..     ...
..     animal = new Pig();
..     System.out.println(animal.toString());
..     </pre>
..     Will give the following output:
.. <pre>
..     I am a cow and I go moo
..     I am a cat and I go meow
..     I am a pig and I go oink
.. </pre>
.. </solution>
.. </exercise>
.. </exercises>

.. </subsection>
.. </section>