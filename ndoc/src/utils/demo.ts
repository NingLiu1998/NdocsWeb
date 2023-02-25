import { fa } from "element-plus/es/locale";

let str: string = '你好';
let num: number = 100;
let b: boolean = true;
function xFun(): void { };
//object 筛选引用类型 [] {}
//顶级类型: any unknown

//重名会合并，和部分类概念一样，还有个extends 就是继承
interface typesA {
    name: string,
    [propName: string]: any, //可选其他任意属性
    readonly cb: () => boolean
}
let a: typesA = {
    name: '宁骑',
    cb: () => { return true; }
}

interface IFn {
    (name: string): boolean
}
const f1 = (req: string) => { return true }

//数组类型
interface IA {
    name: string,
    age?: number
}
let arr: IA[] = [{ name: "name" }];
let arr3: number[] = [1, 2, 3,];
function arr4(...args: string[]) {
}

//函数类型
interface u {
    name: string, age?: number
}

//函数重载
function ffn(params: u): void
function ffn(params: boolean): void
function ffn(params: any, params2?: string): void {
}
let aa = ffn({ name: 'a' })

//联合类型
let mobile: number | string = "123";
let fn5 = function (type: number | boolean): boolean {
    return !!type;
}
//交叉类型
// interface Iv1 { name: string }
// interface I2 { age: number }

//类型断言
let f210 = function (num: number | string): void {
    console.log((num as string).length);
    console.log((<string>num).length);
}

//类Class
class c1 {
    //构造函数
    constructor(){
        //super 调父类
    }
}






export { str }