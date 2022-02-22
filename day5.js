/**
 * 함수 (Function) : 한 번 정의하면 몇 번이든 실행할 수 있고 호출할 수 있는 자바스크립트 코드블록
 * 
 * 생성자 호출 : 함수나 메서드의 호출 앞에 new 키워드가 있다면, 그것은 생성자 호출이다.
 * 생성자 호출은 일반 함수와 메서드 호출에 비해 매개변수, 호출 컨덱스트와 반환값을 다루는 방식이 다르다.
 * 
 * 간접호출 : 모든자바스크립트 객체와 같이 함수에도 메서드가 있다. 이 메서드 중 call()과 apply는 함수를 간접적으로 호출한다.
 * 
 */

/**
 * 함수 전달인자와 매개변수.
 * 
 * 1. 생략가능한 매개변수 : 본래 정의된 것보다 적은 수의 전달인자로 함수가 호출되면, 나머지 매개변수는 undefined 값으로 설정됨.
 * 
 */

// 객체 o의 열거 가능한 속성에 대해 각 속성으 ㅣ이름을 배열 a에 추가하고 a를 반환한다.
// 만약 a가 생략되면 새 배열을 생성하고 반환한다.
function getPropertyNames(o, a){
    if (a === undefined) a  = []; // 만약 undefined면 새 배열을 사용한다. 이 코드는 a = a || []로 대신하기도 한다.
    for (var property in o) a.push(property);
    return a;
}

var o = {}
// 이 함수는 1개 또는 2개의 전달인자로 호출될 수 있따.
var a = getPropertyNames(o); // 새 배열에 o의 속성을 얻는다.
getPropertyNames(o, a); // p의 속성을 배열 a에 추가한다.

/**
 * 가변길이 전달인자목록 : Arguments 객체
 * 함수가 호출될 때 매개변수보다 더 많은 인자가 전달되면, 매개변수 이름이 붙지 않는 인자값을 직접적으로 참조할 방법은 없다.
 * arguments 객체는 이러한 문제의 해결책이다. 함수 몸체 내에서 arguments 식별자는 해당 호출에 대한 Arguments 객체를 참조한다.
 * Arguments 객체는 유사배열 객체이고, 이름이 아니라 인덱스 숫자를 통해 함수 전달인자를 얻어올 수 있따.
 */

function f(x, y, z){
    // 먼저 올바른 개수의 전달인자를 받았는지 확인한다.
    if (arguments.length != 3) {
        throw TypeError('function f called width' + arguments.length + 'argumentsm but it expects 3 arguments.')
    }
}

// 아래와 같이 응용 가능
function max(/* ...  */){
    var max = Number.NEGATIVE_INFINITY;
    console.log(max)
    for(var i=0; i < arguments.length; i++){
        if (arguments[i] > max) max = arguments[i]
    }
    return max;
}
