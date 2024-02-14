class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b);
      const root = this.sortedArrayToBST(sortedArray);
      return root;
    }
  
    sortedArrayToBST(sortedArray) {
      if (sortedArray.length === 0) return null;
  
      const mid = Math.floor(sortedArray.length / 2);
      const root = new Node(sortedArray[mid]);
  
      root.left = this.sortedArrayToBST(sortedArray.slice(0, mid));
      root.right = this.sortedArrayToBST(sortedArray.slice(mid + 1));
  
      return root;
    }
  
    prettyPrint(node, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
  
    insert(value) {
        const newNode = new Node(value);
    
        if (!this.root) {
            this.root = newNode;
            return;
        }
    
        let current = this.root;
        let parent = null;
    
        while (current) {
            parent = current;
            if (value < current.data) {
                current = current.left;
            } else if (value > current.data) {
                current = current.right;
            } else {
                current.data = value;
                return;
            }
        }
    
        if (value < parent.data) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
    }
    
    delete(value) {
        this.root = this._deleteNode(this.root, value);
    }
    
    _deleteNode(node, value) {
        if (node === null) {
            return null;
        }
    
        if (value < node.data) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.data) {
            node.right = this._deleteNode(node.right, value);
        } else {
            // Case 1: Node to be deleted has no children
            if (node.left === null && node.right === null) {
                return null;
            }
            // Case 2: Node to be deleted has only one child
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
            // Case 3: Node to be deleted has two children
            let minRightNode = node.right;
            while (minRightNode.left !== null) {
                minRightNode = minRightNode.left;
            }
            node.data = minRightNode.data;
            node.right = this._deleteNode(node.right, minRightNode.data);
        }
        return node;
    }
    
    find(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.data) {
                return current;
            } else if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }
    
  
    levelOrder(callback) {
      if (!callback) {
        const result = [];
        const queue = [this.root];
        while (queue.length) {
          const node = queue.shift();
          result.push(node.data);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
        return result;
      } else {
        const queue = [this.root];
        while (queue.length) {
          const node = queue.shift();
          callback(node);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
      }
    }
  
    inOrder(callback) {
      this._inOrderHelper(this.root, callback);
    }
  
    _inOrderHelper(node, callback) {
      if (node !== null) {
        this._inOrderHelper(node.left, callback);
        if (callback) callback(node.data);
        this._inOrderHelper(node.right, callback);
      }
    }
  
    preOrder(callback) {
      this._preOrderHelper(this.root, callback);
    }
  
    _preOrderHelper(node, callback) {
      if (node !== null) {
        if (callback) callback(node.data);
        this._preOrderHelper(node.left, callback);
        this._preOrderHelper(node.right, callback);
      }
    }
  
    postOrder(callback) {
      this._postOrderHelper(this.root, callback);
    }
  
    _postOrderHelper(node, callback) {
      if (node !== null) {
        this._postOrderHelper(node.left, callback);
        this._postOrderHelper(node.right, callback);
        if (callback) callback(node.data);
      }
    }
  
    height(node) {
      if (node === null) return -1;
      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  
    depth(node) {
      let depth = 0;
      while (node !== null) {
        depth++;
        node = node.parent;
      }
      return depth - 1;
    }
  
    isBalanced(node = this.root) {
      if (node === null) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      if (Math.abs(leftHeight - rightHeight) <= 1 &&
          this.isBalanced(node.left) &&
          this.isBalanced(node.right)) {
        return true;
      }
  
      return false;
    }
  
    rebalance() {
      const nodes = [];
      this.inOrder((data) => nodes.push(data));
      this.root = this.buildTree(nodes);
    }
  }
  
  // Driver code
  const generateRandomNumbers = (count, max) => {
    const numbers = new Set();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * max));
    }
    return Array.from(numbers);
  };
  
  const randomNumbers = generateRandomNumbers(10, 100);
  
  const bst = new Tree(randomNumbers);
  console.log("Tree is balanced:", bst.isBalanced());
  console.log("Level Order Traversal:", bst.levelOrder());
  console.log("Pre Order Traversal:", bst.preOrder());
  console.log("Post Order Traversal:", bst.postOrder());
  console.log("In Order Traversal:", bst.inOrder());
  
  // Unbalance the tree
  bst.insert(101);
  bst.insert(102);
  bst.insert(103);
  console.log("Tree is unbalanced:", bst.isBalanced());
  
  // Rebalance the tree
  bst.rebalance();
  console.log("Tree is balanced after rebalance:", bst.isBalanced());
  console.log("Level Order Traversal after rebalance:", bst.levelOrder());
  console.log("Pre Order Traversal after rebalance:", bst.preOrder());
  console.log("Post Order Traversal after rebalance:", bst.postOrder());
  console.log("In Order Traversal after rebalance:", bst.inOrder());
  