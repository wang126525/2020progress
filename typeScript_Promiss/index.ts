import Promise from "./newpromise";


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

const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(new Promise((resolve1,reject1)=>{
            resolve1("111111111");
        }));
    },1000);
})
.then((a:any)=>{
    console.log("2",a);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject("ok");
        },1000)
    });
},(b:any)=>{
    console.log("3",b);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("ok2");
        },1000)
    })
})
.then()
.then()
.then()
.then((a:any)=>{
    console.log("4",a);
},(b:any)=>{
    console.log("5",b);
}).then((a:any)=>{
    console.log("6",a);
},(b:any)=>{
    console.log("7",b);
})


Promise.resolve(new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject("100");
    }, 3000);
})).then(data=>{
    console.log("8",data);
},err=>{
    console.log("9",err);
}).catch(err=>{
    console.log(err);
}).finally(()=>{
    return new Promise((resolve,reject)=>{
        console.log("kmoimo");
        reject("654+6");
    })
    
    // return 5165
}).then(d=>{
    console.log(d,"ll");
}).then(d=>{
    console.log(d,"ll");
}).then(d=>{
    console.log(d,"ll");
}).then(d=>{
    console.log(d,"ll");
}).catch(err=>{
    console.log(err,"zuihou");
})


let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("0000")
    },1000);
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject("1111")
    },5000);
})

Promise.all([p1,p2]).then(data=>{
    console.log(data,"all");
}).catch(err=>{
    console.log(err);
})

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




