// 观察者模式 基于发布订阅模式 观察者、被观察者

// 被观察者状态变化，要更新自己身上的所有的观察者

// 发布订阅 发布和订阅无关

// 被观察者
class Subject {
  constructor () {
    this.state = '开心'
    this.arr = []
  }
  // 装载观察着
  attach(observer) {
    this.arr.push(observer)
  }

  setState(newState) {
    this.state = newState
    this.arr.forEach(observer => observer.update(newState))
  }
}

// 应该每个数据变化，都应该对应自己的观察，而不是一个数据变了，都要更新一下
// 观察者
class Observer {
  constructor(who) {
    this.who = who
  }
  // 这个方法用来被观察者调用
  update(newState) {
    console.log('通知' + this.who + '被观察者' + newState + '了')
  }
}

let subject = new Subject()

let my1 = new Observer('我')
let my2 = new Observer('我媳妇')

subject.attach(my1)
subject.attach(my2)

subject.setState('哭')

