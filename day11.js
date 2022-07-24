// 생성자 오버로딩과 팩터리 메서드

export function Set(){
    this.values = {}; // 세트를 보관하는 객체 프로퍼티
    this.n = 0; // 세트에 얼마나 많은 값이 저장되어 있는지를 나타낸다.

    // 하나의 유사배열 객체가 전달되면 그 요소들을 세트에 추가한다.
    // 그렇지 않으면 모든 인자를 세트에 추가한다.
    if(arguments.length == 1 && isArrayLike(arguments[0]))
        this.add.apply(this, arguments[0])
    else if (arguments.length > 0)
        this.add.apply(this, arguments);
}


//펙터리 메서드
Complex.polar = fucntion(r, theta){
    return new Complex(r*Math.cos(theta), r*Math.sin(theta))
}

// 다우ㅡㅁ은 배열을 사용하여 집합을 초기화하는 펙터리 메서드
Set.fromArray = function(a){
    s = new Set(); // 빈 세트를 만든다.
    s.add.apply(s, a); // 배열 a의 요소를 add메서드에 전달한다.
    return s; // 세트를 반환한다.
}

// 보조생성자
function SetFromArray(a) {
    // 인자 a의 요소를 개별 인자로 전달하며,
    // Set()을 함수로 호출하여 새 객체를 초기화한다
    Set.apply(this,a);
}

// 프로토타입을 설정함으로써 SetFromArray가 Set의 인스턴스를 생성하게 한다.
SetFromArray.prototype = Set.prototype;

var s = new SetFromArray([1,2,3]);
console.log(s instanceof Set);
