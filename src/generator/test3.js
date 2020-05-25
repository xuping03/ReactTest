function* say(){
    let a=yield "1";
    console.log(a);
    let b=yield "2";
    console.log(b);
}
let it=say();//返回迭代器

console.log(it.next());
console.log(it.next("我是被传进来的1"));
console.log(it.next("我是被传进来的2"));