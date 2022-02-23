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
/**
 * arguments 객체와 매개변수 인자 표현식은 같은 값을 참조하는 다른 표현식이다.
 * 그러므로 아래와 같은게 가능하다.
 * 대신 엄격모드에선 사용이 불가능하다.
 */
function f(x){
    console.log(x)
    arguments[0] = null;
    console.log(x)
}

/**
 * callee, caller 속성
 * Agument 객체는 배열 원소 외에도 callee와 caller 프로퍼티를 정의하고 있다. 엄격모드일때는 읽거나 쓰려고하면 TypeError가 발생하지만
 * 엄격모드가 아닐때 EMCAScript 표준은 callee는 현재 실행되고 있는 함수를 참조한다고 정의한다.
 * 그리고 caller는 비표준이지만, 많은 자바스크립트 구현체에서 보편적으로 구현된 프로퍼티이며, 이 함수를 호출한 함수를 참조한다.
 * caller 프로퍼티는 호출 스택에 접근을 할 수 있또록 해주고, callee 프로퍼티는 이름없는 함수를 재귀적으로 호출하는데 유용하다.
 */

// callee 사용예제
var factorial = function(x){
    if (x <= 1) return 1;
    return x * arguments.callee(x-1);
}

/**
 * 객체의 프로퍼티를 전달인자로 사용
 * 어떤 함수에 세 개 이상의 매개변수가 있다면, 이함수를 호출하는 프로그래머가 인자의 올바른 순서를 기억하기 힘듦.
 * 그래서 아래와같이 사용하면 된다.
 */

// 배열 fromdptj qoduf to로 lenth만큼의 요소를 복사한다.
// from 배열의 from_start 요소로부터 복사를 시작하고, to 배열의 to_start 위치로부터 복사한 값을 써넣는다.
function arraycopy(from, from_start, to, to_start){} // 이런식으로 정의해야함

// 아래와 같이 수정가능
function easycopy(args){
    arraycopy(args.from, args.from_start || 0, args.to, args.to_start || 0 )
}
var a = [1,2,3,4], b = [];
easycopy({from:a, to:b})

/**
 * 나만의 함수 프로퍼티 정의하기
 * 자바스크립트에서 함수는 원시값이 아니지만 특별한 종류의 객체이고, 이는 함수가 프로퍼티를 가질 수 있음을 의미한다.
 * 함수가 여러번 호출되어도 그 값이 유지되는 '정적'인 변수가 필요할 때에는 함수의 프로퍼티를 선언해서 사용하는것이 편리한 경우가 많다.
 * 
 */

// 함수 객체의 카운터 프로퍼티를 초기화한다
// uniqueInteger 함수 정의는 끌어올려져 해석되기 때문에 (hoisted)
// 실제 uniqueInteger함수 정의문 앞에서 이렇게 먼저 할당할 수 있다.
uniqueInteger.counter=0;

// 이 함수는 호출될 때마다 매번 다른 정수를 반환한다.
// 다음 반환값을 기억하기 위해 자신의 프로퍼티를 사용한다.
function uniqueInteger(){
    return uniqueInteger.counter++; // 카운터의 프로퍼티를 반환하고 증가시킨다. 
}

/**
 * extend() 함수, 필요하다면 패치된 버전을 반환함
 * extend 함수를 정의. extend 함수는 두 번ㅉ ㅐ인자와 그 다음에 오는 인자들의 프로퍼티를 첫번ㅉ ㅐ인자로 복사한다.
 * 여기서 IE의 버그에 대응하는데, 만약 o의 프로토타입에 열거할 수 없는 프로퍼티가 있고
 * o에는 그 프로퍼티와 이름이 같은 프로퍼티가 열거 가능하다면 IE의 여러버전에서 for in 루프는 o의 열거 가능한 프로퍼티를 제대로 열거하지 못한다.
 * 즉, toSTring과 같은 프로토타입에서 상속받은 프로퍼티는 우리가 해당 프로퍼티를 명시적으로 검사하지 않는 한 제대로 처리될 수 없다는 뜻이다.
 */

var extend = (function(){ // 이 함수의 반환값을 할당한다.
    // 패치하기 전에 먼저 버그가 존재하는지 검사한다.
    for(var p in {toString:null}){
        // 여기에 이르면 for/in 루프가 제대로 동작하는것이고, extend 함수의 단순한 버전을 반환하면 된다.
        return function extend(o){
            for(var i =0; i< arguments.length; i++){
                var source = arguments[i];
                for(var prop in source) o[prop] = source[prop];
            }
            return o;
        }
    }

    // 여기에 이르면, for in 루프는 테스트 객체의 toString 프로퍼티를 제대로 열거하지 못했다는 뜻이다.
    // 따라서 Object.prototype의 열거할 수 없는 프로퍼티를 명시적으로 테스트하는 extent() 함수를 반환한다.
    return function patch_extend(o){
        for(var i =0; i<arguments.length; i++){
            var source = arguments[i];
            //  열거 가능한 모든 프로퍼티를 복사한다.
            for (var prop in source) o[prop] = source[prop];

            // 그리고 이제 특별한 프로퍼티를 검사한다.
            for (var j =0; j < protoprops.length; j++){
                prop = protoprops[i];
                if (source.hasOwnProperty(prop)) o[prop] = source[prop]
            }
        }
        return o;
    }

    // 이것은 검사해야하는 특별한 프로퍼티의 목록이다.
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];

}());

/**
 * 클로저
 * 함수 객채와 함수의 변수가 해석되는 유효범위(변수 바인딩의 집합)를 아울러 컴퓨터 과학 문헌에서는 클로저라고 한다.
 * 기술적으로 자바스크립트의 모든 함수는 클로저인데, 함수는 객체이고 함수 자신과 관련된 유효범위 체인을 가지고 있기 때문이다.
 * 클로저는 정의된 유효범위와 다른 유효범위 체인에서 사용될 때 더욱 흥미로운데
 * 일반적으로 어떤 함수가 그 함수 내부에서 정의한 중첩함수를 반환하는 것이다. 중첩 함수 클로저와 관련된 여러 프로그래밍 기법이 있고 다른 언어에 비해 
 * 자바스크립트에서는 이러한 기법이 일반적으로 사용된다.
 * 클로저는 처음 접한다면 혼란스러울 수도 있지만 편하게 다룰 수 있을정도로 잘 이해하는것이 좋다.
 * 
 * 이것을 이해하는 첫 걸음은 중첩함수의 어휘적 유효범위 규칙을 다시 살펴보는것.
 * 
 */

var scope = "global scope" // 전역변수

function checkscope(){
    var scope = "local scope" // 지역변수
    function f(){return scope} // 이 유효범위에 있는 값을 반환한다.
    return f();
}

checkscope(); // local scope


// 아래와 같이 바꾼다면 어떻게 될까 ?
function checkscope(){
    var scope = "local scope" // 지역변수
    function f(){return scope} // 이 유효범위에 있는 값을 반환한다.
    return f;
}

checkscope()(); 

/**
 * 어휘적 유효범위의 기본적인 규칙을 기억하라. 자바스크립트 함수는 함수가 정의되었을때의 유효범위 체인을 사용하여 실행된다. 
 * 이것이 클로저의 강력한 특징이다. 클로저는 자신을 정의한 바깥좀 함수에 바인딩된 지역번수(그리고 전달인자)를 포착한다.
 */

/**
 * 클로저 예제
 * 이 함수는 프로퍼티 접근 메서드를 객체 o의 프로퍼티에 특정 이름으로 추가한다.
 * 메서드 이름은 get<name> & set<name>이 된다.
 * 만약 단정(predicate)함수가 제공되면, setter메서드는 전달된 인자를 저장하기 전에 인자 유효성 테스트를 위해 단정 함수를 사용한다.
 * 만약 단정함수가 false를 반환하면, setter메서드는 예외를 발생시킨다.
 * 
 * 주의할것은 getter/setter 메서드가 제어하고 있는 프로퍼티 값이 객체 o에 저장되지 않는것이다. 대신, 그 값은 오직 이 함수의 지역변수로만 저장된다.
 * 또한 게터세터 메서드는 이 함수 내부에 지역적으로 정의되기 때문에 이 함수의 지역변수에 접근할 수 있따. 다시말해 value 변수는 두 접근 메서드 전용이고,
 * 세터 메서드를 통하지 않고서는 설정 및 수정될 수 없다는 뜻이다.
 */

function addPrivateProperty(o, name, predicate) {
    var value; // 이것은 프로퍼티의 값이다.

    // getter 메서드는 단순히 값을 반환한다.
    o["get"+name] = function(){ return value;}
    
    // setter 메서드는 value를 저장하거나, 단정 함수가 값을 적합하지 않다고 판단하면 예외를 반환한다.

    o["set"+name] = function(v){
        if(predicate && !predicate(v)){
            throw Error("set" + name + " : 유효하지 않은 값 : " + v)
        } else {
            value = v;
        }
    }   
}

var o = {};

// 프로퍼티 접근 메서드 getName과 setName을 추가한다.
// 문자열 값만 설정 가능하도록 조치한다.
addPrivateProperty(o, "Name", function(x){return typeof x == "string";});

// o.setName("Frank");
// console.log(o.getName())
// o.setName(90)
