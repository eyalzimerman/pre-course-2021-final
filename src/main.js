"use strict";

//basic variables
const addBtn = document.querySelector('#add-button');
const textInput = document.querySelector('#text-input');
const prioritySelector = document.querySelector('#priority-selector');
const ulList = document.querySelector('ul');
const sortBtn = document.querySelector('#sort-button');
let counterTitle = document.querySelector('#counter');
counterTitle.innerHTML = 'No Tasks To Do';
let counter = 0;

//event listeners
document.addEventListener('DOMContentLoaded', getDataFromLocalStorage);
addBtn.addEventListener('click', addTodo);
sortBtn.addEventListener('click', sortTodoList);

//add todo item
function addTodo (e) {
    let inputValue = textInput.value;
    if (inputValue != "") {
        textInput.value = '';  //reset the input line
        const todoContainer = document.createElement('div');  //todo task container in div
        const todoPriority = document.createElement('div');  //todo priority in div
        const todoCreatedAt = document.createElement('div');  //time to do created in div
        const todoText = document.createElement('div');  //todo task text in div
        const deleteBtn = document.createElement('button');

        todoContainer.className = 'todo-container';
        todoText.className = 'todo-text';
        todoCreatedAt.className = 'todo-created-at';
        todoPriority.className = 'todo-priority';
        deleteBtn.className = 'delete-button';

        let date = new Date();
        todoCreatedAt.innerText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        todoText.innerText = inputValue;
        todoPriority.innerText = prioritySelector.value;
        deleteBtn.innerText = 'Delete';

        todoContainer.append(todoPriority, todoText, todoCreatedAt, deleteBtn);
        ulList.append(todoContainer);
        saveLocalStorage(ulList);
        prioritySelector.value = 1;
    } else {
        alert('WRITE A TASK!');
    }
    textInput.focus();
    counter++;
    counterTasks(counter);
}

//sort the todo list by priority
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
}


//save to local storage
function saveLocalStorage () {
    let todos = ulList.querySelectorAll('.todo-container');
    let arrOfAllTasks = [];
    for (let i = 0; i < todos.length; i++) {
        let arrTask = [];
        arrTask[0] = todos[i].getElementsByClassName('todo-priority')[0].innerText;
        arrTask[1] = todos[i].getElementsByClassName('todo-text')[0].innerText;
        arrTask[2] = todos[i].getElementsByClassName('todo-created-at')[0].innerText;
        arrOfAllTasks.push(arrTask);
    }
    let JSONReadyArr = JSON.stringify(arrOfAllTasks);
    localStorage.setItem("tasks", JSONReadyArr);
}

// get data from local storage
function getDataFromLocalStorage () {
    if (localStorage.tasks) {
        let arrOfAllTasksBack = JSON.parse(localStorage.getItem("tasks"));
        for (let i = 0; i < arrOfAllTasksBack.length; i++) {
            const todoContainer = document.createElement('div');  //todo task container in div
            const todoPriority = document.createElement('div');  //todo priority in div
            const todoCreatedAt = document.createElement('div');  //time to do created in div
            const todoText = document.createElement('div');  //todo task text in div
            const deleteBtn = document.createElement('button');

            todoContainer.className = 'todo-container';
            todoText.className = 'todo-text';
            todoCreatedAt.className = 'todo-created-at';
            todoPriority.className = 'todo-priority';
            deleteBtn.className = 'delete-button';

            todoPriority.innerText = arrOfAllTasksBack[i][0];
            todoText.innerText = arrOfAllTasksBack[i][1];
            todoCreatedAt.innerText = arrOfAllTasksBack[i][2];
            deleteBtn.textContent = 'Delete';
            
            todoContainer.append(todoPriority, todoText, todoCreatedAt, deleteBtn);
            ulList.appendChild(todoContainer);
        }
            localStorage.setItem("tasks", JSON.stringify(arrOfAllTasksBack));
            counterTasks(arrOfAllTasksBack.length);
            counter = arrOfAllTasksBack.length;
    } else {
        localStorage.setItem("tasks", []);
    }
}

function counterTasks (count) {
    if (count === 0) {
        counterTitle.innerHTML = 'No Tasks To Do';
    } else {
        counterTitle.innerHTML = `${count}`;
    }
}