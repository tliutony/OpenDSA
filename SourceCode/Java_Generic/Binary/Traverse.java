static boolean SUCCESS = true;

// Visit nodes via inorder traversal
/* *** ODSATag: inorder *** */
public void inorder(BinaryTreeNode<T> node) {
  if (node == null) { return; }
  inorder(node.left());
  visit(node);
  inorder(node.right());
}
/* *** ODSAendTag: inorder *** */

// Visit nodes via postorder traversal
/* *** ODSATag: postorder *** */
public void postorder(BinaryTreeNode<T> node) {
  if (node == null) { return; }
  postorder(node.left());
  postorder(node.right());
  visit(node);
}
/* *** ODSAendTag: postorder *** */

// Visit nodes via preorder traversal
/* *** ODSATag: preorder *** */
public void preorder(BinaryTreeNode<T> node) {
  if (node == null) { return; }
  visit(node);
  preorder(node.left());
  preorder(node.right());
}
/* *** ODSAendTag: preorder *** */

public void visit(BinaryTreeNode<T> node) {
  System.out.print(node.getValue() + " ");
}

/* *** ODSATag: count *** */
static <E> int count(BinNode<E> rt) {
  if (rt == null) { return 0; }  // Nothing to count
  return 1 + count(rt.left()) + count(rt.right());
}
/* *** ODSAendTag: count *** */

public static void main(String args[]) throws IOException {
  BSTNode<Integer> rt1 = null;
  int temp = count(rt1);

  rt1 = new BSTNode<Integer>(new Integer(5));
  preorder(rt1);
  System.out.println();
  rt1.setLeft(new BSTNode<Integer>(new Integer(3)));
  rt1.setRight(new BSTNode<Integer>(new Integer(6)));
  preorder(rt1);
  System.out.println();
  preorder2(rt1);
  System.out.println();
  inorder(rt1);
  System.out.println();
  postorder(rt1);
  System.out.println();

  BSTNode<KVPair<Integer,String>> rt2 =
    new BSTNode<KVPair<Integer,String>>(new KVPair<Integer,String>(new Integer(5), "John"));

  if (!checkBST(rt2, new KVPair<Integer,String>(new Integer(-1), ""),
		new KVPair<Integer,String>(new Integer(999999), "")))
    SUCCESS = false;
  rt2.setLeft(new BSTNode<KVPair<Integer,String>>(new KVPair<Integer,String>(new Integer(10), "Jack")));
  if (checkBST(rt2, new KVPair<Integer,String>(new Integer(-1), ""),
	       new KVPair<Integer,String>(new Integer(999999), "")))
    SUCCESS = false;

  Integer myi = new Integer(10);
  Integer myj = new Integer(12);
  KVPair<Integer,String> kv = new KVPair<Integer,String>(myi, "John");

  if (kv.compareTo(myi) != 0)
    SUCCESS = false;
  if (kv.compareTo(myj) == 0)
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Testing failed");
  }
}

}
