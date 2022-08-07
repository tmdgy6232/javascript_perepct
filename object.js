const ellie = { name : 'test'}
const obj1 = {};
const obj2 = new Object();

// object는 key와 value의 집합체이다. 


//2. computed properties
console.log(ellie['name'])

// delete property
delete ellie.name;

//3. property shorthand
function makePerson(name, age){
    return {
        name, age
    }
}

const test = makePerson('seunghyo', 4)
console.log(test.name)

// in operator

console.log('name' in ellie)