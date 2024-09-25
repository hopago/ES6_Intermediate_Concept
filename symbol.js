const obj2 = {
    [Symbol("2")]: true,
    "02": true,
    "10": true,
}

for (const value in obj2) {
    console.log(value)
    // { 02: true, 10: true }
}

const aSymbol = Symbol("a");
const bSymbol = Symbol("a");
console.log(aSymbol === bSymbol); // false

// 값의 은닉화
const xFunc = () => {
    const a = Symbol("a");

    return {
        [a]: 10,
        a
    }
}

const y = xFunc();
console.log(y);

console.log(y[Symbol("a")]);
console.log(y[y.a])

const b = Reflect.ownKeys(y);
console.log(y[b[0]]);

// 객체 프로퍼티 키
const NAME = Symbol("이름");
const GENDER = Symbol("성별");

const iu = {
    [NAME]: "아이유",
    [GENDER]: "여성",
    age: 26
}
const suzi = {
    [NAME]: "수지",
    [GENDER]: "여성",
    age: 26,
}
const hpg = {
    [NAME]: "호준",
    [GENDER]: "남성",
    age: 26
}

console.log(iu, suzi, hpg)

console.log(iu[NAME], suzi[NAME], hpg[NAME]);
for (const prop in iu) {
    console.log(prop, iu[prop])
}
Object.keys(iu).forEach(k => {
    console.log(k, iu[k])
});
Object.getOwnPropertyNames(iu).forEach(k => {
    console.log(k, iu[k])
})
Object.getOwnPropertySymbols(iu).forEach(k => {
    console.log(k, iu[k])
})

const obj = (() => {
    const _privateMember1 = Symbol("private");
    const _privateMember2 = Symbol("private");

    return {
        [_privateMember1]: "외부에서 보이긴 하나 접근 X",
        [_privateMember2]: 10,
        publicMember1: 20,
        publicMember2: 30
    }
})();
console.log(obj);
console.log(obj[Symbol("private")]);

const aSet = new Set();

const ranStr = "이 _ 문자열을 _ 이렇게 _ 나누어줬으면";
console.log(ranStr.split(" _ "));

String.prototype[Symbol.split] = function (string) {
    let result = "";
    let residue = string;
    let index = 0;

    do {
        index = residue.indexOf(this);

        if (index <= -1) {
            break;
        }

        result += residue.substring(0, index) + "/",
            residue = residue.substring(index + this.length);
    } while (true)

    result += residue;

    return result;
}
console.log(ranStr.split(" _ "))

class CPerson {
    constructor(name) {
        this.name = name;
    }
}
const chpg = new CPerson("hopago");
console.log(chpg.toString());

CPerson.prototype[Symbol.toStringTag] = "PERSON";
console.log(chpg.toString());

