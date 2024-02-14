class HashMap {
    constructor(initialCapacity = 10) {
        this.buckets = new Array(initialCapacity);
        this.size = 0;
        this.capacity = initialCapacity;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i) % this.capacity;
        }
     
        return hashCode;
      }

    set(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return bucket[i][1];
                }
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return true;
                }
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }

    keys() {
        const keysArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    keysArray.push(bucket[j][0]);
                }
            }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    valuesArray.push(bucket[j][1]);
                }
            }
        }
        return valuesArray;
    }

    entries() {
        const entriesArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    entriesArray.push([bucket[j][0], bucket[j][1]]);
                }
            }
        }
        return entriesArray;
    }
}