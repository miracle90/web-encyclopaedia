## 1、Widgets 介绍

Flutter 从 React 中吸取灵感，通过现代化框架创建出精美的组件。它的核心思想是用 widget 来构建你的 UI 界面。 Widget 描述了在当前的配置和状态下视图所应该呈现的样子。当 widget 的状态改变时，它会重新构建其描述（展示的 UI），框架则会对比前后变化的不同，以确定底层渲染树从一个状态转换到下一个状态所需的最小更改。

### 1.1 基础 widgets

* Text
* Column、Row
* Container
* Stack

### 1.2 使用 Material 组件

现在我们已经从 MyAppBar 和 MyScaffold 切换到了 material.dart 中的 AppBar 和 Scaffold widget，我们的应用更“Material”了一些。例如，标题栏有了阴影，标题文本会自动继承正确的样式，此外还添加了一个浮动操作按钮。

注意，widget 作为参数传递给了另外的 widget。 Scaffold widget 将许多不同的 widget 作为命名参数，每个 widget 都放在了 Scofford 布局中的合适位置。同样的，AppBar widget 允许我们给 leading、title widget 的 actions 传递 widget。这种模式在整个框架会中重复出现，在设计自己的 widget 时可以考虑这种模式。

* Navigator 路由导航
* AppBar
* Scaffold

### 1.3 处理手势

```dart
class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: Container(
        height: 36.0,
        padding: const EdgeInsets.all(8.0),
        margin: const EdgeInsets.symmetric(horizontal: 8.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          color: Colors.lightGreen[500],
        ),
        child: Center(
          child: Text('Engage'),
        ),
      ),
    );
  }
}
```

GestureDetector widget 没有可视化的展现，但它能识别用户的手势。当用户点击 Container 时， GestureDetector 会调用其 onTap() 回调，在这里会向控制台打印一条消息。你可以使用 GestureDetector 检测各种输入的手势，包括点击，拖动和缩放。

许多 widget 使用 GestureDetector 为其他 widget 提供可选的回调。例如，IconButton、[RaisedButton][] 和 FloatingActionButton widget 都有 onPressed() 回调，当用户点击 widget 时就会触发这些回调。

### 1.4 根据用户输入改变 widget

到目前为止，这个页面仅使用了无状态的 widget。无状态 widget 接收的参数来自于它的父 widget，它们储存在 final 成员变量中。当 widget 需要被 build() 时，就是用这些存储的变量为创建的 widget 生成新的参数。

为了构建更复杂的体验，例如，以更有趣的方式对用户输入做出反应—应用通常带有一些状态。 Flutter 使用 StatefulWidgets 来实现这一想法。 StatefulWidgets 是一种特殊的 widget，它会生成 State 对象，用于保存状态。看看这个基本的例子，它使用了前面提到的[RaisedButton][]：

```dart
class Counter extends StatefulWidget {
  // This class is the configuration for the state. It holds the
  // values (in this case nothing) provided by the parent and used
  // by the build  method of the State. Fields in a Widget
  // subclass are always marked "final".

  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      // This call to setState tells the Flutter framework that
      // something has changed in this State, which causes it to rerun
      // the build method below so that the display can reflect the
      // updated values. If you change _counter without calling
      // setState(), then the build method won't be called again,
      // and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called,
    // for instance, as done by the _increment method above.
    // The Flutter framework has been optimized to make rerunning
    // build methods fast, so that you can just rebuild anything that
    // needs updating rather than having to individually change
    // instances of widgets.
    return Row(
      children: <Widget>[
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
        Text('Count: $_counter'),
      ],
    );
  }
}
```

您可能想知道为什么 StatefulWidget 和 State 是独立的对象。在 Flutter 中，这两种类型的对象具有不同的生命周期。 Widget 是临时对象，用于构造应用当前状态的展示。而 State 对象在调用 build() 之间是持久的，以此来存储信息。

上面的示例接受用户输入并直接在其 build() 方法中直接使用结果。在更复杂的应用中，widget 层次不同的部分可能负责不同的关注点；例如，一个 widget 可能呈现复杂的用户界面，来收集像日期或位置这样特定的信息，而另一个 widget 可能使用该信息来改变整体的展现。

在 Flutter 中，widget 通过回调得到状态改变的通知，同时当前状态通知给其他 widget 用于显示。重定向这一流程的共同父级是 State，下面稍微复杂的示例显示了它在实践中的工作原理：

```dart
class CounterDisplay extends StatelessWidget {
  CounterDisplay({this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('Count: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  CounterIncrementor({this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: Text('Increment'),
    );
  }
}

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      ++_counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(children: <Widget>[
      CounterIncrementor(onPressed: _increment),
      CounterDisplay(count: _counter),
    ]);
  }
}
```

注意创建两个新的无状态 widget 的方式，它清楚地分离了 显示 计数器（CounterDisplay）和 改变 计数器（CounterIncrementor）。尽管最终结果与前面的示例相同，但是责任的分离将更大的复杂性封装在各个 widget 中，保证了父级的简单性。

### 1.5 整合在一起

```dart
class Product {
  const Product({this.name});
  final String name;
}

typedef void CartChangedCallback(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({this.product, this.inCart, this.onCartChanged})
      : super(key: ObjectKey(product));

  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    // The theme depends on the BuildContext because different parts
    // of the tree can have different themes.
    // The BuildContext indicates where the build is
    // taking place and therefore which theme to use.

    return inCart ? Colors.black54 : Theme.of(context).primaryColor;
  }

  TextStyle _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onCartChanged(product, inCart);
      },
      leading: CircleAvatar(
        backgroundColor: _getColor(context),
        child: Text(product.name[0]),
      ),
      title: Text(product.name, style: _getTextStyle(context)),
    );
  }
}
```

### 1.6 响应 widget 的生命周期事件

在 StatefulWidget 上调用 `createState()` 之后，框架将新的状态对象插入到树中，然后在状态对象上调用 `initState()`。 State 的子类可以重写 `initState` 来完成只需要发生一次的工作。例如，重写 `initState` 来配置动画或订阅平台服务。实现 `initState` 需要调用父类的 `super.initState` 方法来开始。

### 1.7 Keys

**使用 key 可以控制框架在 widget 重建时与哪些其他 widget 进行匹配**。默认情况下，框架根据它们的 runtimeType 以及它们的显示顺序来匹配。使用 key 时，框架要求两个 widget 具有相同的 key 和 runtimeType。

**Key 在构建相同类型 widget 的多个实例时很有用。**例如，ShoppingList widget，它只构建刚刚好足够的 ShoppingListItem 实例来填充其可见区域：

* 如果没有 key，当前构建中的第一个条目将始终与前一个构建中的第一个条目同步，在语义上，列表中的第一个条目如果滚动出屏幕，那么它应该不会再在窗口中可见。

* 通过给列表中的每个条目分配为“语义” key，无限列表可以更高效，因为框架将通过相匹配的语义 key 来同步条目，并因此具有相似（或相同）的可视外观。此外，语义上同步条目意味着在有状态子 widget 中，保留的状态将附加到相同的语义条目上，而不是附加到相同数字位置上的条目。

### 1.7 全局 key

全局 key 可以用来标识唯一子 widget。全局 key 在整个 widget 结构中必须是全局唯一的，而不像本地 key 只需要在兄弟 widget 中唯一。由于它们是全局唯一的，因此可以使用全局 key 来检索与 widget 关联的状态。

## 在Flutter中构建布局

## 添加交互

## Flutter Widget框架概述