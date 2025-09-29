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
    array: Array(this.capacity),

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
  
      if(typeof(this.array[index]) === "undefined"){
        this.array[index] = LinkedList();
        this.array[index].append(key,value);
      }
      else{
        let currentNode = this.array[index].head;
        while(currentNode !== null){
          if(currentNode.key === key){
            currentNode.value = value;
            return;
          }
          currentNode = currentNode.nextNode;
        }
        this.array[index].append(key, value);
      }
      
      this.size++;
    },

    get(key) {

      let index = this.hash(key);

      if(typeof(this.array[index]) !== "undefined"){
        let currentNode = this.array[index].head;

        while(currentNode !== null){
          if(currentNode.key === key){
            return currentNode.value;
          }
          currentNode = currentNode.nextNode;
        }
      }

      return null;
    },

  }
}

let map = new HashMap();

map.set("i", "ifham");
map.set("h", "hashir");
map.set("i", "messi")
map.set("y", "yarn")
// console.log(map.array);
console.log(map.get("k"))
