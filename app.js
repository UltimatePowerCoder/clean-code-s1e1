const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incompletetasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");
    listItem.className = "task-section__item";

    listItem.innerHTML = `
        <input type="checkbox" class="task-section__checkbox">
        <label class="task-section__label">${taskString}</label>
        <input type="text" class="task-section__label" style="display: none;">
        <button class="edit">Edit</button>
        <button class="delete">
            <img src="./remove.svg" alt="Delete">
        </button>
    `;

    return listItem;
};

const addTask = () => {
    console.log("Add Task...");
    const taskValue = taskInput.value.trim();
    if (!taskValue) return;

    const listItem = createNewTaskElement(taskValue);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

const editTask = (event) => {
    console.log("Edit Task...");
    const listItem = event.target.closest("li");
    const editInput = listItem.querySelector('input[type="text"]');
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");
    const isEditMode = listItem.classList.toggle("editMode");

    if (isEditMode) {
        editInput.value = label.innerText;
        editInput.style.display = "inline-block";
        label.style.display = "none";
        editBtn.innerText = "Save";
    } else {
        label.innerText = editInput.value.trim();
        editInput.style.display = "none";
        label.style.display = "inline-block";
        editBtn.innerText = "Edit";
    }
};

const deleteTask = (event) => {
    console.log("Delete Task...");
    const listItem = event.target.closest("li");
    listItem.remove();
};

const taskCompleted = (event) => {
    console.log("Complete Task...");
    const listItem = event.target.closest("li");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = (event) => {
    console.log("Incomplete Task...");
    const listItem = event.target.closest("li");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = () => {
    console.log("AJAX Request");
};

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector("input[type='checkbox']");
    const editButton = taskListItem.querySelector(".edit");
    const deleteButton = taskListItem.querySelector(".delete");

    checkBox.addEventListener("change", checkBoxEventHandler);
    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);
};

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

[incompleteTaskHolder, completedTasksHolder].forEach((holder, index) => {
    const handler = index === 0 ? taskCompleted : taskIncomplete;
    Array.from(holder.children).forEach(item => bindTaskEvents(item, handler));
});