let object1 = {
    name: 'Alqama',
    greeting: function(greeting, punctuation) {
      console.log(`${greeting}, my name is ${this.name}${punctuation}`);
    }
};

let object2 = {
    name: 'Ali'
};

object1.greeting.apply(object2, ['Hello', '!']);
// Output: Hello, my name is Ali!

















let obj = { name: "John", age: 30, city: "New York" };
let keys = Object.values(obj);
console.log(keys);
// Output: [ "John", 30, "New York" ]





