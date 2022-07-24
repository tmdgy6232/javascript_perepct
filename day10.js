//private 상태 만들기

function Range(from, to){
    // this 객체의 프로퍼티로 from, to를 저장하지 말것,
    // 대신에 시작점과 끝점을 반환하는 접근자 함수를 정의한다.
    // 인자로 넘어온 from, to 값은 클로저에 저장된다. 
    this.from = function(){return from;}
    this.to = function(){return to;}

}

var r = new Range(1, 10);

console.log(r.from)