"use strict";

//basic variables
const addBtn = document.querySelector('#add-button');
const textInput = document.querySelector('#text-input');
const prioritySelector = document.querySelector('#priority-selector');
const ulList = document.querySelector('ul');

//event listeners
addBtn.addEventListener('click', addTodo);

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
        todoCreatedAt.innerHTML = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        todoText.innerHTML = inputValue;
        todoPriority.innerHTML = prioritySelector.value;

        todoContainer.append(todoPriority, todoText, todoCreatedAt);
        ulList.append(todoContainer);
    }
    textInput.focus();
}