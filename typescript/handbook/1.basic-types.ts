/**
 * 1、布尔值
 */
let isDone: boolean = false;

/**
 * 2、数字
 * 和JavaScript一样，TypeScript里的所有数字都是浮点数，这些浮点数的类型是 number
 * 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量
 */
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

/**
 * 3、字符串
 */
let name1: string = "bob";
name1 = "smith";

// 还可以使用模版字符串，它可以定义多行文本和内嵌表达式
let name2: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name2 }.

I'll be ${ age + 1 } years old next month.`;

/**
 * 4、数组
 */
// TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：
let list1: number[] = [1, 2, 3];

// 第二种方式是使用数组泛型，Array<元素类型>
let list2: Array<number> = [1, 2, 3];

/**
 * 5、元组 Tuple
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
 */
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
// x = [10, 'hello']; // Error

/**
 * 5、枚举
 * enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
 */
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
enum Color1 {Red = 1, Green, Blue}
let c1: Color1 = Color1.Green;

// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
enum Color2 {Red = 1, Green, Blue}
let colorName: string = Color2[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2

/**
 * 6、Any
 * 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。
 * 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。
 * 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。
 * 那么我们可以使用 any类型来标记这些变量：
 */
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// 当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：
let list: any[] = [1, true, "free"];
list[1] = 100;

/**
 * 7、Void
 * 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
 * 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
 */
function warnUser(): void {
  console.log("This is my warning message");
}

let unusable: void = undefined;


/**
 * 8、Null 和 Undefined
 * TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。
 * 和 void相似，它们的本身的类型用处不是很大
 * 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
 */
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;


/**
 * 9、Never
 * never类型表示的是那些永不存在的值的类型。
 * 例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
 * 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时
 */

// never类型是任何类型的子类型，也可以赋值给任何类型
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
// 即使 any也不可以赋值给never

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

/**
 * 10、Object
 * object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
 */

// 使用object类型，就可以更好的表示像Object.create这样的API。例如
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK
create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error

/**
 * 11、类型断言
 */

// 类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 另一个为as语法：
let someValue1: any = "this is a string";
let strLength1: number = (someValue1 as string).length;

// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
