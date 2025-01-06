class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function removeDuplicates(arr) {
  return [...new Set(arr)].sort((a, b) => a - b);
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const root = new Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

class Tree {
  constructor(array) {
    const sortedArray = removeDuplicates(array);
    this.root = buildTree(sortedArray);
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);
    if (value < node.data) node.left = this.insert(value, node.left);
    else if (value > node.data) node.right = this.insert(value, node.right);
    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return node;
    if (value < node.data) node.left = this.deleteItem(value, node.left);
    else if (value > node.data) node.right = this.deleteItem(value, node.right);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const successor = this.findMin(node.right);
      node.data = successor.data;
      node.right = this.deleteItem(successor.data, node.right);
    }
    return node;
  }

  findMin(node) {
    return node.left ? this.findMin(node.left) : node;
  }

  find(value, node = this.root) {
    if (!node || node.data === value) return node;
    if (value < node.data) return this.find(value, node.left);
    return this.find(value, node.right);
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback required");
    const queue = [this.root];
    while (queue.length) {
      const curr = queue.shift();
      callback(curr);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (node) {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (node) {
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (node) {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  }

  height(node = this.root) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root, edges = 0) {
    if (!node || !current) return 0;
    if (current === node) return edges;
    if (node.data < current.data) {
      return this.depth(node, current.left, edges + 1);
    } else {
      return this.depth(node, current.right, edges + 1);
    }
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  
  rebalance() {
    const nodes = [];
    this.inOrder((n) => nodes.push(n.data)); 
    this.root = buildTree(removeDuplicates(nodes));
  }
}

export { Node, Tree };
