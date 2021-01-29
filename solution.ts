var arr: Array<Task>;
let containerEl: HTMLInputElement;

class Task {
  public id: number; public body: string; public done: boolean;
  constructor(id: number, body: string, done: boolean = false) {
    this.id = id;
    this.body = body;
    this.done = done;
  }
}

window.onload = (): void => {
    containerEl = document.querySelector("#todo-list");
    
    (function initialize(): void {
        arr = JSON.parse(localStorage.getItem("tasks"));
        if (!arr) arr = [];
        for (const object of arr) showTask(object);

        document.querySelector("#todo-save").addEventListener("click", function (e: Event): void {
            e.preventDefault();
            createTask();
        });
    
        document.querySelector("#todo-delall").addEventListener("click", function (): void {
            localStorage.clear();
            arr = [];
            while (containerEl.firstChild) {
                containerEl.removeChild(containerEl.firstChild);
            }
        });
  
        document.querySelector("#todo-delcom").addEventListener("click", function () {
            let allCompleted:any = document.querySelectorAll(".done");
            let newArr:Array<Task> = [];
  
            for (var i = allCompleted.length - 1; i >= 0; i--) {
            (<HTMLInputElement>allCompleted[i].parentNode).remove();
            }
      
            for (let obj of arr) {if (!obj.done) newArr.push(obj)}
                localStorage.setItem("tasks", JSON.stringify(newArr));
            });

    })();
};

function addListenerButton(id:number): void {
  const parentDiv = document.getElementById(String(id));
  parentDiv.children[0].classList.add("done");
  
  arr.find((task) => task.id == id).done = true;
  localStorage.setItem("tasks", JSON.stringify(arr));
}

function createTask(): void {
    let textArea: string = (<HTMLInputElement>document.querySelector("#todo-item")).value;
    let obj: Task = new Task(getIDandIncrease(), textArea);
    arr.push(obj);
    localStorage.setItem("tasks", JSON.stringify(arr));
    showTask(obj);
}

function getIDandIncrease(): number {
    let countObj: number = Number(localStorage.getItem("countObj"));
    !countObj ? (countObj = 1) : countObj++;
    localStorage.setItem("countObj", String(countObj));
    return countObj;
}

function showTask(obj): void {
    if (!obj.body) return;
    
    containerEl.innerHTML += `
        <div id="${obj.id}" class="todo-row">
            <div class="todo-item ${obj.done ? "done" : ""}">${obj.body}</div>
            <input type="button" onclick="addListenerButton(${obj.id})" class="todo-ok" value="&#10004;"/>
        </div>
    `;
}