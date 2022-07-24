/*
 constructor property
 모든 자바스크립트의 함수는 생성자로 사용될 수 있는데, 함수가 생성자로 호출되려면 prototype 프로퍼티가 있어야한다.
 따라서 모든 자바스크립트 함수에는 자동으로 프로토타입 프로퍼티가 생성된다.
 이 프로토타입의 값은 constructor 프로퍼티 하나만 가진 객체이며, constructor는 열거되지 않으며 값은 해당 함수 객체이다.
*/

var F = function() {} // 이것은 함수 객체이다.
var p = F.prototype; // 이것은 F와 연관이 있는 프로토타입 객체이다.
var c = p.constructor; // 이것은 프로토 타입과 관련된 함수 객체이다.

console.log(c === F) // True 모든 함수에 대해 F.prototype.constructor === F 이다.

/**
 * 자바 스타일 클래스
 * 자바스크립트와 자바가 다른 점 한 가지는 함수가 값이라는 점이고, 메서드와 필드 사이에는 뚜렷한 구분이 없다.
 * 만약 프로퍼티값이 함수라면, 그 프로퍼티는 메서드이고, 함수가 아니라면 보통의 프로퍼티나 필드일 뿐이다. 
 * 그런 차이가 있음에도 자바의 네 가지 멤버유형을 자바스크립트에서도 따라할 수 있다. 
 * 자바스크립트로 클래스를 정의할 때는 세 가지 객체가 관련된다. 그리고 이 세 객체의 프로퍼티는 각각 다른 종류의 멤버 구실을 한다.
 * 
 * 생성자 객체(contructor Obejct)
 * 생성자 함수는 클래스 이름을 정의한다. 이 생성자 객체에 추가한 프로퍼티는 클래스 필드와 클래스 메서드다.
 * 
 * 프로토타입 객체(prototype Object)
 * 이 객체의 프로퍼티는 클래스의 모든 인스턴스에 상속된다. 그리고 그 값이 함수인 프로퍼티는 인스턴스 메서드로 동작한다.
 * 
 * 인스턴스 객체(instance Object)
 * 각 인스턴스는 독립적인 객체이고, 인스턴스에 직접 정의한 프로퍼티는 다른 인스턴스에 공유되지 않는다.
 * 함수가 아닌 프로퍼티는 클래스의 인스턴스 필드로 작동한다.
 * 
 * 자바스크립트에서 클래스를 정의하는 과정은 세 단계의 알고리즘으로 줄일 수 있다.
 * 1. 새 객체의 인스턴스 프로퍼티를 설정하는 생성자 함수 작성
 * 2. 생성자 프로토타입 객체에 인스턴스 메서드 정의
 * 3. 생성자 자체에 클래스 필드, 프로퍼티 정의
 * 
 */

/**
 * Complex.js : 복소수클래스
 * 이 파일은 복소수를 표현하기위한 Complex 클래스를 정의.
 * 복소수는 실수, 허수부로 나뉘며, 허수i 는 -1의 제곱근.
 */

/**
 * 이 생성자 함수는 생성하는 모든 인스턴스에 인스턴스 필드 r과 i를 정의.
 * 이 필드들은 객체의 상태를 실수부와 허수부로 나누어 보관한다,.
 */

function Complex(real, imaginary){
    if (isNaN(real) || isNaN(imaginary)) // 두 인자가 숫자인지 확인
        throw new TypeError(); // 숫자가 아니라면 예외 발생
    this.r = real; // 복소수의 실수부
    this.i = imaginary; // 복소수의 허수
}

/**
 * 인스턴스 메서드는 프로토타입 객체에 함수값을 가진 프로퍼티로 정의 된다.
 * 여기 정의된  메서드들은 모든 인스턴스에 상속되고, 객체가 행동하는 방식을 규정한다.
 * 자바스크립트 인스턴스 메서드는 인스턴스 필드에 접근하기 위해 this 키워드를 사용한다는 점을 유념하자.
 */

// 이 복소수를 다른 복소수와 더하고, 더한 값을 새 Complex 객체로 반환한다.
Complex.prototype.add = function(that){
    return new Complex(this.r + that.r, this.i + that.i);
};

// 이 복소수와 다른 복소수를 곱하고 결과를 새로운 객체로 반환한다.
Complex.prototype.mul = function(that){
    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r );
}

// 복소수의 실제크기를 반환한다. 이는 복소평면의 원점 (0,0)으로부터의 거리로 정의한다.
Complex.prototype.mag = function(){
    return Math.sqrt(this.r * this.r + this.i * this.i)
}

// 이 복소수의 부정값을 반환한다.
Complex.prototype.neg = function() { return new Complex(-this.r, -this.i);};

// Complex 객체를 유용한 문자열로 반환
Complex.prototype.toString = function(){
    return "{" + this.r + ", " +this.i + "}"
};

// 이 Complex 객체가 다른 Complex 객체와 같은 값을 가졌는지 검사.
Complex.prototype.equals = function(that){
    return that != null &&// 반드시 정의되어야 하고 null이어서는 안된다.
        that.constructor === Complex && // Complexㅢ 인스턴스여야 하고
        this.r === that.r && that.i === this.i; // 값이 같아야한다. 
};

/**
 * 클래스 필드( 상수같은 ) 와 클래스 매서드는 생성자의 프로퍼티로 정의된다.
 * 클래스 메서드는 일반적으로 this 키워드를 사용하지 않음을 주의하라.
 * 클래스 메서드는 오직 메서드에 전달된 인자만을 사용하여 수행된다.
 */

// 유용한 몇 가지 복소수를 클래스 필드로 미리 정의한다. 
// 상수임을 나타내도록 이름은 대문자로 되어있다.
// ECMAscript5 에서는 이런 프로퍼티들을 실제로 읽기 전용으로 만들 수 있다.
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

// 이 클래스 메서드는 인스턴스 메서드 toString이 반환된 포맷에 따라 문자열을 분석하고 Complex 객체를 반환한다. 문제가 있따면 TypeError 예외를 발생시킨다.

Complex.parse = function(s){
    try{    // 분석이 성공했딱 ㅗ가정한다.
        var m = Complex._format.exec(s); // 정규표현식 수행
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    } catch(x){
        throw new TypeError("can't parse number")
    }
}

// 앞의 Complex.parse에서 사용하는 Private 클래스 필드다.
// 필드 이름 앞의 밑줄은 이 핃르가 내부적으로만 사용되어야하고
// 공용 API의 일부로 간주되어서는 안된다는 의미이다.
Complex._format = /^\{([^,]+), ([^}]+)}$/;

