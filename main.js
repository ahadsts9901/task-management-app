let form = document.querySelector("form");
let userInput = document.querySelector(".input");
let listContainer = document.querySelector(".list-container");
let heading = document.getElementById("center");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    heading.style.display = "none";
    let userTodo = userInput.value;

    if (!userTodo) return;

    let newList = document.createElement("div");
    newList.className = "list";
    listContainer.appendChild(newList);

    let listHeading = document.createElement("h2");
    listHeading.className = "center";
    listHeading.innerText = userTodo;
    newList.appendChild(listHeading);

    let rowSecond = document.createElement("div");
    rowSecond.className = "row-task";
    newList.appendChild(rowSecond);

    let commentButton = document.createElement("button");
    commentButton.setAttribute(
        "class",
        "btn btn-primary btn-sm delete-column-button"
    );
    commentButton.innerHTML = '<i class="bi bi-chat-left-text-fill"></i>';
    commentButton.addEventListener("click", commentColumn);
    rowSecond.appendChild(commentButton);

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

    let comment = document.createElement("p");
    comment.className += " comment";
    let userComment = "";
    comment.innerText = userComment;
    newList.appendChild(comment);

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

    let appendedList = document.createElement('div')
    appendedList.className = "scrollable"
    newList.appendChild(appendedList)

    userInput.value = "";
});

function makeTask(event) {
    event.preventDefault();

    let submitTask = event.target;
    let userTodo = submitTask.previousElementSibling.value;
    // console.log(submitTask.previousElementSibling.value);
    let list = submitTask.parentNode.nextSibling;
    console.log(list)


    if (!userTodo) return;


    let newWork = document.createElement("p");
    newWork.setAttribute("class", "task-flex");
    newWork.className += " task";
    newWork.setAttribute("draggable", "true");
    list.appendChild(newWork);

    let taskRow = document.createElement("span");
    taskRow.className += " task-upper-row";
    newWork.appendChild(taskRow);

    newWork.addEventListener("dragstart", () => {
        newWork.className += " is-dragging";
    });

    newWork.addEventListener("dragend", () => {
        newWork.className = "task";
    });


    let span = document.createElement("p");
    span.setAttribute("class", "mine");
    span.innerText = userTodo;
    taskRow.appendChild(span);

    let row = document.createElement("div");
    row.className += " row-task";
    taskRow.appendChild(row);

    let commentTask = document.createElement("i");
    commentTask.className += " bi bi-chat-left-text-fill task-delete-button";
    commentTask.addEventListener("click", commentPresentTask);
    row.appendChild(commentTask);

    let editTask = document.createElement("i");
    editTask.className += " bi bi-pencil-fill task-delete-button";
    editTask.addEventListener("click", editPresentTask);
    row.appendChild(editTask);

    let deleteTask = document.createElement("i");
    deleteTask.className += " bi bi-trash-fill task-delete-button";
    deleteTask.addEventListener("click", deletePresentTask);
    row.appendChild(deleteTask);

    let comment = document.createElement("p");
    comment.className += " task-comment";
    let userComment = "";
    comment.innerText = userComment;
    newWork.appendChild(comment);

    submitTask.previousElementSibling.value = "";

    // Update draggables and droppables after adding a new task
    let draggables = list.querySelectorAll(".task");
    let droppables = document.querySelectorAll(".scrollable");

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
    event.stopPropagation();
    let edit = event.target;
    let column = edit.closest(".list");
    let listHeading = column.querySelector("h2");
    let newTitle = prompt("Edit Title", listHeading.innerText);
    if (newTitle !== null && newTitle.trim() !== "") {
        listHeading.textContent = newTitle;
    }
}

function editPresentTask(event) {
    event.stopPropagation();
    let editTask = event.target;
    let whatToEdit = editTask.parentNode.parentNode.firstChild;
    let newTitle = prompt("Edit Task", whatToEdit.innerText);
    if (newTitle !== null && newTitle.trim() !== "") {
        whatToEdit.textContent = newTitle;
    }
}

function commentColumn(event) {
    event.preventDefault();
    event.stopPropagation();

    let commentButton = event.target;
    let commentContainer = commentButton
        .closest(".list")
        .querySelector(".comment");
    commentContainer.className += " comment-container";
    let newComment = prompt("Enter Comment");

    if (newComment !== null && newComment.trim() !== "") {
        let comment = document.createElement("p");
        comment.className += " comment";
        commentContainer.appendChild(comment);
        let commentText = document.createElement("p");
        commentText.className += " span-comment"
        commentText.textContent = newComment
        comment.appendChild(commentText)
        let commentDelete = document.createElement("p");
        commentDelete.innerHTML = "<i class='bi bi-x-octagon-fill'></i>";
        commentDelete.className += " comment-delete-margin";
        commentDelete.addEventListener("click", commentColumnDelete);
        comment.appendChild(commentDelete);
    }
}

function commentColumnDelete(event) {
    event.stopPropagation();
    let button = event.target;
    let column = button.closest(".comment");
    column.remove();
}

function commentPresentTask(event) {
    event.preventDefault();
    event.stopPropagation();

    let commentButton = event.target;
    let commentContainer = commentButton
        .closest(".task")
        .querySelector(".task-comment");
    commentContainer.className += " comment-container";
    let newComment = prompt("Enter Comment");

    if (newComment !== null && newComment.trim() !== "") {
        let TaskCommentRow = document.createElement("span");
        TaskCommentRow.className += " comment-row";
        commentContainer.appendChild(TaskCommentRow);
        let comment = document.createElement("p");
        comment.className += " task-comment";
        comment.textContent = newComment;
        TaskCommentRow.appendChild(comment);
        //
        let commentDelete = document.createElement("p");
        commentDelete.innerHTML = "<i class='bi bi-x-octagon-fill'></i>";
        commentDelete.addEventListener("click", deleteTaskComment);
        commentDelete.className += " comment-delete-margin";
        TaskCommentRow.appendChild(commentDelete);
    }
}

function deleteTaskComment(event) {
    event.stopPropagation();
    let button = event.target;
    let column = button.closest(".comment-row");
    column.remove();
}