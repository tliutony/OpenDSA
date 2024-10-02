public class Searcher <T> {
        public int search(T[] arr, T target) {
            for (int i = 0; i < arr.length; i++) {
                if (arr[i].equals(target)) {
                    return i;
                }
            }
            return -1;
        }

        public static void main(String[] args) {
            Searcher<Integer> searchInt = new Searcher<Integer>();
            Integer [] arr = {3, 5, 7, 2, 9};
            int found = searchInt.search(arr, 9);
            System.out.println("9 found at index " + found);
    
            Searcher<String> searchStr = new Searcher<String>();
            String[] words = {"cat", "elk", "dog", "fox"};
            found = searchStr.search(words, "elk");
            System.out.println("elk found at index " + found);
        }
}
