function node(key,value) {
  return {
    key,
    value,
    nextNode: null,
  }
}

function hashMap(){
  return {
    buckets: new Array(16).fill(null),
    loadFactor: 0.75,
    capacity: 16,
    size: 0,
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }

      return hashCode;
    },
    set(key, value){
      const index = this.hash(key);
      if (this.buckets[index] === null){
        this.buckets[index] = node(key, value)
        this.size++;
        if (this.size / this.capacity > this.loadFactor){
          this.grow();
        }
      }
      else{
        let currentNode = this.buckets[index];
        while(currentNode !== null){
          if(currentNode.key === key){
            currentNode.value = value;
            return;
          }
          if(currentNode.nextNode === null){
            currentNode.nextNode = node(key, value);
            this.size++;
            if (this.size / this.capacity > this.loadFactor){
              this.grow();
            }
            return;
          }
          currentNode = currentNode.nextNode;
        } 
      }
    },
    get(key){
      const index = this.hash(key);
      if(this.buckets[index] !== null){
        let currentNode = this.buckets[index];
        while(currentNode !== null){
          if(currentNode.key === key){
              return currentNode.value;
            }
          currentNode = currentNode.nextNode;
        }
      }
      return null;
    },
    has(key){
      const index = this.hash(key);
      if(this.buckets[index] !== null){
        let currentNode = this.buckets[index];
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
      const index = this.hash(key);
      if (this.buckets[index] === null){
        return false;
      }
      let currentNode = this.buckets[index];
      let previousNode = null;
      while(currentNode !== null){
        if(currentNode.key === key){
          if(previousNode === null){
            this.buckets[index] = currentNode.nextNode;
          }
          else {
            previousNode.nextNode = currentNode.nextNode;
          }
          this.size--;
          return true;
        }
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      return false;
    },
    length(){
      return this.size;
    },
    clear(){
      this.buckets.fill(null);
      this.size = 0;
    },
    keys(){
      let keysArray = []
      for(let i = 0; i < this.buckets.length; i++){
        if(this.buckets[i] !== null){
          let currentNode = this.buckets[i];
          while(currentNode !== null){
            keysArray.push(currentNode.key);
            currentNode = currentNode.nextNode;
          }
        }
      }
      return keysArray;
    },
    values(){
      let valuesArray = []
      for(let i = 0; i < this.buckets.length; i++){
        if(this.buckets[i] !== null){
          let currentNode = this.buckets[i];
          while(currentNode !== null){
            valuesArray.push(currentNode.value);
            currentNode = currentNode.nextNode;
          }
        }
      }
      return valuesArray;
    },
    entries(){
      let entriesArray = []
      for(let i = 0; i < this.buckets.length; i++){
        if(this.buckets[i] !== null){
          let currentNode = this.buckets[i];
          while(currentNode !== null){
            entriesArray.push([currentNode.key, currentNode.value]);
            currentNode = currentNode.nextNode;
          }
        }
      }
      return entriesArray;
    },
    grow(){
      let tempBuckets = this.entries();
      this.capacity *= 2;
      this.buckets = new Array(this.capacity).fill(null);
      this.size = 0;
      for(const [key, value] of tempBuckets){
        this.set(key,value);
      }

    }
  }
}

const test = hashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set("apple", "green")
test.set("dog", "superdog")
test.set('moon', 'silver')




console.log(test.keys())
console.log(test.values())
console.log(test.entries())

console.log(test.length())
console.log(test.capacity)

console.log(test.length()/test.capacity)
