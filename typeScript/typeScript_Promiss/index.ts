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
        resolve("1");
    },1000);
})
.then((a:any)=>{
    console.log("2",a);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("ok");
        },1000)
    });
},(b:any)=>{
    console.log("3",b);
}).then((a:any)=>{
    console.log("4",a);
},(b:any)=>{
    console.log("5",b);
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




