# Dart 开发语言概览

## 一个简单的 Dart 程序

下面的应用程序代码用到了很多 Dart 的基本功能：

```dart
// Define a function.
void printInteger(int aNumber) {
  print('The number is $aNumber.'); // Print to console.
}

// This is where the app starts executing.
void main() {
  var number = 42; // Declare and initialize a variable.
  printInteger(number); // Call a function.
}
```

#### // 注释。

以双斜杠开头的一行语句称为单行注释。Dart 同样支持多行注释和文档注释。

#### void

一种特殊的类型，**表示一个值永远不会被使用**。类似于 main() 和 printInteger() 的函数，以 void 声明的函数返回类型，并不会返回值。

#### int

另一种数据类型，表示一个整型数字。 Dart 中一些其他的内置类型包括 String、List 和 bool。

#### 42

表示一个数字字面量。数字字面量是一种编译时常量。

#### print()

一种便利的将信息输出显示的方式。

#### '...' (或 "...")

表示字符串字面量

#### $variableName (或 ${expression})

表示字符串插值：字符串字面量中包含的变量或表达式。查阅字符串获取更多相关信息。

#### main()

一个特殊且 必须的 顶级函数，Dart 应用程序总是会从该函数开始执行。

#### var

用于定义变量，通过这种方式定义变量不需要指定变量类型。

## 重要概念

当你在学习 Dart 语言时, 应该牢记以下几点：

* 所有变量引用的都是 `对象`，每个对象都是一个 `类` 的实例。数字、函数以及 null 都是对象。所有的类都继承于 `Object` 类。

* 尽管 Dart 是强类型语言，但是在声明变量时指定类型是可选的，**因为 Dart 可以进行类型推断**。在上述代码中，变量 number 的类型被推断为 int 类型。如果想显式地声明一个不确定的类型，可以使用特殊类型 dynamic。

* Dart 支持泛型，比如 List<int>（表示一组由 int 对象组成的列表）或 List<dynamic>（表示一组由任何类型对象组成的列表）。

* Dart 支持顶级函数（例如 main 方法），同时还支持定义属于类或对象的函数（即 静态 和 实例方法）。你还可以在函数中定义函数（嵌套 或 局部函数）。

* Dart 支持顶级 变量，以及定义属于类或对象的变量（静态和实例变量）。实例变量有时称之为域或属性。

* Dart 没有类似于 Java 那样的 public、protected 和 private 成员访问限定符。如果一个标识符以下划线 (_) 开头则表示该标识符在库内是私有的。可以查阅 库和可见性 获取更多相关信息。

* 标识符 可以以字母或者下划线 (_) 开头，其后可跟字符和数字的组合。

* Dart 中 表达式 和 语句 是有区别的，表达式有值而语句没有。比如条件表达式 expression condition ? expr1 : expr2 中含有值 expr1 或 expr2。与 if-else 分支语句相比，if-else 分支语句则没有值。一个语句通常包含一个或多个表达式，但是一个表达式不能只包含一个语句。

* Dart 工具可以显示 警告 和 错误 两种类型的问题。警告表明代码可能有问题但不会阻止其运行。错误分为编译时错误和运行时错误；编译时错误代码无法运行；运行时错误会在代码运行时导致异常。

## 关键字

带有上标的单词可以在必要的情况下作为标识符：

* 带有上标 1 的关键字为 上下文关键字，只有在特定的场景才有意义，它们可以在任何地方作为有效的标识符。

* 带有上标 2 的关键字为 内置标识符，其作用只是在JavaScript代码转为Dart代码时更简单，这些关键字在大多数时候都可以作为有效的标识符，但是它们不能用作类名或者类型名或者作为导入前缀使用。

* 带有上标 3 的关键字为 Dart1.0 发布后用于支持异步相关的特性新加的。不能在由关键字 async、async* 或 sync* 标识的方法体中使用 await 或 yield 作为标识符。

## 变量

```dart
var name = 'Bob';
```
变量仅存储对象的引用。这里名为 name 的变量存储了一个 String 类型对象的引用，“Bob” 则是该对象的值。

name 变量的类型被推断为 String，但是你可以为其指定类型。如果一个对象的引用不局限于单一的类型，可以根据设计指南将其指定为 Object 或 dynamic 类型。

```dart
dynamic name = 'Bob';
```

除此之外你也可以指定类型：

```dart
String name = 'Bob';
```

### 默认值

在 Dart 中，未初始化的变量拥有一个默认的初始化值：null。即便数字也是如此，因为在 Dart 中一切皆为对象，数字也不例外。

```dart
int lineCount;
assert(lineCount == null);
```

> assert() 的调用将会在生产环境的代码中被忽略掉。在开发过程中，assert(condition) 将会在 条件判断 为 false 时抛出一个异常。详情请查阅 Assert。

### Final 和 Const

如果你不想更改一个变量，可以使用关键字 final 或者 const 修饰变量，这两个关键字可以替代 var 关键字或者加在一个具体的类型前。一个 final 变量只可以被赋值一次；一个 const 变量是一个编译时常量（const 变量同时也是 final 的）。顶层的 final 变量或者类的 final 变量在其第一次使用的时候被初始化。

> 实例变量可以是 final 的但不可以是 const 的， final 实例变量必须在构造器开始前被初始化，比如在声明实例变量时初始化，或者作为构造器参数，或者将其置于构造器的 初始化列表中。

### 内置类型

Dart 语言支持下列的类型：

* numbers
* strings
* booleans
* lists (也被称为 arrays)

* sets
* maps
* runes (用于在字符串中表示 Unicode 字符)

* symbols

### 1. Numbers

Dart 支持两种 Number 类型：

#### int

整数值；长度不超过 64位，具体取值范围依赖于不同的平台。在 DartVM 上其取值位于 -263 至 263 - 1 之间。编译成 JavaScript 的 Dart 使用 JavaScript 数字，其允许的取值范围在 -253 至 253 - 1 之间。

#### double

64位的双精度浮点数字，且符合 IEEE 754 标准。

### 2. Strings

Dart 字符串是 UTF-16 编码的字符序列。可以使用单引号或者双引号来创建字符串：

可以在字符串中以 `${表达式}` 的形式使用表达式，如果表达式是一个标识符，可以省略掉 {}。如果表达式的结果为一个对象，则 Dart 会调用该对象的 `toString` 方法来获取一个字符串。

```dart
var s = 'string interpolation';

assert('Dart has $s, which is very handy.' ==
    'Dart has string interpolation, ' +
        'which is very handy.');
assert('That deserves all caps. ' +
        '${s.toUpperCase()} is very handy!' ==
    'That deserves all caps. ' +
        'STRING INTERPOLATION is very handy!');

// 代码中文解释
var s = '字符串插值';

assert('Dart 有$s，使用起来非常方便。' == 'Dart 有字符串插值，使用起来非常方便。');
assert('使用${s.substring(3,5)}表达式也非常方便' == '使用插值表达式也非常方便。');
```

> == 运算符判断两个对象的内容是否一样，如果两个字符串包含一样的字符编码序列，则表示相等。

可以使用 + 运算符将两个字符串连接为一个，也可以将多个字符串挨着放一起变为一个：

可以使用三个单引号或者三个双引号创建多行字符串：

```dart
var s1 = '''
你可以像这样创建多行字符串。
''';

var s2 = """这也是一个多行字符串。""";
```

在字符串前加上 r 作为前缀创建 “raw” 字符串（即不会被做任何处理（比如转义）的字符串）：

```dart
var s = r'In a raw string, not even \n gets special treatment.';

// 代码中文解释
var s = r'在 raw 字符串中，转义字符串 \n 会直接输出 “\n” 而不是转义为换行。';
```

### 3. Booleans

Dart 使用 bool 关键字表示布尔类型，布尔类型只有两个对象 true 和 false，两者都是编译时常量。

Dart 的类型安全不允许你使用类似 if (nonbooleanValue) 或者 assert (nonbooleanValue) 这样的代码检查布尔值。相反，你应该总是显示地检查布尔值，比如像下面的代码这样：

```dart
// 检查是否为空字符串 (Check for an empty string).
var fullName = '';
assert(fullName.isEmpty);

// 检查是否小于等于零。
var hitPoints = 0;
assert(hitPoints <= 0);

// 检查是否为 null。
var unicorn;
assert(unicorn == null);

// 检查是否为 NaN。
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```

### 4. Lists

数组 Array 是几乎所有编程语言中最常见的集合类型，在 Dart 中数组由 List 对象表示。通常称之为 List。

Dart 中 List 字面量看起来与 JavaScript 中数组字面量一样。下面是一个 Dart List 的示例：

```dart
var list = [1, 2, 3];
```

> 这里 Dart 推断出 list 的类型为 List<int>，如果往该数组中添加一个非 int 类型的对象则会报错。你可以阅读 类型推断 获取更多相关信息。

如果想要创建一个编译时常量的 List，在 List 字面量前添加 const 关键字即可：

```dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // This line will cause an error.
```

如果扩展操作符右边可能为 null ，你可以使用 null-aware 扩展操作符（...?）来避免产生异常：

```dart
var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
```

Dart 在 2.3 还同时引入了 Collection If 和 Collection For，在构建集合时，可以使用条件判断（if）和循环（for）。

下面示例是使用 Collection If 来创建一个 List 的示例，它可能包含 3 个或 4 个元素：

```dart
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];
```

下面示例是使用 Collection For 将列表中的元素修改后添加到另一个列表中的示例：

```dart
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i'
];
assert(listOfStrings[1] == '#1');
```

### 5. Sets

在 Dart 中，set 是一组特定元素的无序集合。 Dart 所支持的 set 由 set literals 和 Set 类所提供。

下面是使用 Set 字面量来创建一个 Set 集合的方法：

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

> Dart 推断 halogens 变量是一个 Set<String> 类型的集合，如果往该 Set 中添加类型不正确的对象则会报错。你可以查阅 类型推断 获取更多与之相关的内容。

可以使用在 {} 前加上类型参数的方式创建一个空的 Set，或者将 {} 赋值给一个 Set 类型的变量：

```dart
var names = <String>{}; // 类型+{}的形式创建Set。
// Set<String> names = {}; // 声明类型变量的形式创建 Set (This works, too).
// var names = {}; // 这样的形式将创建一个 Map 而不是 Set (Creates a map, not a set.)
```

> Set 还是 map? Map 字面量语法同 Set 字面量语法非常相似。因为先有的 Map 字面量语法，所以 {} 默认是 Map 类型。如果忘记在 {} 上注释类型或赋值到一个未声明类型的变量上，那么 Dart 会创建一个类型为 Map<dynamic, dynamic> 的对象。

向一个已存在的 Set 中添加项目可以使用 add() 方法或 addAll() 方法：

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
```

使用 .length 可以获取 Set 中元素的数量：

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
```

可以在 Set 字面量前添加 const 关键字创建一个 Set 编译时常量：

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
// constantSet.add('helium'); // This line will cause an error.
```

从 Dart 2.3 开始，Set 可以像 List 一样支持使用扩展操作符（... 和 ...?）以及 Collection If 和 Collection For 操作。你可以查阅 List 扩展操作符 和 List 集合操作符 获取更多相关信息。

你也可以查阅 泛型 以及 Set 获取更多相关信息。

### 6. Maps

通常来说， Map 是用来关联 keys 和 values 的对象。 keys 和 values 可以是任何类型的对象。在一个 Map 对象中一个 key 只能出现一次。但是 value 可以出现多次。 Dart 中 Map 通过 Map 字面量和 Map 类型来实现。通常来说，Map 是一个键值对相关的对象。其中键和值都可以是任何类型的对象。每个 键 只能出现一次但是 值 可以重复出现多次。 Dart 中 Map 提供了 Map 字面量以及 Map 类型两种形式的 Map。

下面是一对使用 Map 字面量创建 Map 的例子：

```dart
// Map<String, String>
var gifts = {
  // 键:    值
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

// Map<int, String>
var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

> Dart 将 gifts 变量的类型推断为 Map<String, String>，而降 nobleGases 的类型推断为 Map<int, String>。如果你向这两个 Map 对象中添加不正确的类型值，将导致运行时异常。你可以阅读 类型推断 获取更多相关信息。

你也可以使用 Map 的构造器创建 Map：

```dart
var gifts = Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

> 这里为什么使用 Map() 而不是使用 new Map() 构造 Map 对象。因为从 Dart2 开始，构造对象的 new 关键字可以被省略掉。你可以查阅 构造函数的使用获取更多相关信息。