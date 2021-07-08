// 接口
// 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。
// 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements语句。
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);