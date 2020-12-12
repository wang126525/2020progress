//  on once off emite newListener 
class Event {
    constructor(){
        this.events = {};
    }

    on(eventName,cb){
        if(!this.events){
            this.events = {};
        }
        if(this.events["newListener"]){
            this.emit("newListener",eventName);
        }
        if(this.events[eventName]){
            this.events[eventName].push(cb);
        }else{
            this.events[eventName] = [cb];
        }
        // console.log(this.events);
    }
    emit(eventName,...args){
        if(!this.events){
            this.events = {};
        }
        if(this.events[eventName]){
            this.events[eventName].forEach(cb => {
                cb.call(this,...args);
            });
        }
    }
    off(eventName,callback){
        if(!this.events){
            this.events = {};
        }
        if(this.events[eventName]){
            this.events[eventName] = this.events[eventName].filter(cb=>callback!=cb&&callback!=cb.l);
        }
    }

    once(eventName,callback){
        if(!this.events){
            this.events = {};
        }
        if(this.events["newListener"]){
            this.emit("newListener",eventName);
        }
        const cb = (...args)=>{
            callback(...args);
            this.off(eventName,cb);
        }
        cb.l = callback;
        if(this.events[eventName]){
            this.events[eventName].push(cb);
        }else{
            this.events[eventName] = [cb];
        }
    }





}





module.exports = Event;