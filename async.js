// async & await
// clear style of using promise :)

// 1. async
async function fetchUser(){
    // do network request in 10 secs.....

    return 'seunghyo'
}

const user = fetchUser();

console.log(user)

// 2. await
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple(){
    await delay(3000);
    return '사과'
}
async function getBanana(){
    await delay(3000);
    return '바나나'
}

async function pickFruites(){
    const apple = await getApple();
    const banana = await getBanana();
    return apple + banana
}

pickFruites().then(console.log)


// 3. useful Promise APIs

function pickAllFruits(){
    return Promise.all([getApple(), getBanana()]).then(fruits => fruits.join(' + '));
}

pickAllFruits().then(console.log)

// 가장 먼저 값이 반환되는것을 출력
function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}