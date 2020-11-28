(function () {
    'use strict';

    function resolvePromise(promise, x, resolve, reject) {
        if (x == promise) {
            reject("错误");
        }
        if ((typeof x == "object" && x != null) || typeof x == "function") {
            console.log("0000");
            var then = x.then;
            var res = then.call(x, function (y) {
                resolvePromise(promise, y, resolve, reject);
            }, function (r) {
                reject(r);
            });
        }
        else {
            resolve(x);
        }
    }
    var Promise = /** @class */ (function () {
        function Promise(executor) {
            var _this = this;
            this.status = "pending" /* PENDING */;
            this.resolveValue = undefined;
            this.rejectValue = undefined;
            this.resolveFnList = [];
            this.rejectFnList = [];
            var resolve = function (resolveValue) {
                if (_this.status == "pending" /* PENDING */) {
                    _this.status = "resolved" /* RESOLVED */;
                    _this.resolveValue = resolveValue;
                    _this.resolveFnList.forEach(function (fn) { return fn(); });
                }
            };
            var reject = function (rejectValue) {
                if (_this.status == "pending" /* PENDING */) {
                    _this.status = "rejected" /* REJECTED */;
                    _this.rejectValue = rejectValue;
                    _this.rejectFnList.forEach(function (fn) { return fn(); });
                }
            };
            executor(resolve, reject);
        }
        Promise.prototype.then = function (onResolveFn, onRejectFn) {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                if (_this.status == "pending" /* PENDING */) {
                    _this.resolveFnList.push(function () {
                        var y = onResolveFn(_this.resolveValue);
                        resolvePromise(promise, y, resolve, reject);
                    });
                    _this.rejectFnList.push(function () {
                        var r = onRejectFn(_this.rejectValue);
                        reject(r);
                    });
                }
                if (_this.status == "resolved" /* RESOLVED */) {
                    var y = onResolveFn(_this.resolveValue);
                    resolve(y);
                }
                if (_this.status == "rejected" /* REJECTED */) {
                    var r = onRejectFn(_this.rejectValue);
                    reject(r);
                }
            });
            return promise;
        };
        return Promise;
    }());

    // type num = number;
    // type str = string;
    // let a:str = 1 + "1";
    // console.log(a);
    // function watch (num:number = 10):void{
    //     for(let i=0;i<num;i++){
    //         console.log(i);
    //     }
    // }
    // watch(5);
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("1");
        }, 1000);
    })
        .then(function (a) {
        console.log("2", a);
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve("ok");
            }, 1000);
        });
    }, function (b) {
        console.log("3", b);
    }).then(function (a) {
        console.log("4", a);
    }, function (b) {
        console.log("5", b);
    });
    // promise.then((a:any)=>{
    //     console.log(a)
    // },(b:any)=>{
    //     console.log(b)
    // })
    // promise.then((a:any)=>{
    //     console.log(a)
    // },(b:any)=>{
    //     console.log(b)
    // })
    // promise.then((a:any)=>{
    //     console.log(a)
    // },(b:any)=>{
    //     console.log(b)
    // })

}());
//# sourceMappingURL=index.js.map
