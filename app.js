alert("Привет уважаемый проверяющий! К сожалению, я не до конца успел доделать задание до дедлайна, поэтому прикрепил ссылку на деплой, а не на PR. Вижу, что за это штраф в виде всех баллов. Я конечно доделаю задание в ближайшие дни и сделаю PR. Так как я нарушил условие таска, оценку в 0 баллов, я буду считать это справедливой. Спасибо за внимание!");
// Accessing DOM elements
const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incompletetasks");
const completedTasksHolder = document.getElementById("completed-tasks");

// Function to create a new task list item
const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    const label = document.createElement("label");
    label.innerText = taskString;
    label.className = 'task';

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task";

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    // Append elements to the list item
    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
}

// Function to add a new task
const addTask = () => {
    console.log("Add Task...");
    if (!taskInput.value) return;

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

// Function to edit an existing task
const editTask = function() {
    console.log("Edit Task...");
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");
    const isEditMode = listItem.classList.contains("editMode");

    if (isEditMode) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

// Function to delete a task
const deleteTask = function() {
    console.log("Delete Task...");
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

// Function to mark a task as completed
const taskCompleted = function() {
    console.log("Complete Task...");
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Function to mark a task as incomplete
const taskIncomplete = function() {
    console.log("Incomplete Task...");
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

// Function to handle AJAX requests (placeholder)
const ajaxRequest = () => {
    console.log("AJAX Request");
}

// Function to bind events to task list items
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    console.log("Bind list item events");
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

// Set up event listeners
addButton.onclick = addTask;
addButton.addEventListener("click", ajaxRequest);

// Bind events for existing tasks in the incomplete and completed lists
Array.from(incompleteTaskHolder.children).forEach(item => {
    bindTaskEvents(item, taskCompleted);
});

Array.from(completedTasksHolder.children).forEach(item => {
    bindTaskEvents(item, taskIncomplete);
});

// Note: Prevent creation of empty tasks and change edit to save when in edit mode.
