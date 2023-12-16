function customTag(strings, ...values) {
  let result = "";
  console.log(strings);
  console.log(values);
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    console.log(result);
    if (i < values.length) {
      console.log(i);
      console.log(values.length);
      result += values[i];
      console.log(result);
    }
  }
  return result;
}

const name = "John";
const age = 30;

const message = customTag`Hello, my name is ${name} and I am ${age} years old.`;

console.log(message);
