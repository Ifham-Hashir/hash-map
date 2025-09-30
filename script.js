function Node(key, value, nextNode = null) {
  return { key, value, nextNode };
}

function LinkedList() {
  return {
    head: null,
    tail: null,
    length: 0,
    append(key, value) {
      let newNode = Node(key, value);
      if (this.length === 0) {
        this.head = newNode;
      } else {
        this.tail.nextNode = newNode;
      }
      this.tail = newNode;
      this.length++;
    },
  };
}

function HashMap() {
  let capacity = 16;
  let buckets = Array(capacity);
  for (let i = 0; i < capacity; i++) {
    buckets[i] = LinkedList();
  }
  return {
    loadFactor: 0.75,
    size: 0,
    capacity,
    buckets,

    hash(key) {
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }

      return hashCode;
    },

    set(key, value) {
      //Growth Logic
      if (this.size >= this.capacity * this.loadFactor) {
        let keys = this.keys();
        let values = this.values();
        this.capacity *= 2;
        this.clear();
        for(let i = 0; i < keys.length; i++){
          this.set(keys[i], values[i]);
        }
      }

      let index = this.hash(key);
      if (this.buckets[index].head === null) {
        this.buckets[index].append(key, value);
      } else {
        let currentNode = this.buckets[index].head;
        while (currentNode !== null) {
          if (currentNode.key === key) {
            currentNode.value = value;
            return;
          }
          currentNode = currentNode.nextNode;
        }
        this.buckets[index].append(key, value);
      }

      this.size++;
    },

    get(key) {
      let index = this.hash(key);

      if (this.buckets[index].head !== null) {
        let currentNode = this.buckets[index].head;

        while (currentNode !== null) {
          if (currentNode.key === key) {
            return currentNode.value;
          }
          currentNode = currentNode.nextNode;
        }
      }

      return null;
    },

    has(key) {
      let index = this.hash(key);

      if (this.buckets[index].head !== null) {
        let currentNode = this.buckets[index].head;

        while (currentNode !== null) {
          if (currentNode.key === key) {
            return true;
          }
          currentNode = currentNode.nextNode;
        }
      }

      return false;
    },

    remove(key) {
      let index = this.hash(key);

      if (this.buckets[index].head !== null) {
        let currentNode = this.buckets[index].head;
        let previousNode;
        if (this.buckets[index].length === 1) {
          this.buckets[index].head = null;
          this.buckets[index].tail = null;
          this.buckets[index].length--;
          this.size--;
          return true;
        } else {
          while (currentNode !== null) {
            if (
              currentNode.key === key &&
              this.buckets[index].head === currentNode
            ) {
              this.buckets[index].head = currentNode.nextNode;
              this.size--;
              this.buckets[index].length--;
              return true;
            }
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
            if (currentNode.key === key) {
              if (currentNode === this.buckets[index].tail) {
                this.buckets[index].tail = previousNode;
              }
              previousNode.nextNode = currentNode.nextNode;
              this.size--;
              this.buckets[index].length--;
              return true;
            }
          }
        }
      }
      return false;
    },

    length() {
      return this.size;
    },

    clear() {
      this.buckets = Array(this.capacity);
      for (let i = 0; i < this.capacity; i++) {
        this.buckets[i] = LinkedList();
      }
      this.size = 0;
    },

    keys() {
      let index = 0;
      let keysArray = [];
      while (index < this.buckets.length) {
        if (this.buckets[index].head !== null) {
          let currentNode = this.buckets[index].head;

          while (currentNode !== null) {
            keysArray.push(currentNode.key);
            currentNode = currentNode.nextNode;
          }
        }
        index++;
      }
      return keysArray;
    },

    values() {
      let keys = this.keys();
      let valuesArray = [];

      for (let i = 0; i < keys.length; i++) {
        let value = this.get(keys[i]);

        if (value !== null) {
          valuesArray.push(value);
        }
      }

      return valuesArray;
    },

    entries() {
      let keys = this.keys();
      let values = this.values();
      let entriesArray = [];
      for (let i = 0; i < keys.length; i++) {
        entriesArray.push([keys[i], values[i]]);
      }
      return entriesArray;
    },
  };
}

 const test = HashMap() // or HashMap() if using a factory


test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length())

test.set('moon', 'silver')

console.log(test.length())



