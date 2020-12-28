## ORM

object relation mappding 对象关系工具

把对数据库的操作映射为对代码对象的操作

> java ssh spring structs hibernate(ibatis)

### 优点

* 屏蔽数据库操作的细节
* 可以跨数据库
* waterline

## mongoose

* Mongoose是MongoDB的一个对象模型工具
* 同时它也是针对MongoDB操作的一个对象模型库,封装了MongoDB对文档的的一些增删改查等常用方法
* 让NodeJS操作Mongodb数据库变得更加灵活简单
* Mongoose因为封装了MongoDB对文档操作的常用方法，可以高效处理mongodb,还提供了类似Schema的功能，如hook、plugin、virtual、populate等机制。

### Schema

* Schema是数据库集合的模型骨架
* 定义了集合中的字段的名称和类型以及默认值等信息

定义Schema

```js
var personSchema = new Schema({
  name: String,                             //姓名
  binary: Buffer,                           //二进制
  living: Boolean,                          //是否活着
  birthday: Date,                           //生日
  age: Number,                              //年龄
  _id: Schema.Types.ObjectId,               //主键
  _fk: Schema.Types.ObjectId,               //外键
  array: [],                                //数组
  arrOfString: [String],                    //字符串数组
  arrOfNumber: [Number],                    //数字数组
  arrOfDate: [Date],                        //日期数组
  arrOfBuffer: [Buffer],                    //Buffer数组
  arrOfBoolean: [Boolean],                  //布尔值数组
  arrOfObjectId: [Schema.Types.ObjectId]    //对象ID数组
  nested: { name: String }                  //内嵌文档
});

let p = new Person();
p.name= 'yy';
p.age = 25;
p.birthday = new Date();
p.married = false;
p.mixed= {any:{other:'other'}};
p._otherId = new mongoose.Types.ObjectId;
p.hobby.push('smoking');
p.ofString.push('string');
p.ofNumber.pop(3);
p.ofDates.addToSet(new Date);
p.ofBuffer.pop();
p.ofMixed = ['anything',3,{name:'yy'}];
p.nested.name = 'yy';
```