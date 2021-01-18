# flutter

## 搭建Flutter开发环境

> 注意： 由于一些flutter命令需要联网获取数据，如果您是在国内访问，由于众所周知的原因，直接访问很可能不会成功。 上面的PUB_HOSTED_URL和FLUTTER_STORAGE_BASE_URL是google为国内开发者搭建的临时镜像。

### 镜像

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

### 获取 Flutter SDK

#### 解压

```
cd ~/development
unzip ~/Downloads/flutter_macos_v0.5.1-beta.zip
```

#### 添加flutter相关工具到path中：

此代码只能暂时针对当前命令行窗口设置PATH环境变量，要想永久将Flutter添加到PATH中请参考下面 更新环境变量 部分。

```
export PATH=`pwd`/flutter/bin:$PATH
```


### 更新环境变量

> 删除空格之后再执行source .bash_profile就没问题了。遇到这种报错，首先考虑引入环境变量的路径是不是有问题，仔细检查。

### Android设置

### 安装 Android Studio

### 设置 Android 设备

* 启用 `开发人员选项`
* 开启 `USB调试`

### 设置 Android 模拟器

## 配置编辑器

### Android Studio

* 安装 Flutter 插件
* 安装 Dart 插件

### vscode

* 安装 flutter 插件
* 通过 Flutter Doctor 验证设置

## 体验

### 终端体验

```
flutter create myapp
cd myapp
flutter devices
flutter run
```

## 编写您的第一个 Flutter App
