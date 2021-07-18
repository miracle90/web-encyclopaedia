// TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。如下面的例子
let x = 3;

// 当候选类型不能使用的时候我们需要明确的指出类型：
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];

// 如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)[]。
