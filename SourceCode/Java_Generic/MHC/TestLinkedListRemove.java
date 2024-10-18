public class TestLinkedListRemove {
    public static void main(String args[]) {
        MHCLinkedListTemp<String> list = new MHCLinkedListTemp<>();

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
        System.out.println("Expected removed element: apple, Actual: " + removedValue);
        System.out.println("Expected new head: banana, Actual: " + list.get(0));

        // Test case 4: remove from middle
        list.add(1, "date"); // list is now: "banana" -> "date" -> "cherry"
        removedValue = list.remove(1); // removes "date", list should be "banana" -> "cherry"
        System.out.println("Expected removed element: date, Actual: " + removedValue);
        System.out.println("Expected new element at position 1: cherry, Actual: " + list.get(1));

        // Test case 5: remove tail
        removedValue = list.remove(1); // removes "cherry", which is the tail
        System.out.println("Expected removed element: cherry, Actual: " + removedValue);
        System.out.println("Expected new tail: banana, Actual: " + list.get(list.size()-1));
    }
}
