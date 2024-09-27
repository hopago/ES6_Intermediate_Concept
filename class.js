// ES5
function Person1(name) {
    this.name = name;
}
Person1.prototype.getName = function () {
    return this.name;
}
Person1.isPerson = function (obj) {
    return obj instanceof this
}

const hpg = new Person1("hopago");
console.log(hpg.getName());
console.log(Person1.isPerson(hpg));

// ES6
class Person2 {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    static isPerson(obj) {
        return obj instanceof this
    }
}

const dopago = new Person2("Dopago");
console.log(dopago.getName());
console.log(Person2.isPerson(dopago));

// 기명 클래스 표현식
const Person3 = class {

}

// 클래스는 식이면서 값이다
const a = class { };
class A {

}

if (true) {
    class A { }
    const a = new A();

    if (true) {
        const b = new A(); // TDZ, class는 호이스팅이 되나 변수명만 호이스팅

        class A { }
    }
}
const c = new A();

// a는 생성자 함수가 없어 호출 불가
class A {
    constructor() { }
    a() {

    }
    static b() {

    }
}
const ab = new A.prototype.a();

// 함수 자체의 constructor로 호출 가능
function A() {

}
A.prototype.a = function () { };
const abc = new A.prototype.a();

class A {

}
A(); // new 없이 클래스 생성 불가

// class A 자체를 string "A"로 생성과 동시에 변환
let A = class {
    constructor() {
        A = "A"
    }
}

const abcd = new A();
abcd.a(); // TypedError: ...

// 클레스 생성 당시에 constructor 내부에선 constant variable
class C {
    constructor() {
        C = "C"
    }
}
const abcde = new C(); // Assignment to constant variable

C = "10";
console.log(C); // 10

function a() {
    a = "a"
}
const a1 = a(); // "a"

// "문"이 아닌 "식"

const instanceGenerator = (className, ...params) => new className(...params);

class newPerson {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name)
    }
}

const hopago = instanceGenerator(newPerson, "호파고"); // new Person("호파고")
const dopago1 = instanceGenerator(class {
    constructor(name) { this.name = name }
    sayName() { console.log(this.name) }
}, "정상길");

hopago.sayName();
dopago1.sayName();

class B {

}

class A extends class {

} {
    // A
}

class CustomHTMLElement {
    constructor(element) {
        this._element = element;
    }
    // 열거대상 제외
    get html() {
        return this._element.innerHTML;
    }
    set html(value) {
        this._element.innerHTML = value
    }
}
console.log(Object.entries(CustomHTMLElement.prototype)); // undefined
console.log(Object.getOwnPropertyDescriptors(CustomHTMLElement.prototype, "html")) // get, set

// computed property

const a = {
    ["abc" + 123]: 1
}
a["abc" + 234] = 10;

const methodName = "methodName";
class A {
    constructor(name) {
        this.name = name;
    }
    [methodName]() {
        console.log(this.name)
    }
}

const gen = function* () {
    yield 1;
    yield 2;
}
const g = gen();
const obj = {
    *gene() {
        console.log("gene")
    }
}

class Products {
    constructor() {
        this.items = new Set()
    }
    addItem(name) {
        this.items.add(name)
    }
    [Symbol.iterator]() {
        let count = 0;
        const items = [...this.items];
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

const products = new Products();
products.addItem("밥1");
products.addItem("밥2");
products.addItem("밥3");
const iterItems = [...products]; // iterator 호출
console.log(iterItems); // ["밥1", "밥2", "밥3"]
const iter = products[Symbol.iterator]();
console.log(iter.next());

class Person {
    static create(name) {
        return new this(name)
    }

    constructor(name) {
        this.name = name
    }
}

const hopago2 = Person.create("hopago");
console.log(hopago2);

hopago2.__proto__.constructor.create(); // 호출 해봤자 this는 constructor에
Person.create.call(hopago2); // this 바인딩