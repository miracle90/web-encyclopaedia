// 传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件
// 但对于熟悉使用面向对象方式的程序员来讲就有些棘手
// 因为他们用的是基于类的继承并且对象是由类构建出来的
// 从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象的方式
// 使用TypeScript，我们允许开发者现在就使用这些特性
// 并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本
class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// 你会注意到，我们在引用任何一个类成员的时候都用了 this。 它表示我们访问的是类的成员。

// 最后一行，我们使用 new构造了 Greeter类的一个实例。 它会调用之前定义的构造函数，创建一个 Greeter类型的新对象，并执行构造函数初始化它。

/**
 * 1、继承
 * 在TypeScript里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。
 */
class Animal {
  move(distanceInMeters: number = 0) {
      console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
      console.log('Woof! Woof!');
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();


class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// 与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。
// 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。
// 这个是TypeScript强制执行的一条重要规则。

// 这个例子演示了如何在子类里可以重写父类的方法。 Snake类和 Horse类都创建了 move方法，
// 它们重写了从 Animal继承来的 move方法，使得 move方法根据不同的类而具有不同的功能。 
// 注意，即使 tom被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法

/**
 * 2、公共，私有与受保护的修饰符
 */
// 默认为 public
// 在上面的例子里，我们可以自由的访问程序里定义的成员。
// 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 public来做修饰
// 例如，C#要求必须明确地使用 public指定成员是可见的。 在TypeScript里，成员都默认为 public
class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// 理解 private
// 当成员被标记成 private时，它就不能在声明它的类的外部访问。比如：
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}
new Animal("Cat").name; // 错误: 'name' 是私有的.


// 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员，
// 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。

class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
  constructor() { super("Rhino"); }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.

// 理解 protected
// protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。例如：
class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
      super(name)
      this.department = department;
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
// 注意，我们不能在 Person类外使用 name，但是我们仍然可以通过 Employee 类的实例方法访问，因为 Employee 是由 Person派生而来的。

// 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如
class Person {
  protected name: string;
  protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
      super(name);
      this.department = department;
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.

/**
 * 3、readonly修饰符
 * 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
 */
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor (theName: string) {
      this.name = theName;
  }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {
  }
}

/**
 * 4、存取器
 * TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
 * 下面来看如何把一个简单的类改写成使用 get和 set。 首先，我们从一个没有使用存取器的例子开始。
 */

class Employee {
  fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}

/**
 * 5、静态属性
 * 到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员
 * 这些属性存在于类本身上面而不是类的实例上。 在这个例子里，我们使用 static 定义 origin，因为它是所有网格都会用到的属性。
 * 每个实例想要访问这个属性的时候，都要在 origin前面加上类名。如同在实例属性上使用 this.前缀来访问属性一样，这里我们使用 Grid.来访问静态属性。
 */
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

/**
 * 6、抽象类
 * 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。
 * 不同于接口，抽象类可以包含成员的实现细节。
 * abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
 */
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
      console.log('roaming the earch...');
  }
}

// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// 抽象方法的语法与接口方法相似。
// 两者都是定义方法签名但不包含方法体。
// 然而，抽象方法必须包含 abstract 关键字并且可以包含访问修饰符。
abstract class Department {
  constructor(public name: string) {
  }
  printName(): void {
      console.log('Department name: ' + this.name);
  }
  abstract printMeeting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends Department {
  constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
      console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在

/**
 * 7、高级技巧
 */
// 构造函数
// 当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。 首先就是类的 实例的类型。
class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

// 这里，我们写了 let greeter: Greeter，意思是 Greeter类的实例的类型是 Greeter。 这对于用过其它面向对象语言的程序员来讲已经是老习惯了。
let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());

// 我们也创建了一个叫做 构造函数的值。 这个函数会在我们使用 new创建类实例的时候被调用。 下面我们来看看，上面的代码被编译成JavaScript后是什么样子的：

let Greeter = (function () {
  function Greeter(message) {
      this.greeting = message;
  }
  Greeter.prototype.greet = function () {
      return "Hello, " + this.greeting;
  };
  return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet());

// 上面的代码里， let Greeter 将被赋值为构造函数。 当我们调用 new 并执行了这个函数后，便会得到一个类的实例。
// 这个构造函数也包含了类的所有静态属性。
// 换个角度说，我们可以认为类具有 实例部分 与 静态部分 这两个部分。

// 让我们稍微改写一下这个例子，看看它们之间的区别：

class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
      if (this.greeting) {
          return "Hello, " + this.greeting;
      }
      else {
          return Greeter.standardGreeting;
      }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());

// 这个例子里， greeter1与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与我们之前看到的一样。

// 再之后，我们直接使用类。 我们创建了一个叫做 greeterMaker的变量。这个变量保存了这个类或者说保存了类构造函数。
// 然后我们使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。
// 或者更确切的说，"告诉我 Greeter标识符的类型"，也就是构造函数的类型。
// 这个类型包含了类的所有静态成员和构造函数。 之后，就和前面一样，我们在 greeterMaker上使用 new，创建 Greeter的实例。

// 把类当做接口使用
// 如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};