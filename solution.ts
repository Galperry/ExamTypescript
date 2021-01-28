window.onload = () :void =>{

    let arr:Array<Task>; 

    arr = JSON.parse(localStorage.getItem("tasks"));
    if (! arr){
        arr=[]
    }
    for (const object of arr){
        showTask(object)
    }

    document.querySelector("#todo-add").addEventListener("submit", function(e):void{
       e.preventDefault();
       createTask();
    })

    class Task {
        public id:number; public body:string;
        constructor (id:number,body:string){
            this.id = id;
            this.body = body;
        }
    }


    function getIDandIncrease():number{
        let countObj:number = Number(localStorage.getItem("countObj"));
        if (!countObj) {
            countObj= 1;
        }
        else{
            countObj++
        }
        localStorage.setItem("countObj",String(countObj))
        return countObj;
    }


    function createTask() :void{
        let textArea:any = (<HTMLInputElement>document.querySelector("#todo-item")).value
        let obj:Task = new Task (getIDandIncrease(), textArea)
        arr.push(obj);
        localStorage.setItem('tasks',JSON.stringify(arr))
        showTask(obj)
    }


    function showTask (obj) :void{
        let containerEl:HTMLInputElement = document.querySelector("#todo-list")
    
        let taskDiv:any = document.createElement("div")
        taskDiv.classList.add("todo-row")
        taskDiv.classList.add("todo-item")
        taskDiv.id = obj.id;
        taskDiv.style.width = "85%"
        taskDiv.innerText = `${obj.body}`
    
        let vBtn:any = document.createElement("button")
        vBtn.innerText = "✓"
        vBtn.style.color = "white"
        vBtn.classList.add("todo-ok")
        
        containerEl.prepend(taskDiv)
        taskDiv.append(vBtn)
        
        addListenerButton(vBtn)
    }

    function addListenerButton(btn) :void{
        btn.addEventListener("click", function(){
            this.parentNode.classList.add("done")
            // for (let i =0 ; i < arr.length ; i++){
            //     if (arr[i].id == this.parentNode.id){
            //         arr.splice(i,1)
            //         localStorage.setItem('memos', JSON.stringify(arr));
            //         this.parentNode.remove();
            //     }
            // }
        })
    }

    document.querySelector("#todo-delall").addEventListener("click", function():void{
        localStorage.clear();
        arr=[];
        let containerEl:HTMLInputElement = document.querySelector("#todo-list")
        while (containerEl.firstChild) {
            containerEl.removeChild(containerEl.firstChild);
        }
    })

    document.querySelector("#todo-delcom").addEventListener("click", function () {
        let allCompleted = document.querySelectorAll(".done")

        for (let i = 0 ; i < arr.length ; i++){
            for (let j = 0; j<allCompleted.length ; j++){
                if (Number(arr[i].id) == Number(allCompleted[j].id)){
                    arr.splice(i,1)
                    localStorage.setItem('tasks', JSON.stringify(arr));
                }
            }
        }
        for (var i = allCompleted.length-1; i>=0;i--){
            allCompleted[i].remove()
        }
    });

}





