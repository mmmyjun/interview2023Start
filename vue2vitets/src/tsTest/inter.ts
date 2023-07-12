// 同名interface ******************************************************************
interface NameAgeSex {
    name: string,
    age: number,
    f1: (n: string, m: string) => void,
}
interface NameAgeSex {
    sex: boolean,
    f2: (a: number, b: number) => void,
}
let nameAgeSex: NameAgeSex


// 重载~~~
function fun(params: string) : string;
function fun(params: number): number;
function fun(arg: string | number): string | number {
    if (typeof arg === 'number') {
        return arg;
    }
    return arg;
}


// unknown、never、void:unknown, never 都不允许执行变量的方法以及访问内部属性; !!! ******************************************************************
// 当然你也可以声明一个变量为void ,但你只能将它赋值为 undefined 和 null:
let unn:unknown;
unn = 123
// unn++; // xxxxxx
// unn = '111'
// let unNumber = unn as number
let unNumber = <number>unn
++unNumber;
unNumber.toFixed();
let unString = unn as string
let num1: unknown = unn;
// let num2: boolean = unn; // xxxxxx
// unknown 与其它任何类型组成的交叉类型最后都是其它类型

// ==> void
function toCon() { 
    console.log(1)
    return 
}
// ==> never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}


// 泛型和类型断言 ******************************************************************
let aryOfArray: Array<number> // 数组泛型 Array<T> T[]
// let aryOfArray : number[]
// 类型断言 ==>
let someValue = '42342'
let stNumber: number = (<string>someValue).length
// let stNumber:number = (someValue as string).length




// 交叉类型 ******************************************************************

// 联合类型 ******************************************************************
// interface Bird {
//     fly();
//     eat();
// }
// interface Fish {
//     swim();
//     eat();
// }
// function getSmallPet(): Fish | Bird {
// }
// let pet = getSmallPet();
// pet.eat(); // okay
// if ((<Bird>pet).fly) {
//     (<Bird>pet).fly()
// } else {
//     (<Fish>pet).swim()
// }
// function isFish(pet: Fish | Bird): pet is Fish {
//     return (<Fish>pet).swim !== undefined;
// }
// if (isFish(pet)) {
//     pet.swim()
// } else {
//     pet.fly()
// }