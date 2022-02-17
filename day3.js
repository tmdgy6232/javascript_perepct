// prototype
// 상속받은 객체의 proto type도 가져오는것을 proto type chain이라고 한다.

// 특정 프로토타입을 상속받는 객체 생성

// inherit()은 프로토타입 객체 p의 속성을 상속받아 새롭게 생성된 객체를 반환한다.
// 만일 EOMAScript5 함수인 Object.create()가 정의되어 있다면
// 해당 함수를 사용할 수 있다.
// 하지만 사용할 수 없는 경우에는 예전방법을 사용한다.

function inherit(p){
    if (p == null) throw TypeError(); // p는 null이 아닌 객체여야 한다.
    if(Object.create){ // 만일 object.create를 사용할 수 있으면 이를 사용한다.
        return Object.create(p);
    }

    var t = typeof p;   // 만일 객체의 타입검사가 더 필요한 경우 아래와같이 한다.
    if( t !== "object" && t !== "function") throw TypeError();
    function f() {};    // 임시로 빈 생성자 함수를 정의한다.
    f.prototype = p;    // f의 프로토타입 프로퍼티를 p로 설정한다.
    return new f(); // p를 상속하는 객체를 만들기 위해서는 함수 f를 사용한다. 
}


var o = {};
o.x = 1;
var p = inherit(o);
p.y = 2;
var q = inherit(p);
q.z = 3;

var s = q.toString();
console.log(q.x + q.y)

// 관용적으로 사용하는 코드

var len = o && o.x && 'x가 있따 이기야';
console.log(len)

// 프로퍼티 삭제는 delete 연산자.
// delete는 객체의 고유 프로퍼티만 삭제할 수 있고 상속받은 프로퍼티는 삭제할 수 없다.


