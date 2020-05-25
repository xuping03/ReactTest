function* g(){
    yield "a";
    yield "b";
    yield "c";
    return "ending";
}

//返回Generate对象
console.log(g());
console.log(g().toString());