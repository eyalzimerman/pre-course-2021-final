const API_KEY = ''; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";


//function to update tasks in JSONBIN
function updateTaskToJSONBin () {
  let loader = addloader();
  ulList.style.visibility = 'hidden';
  taskDone.style.visibility = 'hidden';
  document.body.style.opacity = '0.5';
  fetch('http://localhost:3001/api/v3/b/1613733054301', {
  method: 'PUT',
  headers: {
  'Content-Type': 'application/json',
  'X-Master-Key': '$2b$10$3c8HlT7Mkm6Fmhp4/y0UveKGq8qFaFdTiTNKewqhEuXpQ9l7Itxdm',
},
  body: JSON.stringify({"my-todo": arrOfObjTasks}) 
}).then(res => {
  document.body.removeChild(loader);
  ulList.style.visibility = 'visible';
  taskDone.style.visibility = 'visible';
  document.body.style.opacity = '1';
  if (!res.ok) {
    let message = document.querySelector('.update-failed-message');
    message.style.visibility = 'visible';
    throw new Error('Failed To Update Local Host');
  }
  return res.json();
}).catch(error => {
  console.log(error);
});
}

//function to get tasks from JSONBIN   
function getTasksFromJSONBin() {
  let loader = addloader();
  ulList.style.visibility = 'hidden';
  taskDone.style.visibility = 'hidden';
  document.body.style.opacity = '0.5';
  fetch('http://localhost:3001/api/v3/b/1613733054301', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2b$10$3c8HlT7Mkm6Fmhp4/y0UveKGq8qFaFdTiTNKewqhEuXpQ9l7Itxdm",
    },
  }).then(res => {
    document.body.removeChild(loader);
    ulList.style.visibility = 'visible';
    taskDone.style.visibility = 'visible';
    document.body.style.opacity = '1';
    if (!res.ok) {
      let message = document.querySelector('.get-failed-message');
      message.style.visibility = 'visible';
      throw new Error('Failed To Update Local Host');
    }
    return res.json().then(data => {
      arrOfObjTasks = data["my-todo"];
      insertTasksFromJSONBINToHtml();
    })
  }).catch(error => {
    console.log(error);
  });
}
