// 이 함수는 arguments.callee를 사용하고, 따라서 엄격모드에서는 작동하지 않는다.

function check(args){
    var actual = args.length;
    var expected = args.callee.length;

    if(actual !== expected) throw Error("Expected " + expected + "args; got " + actual);
}

function f(x, y, z){
    check(arguments) // 실제 인자개수와 요구갯수가 같은지 검사한다.
    return x, y, z;
}


// 객체 odml aptjem m을 원본 메서드 호출 전후에
// 로그 메세지를 남기는 버전으로 교체한다.

function trace(o, m){
    var original = o[m]; // 원본 메서드를 클로저에 기억한다.
    o[m] = function (){
        console.log(new Date(), "Entering:", m);    // 메세지 로그
        var result = original.apply(this, arguments); // 원본 메서드 호출
        console.log(new Date(), "Exiting", m); // 메세지 로그
        return result; // result 반환
    }
}

// o의 메서드로서 f를 호출하는 함수를 반환한다. 인자 또한 모두 전달된다.


function bind(f, o){
    if (f.bind) return f.bind(o); // bind 메서드가 있다면 활용
    else return function(){
        return f.apply(o, arguments); // 그렇지 않다면 다음과 같이 바인딩
    }
}

var sum = function(x, y) {return x + y}; // 두 인자의 합을 반환한다.
//sum 과 비슷한 새 함수를 생성하지만, this의 값은 null로 바인딩되고
// 첫번째 인자는 1로 바인딩 된다. 새로운 함수는 단지 하나의 인자만 요구한다.

var succ = sum.bind(null, 1);
succ(2); //3 x는 1에 바인딩되고 y의 인자로 2를 넘긴다.

function f(y,z) { return this.x + y + z}; // 합계를 구하는 다른 함수.
var g = f.bind({x:2}, 2); 
g(3);


