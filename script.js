function Node(key, value, nextNode = null) {
  return {key, value, nextNode}
}

function LinkedList(){
  return {
    head: null,
    tail: null,
    length: 0,
    append(key, value) {
      let newNode = Node(key, value);
      if (this.length === 0){
        this.head = newNode;
      }
      else{
        this.tail.nextNode = newNode;
      }
      this.tail = newNode;
      this.length++;
    },
  }
}

function HashMap() {
  return {
    loadFactor: 0.75,
    capacity: 16,
    size: 0,
    buckets: Array(this.capacity),

    hash(key) {
      let hashCode = 0;
      
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }

      return hashCode;
    },

    set(key, value) {
      let index = this.hash(key);
  
      if(typeof(this.buckets[index]) === "undefined"){
        this.buckets[index] = LinkedList();
        this.buckets[index].append(key,value);
      }
      else{
        let currentNode = this.buckets[index].head;
        while(currentNode !== null){
          if(currentNode.key === key){
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

      if(typeof(this.buckets[index]) !== "undefined"){
        let currentNode = this.buckets[index].head;

        while(currentNode !== null){
          if(currentNode.key === key){
            return currentNode.value;
          }
          currentNode = currentNode.nextNode;
        }
      }

      return null;
    },

    has(key) {
      let index = this.hash(key);

      if(typeof(this.buckets[index]) !== "undefined"){
        let currentNode = this.buckets[index].head;

        while(currentNode !== null){
          if(currentNode.key === key){
            return true;
          }
          currentNode = currentNode.nextNode;
        }
      }

      return false;
    },

    remove(key){
      let index = this.hash(key);

      if(typeof(this.buckets[index]) !== "undefined"){
        let currentNode = this.buckets[index].head;
        let previousNode = currentNode;
        if(this.buckets[index].length === 1){
          this.buckets[index].head = null;
          this.buckets[index].tail = null;
        }
        else{
          while(currentNode !== null){
            if(currentNode.key === key){
              
              return true;
            }
            currentNode = currentNode.nextNode;
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
      this.size = 0;
    },

    keys() {
      let index = 0;
      let keysArray = [];
      while (index < this.buckets.length){
        if(typeof(this.buckets[index]) !== "undefined"){

          let currentNode = this.buckets[index].head;

          while(currentNode !== null){
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

      for(let i = 0; i < keys.length; i++){
        let value = this.get(keys[i]);

        if(value !== null){
          valuesArray.push(value);
        }
      }

      return valuesArray;
    },

    entries() {
      let keys = this.keys();
      let values = this.values();
      let entriesArray = [];
      for (let i = 0; i < keys.length; i++){
        entriesArray.push([keys[i], values[i]]);
      }
      return entriesArray;
    },
  }
}

let map = new HashMap();

map.set("i", "ifham");
map.set("h", "hashir");
map.set("i", "messi")
map.set("y", "yarn")

console.log(map.entries())
console.log(map.buckets)

