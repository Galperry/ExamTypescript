var arr;
let containerEl;
class Task {
    constructor(id, body, done = false) {
        this.id = id;
        this.body = body;
        this.done = done;
    }
}
window.onload = () => {
    containerEl = document.querySelector("#todo-list");
    (function initialize() {
        arr = JSON.parse(localStorage.getItem("tasks"));
        if (!arr)
            arr = [];
        for (const object of arr)
            showTask(object);
        document.querySelector("#todo-save").addEventListener("click", function (e) {
            e.preventDefault();
            createTask();
        });
        document.querySelector("#todo-delall").addEventListener("click", function () {
            localStorage.clear();
            arr = [];
            while (containerEl.firstChild) {
                containerEl.removeChild(containerEl.firstChild);
            }
        });
        document.querySelector("#todo-delcom").addEventListener("click", function () {
            let allCompleted = document.querySelectorAll(".done");
            let newArr = [];
            for (var i = allCompleted.length - 1; i >= 0; i--) {
                allCompleted[i].parentNode.remove();
            }
            for (let obj of arr) {
                if (!obj.done)
                    newArr.push(obj);
            }
            localStorage.setItem("tasks", JSON.stringify(newArr));
        });
    })();
};
function addListenerButton(id) {
    const parentDiv = document.getElementById(String(id));
    parentDiv.children[0].classList.add("done");
    arr.find((task) => task.id == id).done = true;
    localStorage.setItem("tasks", JSON.stringify(arr));
}
function createTask() {
    let textArea = document.querySelector("#todo-item").value;
    let obj = new Task(getIDandIncrease(), textArea);
    arr.push(obj);
    localStorage.setItem("tasks", JSON.stringify(arr));
    showTask(obj);
}
function getIDandIncrease() {
    let countObj = Number(localStorage.getItem("countObj"));
    !countObj ? (countObj = 1) : countObj++;
    localStorage.setItem("countObj", String(countObj));
    return countObj;
}
function showTask(obj) {
    if (!obj.body)
        return;
    containerEl.innerHTML += `
        <div id="${obj.id}" class="todo-row">
            <div class="todo-item ${obj.done ? "done" : ""}">${obj.body}</div>
            <input type="button" onclick="addListenerButton(${obj.id})" class="todo-ok" value="&#10004;"/>
        </div>
    `;
}
