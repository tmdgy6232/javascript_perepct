'use strict';

// promise is a Javascript object for asynchronous operation
// state : pending -> fulfilled or rejected
// Producer vs Consumer


// 1. Producer
// when new Promise is created, the executor runs automatically.
// 프로미스가 만들어 지는 순간 매개변수로 보낸 excutor가 실행됨
const promise = new Promise((resolve, reject) => {
    // doing some heavy work(network, read files)
    console.log('doing something...')
    setTimeout(() => {
      resolve('ellie');
    //   reject(new Error('sipal error다'))
    }, 2000);
});


// 2. Consumers: then, catch, finally
promise.then((value) => {
    console.log(value);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    console.log('finall')
})

// 3. Promise chaining

const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve(1)
    }, 1000)
});

fetchNumber
.then(num => num *2)
.then(num => num * 3)
.then(num => {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve(num-1)
        }, 1000);
    });
})
.then(num => console.log(num))

// 4. Error Handling
const getHen = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('닭'), 1000);
    });
}

const getEgg = hen => 
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(`${hen} => 알`)), 1000);
    });

const cook = egg => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 요리다됨`), 1000);
    });


// 한가지의 리턴값만 있는 경우에는 함수만 선언해도 자동적으로 그 함수에 매개변수로 값을 전달해줌.
getHen().then(getEgg).catch(()=>'빵').then(egg => cook(egg)).then(meal => console.log(meal)).catch(console.log);