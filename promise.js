// 콜백 지옥 예시
if (false) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.body.appendChild(script);
    document.body.innerHTML += '<button id="btn">클릭</button>';
    document.getElementById("btn").addEventListener("click", function (e) {
        $.ajax({
            method: "GET",
            url: "https://api.github.com/users?since=1000",
            success: function (data) {
                var target = data[2];
                $.ajax({
                    method: "GET",
                    url: "https://api.github.com/user" + target.id,
                    success: function (data) {
                        var _id = "img" + data.id;
                        document.body.innerHTML += '<img id="' + _id + "'src='" + data.avatar_url + "'/>";
                        document.getElementById(_id).addEventListener("click", function (e) {
                            this.remove();
                        })
                    }
                })
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
}

// Promise
if (false) {
    document.body.innerHTML = '<button id="btn">클릭</button>';
    document.getElementById("btn").addEventListener("click", (e) => {
        fetch('https://api.github.com/users?since=1000')
            .then(res => res.json())
            .then(res => {
                const target = res[2];
                return fetch("https://api.github.com/user" + target.id);
            })
            .then(res => res.json())
            .then(res => {
                const _id = "img" + res.id;
                document.body.innerHTML += `<img id="${_id}" src="${res.avatar_url}"`;
                document.getElementById(_id).addEventListener("click", e => {
                    this.remove();
                })
            })
            .catch(err => console.log(err));
    })
}

// Promise의 상태값
// unsettled (미확정) 상태: pending, thenable X
// settled 상태: resolved, thenable O, fulfilled(성공), rejected(실패)

const promiseTest = param => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (param) {
            resolve("해결")
        } else {
            reject("실패")
        }
    }, 1000);
});
const testRun = param =>
    promiseTest(param)
        .then(text => console.log(text))
        .catch(err => console.log(err));

testRun(true);
testRun(false);

new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.1 ? resolve("해결") : reject("실패")
    }, 1000);
})
    .then(res => console.log(res))
    .catch(err => console.log(err))

const executer = (resolve, reject) => { };
const prom = new Promise(executer);

prom.then((res, err) => {
    if (res) {
        console.log(res)
    } else {
        console.log(err);
    }
});

prom.then((res) => console.log(res))
    .catch(err => console.log(err))

let simplePromiseBuilder = value => {
    return new Promise((resolve, reject) => {
        if (value) { resolve(value) }
        else { reject(value) }
    })
}
simplePromiseBuilder(1).then(res => console.log(res)).catch(err => console.log(err));
simplePromiseBuilder(0).then(res => console.log(res)).catch(err => console.log(err));

simplePromiseBuilder = value => {
    return new Promise((resolve, reject) => {
        if (value) { resolve(value) }
        else { reject(value) }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
simplePromiseBuilder(0);

/** 실행 Quene
 * 전체 소스 실행 (비동기 -> 동기 순)
 * 동기 실행 후 비동기 내부 실행
 * 비동기 스코프 내의 동기 실행 후 비동기 실행
 */

Promise.resolve(() => {
    return "동기 함수"
})
    .then(() => {
        return "다른 무언가..."
    })
    .catch(err => console.log(err));

// thenable 또한 iterator의 반환 메소드인 next()와 마찬가지로 덕타입

const thenable = {
    then(resolve, reject) {
        resolve(13)
    }
}

// 단, 동기 컨텍스트
const prom1 = Promise.resolve(thenable);
prom1.then(res => console.log(res));


const thenable1 = {
    then() {
        return 10;
    }
}

const prom2 = Promise.resolve(thenable1);
// prom2.then(res => console.log(res)); resolve를 시키지 않으면 pending 상태에 stuck

// Promise Chaining

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("1")
    }, 1000)
})
    .then(res => {
        console.log(res);
        return "2"
    })
    .then(res => {
        console.log(res);
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(3), 1000)
        })
    })
    .then(res => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("4")
            }, 1000)
        })
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err);
        return new Error("Catch by then...")
    })
    .then(res => {
        console.log(res)
        throw new Error("Catch by catch...")
    })
    .then(res => {
        console.log("출력 X")
    })
    .catch(err => {
        console.log(err)
    })

/**
 * 1. return promise instance: 프로미스 인스턴스
 * 2. return 일반 값: promise 객체에 resolved 상태로 반환
 * 3. return X -> return undefined -> 2번으로 회귀
 * 4. Promise.resolve() || Promise.reject(): return 하지 않으면 일반 값과 동일
 */

