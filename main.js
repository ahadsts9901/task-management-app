// for todo app

let form = document.querySelector('form');
let userInput = document.querySelector('.input');
let todoList = document.getElementById("todo-list");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let userTodo = userInput.value;

    if (!userTodo) return;

    let newWork = document.createElement("p");
    newWork.className += " task";
    newWork.setAttribute("draggable", "true");
    newWork.innerText = userTodo;

    newWork.addEventListener("dragstart", () => {
        newWork.className += " is-dragging";
    });

    newWork.addEventListener("dragend", () => {
        newWork.className = " task";
    });

    todoList.appendChild(newWork);

    userInput.value = "";
});


// for drag and drop


let draggables = document.querySelectorAll(".task");
let droppables = document.querySelectorAll(".list");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.className += " is-dragging";
    });
    task.addEventListener("dragend", () => {
        task.className = " task";
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        let bottomTask = insertAboveTask(zone, e.clientY);
        let curTask = document.querySelector(".is-dragging");

        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }
    });
});

let insertAboveTask = (zone, mouseY) => {
    let els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        let { top } = task.getBoundingClientRect();

        let offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};