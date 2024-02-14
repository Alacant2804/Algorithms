class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.nextNode) {
                current = current.nextNode;
            }
            current.nextNode = newNode;
        }
    }

    prepend(value) {
        const newNode = new Node(value);
        newNode.nextNode = this.head;
        this.head = newNode;
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.nextNode;
        }
        return count;
    }

    head() {
        return this.head;
    }

    tail() {
        let current = this.head;
        while (current && current.nextNode) {
            current = current.nextNode;
        }
        return current;
    }

    at(index) {
        if (index < 0) return null;
        let count = 0;
        let current = this.head;
        while (current) {
            if (count === index) {
                return current;
            }
            count++;
            current = current.nextNode;
        }
        return null;
    }

    pop() {
        if (!this.head) return;
        if (!this.head.nextNode) {
            this.head = null;
            return;
        }
        let current = this.head;
        let previous = null;
        while (current.nextNode) {
            previous = current;
            current = current.nextNode;
        }
        previous.nextNode = null;
    }

    contains(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }

    find(value) {
        let index = 0;
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return index;
            }
            index++;
            current = current.nextNode;
        }
        return null;
    }

    toString() {
        let result = "";
        let current = this.head;
        while (current) {
            result += `(${current.value}) -> `;
            current = current.nextNode;
        }
        result += "null";
        return result;
    }

    insertAt(value, index) {
        if (index < 0) return;
        if (index === 0) {
            this.prepend(value);
            return;
        }
        const newNode = new Node(value);
        let count = 0;
        let current = this.head;
        let previous = null;
        while (current && count !== index) {
            count++;
            previous = current;
            current = current.nextNode;
        }
        if (!current) return; // index out of bounds
        newNode.nextNode = current;
        previous.nextNode = newNode;
    }

    removeAt(index) {
        if (index < 0) return;
        if (index === 0) {
            this.head = this.head.nextNode;
            return;
        }
        let count = 0;
        let current = this.head;
        let previous = null;
        while (current && count !== index) {
            count++;
            previous = current;
            current = current.nextNode;
        }
        if (!current) return; // index out of bounds
        previous.nextNode = current.nextNode;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}