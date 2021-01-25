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

## 内置类型

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

在一个 Map 字面量前添加 const 关键字可以创建一个 Map 编译时常量：

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // This line will cause an error.
```

### 7. Runes 与 grapheme clusters

在 Dart 中，runes 公开了字符串的 Unicode 码位。从 Dart 2.6 开始，使用 characters 包来访问或者操作用户感知的字符，也被称为 Unicode (扩展) grapheme clusters。

Unicode 编码为每一个字母、数字和符号都定义了一个唯一的数值。因为 Dart 中的字符串是一个 UTF-16 的字符序列，所以如果想要表示 32 位的 Unicode 数值则需要一种特殊的语法。

通常使用 \uXXXX 来表示 Unicode 字符， XXXX 是一个四位数的 16 进制数字。例如心形字符（♥）的 Unicode 为 \u2665。对于不是四位数的 16 进制数字，需要使用大括号将其括起来。例如大笑的 emoji 表情（😆）的 Unicode 为 \u{1f600}。

如果你需要读写单个 Unicode 字符，可以使用 characters 包中定义的 characters getter。它将返回 Characters 作为一系列 grapheme clusters 的字符串。下面是使用 characters API 的样例：

```dart
import 'package:characters/characters.dart';
...
var hi = 'Hi 🇩🇰';
print(hi);
print('The end of the string: ${hi.substring(hi.length - 1)}');
print('The last character: ${hi.characters.last}\n');
```

### 8. Symbols

Symbol 表示 Dart 中声明的操作符或者标识符，该类型的对象几乎不会被使用到，但是如果需要按名称引用它们的 API 时就非常有用。因为代码压缩后会改变这些符号的名称但不会改变具体的符号。

可以使用在标识符前加 # 前缀来获取 Symbol：

```dart
#radix
#bar
```

Symbol 字面量是编译时常量。

## Functions

Dart 是一种真正面向对象的语言，所以即便函数也是对象并且类型为 Function，这意味着函数可以被赋值给变量或者作为其它函数的参数。你也可以像调用函数一样调用 Dart 类的实例。详情请查阅 可调用的类。

下面是定义一个函数的例子：

```dart
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

如果函数体内只包含一个表达式，你可以使用简写语法：

```dart
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

语法 => 表达式 是 { return 表达式; } 的简写， => 有时也称之为胖箭头语法。

### 1 Parameters

函数可以有两种形式的参数：必要参数 和 可选参数。必要参数定义在参数列表前面，可选参数则定义在必要参数后面。可选参数可以是 命名的 或 位置的。

虽然命名参数是可选参数的一种类型，但是你仍然可以使用 @required 注解来标识一个命名参数是必须的参数，此时调用者则必须为该参数提供一个值。例如：

```dart
const Scrollbar({Key key, @required Widget child})
```

如果调用者想要通过 Scrollbar 的构造函数构造一个 Scrollbar 对象而不提供 child 参数，则会导致编译错误。

@required 注解定义在 meta package 中，可以直接导入 package:meta/meta.dart 包使用。

#### 可选的位置参数

使用 [] 将一系列参数包裹起来作为位置参数：

```dart
String say(String from, String msg, [String device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

#### 默认参数值

可以用 = 为函数的命名和位置参数定义默认值，默认值必须为编译时常量，没有指定默认值的情况下默认值为 null。

下面是设置可选参数默认值示例：

```dart
/// 设置 [bold] 和 [hidden] 标识……
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold = false, bool hidden = false}) {...}

// bold 的值将为 true；而 hidden 将为 false。
enableFlags(bold: true);
```

> 在老版本的 Dart 代码中会使用冒号（:）而不是 = 来设置命名参数的默认值。原因在于刚开始的时候命名参数只支持 :。不过现在这个支持已经过时，所以我们建议你现在都 使用 = 来指定默认值。

下一个示例将向你展示如何为位置参数设置默认值：

```dart
String say(String from, String msg,
    [String device = 'carrier pigeon']) {
  var result = '$from says $msg with a $device';
  return result;
}

assert(say('Bob', 'Howdy') ==
    'Bob says Howdy with a carrier pigeon');
```

List 或 Map 同样也可以作为默认值。下面的示例定义了一个名为 doStuff() 的函数，并为其名为 list 和 gifts 的参数指定了一个 List 类型的值和 Map 类型的值。

```dart
void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list:  $list');
  print('gifts: $gifts');
}
```

### main() 函数

每个 Dart 程序都必须有一个 main() 顶级函数作为程序的入口，main() 函数返回值为 void 并且有一个 List<String> 类型的可选参数。

下面是一个 Web 应用的 main() 函数示例：

```dart
void main() {
  querySelector('#sample_text_id')
    ..text = 'Click me!'
    ..onClick.listen(reverseText);
}
```

> 上述代码中的 .. 语法称之为 级联调用。使用级联访问可以在一个对象上执行多个操作。

下面是使用命令行访问带参数的 main() 函数示例：

```dart
// 使用命令 dart args.dart 1 test 运行该应用
void main(List<String> arguments) {
  print(arguments);

  assert(arguments.length == 2);
  assert(int.parse(arguments[0]) == 1);
  assert(arguments[1] == 'test');
}
```

### 函数作为一级对象

可以将函数作为参数传递给另一个函数。例如：

```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// 将 printElement 函数作为参数传递。
list.forEach(printElement);
```

### 匿名函数

大多数方法都是有名字的，比如 main() 或 printElement()。你可以创建一个没有名字的方法，称之为 匿名函数，或 Lambda表达式 或 Closure闭包。你可以将匿名方法赋值给一个变量然后使用它，比如将该变量添加到集合或从中删除。

匿名方法看起来与命名方法类似，在括号之间可以定义参数，参数之间用逗号分割。

后面大括号中的内容则为函数体：

([[类型] 参数[, …]]) {
  函数体;
};

下面代码定义了只有一个参数 item 且没有参数类型的匿名方法。List 中的每个元素都会调用这个函数，打印元素位置和值的字符串：

```dart
var list = ['apples', 'bananas', 'oranges'];
list.forEach((item) {
  print('${list.indexOf(item)}: $item');
});
```

### 词法作用域

Dart 是词法有作用域语言，变量的作用域在写代码的时候就确定了，大括号内定义的变量只能在大括号内访问，与 Java 类似。

下面是一个嵌套函数中变量在多个作用域中的示例：

```dart
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
```

### 词法闭包

闭包 即一个函数对象，即使函数对象的调用在它原始作用域之外，依然能够访问在它词法作用域内的变量。

函数可以封闭定义到它作用域内的变量。接下来的示例中，函数 makeAdder() 捕获了变量 addBy。无论函数在什么时候返回，它都可以使用捕获的 addBy 变量。

```dart
/// 返回一个将 [addBy] 添加到该函数参数的函数。
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

void main() {
  // 生成加 2 的函数。
  var add2 = makeAdder(2);

  // 生成加 4 的函数。
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```

### 测试函数是否相等

下面是顶级函数，静态方法和示例方法相等性的测试示例：

```dart
void foo() {} // 定义顶层函数 (A top-level function)

class A {
  static void bar() {} // 定义静态方法
  void baz() {} // 定义实例方法
}

void main() {
  var x;

  // 比较顶层函数是否相等。
  x = foo;
  assert(foo == x);

  // 比较静态方法是否相等。
  x = A.bar;
  assert(A.bar == x);

  // 比较实例方法是否相等。
  var v = A(); // A 的实例 #1
  var w = A(); // A 的实例 #2
  var y = w;
  x = w.baz;

  // 这两个闭包引用了相同的实例对象，因此它们相等。
  assert(y.baz == x);

  // 这两个闭包引用了不同的实例对象，因此它们不相等。
  assert(v.baz != w.baz);
}
```

### 返回值

所有的函数都有返回值。没有显示返回语句的函数最后一行默认为执行 return null;

## 运算符

## 流程控制语句

## 异常

## 类

## 泛型

如果你查看数组的 API 文档，你会发现数组 List 的实际类型为 List<E>。 <…> 符号表示数组是一个 泛型（或 参数化类型） 通常 使用一个字母来代表类型参数，比如E、T、S、K 和 V 等等。

### 为什么使用泛型？

泛型常用于需要要求类型安全的情况，但是它也会对代码运行有好处：

* 适当地指定泛型可以更好地帮助代码生成。
* 使用泛型可以减少代码重复。

比如你想声明一个只能包含 String 类型的数组，你可以将该数组声明为 List<String>（读作“字符串类型的 list”），这样的话就可以很容易避免因为在该数组放入非 String 类变量而导致的诸多问题，同时编译器以及其他阅读代码的人都可以很容易地发现并定位问题：

```dart
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error
```

另一个使用泛型的原因是可以减少重复代码。泛型可以让你在多个不同类型实现之间共享同一个接口声明，比如下面的例子中声明了一个类用于缓存对象的接口：

```dart
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}
```

不久后你可能又会想专门为 String 类对象做一个缓存，于是又有了专门为 String 做缓存的类：

```dart
abstract class StringCache {
  String getByKey(String key);
  void setByKey(String key, String value);
}
```

如果过段时间你又想为数字类型也创建一个类，那么就会有很多诸如此类的代码……

这时候可以考虑使用泛型来声明一个类，让不同类型的缓存实现该类做出不同的具体实现即可：

```dart
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

在上述代码中，T 是一个替代类型。其相当于类型占位符，在开发者调用该接口的时候会指定具体类型。

### 使用集合字面量

List、Set 以及 Map 字面量也可以是参数化的。定义参数化的 List 只需在中括号前添加 <type>；定义参数化的 Map 只需要在大括号前添加 <keyType, valueType>：

```dart
var names = <String>['小芸', '小芳', '小民'];
var uniqueNames = <String>{'小芸', '小芳', '小民'};
var pages = <String, String>{
  'index.html': '主页',
  'robots.txt': '网页机器人提示',
  'humans.txt': '我们是人类，不是机器'
};
```

### 使用类型参数化的构造函数

在调用构造方法时也可以使用泛型，只需在类名后用尖括号（<...>）将一个或多个类型包裹即可：

```dart
var nameSet = Set<String>.from(names);
```

下面代码创建了一个键为 Int 类型，值为 View 类型的 Map 对象：

```dart
var views = Map<int, View>();
```

### 泛型集合以及它们所包含的类型

Dart的泛型类型是 固化的，这意味着即便在运行时也会保持类型信息：

```dart
var names = List<String>();
names.addAll(['小芸', '小芳', '小民']);
print(names is List<String>); // true
```

> 与 Java 不同的是，Java 中的泛型是类型 擦除 的，这意味着泛型类型会在运行时被移除。在 Java 中你可以判断对象是否为 List 但不可以判断对象是否为 List<String>。

### 限制参数化类型

有时使用泛型的时候可能会想限制泛型的类型范围，这时候可以使用 extends 关键字：

```dart
class Foo<T extends SomeBaseClass> {
  // 具体实现……
  String toString() => "'Foo<$T>' 的实例";
}

class Extender extends SomeBaseClass {...}
```

这时候就可以使用 SomeBaseClass 或者它的子类来作为泛型参数：

```dart
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
```

### 使用泛型方法

起初 Dart 只支持在类的声明时指定泛型，现在同样也可以在方法上使用泛型，称之为 泛型方法：

```dart
T first<T>(List<T> ts) {
  // 处理一些初始化工作或错误检测……
  T tmp = ts[0];
  // 处理一些额外的检查……
  return tmp;
}
```

方法 first<T> 的泛型 T 可以在如下地方使用：

* 函数的返回值类型 (T)。
* 参数的类型 (List<T>)。
* 局部变量的类型 (T tmp)。

## 库和可见性

`import` 和 `library` 关键字可以帮助你创建一个模块化和可共享的代码库，代码库不仅只是提供 API 而且还起到了封装的作用：以下划线（_）开头的成员仅在代码库中可见。每个 Dart 程序都是一个库，即便没有使用关键字 library 指定。

Dart 的库可以使用包工具来发布和部署。

#### 指定库前缀

如果你导入的两个代码库有冲突的标识符，你可以为其中一个指定前缀。比如如果 library1 和 library2 都有 Element 类，那么可以这么处理：

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// 使用 lib1 的 Element 类。
Element element1 = Element();

// 使用 lib2 的 Element 类。
lib2.Element element2 = lib2.Element();
```

#### 导入库的一部分

```dart
// 只导入 lib1 中的 foo。(Import only foo).
import 'package:lib1/lib1.dart' show foo;

// 导入 lib2 中除了 foo 外的所有。
import 'package:lib2/lib2.dart' hide foo;
```

#### 延迟加载库

延迟加载（也常称为 懒加载）允许应用在需要时再去加载代码库，下面是可能使用到延迟加载的场景：

* 为了减少应用的初始化时间。
* 处理 A/B 测试，比如测试各种算法的不同实现。
* 加载很少会使用到的功能，比如可选的屏幕和对话框。

使用 deferred as 关键字来标识需要延时加载的代码库：

```dart
import 'package:greetings/hello.dart' deferred as hello;
```

当实际需要使用到库中 API 时先调用 loadLibrary 函数加载库：

```dart
Future greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

在前面的代码，使用 await 关键字暂停代码执行直到库加载完成。

当你使用延迟加载的时候需要牢记以下几点：

* 延迟加载的代码库中的常量需要在代码库被加载的时候才会导入，未加载时是不会导入的。
* 导入文件的时候无法使用延迟加载库中的类型。如果你需要使用类型，则考虑吧接口类型转移到另一个库中然后让两个库都分别导入这个接口库。
* Dart会隐式地将 loadLibrary 方法导入到使用了 deferred as 命名空间 的类中。loadLibrary 函数返回的是一个 Future。

### 实现库

查阅创建依赖库包可以获取有关如何实现库包的建议，包括：

* 如何组织库的源文件。
* 如何使用 export 命令。
* 何时使用 part 命令。
* 何时使用 library 命令。
* 如何使用倒入和导出命令实现多平台的库支持。

## 异步支持

Dart 代码库中有大量返回 Future 或 Stream 对象的函数，这些函数都是 异步 的，它们会在耗时操作（比如I/O）执行完毕前直接返回而不会等待耗时操作执行完毕。

async 和 await 关键字用于实现异步编程，并且让你的代码看起来就像是同步的一样。

### 1. 处理 Future

可以通过下面两种方式，获得 Future 执行完成的结果：

* 使用 async 和 await；
* 使用 Future API，具体描述，参考库概览。

使用 async 和 await 的代码是异步的，但是看起来有点像同步代码。例如，下面的代码使用 await 等待异步函数的执行结果。

```dart
await lookUpVersion();
```

必须在带有 async 关键字的 异步函数 中使用 await：

```dart
Future checkVersion() async {
  var version = await lookUpVersion();
  // 使用 version 继续处理逻辑
}
```

> 尽管异步函数可以处理耗时操作，但是它并不会等待这些耗时操作完成，异步函数执行时会在其遇到第一个 await 表达式（详情见）的时候返回一个 Future 对象，然后等待 await 表达式执行完毕后继续执行。

使用 try、catch 以及 finally 来处理使用 await 导致的异常：

```dart
try {
  version = await lookUpVersion();
} catch (e) {
  // 无法找到版本时做出的反应
}
```

如果在使用 await 时导致编译错误，请确保 await 在一个异步函数中使用。例如，如果想在 main() 函数中使用 await，那么 main() 函数就必须使用 async 关键字标识。

```dart
Future main() async {
  checkVersion();
  print('在 Main 函数中执行：版本是 ${await lookUpVersion()}');
}
```

### 2. 声明异步函数

定义 异步函数 只需在普通方法上加上 async 关键字即可。

将关键字 async 添加到函数并让其返回一个 Future 对象。假设有如下返回 String 对象的方法：

```dart
String lookUpVersion() => '1.0.0';

// 将其改为异步函数，返回值是 Future：
Future<String> lookUpVersion() async => '1.0.0';
```

如果函数没有返回有效值，需要设置其返回类型为 Future<void>。

### 3. 处理Stream

如果想从 Stream 中获取值，可以有两种选择：

* 使用 async 关键字和一个 异步循环（使用 await for 关键字标识）。
* 使用 Stream API。详情参考库概览。

> 在使用 await for 关键字前，确保其可以令代码逻辑更加清晰并且是真的需要等待所有的结果执行完毕。例如，通常不应该在 UI 事件监听器上使用 await for 关键字，因为 UI 框架发出的事件流是无穷尽的。

```dart
await for (varOrType identifier in expression) {
  // 每当 Stream 发出一个值时会执行
}
```

## 生成器

当你需要延迟地生成一连串的值时，可以考虑使用 生成器函数。Dart 内置支持两种形式的生成器方法：

* 同步 生成器：返回一个 `Iterable` 对象。
* 异步 生成器：返回一个 `Stream` 对象。

通过在函数上加 sync* 关键字并将返回值类型设置为 Iterable 来实现一个 同步 生成器函数，在函数中使用 yield 语句来传递值：

```dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++;
}
```

实现 异步 生成器函数与同步类似，只不过关键字为 async* 并且返回值为 Stream：

```dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  int k = 0;
  while (k < n) yield k++;
}
```

如果生成器是递归调用的，可是使用 yield* 语句提升执行性能：

```dart
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```

## 可调用类

通过实现类的 call() 方法，允许使用类似函数调用的方式来使用该类的实例。

在下面的示例中，WannabeFunction 类定义了一个 call() 函数，函数接受三个字符串参数，函数体将三个字符串拼接，字符串间用空格分割，并在结尾附加了一个感叹号。单击运行按钮执行代码。

```dart
class WannabeFunction {
  String call(String a, String b, String c) => '$a $b $c!';
}

var wf = WannabeFunction();
var out = wf('Hi', 'there,', 'gang');

main() => print(out);
```

## 隔离区

大多数计算机中，甚至在移动平台上，都在使用多核 CPU。为了有效利用多核性能，开发者一般使用共享内存的方式让线程并发地运行。然而，多线程共享数据通常会导致很多潜在的问题，并导致代码运行出错。

为了解决多线程带来的并发问题，Dart 使用 isolates 替代线程，所有的 Dart 代码均运行在一个 isolates 中。每一个 isolates 有它自己的堆内存以确保其状态不被其它 isolates 访问。

## 类型定义

在 Dart 语言中，函数与 String 和 Number 一样都是对象，可以使用 类型定义（或者叫 方法类型别名）来为函数的类型命名。使用函数命名将该函数类型的函数赋值给一个变量时，类型定义将会保留相关的类型信息。

```dart
class SortedCollection {
  Function compare;

  SortedCollection(int f(Object a, Object b)) {
    compare = f;
  }
}

// 简单的不完整实现。
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);

  // 我们知道 compare 是一个函数类型的变量，但是具体是什么样的函数却不得而知。
  assert(coll.compare is Function);
}
```

上述代码中，当将参数 f 赋值给 compare 时，函数的类型信息丢失了，这里 f 这个函数的类型为 (Object, Object) → int（→ 代表返回），当然该类型也是一个 Function 的子类，但是将 f 赋值给 compare 后，f 的类型 (Object, Object) → int 就会丢失。我们可以使用 typedef 显式地保留类型信息：

```dart
typedef Compare = int Function(Object a, Object b);

class SortedCollection {
  Compare compare;

  SortedCollection(this.compare);
}

// 简单的不完整实现。
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);
  assert(coll.compare is Function);
  assert(coll.compare is Compare);
}
```

> 目前类型定义只能用在函数类型上，但是将来可能会有变化。

因为类型定义只是别名，因此我们可以使用它判断任意函数类型的方法：

```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```

## 元数据

使用元数据可以为代码增加一些额外的信息。元数据注解以 @ 开头，其后紧跟一个编译时常量（比如 deprecated）或者调用一个常量构造函数。

Dart 中有两个注解是所有代码都可以使用的：@deprecated 和 @override。你可以查阅扩展一个类获取有关 @override 的使用示例。下面是使用 @deprecated 的示例：


```dart
class Television {
  /// _弃用: 使用 [turnOn] 替代_
  @deprecated
  void activate() {
    turnOn();
  }

  /// 打开 TV 的电源。
  void turnOn() {...}
}
```

> 可以使用 @override 注解来表示你重写了一个成员：

```dart
class SmartTelevision extends Television {
  @override
  void turnOn() {...}
  // ···
}
```

## 注释

Dart 支持单行注释、多行注释和文档注释。

* 单行注释
* 多行注释
* 文档注释

文档注释可以是多行注释，也可以是单行注释，文档注释以 /// 或者 /** 开始。在连续行上使用 /// 与多行文档注释具有相同的效果。

在文档注释中，除非用中括号括起来，否则 Dart 编译器会忽略所有文本。使用中括号可以引用类、方法、字段、顶级变量、函数和参数。括号中的符号会在已记录的程序元素的词法域中进行解析。
