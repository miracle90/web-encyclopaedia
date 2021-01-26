# Dart 语言核心库

Dart 拥有非常丰富的核心库用以为诸如处理对象集合（dart:collection）、进行数学运算（dart:math）以及编/解码数据（dart:convert）等常用编程操作提供支持。除此之外， 由社区贡献的 packages 中也提供了许多其它的 API 便于开发者使用。

### dart:async

支持通过使用 Future 和 Stream 这样的类实现异步编程。

### dart:collection

提供 dart:core 库中不支持的额外的集合操作工具类。

### dart:convert

用于提供转换不同数据的编码器和解码器，包括 JSON 和 UTF-8。

### dart:core

每一个 Dart 程序都可能会使用到的内置类型、集合以及其它的一些核心功能。

### dart:developer

类似调试器和分析器这样的与开发者交互配合的工具。

> 只支持 JIT 和 dartdevc

### dart:math

包含算术相关函数和常量，还有随机数生成器。

### dart:typed_data

高效处理固定大小数据（例如无符号的 8 位整型）和 SIMD 数字类型的列表。

### dart:io

用于支持非 Web 应用的文件、Socket、HTTP 和其它 I/O 操作。

### dart:isolate

使用 Isolate 实现并发编程：类似于线程的独立的 Worker。

### dart:mirrors

支持检查和动态调用的基本反射功能。

> 实验性 只在 JIT 中有效 (Flutter 中无效)