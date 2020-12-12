const enum STATUS {
    PENDING = "pending",
    RESOLVED = "resolved",
    REJECTED = "rejected",
}

function resolvePromise(promise:any,x:any,resolve:any,reject:any){
    if(x==promise){reject("错误")}
    if((typeof x == "object"&&x!=null)||typeof x == "function"){
        const then = x.then;
        if(typeof then == "function"){
            const res = then.call(x,(y:any)=>{
                resolvePromise(promise,y,resolve,reject);
            },(r:any)=>{
                reject(r);
            });
        }else{
            resolve(x);
        }
    }else{
        resolve(x);
    }
}

function isPromise(fn){
    if((typeof fn == "object"&&fn!=null)||typeof fn == "function"){
        const then = fn.then;
        if(typeof then == "function"){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
class Promise {
    status:STATUS
    resolveValue:undefined
    rejectValue:undefined
    resolveFnList:Function[]
    rejectFnList:Function[]
    constructor(executor:(resolve?:(resolveValue?:any)=>void,reject?:(rejectValue?:any)=>void)=>void){
        this.status = STATUS.PENDING;
        this.resolveValue = undefined;
        this.rejectValue = undefined;
        this.resolveFnList = []; 
        this.rejectFnList = [];
        const resolve = (resolveValue?:any) => {
            if(resolveValue instanceof Promise){
                return resolveValue.then(resolve,reject);
            }
            if(this.status == STATUS.PENDING ){
                this.status = STATUS.RESOLVED;
                this.resolveValue = resolveValue;
                this.resolveFnList.forEach((fn:any) => fn());
            }
        }
        const reject = (rejectValue?:any) => {
            if(this.status == STATUS.PENDING ){
                this.status = STATUS.REJECTED;
                this.rejectValue = rejectValue;
                this.rejectFnList.forEach((fn:any) => fn());
            }
        }
        try {
            executor(resolve,reject);
        } catch (error) {
            reject(error)
        }
    }
    then(onResolveFn?,onRejectFn?){
        onResolveFn = onResolveFn&&typeof onResolveFn == "function"?onResolveFn:(value?:any)=>value;
        onRejectFn = onRejectFn&&typeof onRejectFn == "function"?onRejectFn:(err?:any)=>{throw err};
        const promise = new Promise((resolve,reject)=>{
            if(this.status == STATUS.PENDING){
                this.resolveFnList.push(()=>{
                    setTimeout(()=>{
                        try {
                            let y = onResolveFn(this.resolveValue);
                            resolvePromise(promise,y,resolve,reject);
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                })
                this.rejectFnList.push(()=>{
                    setTimeout(()=>{
                        try {
                            let r = onRejectFn(this.rejectValue);
                            resolvePromise(promise,r,resolve,reject);
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                })
            }
            if(this.status == STATUS.RESOLVED){
                setTimeout(()=>{
                    try {
                        let y = onResolveFn(this.resolveValue);
                        resolvePromise(promise,y,resolve,reject);
                    } catch (error) {
                        reject(error)
                    }
                },0)
            }
            if(this.status == STATUS.REJECTED){
                setTimeout(()=>{
                    try {
                        let r = onRejectFn(this.rejectValue);
                        resolvePromise(promise,r,resolve,reject);
                    } catch (error) {
                        reject(error)
                    }
                },0)
            }

        });
        return promise;
    }
    static resolve(val?){
        let promise = new Promise((resolve,reject)=>{
            resolve(val)
        })
        return promise;
    }
    static reject(val?){
        let promise = new Promise((resolve,reject)=>{
            reject(val)
        })
        return promise;
    }
    static all(array){
        return new Promise((resolve,reject)=>{
            let arr = [];
            let i = 0;
            let saveData = function(i,data){
                arr[i] = data;
                i++;
                if(i==array.length){
                    resolve(arr);
                }
            }
            for(let i=0;i<array.length;i++){
                if(isPromise(array[i])){
                    array[i].then(d=>{
                        saveData(i,d);
                    },e=>{
                        reject(e);
                    })
                }else{
                    saveData(i,array[i]);
                }
            }
        })
    } 
    catch(err){
        return this.then(null,err);
    }
    finally(fn){
        return this.then(data=>{
            return Promise.resolve(fn()).then(()=>data);
        },err=>{
            return Promise.resolve(fn()).catch(err);
        })

    }
}
export default Promise;