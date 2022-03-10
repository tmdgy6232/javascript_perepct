var scope = 'global';
var test = 'test var'
function constructFunction(){
    var scope = 'local';
    return new Function("return 'test'"); // 지역 유효범위를 포착하지 않는다.
}
constructFunction()();

/**
 * Callable Object 호출 가능한 객체
 * 모든 함수는 호출 가능 객체지만, 호출 가능 객체가 모두 함수는 아니다.
 * 
 */

function isFunction(x){
    // console.log(Object.prototype.toString.call(x))
    return Object.prototype.toString.call(x) === "[object Function]"
}

// console.log(isFunction(constructFunction()))

/**
 * 함수형 프로그래밍
 * 자바스크립트는 리스프나 헤스켈 같은 함수형 프로그래밍 언어는 아니지만, 자바스크립트가 함수를 객체로 취급할 수 있다는 것은,
 * 자바스크립트도 함수형 프로그래밍 기법을 사용할 수 있다는 것이다.
 */

// 함수로 배열 처리하기

var data = [1, 1, 3, 5, 5]

// mean은 배열 요소의 합을 배열 요소의 갯수로 나눈 값이다.
var total = 0;
for(var i=0; i <data.length; i++) total += data[i];
var mean = total/data.length;

// 표준편차를 계산하기 위해서 먼저 각 요소의 편차에 대한 제곱을 모두 더한다.

total = 0;
for(var i = 0; i < data.length; i++){
    var deviation = data[i] - mean;
    total += deviation * deviation;
}

var sttdev = Math.sqrt(total/(data.length-1)); // 표준편차는 2이다.

/**
 * 배열 객체의 map과 reduce를 사용하면 함수형 스타일로 간단하게 처리할 수 있따. 
 */

// 먼저 간단한 두 함수를 정의
var sum = function(x,y) {return x+y}
var square = function(x) {return x*x}

// 평균의 표준편차를 구하고자 array메서드에 앞에서 정의한 두 함수를 적용
var data = [1, 1, 3, 5, 5]
var mean = data.reduce(sum)/ data.length;
var deviations = data.map(function(x) {return x-mean});
var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1))

// 만약 ECMAScript3를 사용중이라 별도의 내장메서드가 없다면 정의해서 사용한다.

// 배열 a의 각 요소에 대해 함수 f를 호출하고 results 배열을 반환
var map = Array.prototype.map ? function(a, f){return a.map(f)} : function(a, f){
    var result = []
    for (var i=0; i < a.length; i++){
        if (i in a) result[i] = f.call(null, a[i], i, a)
    }
    return result
}

/**
 * 고차함수
 * 고차함수란 하나이상의 함수를 인자로 받고 새 함수를 반환하는 함수이다.
 */

// 이 함수는 자신의 인자를 f에 전달하고, f의 반환값에 대해 논리적 부정을 계산하는 함수를 반환한다.
function not(f){
    return function(){ // 새로운 함수 반환
        var result = f.apply(this, arguments) // f 호출
        return !result;
    }
}

var even = function(x) {return x % 2 == 0} // 짝수여부를 판단하는 함수.
var odd = not(even); // 논리적 부정을 수행하는 함수 odd


/**
 * 메모이제이션
 */

//함수 f의 결과를 저장한 버전을 반환한다.
// 함수 f의 모든 인자가 서로 구분할 수 있는 문자열 표현일 때만 작동한다.

function memoize(f){
    var cache = {}; // 결과 값을 캐시하는 클로저 상의 객체.
    console.log(cache)
    return function() {
        // 캐시키로 사용하기위해 인자들을 조합하여 하나의 문자열로 만든다.
        var key = arguments.length + Array.prototype.join.call(arguments, ", ");
        if(key in cache) return cache[key]
        else return cache[key] = f.apply(this, arguments)
    }
}

/**
 * memoize함수는 캐시값을 저장하는데 사용할 객체를 생성하고, memoize으 ㅣ지역변수에 이 객체를 할당한다. 
 */

// 유클리디안 알고리즘을 사용하여 두 정수의 최대공약수를 반환

function gcd(a,b){ // a와 b에 대한 형식검사 생략
    var t;  // 값을 바꾸기 위한 임시변수
    if(a < b) t=b, b=a, a=t; // a >= b를 보장
    while(b != 0) t=b, b=a&b, a=t; // 최대공약수에 대한 유클리디안 알고리즘
    return a
}

var gcdmemo = memoize(gcd)

console.log(gcdmemo(85, 187))
gcdmemo(1, 5)