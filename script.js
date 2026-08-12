const addtaskBtns = document.querySelectorAll(".showTask");
const closebtns = document.querySelectorAll(".close-btn");

const submitbtn = document.getElementById("addbtn");
const inputBox = document.querySelector("#task-msg");
const taskStatus = document.querySelector("#task-status");
const time = document.querySelector("#time");
const taskList = document.querySelector("#task-list");
const taskForm = document.querySelector("#task-form");

const taskContainer = document.querySelector(".addTask-container");


// ========================================
// EDITING TASK ID
// ========================================

let editingTaskId = null;


// ========================================
// OPEN ADD TASK FORM
// ========================================

addtaskBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        taskContainer.classList.remove("show-container");

        // Make sure this is Add mode
        editingTaskId = null;

        submitbtn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Task
        `;

    });

});


// ========================================
// CLOSE FORM
// ========================================

closebtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        taskContainer.classList.add("show-container");

    });

});


// ========================================
// DISPLAY TASKS
// ========================================

function displayTasks() {

    const tasks = JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

    taskList.innerHTML = "";


    for (const task of tasks) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td class="task-heading">
                ${task.task}
            </td>

            <td>
                ${task.status}
            </td>

            <td>
                ${task.time || "No date"}
            </td>

            <td>

                <button
                    class="edit-btn"
                    data-id="${task.id}">
                    <span>
                        <i class="fa-solid fa-pen"></i>
                    </span>
                </button>

                <button
                    class="delete-btn"
                    data-id="${task.id}">
                    <span>
                        <i class="fa-solid fa-trash"></i>
                    </span>
                </button>

            </td>

        `;

        taskList.appendChild(row);
    }
}


// ========================================
// ADD / UPDATE TASK
// ========================================

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();


    // Validation

    if (inputBox.value.trim() === "") {

        alert("Please enter a task.");

        return;
    }


    // Get existing tasks

    const tasks = JSON.parse(
        localStorage.getItem("tasks")
    ) || [];


    // ====================================
    // UPDATE EXISTING TASK
    // ====================================

    if (editingTaskId !== null) {

        const task = tasks.find(
            (task) => task.id === editingTaskId
        );


        if (task) {

            task.task = inputBox.value.trim();

            task.status = taskStatus.value;

            task.time = time.value;

        }


        // Save updated tasks

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );


        // Reset edit mode

        editingTaskId = null;

        submitbtn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Task
        `;

    }


    // ====================================
    // ADD NEW TASK
    // ====================================

    else {

        const userTask = {

            id: Date.now(),

            task: inputBox.value.trim(),

            status: taskStatus.value,

            time: time.value

        };


        tasks.push(userTask);


        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }


    // Refresh table

    displayTasks();


    // Reset form

    taskForm.reset();


    // Close form

    taskContainer.classList.add("show-container");

});


// ========================================
// DELETE + EDIT
// ========================================

taskList.addEventListener("click", (e) => {


    // ====================================
    // DELETE BUTTON
    // ====================================

    const deleteBtn = e.target.closest(".delete-btn");


    if (deleteBtn) {

        const taskId = Number(
            deleteBtn.dataset.id
        );


        const tasks = JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


        const updatedTasks = tasks.filter(
            (task) => task.id !== taskId
        );


        localStorage.setItem(
            "tasks",
            JSON.stringify(updatedTasks)
        );


        displayTasks();

        return;
    }


    // ====================================
    // EDIT BUTTON
    // ====================================

    const editBtn = e.target.closest(".edit-btn");


    if (editBtn) {

        const taskId = Number(
            editBtn.dataset.id
        );


        const tasks = JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


        // Find selected task

        const task = tasks.find(
            (task) => task.id === taskId
        );


        if (!task) {
            return;
        }


        // Store ID of task being edited

        editingTaskId = task.id;


        // =================================
        // PUT TASK DATA INTO FORM
        // =================================

        inputBox.value = task.task;

        taskStatus.value = task.status;

        time.value = task.time;


        // =================================
        // CHANGE BUTTON
        // =================================

        submitbtn.innerHTML = `
            <i class="fa-solid fa-pen"></i>
            Update Task
        `;


        // =================================
        // OPEN FORM
        // =================================

        taskContainer.classList.remove(
            "show-container"
        );

    }

});


// ========================================
// INITIAL DISPLAY
// ========================================

displayTasks();