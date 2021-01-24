# Dart 编程语言概览

### Hello World

每个应用都有一个 main() 函数。你可以使用顶层函数 print() 来将一段文本输出显示到控制台：

```dart
void main() {
  print('Hello, World!');
}
```

### 变量

虽然 Dart 是代码类型安全的语言，但是由于其支持类型推断，因此大多数变量不需要显式地指定类型：

```dart
var name = '旅行者一号';
var year = 1977;
var antennaDiameter = 3.7;
var flybyObjects = ['木星', '土星', '天王星', '海王星'];
var image = {
  'tags': ['土星'],
  'url': '//path/to/saturn.jpg'
};
```

包括变量的默认值，final 和 const 关键字以及静态类型等。

### 流程控制语句

Dart 支持常用的流程控制语句

```dart
if (year >= 2001) {
  print('21 世纪');
} else if (year >= 1901) {
  print('20 世纪');
}

for (var object in flybyObjects) {
  print(object);
}

for (int month = 1; month <= 12; month++) {
  print(month);
}

while (year < 2016) {
  year += 1;
}
```

包括 break 和 continue 关键字、switch 语句和 case 子句以及 assert 语句。

### 函数

建议为每个函数的参数以及返回值都指定类型

```dart
int fibonacci(int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

var result = fibonacci(20);
```

=> (胖箭头) 简写语法用于仅包含一条语句的函数。该语法在将匿名函数作为参数传递时非常有用：

```dart
flybyObjects.where((name) => name.contains('土星')).forEach(print);
```

包括可选参数、默认参数值以及词法作用域。

### 注释

```
// 这是一个普通的单行注释。

/// 这是一个文档注释。
/// 文档注释用于为库、类以及类的成员添加注释。
/// 像 IDE 和 dartdoc 这样的工具可以专门处理文档注释。

/* 也可以像这样使用单斜杠和星号的注释方式 */
```

### 导入（ Import ）

使用 import 关键字来访问在其它库中定义的 API。

```dart
// 导入核心库
import 'dart:math';

// 从外部 Package 中导入库
import 'package:test/test.dart';

// 导入文件
import 'path/to/my_other_file.dart';
```

你可以 阅读更多 Dart 中有关库和可见性的内容，包括库前缀、show 和 hide 关键字以及通过 deferred 关键字实现的懒加载。

### 类 Class

下面的示例中向你展示了一个包含三个属性、两个构造函数以及一个方法的类。其中一个属性不能直接赋值，因此它被定义为一个 getter 方法（而不是变量）。

```dart
class Spacecraft {
  String name;
  DateTime launchDate;

  // 构造函数，带有可以直接为成员变量赋值的语法糖。
  Spacecraft(this.name, this.launchDate) {
    // 这里可以实现初始化代码。
  }

  // 命名构造函数，转发到默认构造函数。
  Spacecraft.unlaunched(String name) : this(name, null);

  int get launchYear =>
      launchDate?.year; // 只读的非 final 的属性

  // 方法。
  void describe() {
    print('宇宙飞船：$name');
    if (launchDate != null) {
      int years =
          DateTime.now().difference(launchDate).inDays ~/
              365;
      print('发射时间：$launchYear ($years years ago)');
    } else {
      print('尚未发射');
    }
  }
}
```

你可以像下面这样使用 Spacecraft 类：

```dart
var voyager = Spacecraft('旅行者一号', DateTime(1977, 9, 5));
voyager.describe();

var voyager3 = Spacecraft.unlaunched('旅行者三号');
voyager3.describe();
```

你可以 阅读更多 Dart 中有关类的内容，包括初始化列表、可选的 new 和 const 关键字、重定向构造函数、由 factory 关键字定义的工厂构造函数以及 Getter 和 Setter 方法等等。

### 扩展类（继承）

Dart支持单继承

```dart
class Orbiter extends Spacecraft {
  double altitude;
  Orbiter(String name, DateTime launchDate, this.altitude)
      : super(name, launchDate);
}
```

你可以 阅读更多 Dart 中有关类继承的内容，比如可选的 @override 注解等等。

### Mixins

Mixin 是一种在多个类层次结构中重用代码的方法。下面的类可以作为一个 Mixin：

···dart
class Piloted {
  int astronauts = 1;
  void describeCrew() {
    print('宇航员人数：$astronauts');
  }
}
```

现在你只需使用 Mixin 的方式继承这个类就可将该类中的功能添加给其它类。

```dart
class PilotedCraft extends Spacecraft with Piloted {
  // ···
}
```

自此，PilotedCraft 类中就包含了 astronauts 字段以及 describeCrew() 方法。

你可以 阅读更多 关于 Mixin 的内容。

### 接口和抽象类

Dart 没有 `interface` 关键字。相反，所有的类都隐式定义了一个接口。因此，任意类都可以作为接口被实现。

```dart
class MockSpaceship implements Spacecraft {
  // ···
}
```

你可以 阅读更多 关于隐式接口的内容。

你可以创建一个被任意具体类扩展（或实现）的抽象类。抽象类可以包含抽象方法（不含方法体的方法）。

```dart
abstract class Describable {
  void describe();

  void describeWithEmphasis() {
    print('=========');
    describe();
    print('=========');
  }
}
```

任意一个扩展了 Describable 的类都拥有 describeWithEmphasis() 方法，这个方法又会去调用实现类中实现的 describe() 方法。

你可以 阅读更多 关于抽象类和抽象方法的内容。

### 异步

使用 async 和 await 关键字可以让你避免回调地狱（Callback Hell）并使你的代码更具可读性。

```dart
const oneSecond = Duration(seconds: 1);
// ···
Future<void> printWithDelay(String message) async {
  await Future.delayed(oneSecond);
  print(message);
}
```

上面的方法相当于：

```dart
Future<void> printWithDelay(String message) {
  return Future.delayed(oneSecond).then((_) {
    print(message);
  });
}
```

如下一个示例所示，async 和 await 关键字有助于使异步代码变得易于阅读。

```dart
Future<void> createDescriptions(Iterable<String> objects) async {
  for (var object in objects) {
    try {
      var file = File('$object.txt');
      if (await file.exists()) {
        var modified = await file.lastModified();
        print(
            '文件 $object 已经存在。它上一次的修改时间为 $modified。');
        continue;
      }
      await file.create();
      await file.writeAsString('开始在此文件中描述 $object。');
    } on IOException catch (e) {
      print('不能为 $object 创建描述：$e');
    }
  }
}
```

你也可以使用 async* 关键字，其可以为你提供一个可读性更好的方式去生成 Stream。

```dart
Stream<String> report(Spacecraft craft, Iterable<String> objects) async* {
  for (var object in objects) {
    await Future.delayed(oneSecond);
    yield '${craft.name} 由 $object 飞行。';
  }
}
```

你可以 阅读更多 关于异步支持的内容，包括异步函数、Future、Stream 以及异步循环（await for）。

### 异常

使用 throw 关键字抛出一个异常：

```dart
if (astronauts == 0) {
  throw StateError('没有宇航员。');
}
```

使用 try 语句配合 on 或 catch（两者也可同时使用）关键字来捕获一个异常:

```dart
try {
  for (var object in flybyObjects) {
    var description = await File('$object.txt').readAsString();
    print(description);
  }
} on IOException catch (e) {
  print('无法描述该对象：$e');
} finally {
  flybyObjects.clear();
}
```

注意上述代码是异步的；同步代码以及异步函数中得代码都可以使用 try 捕获异常。

你可以 阅读更多 关于异常的内容，包括栈追踪、rethrow 关键字以及 Error 和 Exception 之间的区别。

