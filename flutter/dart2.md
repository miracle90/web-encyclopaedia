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


