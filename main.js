import { Tree } from "./binaryTree.js";

function randomArray(size = 10) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

function printNode(node) {
  console.log(node.data);
}

// Create tree from random array
const tree = new Tree(randomArray());
console.log("Is balanced?", tree.isBalanced());

// Print traversals
console.log("Level Order:");
tree.levelOrder(printNode);

console.log("Pre Order:");
tree.preOrder(printNode);
console.log("Post Order:");
tree.postOrder(printNode);
console.log("In Order:");
tree.inOrder(printNode);

// Unbalance the tree
tree.insert(200);
tree.insert(250);
console.log("Now balanced?", tree.isBalanced());

// Rebalance
tree.rebalance();
console.log("After rebalance:", tree.isBalanced());

// Final traversals
console.log("Level Order:");
tree.levelOrder(printNode);
console.log("Pre Order:");
tree.preOrder(printNode);
console.log("Post Order:");
tree.postOrder(printNode);
console.log("In Order:");
tree.inOrder(printNode);
