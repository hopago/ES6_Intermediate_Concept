const aArr = [1, 2, 3, 4, 5, 3, 2, 4];

const rmA = aArr.reduce((a, v) => {
    if (a.includes(v)) return a;
    a.push(v);
    return a;
}, []);
console.log(rmA);

const c = new Set(aArr);
console.log(c);

const nSet = new Set();
nSet.add(5);
nSet.add("5");
nSet.add(0);
nSet.add(0);

console.log(nSet.size);
console.log(nSet.has(5));
console.log(nSet.delete(5));
console.log(nSet.has(5));

nSet.clear();
console.log(nSet.size);

nSet.add(5);
nSet.add("5");
nSet.add(0);

console.log(nSet.entries());
console.log(nSet.keys());
console.log(nSet.values());

const nSetArr = [...nSet];
console.log(nSetArr);

const map = new Map();
map.set("a", 1).set("b", 2).set({}, 3);
const set2 = new Set([...map]);
console.log(set2);

// Iterable Object: array, string, map, set, dom, htmlCollection, node

// Index가 필요없는 순회에 특화 & 전체 순회할 필요성 O, 값의 유무 판단
// 특정 요소에 접근하거나 인덱스가 필요할 경우 Array가 낫다
set2.forEach(function (key, value, ownerSet) {
    console.log(key, value, this)
}, {});

// 중복 제거
const arr = [1, 2, 3, 4, 1, 2, 4, 3, 5, 6];
const newArr = [...new Set(arr)];
console.log(newArr);

const ws = new WeakSet();
const o = {}; // 참조 ++
const o2 = o; // 참조 ++
o2 = null; // o2 -> null -> 참조--
o = null; // o -> null -> 참조 --, 가비지 컬렉터의 수거 대상

ws.add(o); // ws에 o 추가 -> 참조 카운트는 증가 X
o = null; // GC -> GC 후 ws에 값 X

/**
 * 기존 Set과 달리 keys, values, forEach 등 내부 메서드 X
 * 참조형 데이터만 요소로 삼을 수 있음
 * iterable 하지 않다
 */

ws.has(o2);
ws.add(o2);
ws.delete(o2);
ws.has(o2);

const isMarked = new WeakSet();
const attachedData = new WeakMap();
