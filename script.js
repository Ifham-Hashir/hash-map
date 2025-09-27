function Node(value = null, nextNode = null) {
  return {value, nextNode}
}

function HashMap() {
  return {
    loadFactor: 0.75,
    capacity: 16,
    length: 0,
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
      console.log(index)
      this.array[index] = new Node(key=value);
      
      return this.array;
    }
  }
}

let map = new HashMap();

console.log(map.set("i", "ifham"));
console.log(map.array[9].value)