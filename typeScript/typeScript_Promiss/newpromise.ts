const enum STATUS {
    PENDING = "pending",
    RESOLVED = "resolved",
    REJECTED = "rejected",
}

function resolvePromise(promise:any,x:any,resolve:any,reject:any){
    if(x==promise){reject("错误")}
    if((typeof x == "object"&&x!=null)||typeof x == "function"){
        console.log("0000");
        const then = x.then;
        const res = then.call(x,(y:any)=>{
            resolvePromise(promise,y,resolve,reject);
        },(r:any)=>{
            reject(r);
        });
    }else{
        resolve(x);
    }
}


class Promise {
    status:STATUS
    resolveValue:undefined
    rejectValue:undefined
    resolveFnList:Function[]
    rejectFnList:Function[]
    constructor(executor:(resolve:(resolveValue?:any)=>void,reject:(rejectValue?:any)=>void)=>void){
        this.status = STATUS.PENDING;
        this.resolveValue = undefined;
        this.rejectValue = undefined;
        this.resolveFnList = []; 
        this.rejectFnList = [];
        const resolve = (resolveValue:any) => {
            if(this.status == STATUS.PENDING ){
                this.status = STATUS.RESOLVED;
                this.resolveValue = resolveValue;
                this.resolveFnList.forEach((fn:any) => fn());
            }
        }
        const reject = (rejectValue:any) => {
            if(this.status == STATUS.PENDING ){
                this.status = STATUS.REJECTED;
                this.rejectValue = rejectValue;
                this.rejectFnList.forEach((fn:any) => fn());
            }
        }
        executor(resolve,reject);

    }
    then(onResolveFn:any,onRejectFn:any){
        const promise = new Promise((resolve,reject)=>{
            if(this.status == STATUS.PENDING){
                this.resolveFnList.push(()=>{
                    let y = onResolveFn(this.resolveValue);
                    resolvePromise(promise,y,resolve,reject);
                })
                this.rejectFnList.push(()=>{
                    let r = onRejectFn(this.rejectValue);
                    reject(r);
                })
            }
            if(this.status == STATUS.RESOLVED){
                let y = onResolveFn(this.resolveValue);
                resolve(y);
            }
            if(this.status == STATUS.REJECTED){
                let r = onRejectFn(this.rejectValue);
                reject(r);
            }

        });

        return promise;
    }
}
export default Promise;