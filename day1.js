// this 활용
arr1 = [1, 2, 3]
arr1.plus = function () {
    t1 = this[1]
    t2 = this[2]
    return t1 + t2
}

//객체를 초기화하기 위해 생성자 함수 정의
// 약간 파이썬 생성자 느낌인듯.
function Point(x, y) {
    this.x = x;
    this.y = y;
}

// new Keyword로 객체를 생성할 때 앞에서 정의한 생성자 함수 사용
var p = new Point(1, 1) // 2차원 좌표 (1,1)

// 생성자 함수 Point의 prototype 객체에 함수를 정의함으로서
// Point 객체에 메서드를 정의한다.

Point.prototype.r = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y) // this는 이 메서드가 호출된 Point 객체를 가리킨다.
}

// Point 객체 p 뿐만 아니라 모든 Point의 객체는 메서드 r을 상속받는다.
console.log(p.r())