let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };


// myAdd has the full function type
let myAdd1 = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd2: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };

/**
 * 可选参数和默认参数
 * TypeScript里的每个函数参数都是必须的。
 * 这不是指不能传递 null 或 undefined 作为参数，而是说编译器检查用户是否为每个参数都传入了值。
 * 编译器还会假设只有这些参数会被传递进函数。
 * 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。
 */
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right


// JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。
// 在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。
// 比如，我们想让last name是可选的：

// 可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。
function buildName2(firstName: string, lastName?: string) {
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

let result11 = buildName2("Bob");  // works correctly now
let result22 = buildName2("Bob", "Adams", "Sr.");  // error, too many parameters
let result33 = buildName2("Bob", "Adams");  // ah, just right


// 在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型。
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right

/**
 * 剩余参数
 * 必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。
 * 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。
 * 在JavaScript里，你可以使用 arguments来访问所有传入的参数。
 */
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

/**
 * this
 * JavaScript里，this的值在函数被调用的时候才会指定。
 * 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。
 * 但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。
 */
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
      return function() {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// 可以看到createCardPicker是个函数，并且它又返回了一个函数。
// 如果我们尝试运行这个程序，会发现它并没有弹出对话框而是报错了。
// 因为 createCardPicker返回的函数里的this被设置成了window而不是deck对象。
// 因为我们只是独立的调用了 cardPicker()。
// 顶级的非方法式调用会将 this视为window。
// （注意：在严格模式下， this为undefined而不是window）。

/**
 * 重载
 * JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。
 * 方法是为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用。
 */
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);