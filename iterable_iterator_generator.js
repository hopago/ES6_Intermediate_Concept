/**
 * iterable
 * 내부 요소들을 공개적으로 탐색 할 수 있는 데이터 구조
 * Symbol(Symbol.iterator)
 */

const arr = ["a", "b", "c"];
const set = new Set(["a", "b", "c"]);
const map = new Map([[false, "No"], [true, "Yes"], ["Ok", "Ko"]]);
const string = "문자열 이터러블";

const arrayLikeObj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
}
/*
const isIterable = [...arrayLikeObj];
console.log(isIterable)
TypeError: arrayLikeObj is not iterable
*/

function* generator() {
    yield 1
    yield 2
    yield 3
}
const gen = generator();

console.log(Array.from(gen));
console.log(Array.from(map));

const genToArr = [...Array.from(gen)];
const setToArr = [...set];
const [item1, item2] = [...set];
console.log(item1, item2);

const arr1 = [1, 2, 3];
const iter = arr1[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: undefined, done: true }

const map2 = new Map([["a", 1], ["b", 2], ["c", 3]]);
const iter1 = map2[Symbol.iterator]();
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());

for (let x of map2) {
    console.log(x);
}

const a = [
    new Promise((resolve, reject) => {
        setTimeout(resolve, 5000, 1)
    }),
    new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, 2)
    }),
    3456,
    "xyz",
    new Promise((resolve, reject) => {
        setTimeout(resolve, 3000, 3)
    })
];
// Promise.all -> iterable 값을 받는다
Promise.all(a)
    .then(v => console.log(v))
    .catch(err => console.log(err));

const makeGenerator = iterable => function* () {
    yield* iterable
}
const genVal = makeGenerator(arr)();
console.log(genVal.next(), genVal.next(), genVal.next());

/**
 * iterable한 개체를 인자로 받을 수 있는 개체
 * new Map()
 * new Set()
 * new WeakMap()
 * new WeakSet()
 * Promise.all()
 * Promise.race()
 * Array.from()
 */

