const o = { a: 1, b: 2, c: 3 };

for (let key in o) {
    console.log(key, o[key])
}

Object.prototype.method = function () {
    for (let key in o) {
        console.log(key, o[key])
    }
}
Object.method(o);

const objArr = obj => {
    const arr = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push([key, obj[key]])
        }
    }

    return arr;
}
const oArr = objArr(o);
console.log(oArr);

const oArr2 = Object.keys(o).map(k => [k, o[k]]);
oArr2.forEach(v => console.log(v));

const obj = {
    1: 10,
    "01": 30,
};
console.log(obj.length, " ", Object.keys(obj).length, " ", Object.values(obj).length);

/**
 * Map
 * [key, value] 쌍으로 이루어진 요소들의 집합
 * 순서 보장, iterable
 * 키에는 any type, 문자열만을 취급 X
 */

const map = new Map();
map.set(1, 10);
map.set(20, 10);
map.set("01", 30);
console.log(map.size);

console.log(map.get(1));
console.log(map.get("age"));

const map1 = new Map([[10, 10], ["10", "10"], [false, true], [{}, 1]]);
console.log(map1);

const map2 = new Map(map1);
console.log(map1 === map2)

const gen = function* () {
    for (let i = 0; i < 5; i++) {
        yield [i, i + 1]
    }
}
const map3 = new Map(gen());
console.log(map3);

console.log(map3.keys(),
    map3.values(),
    map3.entries());

const keys3 = map3.keys();
console.log(keys3.next().value);
console.log(keys3.next().value);

const mapArray1 = [...map];
const mapArray2 = [...map.keys()];
const mapArray3 = [...map.values()];
const mapArray4 = [...map.entries()];
console.log(mapArray1);
console.log(mapArray2);
console.log(mapArray3);
console.log(mapArray4);

const obj2 = {
    a: 1,
    b: 2,
    c: 3,
};
const keysArr = Object.keys(obj2);
const valuesArr = Object.values(obj2);
const entriesArr = Object.entries(obj2);
console.log(keysArr, valuesArr, entriesArr);

// Weak Map
let obj1 = {
    a: 1,
} // 참조 카운트: 1
const map4 = new Map();
map.set(obj1, 10); // 참조 카운트: 2
obj1 = null; // 참조 카운트: 1

let obj3 = {
    b: 2,
} // 참조 카운트: 1
const wmap = new WeakMap()
wmap.set(obj3, 20); // 참조 카운트: 1
obj3 = null; // 참조 카운트: 0
console.log(wmap.get(obj3));

const keysArray = [{ a: 1 }, [1, 2, 3], function () { }, Symbol("키"), 45, false];
// const weakMap = new WeakMap(keysArr);
// Symbol은 참조형이 아니므로 TypedError

let obj4 = {
    b: 2
};
const weMap = new WeakMap();
weMap.set(obj4, 20);
obj4 = null;
weMap.get(obj4);
console.log(weMap);

/**
 * WeakMap()
 * iterable X
 * for of X
 * size 프로퍼티 X
 * keys(), values(), entries(), clear() X
 * 비공식 객체 맴버 활용 사례 O
 */

// 은닉화
const weakMapValueAdder = (wmap, key, addValue) => {
    wmap.set(key, Object.assign({}, wmap.get(key), addValue))
};
const Person = (() => {
    const privateMembers = new WeakMap();

    return class {
        constructor(n, a) {
            privateMembers.set(this, { name: n, age: a })
        }
        set name(n) {
            weakMapValueAdder(privateMembers, this, { name: n })
        }
        get name() {
            return privateMembers.get(this).name
        }
        set age(a) {
            weakMapValueAdder(privateMembers, this, { age: a })
        }
        get age() {
            return privateMembers.get(this).age
        }
    }
})();

const hpg = new Person("Hopago", 26);
console.log(hpg.age, hpg.name, " ", hpg);
