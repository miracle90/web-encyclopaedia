## 进程和线程的区别

- 一个进程中可以有多个线程，比如渲染线程、js引擎线程，http请求线程等等
- 进程表示一个程序，线程是进程中的单位
- 多线程在单核cpu中其实也是顺序执行的，不过系统可以帮你切换那个执行而已，没有提高速度
- 多个cpu的话就可以在多个cpu中同时执行

> 单线程优点：解决切换上下文时间，锁的问题，节省内存

> node 主进程，再开多个子进程，里面包含着一个线程

## 宏任务和微任务

- 微任务：process.nextTick，promise.then，MutationObserver
- 宏任务：script，setTimeout，setInterval，setImmediate（IE下和node中），messageChannel，I/O，UI rendering

> 微任务回避宏任务快，js中会先执行 script 脚本，也是宏任务

## node事件环（两码事，libuv，v8）

- timers阶段 setTimeout，setInterval
- poll阶段（回到timer阶段执行回调并且执行I/O回调，poll队列为空，有check阶段会进入check阶段）
- check阶段 setImmediate

每个宏任务执行，都会清空微任务

setTimeout/setImmediate哪个更快？看进入事件循环的时间，是否到达需要执行的时间

i/o的下一个阶段是check阶段