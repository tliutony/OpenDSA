public class ListMain {
    public static void main(String[] args) {
        MHCList<String> words = new MHCArrayList<>();
        words.add("hi");
        words.add("my");
        words.add("name");

        System.out.println(words);
    }
}
