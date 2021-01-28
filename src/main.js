"use strict";

//basic variables
const addBtn = document.querySelector('#add-button');
const textInput = document.querySelector('#text-input');
const prioritySelector = document.querySelector('#priority-selector');
const ulList = document.querySelector('ul');
const sortBtn = document.querySelector('#sort-button');

//event listeners
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
        
        todoContainer.className = 'todo-container';
        todoText.className = 'todo-text';
        todoCreatedAt.className = 'todo-created-at';
        todoPriority.className = 'todo-priority';
        
        let date = new Date();
        todoCreatedAt.innerText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        todoText.innerText = inputValue;
        todoPriority.innerText = prioritySelector.value;

        todoContainer.append(todoPriority, todoText, todoCreatedAt);
        ulList.append(todoContainer);
        prioritySelector.value = 1;
    } else {
        alert('WRITE A TASK!');
    }
    textInput.focus();
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