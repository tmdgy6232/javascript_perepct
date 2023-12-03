import * as util from "./utils";
import test1 from "./utils";
console.log(util.apiKey);
console.log(util.test);
console.log(test1);

// function
function greet(username, message = "hello") {
    console.log("hello");
    console.log(username);
    console.log(message);
  
    return username + message;
  }
  greet();
  
  // 익명함수(이름이 없는 함수)
  export default function () {
    console.log(hello);
  }
  
  let test = () => console.log("test");
  
  // Object
  const user = {
    name: "max",
    age: 34,
    greet() {
      console.log("hello");
      console.log(this.age);
    },
  };
  console.log(user);
  user.greet();
  
  //class
  
  class User {
    //   constructor(name, age) {
    //     this.name = name;
    //     this.age = age;
    //   }
  
    greet() {
      console.log("hi " + this.name);
    }
  }
  
  const test1 = new User("test", "test11");
  test1.greet();
  console.log(test1);


  // Array

  const hobbies = ["Sports", "Cooking", "Reading"];
console.log(hobbies[1]);

hobbies.push("Working");
console.log(hobbies);

console.log(
  hobbies.findIndex((item) => {
    return typeof item === "string";
  }),
);
const index = hobbies.findIndex((item) => item === "Sports");
console.log("index : " + index);

// map return new Array
console.log(hobbies.map((item) => item + "test"));
// 객체를 반환하고싶으면 중괄호를 소괄호로 감싸줘야한다.
console.log(hobbies.map((item) => ({ key: item })));

  