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

/*
if (true) {
    class A { }
    const a = new A();

    if (true) {
        const b = new A(); // TDZ, class는 호이스팅이 되나 변수명만 호이스팅

        class A { }
    }
}
const c = new A();
*/

// a는 생성자 함수가 없어 호출 불가
class AB {
    constructor() { }
    a() {

    }
    static b() {

    }
}
// const ab = new AB.prototype.a(); // TypeError: AB.prototype.a is not a constructor

// 함수 자체의 constructor로 호출 가능
function ABC() {

}
A.prototype.a = function () { };
const abc = new A.prototype.a();

class ABCD {

}
ABC(); // new 없이 클래스 생성 불가

// class A 자체를 string "A"로 생성과 동시에 변환
let ABCDE = class {
    constructor() {
        A = "A"
    }
}

const abcde = new A();
abcde.a(); // TypedError: ...

// 클레스 생성 당시에 constructor 내부에선 constant variable
/*
class C {
    constructor() {
        C = "C"
    }
}
const abcdef = new C(); // Assignment to constant variable

C = "10";
console.log(C); // 10
*/

function abcdefg() {
    abcdefg = "a"
}
const a1 = abcdefg(); // "a"

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

class BC extends class {

} {
    // B
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

const abcdefgh = {
    ["abc" + 123]: 1
}
abcdefgh["abc" + 234] = 10;

const methodName = "methodName";
class ABCDEFGH {
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

/*
class Person123 {
    static create(name) {
        return new this(name)
    }

    constructor(name) {
        this.name = name
    }
}

const hopago2 = Person123.create("hopago");
console.log(hopago2);

hopago2.__proto__.constructor.create(); // 호출 해봤자 this는 constructor에
Person123.create.call(hopago2); // this 바인딩
*/

// 클래스 상속

class Square {
    constructor(width) {
        this.width = width
    }

    getArea() {
        return this.width * (this.width || this.height)
    }
}

class Rectangle extends Square {
    constructor(width, height) {
        super(width);
        this.height = height;
    }
}

const square = new Square(10);
const rect = new Rectangle(30, 50);
console.log(rect.getArea());

function Person12345(name) {
    this.name = name;
}

class Employee extends Person12345 {
    constructor(name, position) {
        super(name);
        this.position = position;
    }
}

const hopago3 = new Employee("hopago", "fe");
console.log(hopago3.name);

class Rectangle1 {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

class Square1 extends Rectangle1 {
    constructor(width) {
        super(width, width)
    }
    getArea() {
        return super.getArea()
    }
    getX() {
        return super.getArea();
    }
}

const square1 = new Square1(3);
square1.getX();

/*
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error("이 클래스는 직접 인스턴스화 할 수 없는 추상클래스입니다.")
        }
    }
}

class Rectangle2 extends Shape {
    constructor(width, height) {
        super()
        this.width = width;
        this.height = height
    }
    getSize() {
        return this.width * this.height
    }
}

const s = new Shape();
const r = new Rectangle2(3, 5);
*/
