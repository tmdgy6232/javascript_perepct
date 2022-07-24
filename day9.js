// 클래스와 자료형

function Set(){ // 생성자 정ㅢ
    this.values = {}; // 세를 보ㅏ하는 this 객체의 프로퍼티
    this.n = 0; // 세트에 저장된 값의 개수
    this.add.apply(this, arguments); // 모든 인자를 values에 추가한다.
}

Set.prototype.add = function(){
    for(var i=0; i<arguments.length; i++){ // 각 인자에 대해 루프 순회
        var val = arguments[i]; // 세트에 추가될 값
        var str = Set.v2s(val); // 해당 값을 문자열로 변환
        if(!this.values.hasOwnProperty(str)){ // 세트에 해당 값이 없담켠
            this.values[str] = val; // 해당값을 매핑
            this.n++; // 세트의 크기를 늘린다.
        }
    }
    return this; // 메서드 체이닝을 지원
}

// 세트로부터 인자를 제거한다
Set.prototype.remove = function(){
    for(var i=0; i<arguments.length; i++){ // 각 인자에 대해 루프 순회
        var str = Set.v2s(arguments[i]); // 문자열로 매핑
        if(this.values.hasOwnProperty(str)){ // 세트에 값이 있으면
            delete this.values[str]; // 값 삭제
            this.n--; // 세트 크기 감소
        }
    }
    return this; // 메서드 체이닝 지원
}

// 만약 세트에 지정된 값이 있다면 True 반환, 없다면 False qksghks

Set.prototype.contains = function(value){
    return this.values.hasOwnProperty(Set.v2s(value))
}

// 세트의 크기 반환
Set.prototype.size = function(){
    return this.n;
}

// 이 내부 함수는 모든 자바스크립트의 값을 고유 문자열로 매핑한다.
Set.v2s = function(val){
    switch(val){
        case undefined: return 'u'; // 하나의 문자코드로 나타낼 수 잇는 특별한 원시형
        case null: return 'n';
        case true: return 't';
        case false: return 'f';
        default: switch(typeof val){
            case 'number': return '#'+val;
            case 'string': return '"' + val;
            default: return '@'+ objectId(val); // 객체와 함수 앞에는 @을 붙인다.
        }
    }

    // 모든 객체에 대한 문자열을 반환한다. 이 함수는 서로 다른 객체에 대해서는 다른 문자열을 반환하고
    // 같은 객체에 대해서는 언제나 같은 문자열을 반환한다.
    // 이를 위해 o 프로퍼티를 만든다.
    // ECMAScript5  프로퍼티는 열거되지 않으며 읽기 전용이 될 수 있다.
    function objectId(o){
        var prop = "|**objectid**|"; // id에 대한 전용 프로퍼티 이름
        if(!o.hasOwnProperty[prop]) // 만약 객체에 id가 없다면
            o[prop] = Set.v2s.next++; // 넥스트를 할당한다.
        return o[prop]; // id를 반환한다.
    }
}

Set.v2s.next = 100; // 초기값 설정

// 예제: 열거형

// 이 함수는 새 열거형을 생성한다. 인자 객체는 열거형의 각 인스턴스에 대한 이름과 값을 지정한다.
// 이 함수의 반환 값은 새 클래스를 구별하는 생성자 함수다.
// 그러나 생성자를 직접 사용하면 예외가 발생한다는 것을 유념하라.
// 열거형의 새 인스턴스를 생성하는 데 직접 생성자 함수를 사용할 수는 없다.
// 반환된 생성자의 프로퍼티에는 생성자가 그 자체를 가리키는 이름과 값 배열 그리고 열거함수 foreach()가 있다.
function enumeration(namesToValues){
    // 이것은 더미 생성자 함수이고, 이 함수가 반환값이 된다.
    var enumeration = function(){
        throw "열거형은 인스턴스화 할 수 없음ㅋ"
    }
    // 이 열거값은 proto 객체를 상속한다.
    var proto = enumeration.prototype = {
        constructor: enumeration, // 형식 구별을 위해 지정
        toString: function(){ return this.name;}, // name 반환
        valueOf: function(){ return this.value;}, // value 반환
        toJSON: function(){return this.name;} // 직렬화를 위한 기능

    }
    enumeration.values = []; // 열거값을 저장하는 배열

    // 이제 새로운 형식에 대한 인스턴스를 만든다.
    for(name in namesToValues){ // 각 값을 순회

    }
}

