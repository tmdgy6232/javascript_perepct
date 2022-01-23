// 함수의 유효범위와 hosting

function test(o){
    var i = 0;
    console.log(typeof o)
    if (typeof o == "object"){
        var j=1;

        for(var k=0; k<10; k++){
            console.log(k);
        }
        console.log('zzzz' + k);

    }
    console.log(j)
}
console.log('zzz')
test({n : 1})