import { Set } from "./day11";
// sub class
// 메서드체이닝, 생성자체이닝
// 클래스 계층구조를 사용할때는 추상클래스를 정의하는것이 좋ㅇ츨 때가 잇음.
// 자바스크립트에서 서브클래스를 만드는 핵심은 프로토타입 객체를 적절하게 초기화하는 것이다.

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

function extend(o, p){
    for(prop in p){ // p의 열거 가능한 모든 프로퍼티를 o의 프로퍼티로 추가한다.
        o[prop] = p[prop];
    }
    return o;
}
// 간단한 서브클래스를 생성하는 함수,  // 슈퍼클래스의 생성자// 새 클래스의 생성자 // 인스턴스 메서드 : prototype으로 복사됨 // 클래스 프로퍼티: 생성자로 복사됨
function defineSubClass(superClass, constructor, methods, statics)
{
    // 서브 클래스의 프로토타입 객체 설정
    constructor.prototype = inherit(superClass.prototype);
    constructor.prototype.constructor = constructor;

    // 일반적인 클래스로 다룰 수 있도록 메서드와 정적 값들을 복사한다.
    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);
    // 클래스를 반환
    return constructor
}

// 또한 슈퍼클래스의 생성자를 메서드로 서브클래스를 생성할 수 있다.
Function.prototype.extend = function(constructor, methods, statics){
    return defineSubClass(this, constructor, methods, statics)
}

function test(){
    this.t = 2
    this.r = 3
}

function test2(){
    this.a = 4
}

var a = test2.extend(new test(), null, null)
console.log(a.t)
console.log(a.a)
console.log(typeof a.constructor)

// 생성자함수
function SingletonSet(member){
    this.member = member // 이 세트의 단일 멤버를 저장한다.
}

// Set의 프로토타입을 상속한 프로토 타입 객체를 생성한다.
SingletonSet.prototype = inherit(Set.prototype)

// 프로토타입에 프로퍼티 추가
extend(SingletonSet.prototype, {
    // constructor 프로퍼티를 SingletonSet에 적합하게 설정한다.
    constructor: SingletonSet,
    // 이 세트는 읽기 전용이다. add와 remove는 에러를 발생시킨다.
    add : function(){throw "read-only set";},
    remove: function(){throw "read-only set";},
    //SingletonSet의 크기는 언제나 1이다
    size: function(){return 1;},
    // 멤버가 하나만 있기 때문에 함수를 한 번만 호출하면 된다.
    foreach: function(f, context){
        f.call(context, this.member)
    },
    // contain 메서드는 간단하다. 한가지 값에 대해서만 참이다.
    contains: function(x){ return x === this.member;}
})

/**
 * NonnullSet은 null과 undefined를 멤버로 허용하지 않는 set의 서브클래스이다.
 */

function Nonnullset(){
    // nonnullset을 위한 별도의 동작 없이, 단지 슈퍼클래스의 생성자를 체이닝만 한다.
    // 이 생성자 호출에 의해 생성된 객체를 초기화하기 위해
    // 슈퍼클래스의 생성자를 일반 함수처럼 호출한다.
    Set.apply(this, arguments)
}
// Set의 서브클래스인 nonnullset을 만든다.
Nonnullset.prototype = inherit(Set.prototype)
Nonnullset.prototype.constructor = Nonnullset;

// null과 undefined를 제외하려면 add메서드만 재정의하면 된다.
Nonnullset.prototype.add = function(){
    // 인자가 null 또는 undefined인지 여부를 검사한다.
    for(var i =0; i < arguments.length; i++){
        if(arguments[i] == null){
            throw new Error("null, undefined는 추가할 수 없습니다.")
        }
    }
    // 실제 멤버 삽입은 슈퍼클래스의 메서드를 체이닝하여 수행
    return Set.prototype.add.apply(this, arguments);
}

/**
 * 이 함수는 Set 서브클래스의 add메서드에 지정된 필터를 적용하여
 * 재정의된 클래스를 반환한다.
 */
function filterSetSubClass(superClass, filter){
    var constructor = function(){ // subclass 생성자.
        superClass.apply(this, arguments); // 슈퍼클래스 생성자를 체이닝한다.
    }
    var proto = constructor.prototype = inherit(superClass.prototype);
    proto.constructor = constructor;
    proto.add = function(){
        // 값을 추가하기 전에 모든 인자에 대해 필터 적용
        for(var i =0; i<arguments.length; i++){
            var v = arguments[i];
            if(filter(v)) throw("value rejected by filter")
        }
        // super클래스의 add 메서드에 체이닝한다.
        superClass.prototype.add.apply(this,arguments);   
    };
    return constructor;
}

