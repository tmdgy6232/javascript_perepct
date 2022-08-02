'use strict';

// Javascript classses
// - introduced in ES6
// syntactical sugar over prototype-based inheritance


// 1. class declarations
class Person {
    //constructor
    constructor(name, age){
        //fields
        this.name = name;
        this.age = age;
    }
    
    //method
    speak() {
        console.log(`${this.name}: hello !`);
    }
}

const seunghyo = new Person('seunghyo', 30);
seunghyo.speak()

// getter Setter
class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get age(){
        return this._age;
    }
    set age(value){
        this._age = value < 0 ? 0 : value;
    }
}

const user1 = new User('Steve', 'job', -1);
console.log(user1.age);

class Experiment {
    static publisher = 'dream coding'
    publicFiled = 2;
    #privateField = 0;

    static printPublisher(){
        console.log(Experiment.publisher);
    }
}

