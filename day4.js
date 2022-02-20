/**
 * 객체 직렬화 : 객체의 상태를 문자열로 변환하는 과정
 * EMCAscript5에는 객체를 직렬화하는 JSON.stringfy() 메서드와 직렬화한 문자열을 객체로 복원하는 JSON.parse() 메서드를 지원한다.
 * 이 두 함수는 JSON 데이터 교환형식을 사용한다. JSON은 'Javascript OBejct Natation'의 줄임말이며, 자바스크립트 객체 리터럴이나, 배열의 리터럴의 문법과 매우 유사하다.
 * 
 */

/**
 * 객체 메서드
 * Object.create()와 같은 메서드들을 객체메서드라 한다.
 * 
 */

/**
 * 배열
 * 자바스크립트의 배열에는 out of bound에러가 없다.
 * 다른 언어에서처럼 접근하지만 배열[-1.23]등의 인덱스가 양의정수가 아닌 숫자로 접근하게되면
 * 객체의 고유 프로퍼티처럼 작동한다.
 * 모든 배열은 객체이다. 심지어 getter, setter 메서드를 통해 정의된 원소도 가질 수 있따.
 */

a = []
a[1] = 2
a[-1.23] = "test"
// console.log(a.length);
// console.log(a[-1.23]);
// console.log(a)

/**
 * 희소배열
 * 배열에 속한 원소의 위치가 연속적이지 않은 배열을 말한다.
 * 
 */

a = [1,2,3];
a.length = 10;
// console.log(a.length)

a = [1,2,3]
Object.defineProperty(a, "length", {writable:false})
a.length = 10;
// console.log(a.length)

/**
 * 배열 추가하거나 삭제하기
 * 배열은 push 메서드로 추가할 수 있고 a[1]등의 인덱스 지정으로도 추가할 수 있따.
 * 삭제는 delete 메서드 등으로 삭제할 수 있고 이 경우 배열의 길이는 줄어들지 않는다.
 * 
 */

/**
 * 배열 메서드
 * join() - 배열 문자열로 반환 default = ,
 * reverse() - 배열 역정렬
 * sort() - 배열 정렬
 * concat() - 배열 이어붙이기
 * slice() - 배열 자르기
 * splice() - 배열의 삽입과 삭제를 같이 할 수 있다.
 * push() - 배열 원소 추가
 * pop() - 배열의 마지막인덱스 삭제 및 반환
 * unshift() - 배열의 맨 앞요소 추가
 * shift() - 배열의 맨 앞 요소 삭제 및 반환
 * toString() - 문자열로 반환
 * toLocaleString() - toString의 지역화버전
 */

/**
 * ECMAscript 5 배열메서드
 * forEach() - 배열을 순회하는 메서드, 첫 인자로 함수를 받으며 함수를 호출할 때 세가지의 인자를 넘긴다. 첫번째는 값, 두번째는 인덱스, 세번째는 배열 그 자체이다.
 * forEach문은 배열을 전부 다 순회하기 전에는 종료되지 않는다. break가 안먹는다는 말이다. 루프를 중간에 종료시키려면 예외를 발생시켜야 하고, forEach()는 try
 * 반복문 안에서 호출해야한다. 
 * 
 * map() - 각 원소를 메서드의 첫번째 전달인자로 지정한 함수에 전달하고, 함수의 반환값을 배열에 담아 반환한다. map은 새로운 배열을 만들어 반환하기에 반드시 return값을 반환해야한다.
 * 
 * filter() - 배열의 일부분을 반환한다. 이 메서드에 전달하는 함수는 조건자 함수여야한다.
 * 
 * every() - 인자로 전달하는 조건자함수를 원소들이 모두 만족하면 True 반환
 * 
 * some() - 인자로 전달하는 조건자함수를 원소들 중 하나라도 만족하면 True 반환. return값이 정해지면 그자리에서 순회를 중지함.
 * 
 * reduce() - 인자로 주어진 함수를 사용하여 배열의 원소들을 하나의 값으로 결합한다.
 * 
 * reduceRight() - reduce와 방식은 같지만 방향이 다르다. 
 * 
 * indexof() - 인자의 인덱스 위치를 반환한다.
 * lastIndexOf() - 배열의 끝에서부터 검색한다.
 *
 */

// 유사배열객체

/**
 * o가 배열과 유사한 객체인지 판별한다.
 * 문자열과 함수는 length 프로퍼티를 갖고있지만, 이를 typeof를 통해서 걸러낼 수 있다.
 * 클라이언트 측 자바스크립트에서는 DOM의 text node가 length 프로퍼티를 갖고 있고
 * 이를 o.nodeType != 3 으로 걸러낼 수 있다.
 */

function isArrayLike(o){
    if (
        o &&
        typeof o === "object" && // o 는 null이나 undefine이 아니다
        inFinite(o.length) && // o 는 객체로 o 는 유한하다
        o.length >= 0 && // o는 음수가 아니다.
        o.length === Math.floor(o.length) && // o는 정수다
        o.length < 4294967296) return true // 2^32가 성립한다. 그러면 유사배열이다.
    else return false
}