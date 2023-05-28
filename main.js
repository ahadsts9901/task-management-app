let form = document.querySelector("form");
let userInput = document.querySelector(".input");
let listContainer = document.querySelector(".list-container");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let userTodo = userInput.value;

    if (!userTodo) return;

    let newList = document.createElement("div");
    newList.className = "list";
    listContainer.appendChild(newList);

    let listHeading = document.createElement("h2");
    listHeading.className = "center";
    newList.appendChild(listHeading);

    let span = document.createElement("p");
    span.innerText = userTodo;
    span.setAttribute("class", "para");
    listHeading.appendChild(span);

    let row = document.createElement("div");
    row.className = "row";
    newList.appendChild(row);

    let listInput = document.createElement("input");
    listInput.setAttribute("type", "text");
    listInput.setAttribute("placeholder", "Enter Task...");
    listInput.className = "input-white";
    row.appendChild(listInput);

    let listButton = document.createElement("button");
    listButton.setAttribute("class", "list-button");
    listButton.innerText = "Add +";
    listButton.addEventListener("click", makeTask);
    row.appendChild(listButton);

    let rowSecond = document.createElement("div");
    row.className = "row";
    listHeading.appendChild(rowSecond);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute(
        "class",
        "btn btn-danger btn-sm delete-column-button"
    );
    deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>';
    deleteButton.addEventListener("click", deleteColumn);
    rowSecond.appendChild(deleteButton);

    let editButton = document.createElement("button");
    editButton.setAttribute(
        "class",
        "btn btn-success danger btn-sm delete-column-button"
    );
    editButton.innerHTML = '<i class="bi bi-pencil-fill"></i>';
    editButton.addEventListener("click", editColumn);
    rowSecond.appendChild(editButton);

    userInput.value = "";
});

function makeTask(event) {
    event.preventDefault();

    let submitTask = event.target;
    let list = submitTask.parentNode.parentNode;

    let userTodo = submitTask.previousElementSibling.value;

    console.log(submitTask.previousElementSibling.value);

    if (!userTodo) return;

    let newWork = document.createElement("p");
    newWork.setAttribute("class", "task-flex");
    newWork.className += " task";
    newWork.setAttribute("draggable", "true");


    newWork.addEventListener("dragstart", () => {
        newWork.className += " is-dragging";
    });

    newWork.addEventListener("dragend", () => {
        newWork.className = "task";
    });

    list.appendChild(newWork);

    let span = document.createElement("p");
    span.setAttribute("class", "mine");
    span.innerText = userTodo;
    newWork.appendChild(span);

    let row = document.createElement("div")
    row.className += " row-task"
    newWork.appendChild(row)

    let editTask = document.createElement("i");
    editTask.className += " bi bi-pencil-fill task-delete-button";
    editTask.addEventListener("click", editPresentTask);
    row.appendChild(editTask);

    let deleteTask = document.createElement("i");
    deleteTask.className += " bi bi-trash-fill task-delete-button";
    deleteTask.addEventListener("click", deletePresentTask);
    row.appendChild(deleteTask);


    submitTask.previousElementSibling.value = "";

    // Update draggables and droppables after adding a new task
    let draggables = list.querySelectorAll(".task");
    let droppables = document.querySelectorAll(".list");

    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.className += " is-dragging";
        });
        task.addEventListener("dragend", () => {
            task.className = "task";
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
}

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

function deleteColumn(event) {
    event.stopPropagation();
    let button = event.target;
    let column = button.closest(".list");
    column.remove();
}

function deletePresentTask(event) {
    event.stopPropagation();
    let button = event.target;
    let task = button.closest(".task");
    task.remove();
}

function editColumn(event) {
    let edit = event.target;
    let whatToEdit = edit.parentNode.parentNode.parentNode.firstChild;
    let value = whatToEdit.value
    let newTitle = prompt("Enter New Title");
    whatToEdit.textContent = newTitle;
}

function editPresentTask(event) {
    let editTask = event.target;
    let whatToEdit = editTask.parentNode.parentNode.firstChild;
    let value = whatToEdit.value
    let newTitle = prompt("Enter New Title");
    whatToEdit.textContent = newTitle;
}