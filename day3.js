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
// console.log(q.x + q.y)

// 관용적으로 사용하는 코드

var len = o && o.x && 'x가 있따 이기야';
// console.log(len)

// 프로퍼티 삭제는 delete 연산자.
// delete는 객체의 고유 프로퍼티만 삭제할 수 있고 상속받은 프로퍼티는 삭제할 수 없다.


// 프로퍼티 검사하기
// // in, hasOwnProperty(), propertyIsEnumerable()
// console.log("x" in o);
// console.log("toString" in o);
// console.log(o.hasOwnProperty("x"))
// propertyIsEnumerable 메서드는 프로퍼티를 검사하고, 열거할 수 있는 프로퍼티이면 True 아니면 False를 반환하는데, 상속받은것들은 열거할 수 없다.

// 프로퍼티 열거하기
// 보통의 경ㅜ For in 루프로 해결한다. 상속받은 내장메서드는 열거할 수 없지만, 프로퍼티는 열거 가능하다.

var o = {x:1, y:2, z:3}; // 열거할 수 있는 3개의 고유 프로퍼티
// console.log(o.propertyIsEnumerable("toString")) // ==> "false" toString은 열거할 수 없는 프로퍼티이다.
// console.log(o.propertyIsEnumerable("x"))
// for(p in o){
//     console.log(p);
// }

// for in 루프를 통해 열거가 되는것을 막고싶다면 아래의 두가지 방법을 사용하면 된다.

// for (p in o) {
//     if (!o.hasOwnProperty(p)) continue; // 상속받은 프로퍼티는 생략한다.
// }
// for (p in o){
//     if (typeof o[p] == "function") continue; // 해당 프로퍼티가 메서드면 생략한다.
// }


// ex) 객체의 프로퍼티를 열거하는 유용한 함수들.


/**
 * 객체 p의 열거 가능한 프로퍼티들을 객체 o에 복사한 후 반환한다.
 * 만약 객체 o와 p가 같은 이름의 프로퍼티를 갖고있다면, 객체 o의 프로퍼티를 재정의한다.
 * 이 함수는 getter/setter 메서드와 프로퍼티의 속성까진 복사하지 않는다.
 */
function extend(o, p){
    for(prop in p){ // p의 열거 가능한 모든 프로퍼티를 o의 프로퍼티로 추가한다.
        o[prop] = p[prop];
    }
    return o;
}


/**
 * 객체 p의 열거 가능한 프로퍼티들을 객체 o에 복사한 후 반환한다.
 * 만약 객체 o와 p가 같은 이름의 프로퍼티를 갖고있다면, 객체 o의 프로퍼티를 그대로 사용한다.
 * 이 함수는 getter/setter 메서드와 프로퍼티의 속성까진 복사하지 않는다.
 */
function merge(o, p){
    for(prop in p){ // p의 열거 가능한 모든 프로퍼티중에 같은 이름의 프로퍼티를 제외한 나머지 객체 o의 프로퍼티를 추가한다.
        if (o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop]
    }
    return o
}

/**
 * 객체 o의 프로퍼티 중에 객체 p에 없는 프로퍼티들을 제거하고 o를 반환한다.
 */
function restricct(o, p){
    for(prop in o){ // o의 열거 가능한 모든 프로퍼티중에 p에 없는 프로퍼티만 제거
        if(!(prop in p)) delete o[prop];
    }
    return o
}

/**
 * 객체 p의 프로퍼티 중에 객체 o가 가진 프로퍼티와 중복되는 프로퍼티들을 객체 o에서 제거한 후 반환한다.
 */

function subtract(o, p){
    for(prop in p){ // p의 열거가능한 모든 프로퍼티중에 o와 같은 이름의 프로퍼티가 있다면 제거한다. (존재하지 않더라도 삭제연산은 정상적으로 진행된다.)
        delete o[prop] 
    }
    return o;
}

/**
 * 객체 o와 p가 가진 프로퍼티들을 새 객체에 담아 반환한다.
 * 만약 강튼 이름의 프로퍼티의 경우에는 객체 p의 프로퍼티값을 사용한다.
 */

function union(o, p) { return extend(extend({},o), p);}

/**
 * 객체 p의 프로퍼티 중 p에도 있는것들만 새 객체에 담아 반환한다.
 * o와 p의 교집합을 구하는 것과도 같지만,
 * 객체 p의 프로퍼티 값은 버려진다는 차이가 있다.
 */
function intersection(o, p){ return restricct(extend({}, o), p)}

/**
 * 객체 p가 가진 열거 가능한 고유 프로퍼티들의 이름을 배열에 담아 반환한다.
 */

function keys(o){
    if (typeof o !== "object") throw TypeError(); // 반드시 객체 인자가 필요함.
    var result = []; // 반환배열 선언
    for(var prop in o){ // 객체 o의 열거 가능한 프로퍼티들 중에 고유 프로퍼티인 경우에 배열에 프로퍼티 이름을 추가한다.
        if(o.hasOwnProperty(prop)){
            result.push(prop);
        }
    }
    return result
}


/**
 * 프로퍼티 Getter/Setter 
 * 단순히 값을 갖는 '데이터 프로퍼티'와 다르게 '접근자 프로퍼티'라고 한다.
 * 
 */

var p = {
    // 읽기 쓰기 속성을 가진 일반적인 데이터 프로퍼티 x,y
    x : 1.0,
    y : 1.1,
    // r은 getter/setter를 통한 읽기/쓰기가 가능한 접근자 프로퍼티다.
    // 이러한 접근자 메서드 다음에 쉼표를 반드시 추가해야한다.
    get r(){ return Math.sqrt(this.x*this.y + this.y*this.x); },
    set r(newvalue){
        var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    // theta는 읽기전용 프로퍼티이고, getter 함수만 갖는다.
    get theta() {return Math.atan2(this.y, this.x)}
}

// 이 객체는 매번 다른 일련번호를 생성한다.
var serialnum = {
    // 이 데이터 프로퍼티는 다음 일련번호 값을 갖는다ㅡ.
    // 프로퍼티 이름에 붙은 $은 내부(private) 프로퍼티라는 힌트다.
    $n: 0,
    
    // 현재 일련번호 값을 반환한 후, 값을 증가한다.
    get next() {return this.$n++;},

    // 새 일련번호 값을 설정하는데, 이때 기존의 값보다 반드시 커야한다.
    set next(n){
        if (n >= this.$n) this.$n = n;
        else throw "serial number can only be set to a large value";
    }
};

// 이 객체는 무작위 수를 반환하는 접근자 프로퍼티들을 가지고 있다.
// 예를 들어 random.octet는 매번 0~255 사이의 숫자를 반환한다.
var random = {
    get octet(){ return Math.floor(Math.random() * 256)},
    get unit16(){ return Math.floor(Math.random()*65536);},
    get int16(){ return Math.floor(Math.random()*65536)-32768; }

}

// 프로퍼티 속성
// writable, enumerable, configurable
// writable : 프로퍼티 값의 변경 가능 여부를 결정
// enumerable : 프로퍼티가 열거될 수 있는지 여부 결정
// configurable : configurable 속성 뿐 아니라 writable 속성과 enumerable 속성값의 변경 가능 여부를 결정
// 프로퍼티 속성에 대한 디스크립터 객체는 Object.getOwnPropertyDescriptor()를 통해 얻을 수 있따.

var a = Object.getOwnPropertyDescriptor({x:1}, "x");

// 상속받거나, 존재하지 않으면 undefined를 반환한다.
// 메서드 명에서 알 수 있듯이 객체의 고유 프로퍼티에서만 작동한다.

// 프로퍼티 속성을 설정하거나, 임의의 속성으로 새 프로퍼티를 만들기 위해서는 Object.defineProperty를 호출한다.
// 이때 함수인자로 수정할 객체와 추가하거나 변경할 프로퍼티 이름, 프로퍼티 디스크립터 객체를 넘긴다.

var o = {}; // 프로퍼티가 없는 빈 객체를 정의
// 열거할 수 없는 데이터 프로퍼티 x를 정의하고 프로퍼티의 값을 1로 설정한다.
Object.defineProperty(o, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true,
})
// 정의한 프로퍼티를 열거할 수 있는지 검사
// console.log(o.x);
// console.log(Object.keys(o))

// 프로퍼티의 값을 바꿔본다.
Object.defineProperty(o, "x", {writable:false});
o.x = 2; // 단순히 값을 변경하지 못하거나, 엄격모드에서는 TypeError를 발생한다.
// console.log(o.x)
// 여전히 Configurable한 객체이므로 다음과 같이 기본값을 바꿀 수 있따.
Object.defineProperty(o, "x", {value:2})
// console.log(o.x)

// 프로퍼티의 x를 데이터 프로퍼티에서 접근자 프로퍼티로 바꿨다.
Object.defineProperty(o, "x", {get:function(){ return 2}})
// console.log(o.x)

/**
 * 프로퍼티의 속성 복사하기
 * Object.prototype에 열거되지 않는 메서드 extend()를 추가한다.
 * 이 메서드는 호출 시에 인자로 전달된 객체에서 프로퍼티들을 복사함으로써 객체를 확장하낟.
 * 단순 프로퍼티의 값 뿐 아니라 모든 프로퍼티의 속성을 복사한다.
 * 인자로 넘긴 객체가 소유한 모든 고유 프로퍼티는 대상 객체에 같은 이름의 프로퍼티가 존재하지 않는 한 대상객체에 복사된다.
 */

Object.defineProperty(Object.prototype, "extend", { // Object.prototype.extend를 정의한다.
    writable: true,
    enumerable: false, // 열거 불가능하다.
    configurable: true,
    value: function(o){
        // Object.prototype.extend 메서드의 값은 함수이다.
        // 열거되지 않는 프로퍼티들을 포함한 모든 고유 프로퍼티에 대해
        var names = Object.getOwnPropertyNames(o);
        for(var i =0; i <names.length; i++){ // 루프에서 살펴본다.
            // this 객체는 이미 같은 이름의 프로퍼티가 존재하면 건너뛴다.
            if (names[i] in this) continue;
            // 객체 o의 프로퍼티 디스크립터를 가져온다.
            var desc = Object.getOwnPropertyDescriptor(o, names[i]);
            // this 객체에 프로퍼티를 생성할 때 앞에서 가져온 디스크립터 객체를 사용한다.
            Object.defineProperty(this, names[i], desc);
        }
    }
})

// 객체 속성
// 모든 객체는 prototype, class, extensible 속성을 가지고 있다.

/**
 * prototype 속성 
 * 객체의 프로토타입 속성은 프로퍼티를 상속하는 객체를 지정한다.
 * 프로토타입 속성은 객체가 만들어지는 시점에 설정됨.
 * 
 */

var p = {x:1} // 객체 p를 정의함
var o = Object.create(p); // 객체 p를 프로토타입으로 하는 객체 o를 만든다.
p.isPrototypeOf(o); // => True 객체 o는 객체 p를 상속받는다.
Object.prototype.isPrototypeOf(p); // ==> True 객체 psms object.prototpye을 상속받는다.

/**
 * class 속성
 * 객체의 클래스속성은 객체의 타입에 대한 정보를 담고있는 문자열이다.
 * ECMAscript3, 5모두 어떠한 방법으로도 이 속성을 변경할 수 없고, 그 값을 질의하는것도 아주 간접적으로만 가능하다.
 */

// 인자로 객체를 넘기면 클래스 정보를 반환하는 함수
function classof(o){
    if( o === null) return "Null";
    if( o === undefined) return "undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

/**
 * extensible 속성
 * 객체를 확장할 수 있는지 여부에 대한 속성
 * 객체 확장 가부를 확인하려면 Object.isExtensible() 함수에 객체를 넘긴다.
 * 객체를 확장할 수 없도록 설정하려면 Object.preventExtensions()에 해당객체를 넘긴다.
 * 이 후 설정하기 전 상태로 돌아갈 수 없음에 유의하라.
 * 그리고 이 함수는 오직 해당 객체의 extensible 속성값만 변경한ㄴ다는 것에도 유의하자.
 * extensible 속성값이 false인 객체라고 해도, prototype에 새 프로퍼티를 추가하면 그 프로퍼티는 상속된다.
 * 이 속성의 목적은 잠겨있는 객체의 상태를 고정하고, 외부에서 변경하는 것을 막는 것이다.
 * 이 속성은 종종 configurable, writable과 같이 사용되는데 emcascript5 에서는 좀 더 쉽게 다루기위해 몇가지 함수를 정의한다.
 * Object.seal()은 prevbentExtensions과 비슷하게 동작하지만 객체가 가진 모든 고유 프로퍼티를 설정 불가능하게 만든다.
 * 이 메서드는 객체를 '봉인'할 때 사용하는데 객체의 봉인여부는 Object.isSealed메서드를 통해 검사한다.
 * Object.freeze 메서드는 객체를 좀 더 단단히 잠근다. 이 객체는 writable 속성조차 false로 만든다.
 * (하지만 객체가 접근자 프로퍼티로 세터메스드를 갖고있으면 세터메서드를 이용해 프로퍼티의 값은 여전히 변경할 수 있다.)
 * 이것 또한 Object.isFrozen 메서드를 통해 단단히 잠겨있는 객체인지 확인할 수 있다.
 * 위의 두 메서드는 주어진 객체의 고유 프로퍼티에만 영향을 미치고, 객체가 가진 프로토타입 객체에는 영향을 미치지 않는다.
 * 객체를 철저히 잠그고 싶으면, 객체의 프로토타입 체인까지 잠궈야한다.
 */
