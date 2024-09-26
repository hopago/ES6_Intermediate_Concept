/** iterable
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

/** Iterator
 * 반복을 위해 설계된 객체
 * 객체 내부에 next() 메소드
 * 메소드 반환값 { value, done }
 */

const iterObj = {
    items: [10, 20, 30],
    count: 0,
    next() {
        const done = this.count >= this.items.length;
        return {
            done,
            value: !done ? this.items[this.count++] : undefined
        }
    }
}

iterObj.next();
iterObj.next();
iterObj.next();
iterObj.next();

const obj = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]() {
        return iterObj
    }
}

const newIter = obj[Symbol.iterator]();
const spreadObj = [...obj];

const isIterable = target => !!target[Symbol.iterator];
console.log(isIterable(obj));

/**
const createIterator = () => {
    return {
        next() {
            done: false
        }
    }
}
const obj2 = {
    [Symbol.iterator]: createIterator
}
console.log(...obj2);
*/

const iterObj1 = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    [Symbol.iterator]() {
        let count = 0;
        const items = Object.entries(this);
        return {
            next() {
                return {
                    done: count >= items.length,
                    value: items[count++]
                }
            }
        }
    }
}
console.log([...iterObj1]);

const map3 = new Map([[1, 2], [2, 3], [3, 4]]);
const keyVal = map3.entries();
console.log(keyVal.next());

Object.entries(iterObj1[Symbol.iterator]().next());

/** Generator
 * 중단점에서 멈춘 뒤 이어 실행
 * function 키워드 뒤에 *를 붙여 표현, 내부에는 yield 키워드 활용
 * 함수 실행 결과에 대해 next() 메소드를 호출할 때마다 순차적으로 제너레이터 함수 내부의 yield 키워드를 만나기 전까지 실행
 * yield 키워드에서 일시정지
 * 다시 next() 메소드를 호출하면 그 다음 yield 키워드를 만날 때까지 함수 내부의 내용을 진행
 */

function* generator() {
    console.log(1);
    yield 1;
    console.log(2);
    yield 2;
    console.log(3);
}

const gen1 = generator();
gen1.next(); // { value: 1, done: false }
gen1.next(); // { value: 2, done: false }
gen1.next(); // { value: undefined, done: true }

const obj3 = {
    gene1: function* () {
        yield 1
    },
    *gene2() {
        yield 2
    },
}

const genVal1 = [...gen1];
for (let val of gen1) {
    console.log(val);
}

const obj4 = {
    a: 1,
    b: 2,
    c: 3,
    *[Symbol.iterator]() {
        for (let prop in this) {
            yield [prop, this[prop]]
        }
    }
}
console.log(...obj4);
for (let p of obj4) {
    console.log(p)
}

function* gene() {
    yield* [1, 2, 3, 4, 5]
    yield
    yield* "abcde"
}

const gen3 = gene();

for (let i = 0; i < 12; i++) {
    gen3.next();
}

function* newGene() {
    let first = yield 1;
    let second = yield first + 2;
    yield second + 3;
}
const gen4 = newGene();
gen4.next(); // { value: 1, done: false }
gen4.next(); // { value: NaN, done: false }

/** 비동기 처리 예시
 * 응답시간 지연, response에는 불필요한 데이터가 담길 수도
 */

const ajaxCalls = () => {
    const res1 = fetch.get('https://api.github.com/users?since=1000');
    const res2 = fetch.get(`https://api.github.com/user/${res1[3]}`);

    /** Ajax
     * $.ajax({
     *   method: "GET",
     *   url: "https://api.github.com/users?since=1000",
     *   success: function (res) {
     *     const res = fetch.get(`https://api.github.com/user/${res1[3]}`);
     *     return res
     *   }
     * })
     */

    /** Promise
     *   fetch.get("https://api.github.com/users?since=1000")
     *   .then(function (res) {
     *     const res = fetch.get(`https://api.github.com/user/${res[3]}`)
     *   })
     */

    /** Generator
     * 
     */
};
const uL = ajaxCalls();

const fetchWrapper = (gen, url) => fetch(url)
    .then(res => res.json())
    .then(res => gen.next(res))
    .catch(err => console.log(err));

function* getNthUserInfo() {
    const [gen, from, nth] = yield;
    const users = yield fetchWrapper(gen, `https://api.github.com/users?since=${from || 0}`);
    const userId = users[nth - 1 || 0].id;
    const user = yield fetchWrapper(gen, `https://api.github.com/user/${userId}`);
    return user;
}

const runGen = (generator, ...rest) => {
    const gen = generator();
    gen.next();
    gen.next([gen, ...rest]);
}
runGen(getNthUserInfo, 1000, 4);

