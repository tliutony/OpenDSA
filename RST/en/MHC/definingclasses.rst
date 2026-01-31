Defining Classes in Java
=========================

In this section we will look at how we define classes to create our own data types. Lets start by creating a
``Fraction`` class to extend the set of numeric data types provided by our
language. 

The instance variables (attributes) we will need for our fraction
class are the numerator and denominator. In Java, all data members must be
declared up front at the top of the class definition:

.. code-block:: java

    public class Fraction {
        private int numerator;
        private int denominator;
    }

Notice that we have declared the numerator and denominator to be
**private**. This means that these variables are only accessible within the ``Fraction`` class. The compiler will generate an error if a
method in another class includes code like the following:

.. code-block:: java

    Fraction f = new Fraction(1,2);
    int y = f.numerator * 10;

Direct access to private instance variables from another class is not allowed.
Therefore if we legitimately want to be able to access information such as the numerator
or denominator for a particular fraction we provide a way to access these variables, called **getter** methods.  If we
want to be able to modify an instance variable from another class, we also need to provide a way to do so, called a **setter** method.

.. code-block:: java

    public int getNumerator() {
        return numerator;
    }

    public void setNumerator(int numerator) {
        this.numerator = numerator;
    }

    public int getDenominator() {
        return denominator;
    }

    public void setDenominator(int denominator) {
        this.denominator = denominator;
    }

Writing a constructor
---------------------

Once you have identified the instance variables for your class the next
thing to consider is the constructor. In Java, constructors have the
same name as the class and are declared public. They are declared
without a return type. So any method that is named the same as the
class and has no return type is a constructor. Our constructor will take
two parameters: the numerator and the denominator for the fraction we are
constructing.

.. code-block:: java    

    public Fraction(int top, int bottom) {
        num = top;
        den = bottom;
    }

There are a couple of important things to notice here. First, if you are familiar with Python, you will
notice that the constructor does not have a ``self`` parameter. You will
also notice that we can simply refer to the instance variables by name
without the ``self`` prefix, because they have already been declared. 

Java does provide a special variable called ``this`` that
works like the ``self`` variable. In Java, ``this`` is typically only used
when it is needed to differentiate between a parameter or local variable
and an instance variable. For example this alternate definition of the
the Fraction constructor uses ``this`` to differentiate between
parameters and instance variables.

.. code-block:: java

    public Fraction(int num, int den) {
        this.num = num;
        this.den = den;
    }

Methods
-------

Let's begin by implementing addition in Java:

.. code-block:: java    

    public Fraction add(Fraction otherFrac) {
        int newNum = otherFrac.getDenominator() * this.numerator +
                                 this.denominator * otherFrac.getNumerator();
        int newDen = this.denominator * otherFrac.getDenominator();
        int common = gcd(newNum, newDen);
        return new Fraction(newNum/common, newDen/common);
    }

First you will notice that the ``add`` method is declared as
``public Fraction``. The ``public`` keyword means that methods from other classes 
can call the ``add`` method. The ``Fraction`` part means that ``add`` will
return a fraction as its result.

Second, you will notice that the method makes use of the ``this`` variable. In this method, ``this`` is not necessary, because there is no ambiguity about the ``numerator`` and ``denominator`` variables. So this version of the code is equivalent: 

.. code-block:: java

    public Fraction add(Fraction otherFrac) {
        int newNum = otherFrac.getDenominator() * numerator +
                                 denominator * otherFrac.getNumerator();
        int newDen = denominator * otherFrac.getDenominator();
        int common = gcd(newNum, newDen);
        return new Fraction(newNum/common, newDen/common);
    }

The addition takes place by multiplying each numerator by the opposite
denominator before adding. This procedure ensures that we are adding two
fractions with common denominators. Using this approach the denominator
is computed by multiplying the two denominators. The greatest common
divisor method, ``gcd``, is used to find a common divisor to simplify the
numerator and denominator in the result.

Finally on line 6 a new ``Fraction`` is returned as the result of the
computation. The type of the value that is returned by the return statement must
match the type that is specified as part of the declaration. So, in
this case the value returned on line 8 must be a ``Fraction`` since that is
the return type specified on line 1 of the method declaration.


Static Methods
--------------

In our ``Fraction`` class we also implemented a method to calculate the greatest common divisor for two fractions (``gcd``).
Unlike add, ``gcd`` does not rely on the numerator or denominator. If we have a method that does not rely on the instance variables of the class, we can declare it as a **static** method,
which means it can be called without creating an instance of the class. Unlike the ``add`` method, ``gcd`` is not associated with any particular ``Fraction`` object:

.. code-block:: java

    private static int gcd(int m, int n) {
        while (m % n != 0) {
            int oldm = m;
            int oldn = n;
            m = oldn;
            n = oldm%oldn;
        }
        return n;
    }


Our full ``Fraction`` class would then look like the following:

.. code-block:: java

    public class Fraction {

        private int numerator;
        private int denominator;

        public Fraction(int num, int den) {
            this.numerator = num;
            this.denominator = den;
        }
 
        public int getNumerator() {
            return numerator;
        }
        
        public int getDenominator() {
            return denominator;
        }

        public Fraction add(Fraction other) {
            int newNum = other.getDenominator()*this.numerator + this.denominator*other.getNumerator();
            int newDen = this.denominator * other.getDenominator();
            int common = gcd(newNum,newDen);
            return new Fraction(newNum/common, newDen/common );
        }

        private static int gcd(int m, int n) {
            while (m % n != 0) {
                int oldm = m;
                int oldn = n;
                m = oldn;
                n = oldm%oldn;
            }
            return n;
        }
    }


This main method demonstrates the use of the ``Fraction`` class:

.. code-block:: java

    public static void main(String[] args) {
        // Create 2 fractions
        Fraction f1 = new Fraction(1,2);
        Fraction f2 = new Fraction(2,3);
        // Add them together
        Fraction total = f1.add(f2);
        // Print the result
        System.out.println(f1 + " + " + f2 + " = " + total);
    }