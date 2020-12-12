let Event = require("./Events");
// let Event = require("events");

class Girl extends Event{}

let girl = new Girl();
girl.age =18;
const cb = (...arg)=>{
    console.log("laugh",...arg,girl.age);
}
girl.on("newListener",eventN => {
    console.log(eventN,"00");
});
girl.on("laugh",cb);
girl.on("laugh",(...arg)=>{
    console.log("laugh匿名",...arg);
});
girl.on("cry",(...arg)=>{
    console.log("cry",...arg);
});
girl.once("ok",(...arg)=>{
    console.log("ok",...arg);
});

girl.emit("laugh","11","22");
girl.emit("cry","33","44");
girl.emit("ok","55","66");


girl.off("laugh",cb);

girl.emit("laugh","11","22");
girl.emit("ok","77","88");




