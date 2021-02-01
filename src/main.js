"use strict";

//basic variables
const addBtn = document.querySelector('#add-button');
const textInput = document.querySelector('#text-input');
const prioritySelector = document.querySelector('#priority-selector');
const ulList = document.querySelector('ul');
const sortBtn = document.querySelector('#sort-button');
const counterTitle = document.querySelector('#counter');
const counterText = document.querySelector('#counter-text');
const undoBtn = document.querySelector('#undo-button');
const taskDone = document.querySelector('#task-done');
const resetData = document.querySelector('#reset-data');
let counter = 0;
let counterDone = 0;
let arrOfObjTasks = [];
let arrOfDeletedTodo = [];
counterTitle.innerHTML = 'No Tasks To Do';

//event listeners
document.addEventListener('DOMContentLoaded', getTasksFromJSONBin);
addBtn.addEventListener('click', addTodo);
sortBtn.addEventListener('click', sortTodoList);
undoBtn.addEventListener('click', undoDelete);
resetData.addEventListener('click', resetAllData);

//add todo task
function addTodo (e) {
    let inputValue = textInput.value;
    if (inputValue != "") {
        textInput.value = '';  //reset the input line
        
        let date = new Date();
        let dateSQLFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
       
        createTasks(prioritySelector.value, inputValue, dateSQLFormat);

        const taskObj = {
            text: inputValue,
            priority: prioritySelector.value,
            taskCreatedAt: dateSQLFormat
        }

        arrOfObjTasks.push(taskObj);
        counter++;
        taskDone.innerText = `You Did ${counterDone}/${counter} Tasks`;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Need Write A Task',
        });
    }

    textInput.focus();
    counterTasks(counter);
    updateTaskToJSONBin();
}

//function to delete tasks
function deleteTodo (e) {
    let deletedDiv = e.target.parentElement;
    const deletedTask = {
        text: deletedDiv.querySelector('.todo-text').innerText,
        priority: deletedDiv.querySelector('.todo-priority').innerText,
        taskCreatedAt: deletedDiv.querySelector('.todo-created-at').innerText
    }
    arrOfDeletedTodo.push(deletedTask);

    const deletedObj = deletedDiv.querySelector('.todo-created-at').innerText;
    arrOfObjTasks = arrOfObjTasks.filter(taskObj => taskObj.taskCreatedAt != deletedObj);
    counter--;

    //updating the title of how tasks you did
    if (deletedDiv.className === 'todo-container completed') {
        counterDone--; 
        taskDone.innerText = `You Did ${counterDone}/${counter} Tasks`;
    }
    if (deletedDiv.className != 'todo-container completed') {
        taskDone.innerText = `You Did ${counterDone}/${counter} Tasks`;
    }
    deletedDiv.remove();
    counterTasks(counter);
    textInput.focus();
    updateTaskToJSONBin();
}

//function to sort the todo list by priority
function sortTodoList (e) {
    let arrOfPriority = document.querySelectorAll('.todo-priority');
    let sortArr = [];
    for (let i = 1; i <= 5; i++) {
        for (let j = 0; j < arrOfPriority.length; j++) {
            if (i.toString() === arrOfPriority[j].innerText) {
                sortArr.push(arrOfPriority[j].parentElement);
                ulList.removeChild(arrOfPriority[j].parentElement);
            }
        }
    }
    for (let k = sortArr.length - 1; k >= 0; k--) {
        ulList.appendChild(sortArr[k]);
    }
    textInput.focus();
}

//function to count how much tasks you have 
function counterTasks (count) {
    if (count === 0) {
        counterTitle.innerHTML = 'No Tasks To Do';
        counterText.innerText = '';
    } else {
        counterTitle.innerHTML = `${count}`;
        counterText.innerText = 'Tasks To Do';
    }
}

//function to update tasks in JSONBIN
async function updateTaskToJSONBin () {
    fetch('https://api.jsonbin.io/v3/b/6015e6c1abdf9c5567951e2d', {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': '$2b$10$3c8HlT7Mkm6Fmhp4/y0UveKGq8qFaFdTiTNKewqhEuXpQ9l7Itxdm',
  },
    body: JSON.stringify({"my-todo": arrOfObjTasks}) 
});
}

//function to get tasks from JSONBIN   
async function getTasksFromJSONBin() {
    let response = await fetch('https://api.jsonbin.io/v3/b/6015e6c1abdf9c5567951e2d/latest', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "$2b$10$3c8HlT7Mkm6Fmhp4/y0UveKGq8qFaFdTiTNKewqhEuXpQ9l7Itxdm",
      },
    });
    let data = await response.json();
    arrOfObjTasks = data.record["my-todo"];
    insertTasksFromJSONBINToHtml();
}

//function to insert data from JSONBIN to HTML
function insertTasksFromJSONBINToHtml () {
    for (let i = 0; i < arrOfObjTasks.length; i++) {
        createTasks(arrOfObjTasks[i].priority, arrOfObjTasks[i].text, arrOfObjTasks[i].taskCreatedAt);
    }

    counterTasks(arrOfObjTasks.length);
    counter = arrOfObjTasks.length;
    taskDone.innerText = `You Did ${counterDone}/${counter} Tasks`;
    textInput.focus();
}

//function to check button - did or not did
function checkTask (e) {
    const complete = e.target.parentElement;
    complete.classList.toggle('completed');
    if (complete.className === 'todo-container completed') {
        counterDone++; 
        taskDone.innerText = `You Did ${counterDone}/${counter} Tasks`;
    }
    if (complete.className != 'todo-container completed') {
        counterDone--;
        taskDone.innerText = `You Did ${counterDone}/${counter} Tasks`;
    }
    textInput.focus(); 
}

//loader function
$(window).load(function() {
    $(".se-pre-con").fadeOut("medium");
});

//function to undo deleted task
function undoDelete (e) {
    if(arrOfDeletedTodo.length > 0) {

        let backTodo = arrOfDeletedTodo.pop();  
        createTasks(backTodo.priority, backTodo.text, backTodo.taskCreatedAt);
       
        const taskObjBack = {
            text: backTodo.text,
            priority: backTodo.priority,
            taskCreatedAt: backTodo.taskCreatedAt
        }

        arrOfObjTasks.push(taskObjBack);
        counterTasks(arrOfObjTasks.length);
        counter = arrOfObjTasks.length;
        taskDone.innerText = `You Did ${counterDone}/${counter} Tasks`;
        textInput.focus();
        updateTaskToJSONBin();
    }
    textInput.focus();
}

//function to create task and insert to Html
function createTasks (onePriority, texts, time) {
    const todoContainer = document.createElement('div');  //todo task container in div
    const todoPriority = document.createElement('div');  //todo priority in div
    const todoCreatedAt = document.createElement('div');  //time to do created in div
    const todoText = document.createElement('div');  //todo task text in div
    const deleteBtn = document.createElement('button');  //delete button
    const checkBtn = document.createElement('input');  //checkbox

    todoContainer.className = 'todo-container';
    todoText.className = 'todo-text';
    todoCreatedAt.className = 'todo-created-at';
    todoPriority.className = 'todo-priority';
    deleteBtn.className = 'delete-button';
    checkBtn.className = 'check-button';

    todoCreatedAt.innerText = time;
    todoText.innerText = texts;
    todoPriority.innerText = onePriority;
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    checkBtn.setAttribute('type', 'checkbox');

    todoContainer.append(todoPriority, todoText, todoCreatedAt, checkBtn, deleteBtn);
    ulList.append(todoContainer);

    deleteBtn.addEventListener('click', deleteTodo);
    checkBtn.addEventListener('click', checkTask);

    prioritySelector.value = 1;
}

//function to reset all page and delete all tasks
function resetAllData (e) {
    Swal.fire({
        title: 'Are you sure You Want Delete The File?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00cc00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((alertMessage) => {
        if (alertMessage.isConfirmed) {
            counter = 0;
            counterDone = 0;
            taskDone.innerText = `You Did ${counterDone}/${counter} Tasks`;
            let resetTasks = ulList.querySelectorAll('.todo-container');
            for (let i = 0; i < resetTasks.length; i++) {
                resetTasks[i].remove();
                textInput.focus();
            }
            arrOfObjTasks = [];
            counterTasks(counter);
            updateTaskToJSONBin();
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
        };
    });
}