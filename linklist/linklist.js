class Node {
    constructor(element,next){
        this.element = element;
        this.next = next;
    }
}

class LinkList {
    constructor(){
        this.head = null;
        this.size = 0;
    }
    _getNode(index){
        if(index==null) return;
        if(index>this.size){throw new Error("超出范围")};
        let curele;
        for(let i=0; i<this.size; i++){
            if(i==0){
                curele = this.head;
            }else{
                curele = curele.next;
            }
            if(i === index){
                return curele;
            }
        }
    }
    add(index,element){
        let ind = index;
        let ele = element;
       
        if(arguments.length==1){
            ele = index;
            ind = this.size;
        }
        if (index < 0 || index > this.size) throw new Error('越界');
        if(ind==0){
            let head = this.head;
            this.head = new Node(ele,head);
        }else{
            let curele = this._getNode(ind-1);
            let cureleNext = curele.next;
            curele.next = new Node(ele,cureleNext);
        }
        this.size++;
    }
    set(index,element){
        let preE = this._getNode(index-1);
        let nextEle = preE.next.next;
        preE.next = new Node(element,nextEle);
    }
    remove(index){
        if (index < 0 || index >= this.size) throw new Error('越界');
        if(index==0){
            this.head = this.head.next;
        }else{
            let preE = this._getNode(index-1);
            let nextEle = preE.next.next;
            preE.next = nextEle;
        }
        this.size--;
    }
    get(index){
        return this._getNode(index);

    }
    clear(){
        this.size = 0;
        this.head = null;
    }

    reverse(){
        let newHead = null;
        if(this.head.next==null){
            return;
        }
        while(this.head.next!=null){
            let curhead = this.head;
            this.head = curhead.next;
            curhead.next = newHead;
            newHead = curhead;
        }
        this.head.next = newHead;
        // this.head = newHead;
    }






}

let ll = new LinkList;
ll.add(0,0);
ll.add(0,1);
ll.add(0,2);
ll.add(0,3);
ll.reverse();
console.dir(ll,{depth:null});



