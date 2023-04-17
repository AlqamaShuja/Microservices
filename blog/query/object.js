let student = { name: 'Waqar', age: 24, city: 'Karachi' };

Object.freeze(student);
// Try to Modify existing property
student.name = 'Alqama';
// Try adding new property
student.class = "X";
// Try deleting existing property
delete student.age;

console.log(student);
// Output: { name: 'Waqar', age: 24, city: 'Karachi' }

















let entries = Object.entries(student);
// console.log(entries);

// Output: [ [ 'name', 'Waqar' ], [ 'age', 24 ], [ 'city', 'Karachi' ] ]




















let employee = {
  name: "Alqama",
  show: function() {
    return `Hello, my name is ${this.name}`;
  }
};

let newObject = Object.create(employee, { 
  name: {
    value: "Talha"
  }
});

console.log(newObject.show()); 
// Output: Hello, my name is Alqama
















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





