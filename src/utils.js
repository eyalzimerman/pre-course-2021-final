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
  if (!res.ok) {
    throw new Error('failed to update json.bin');
  }
  document.body.removeChild(loader);
  ulList.style.visibility = 'visible';
  taskDone.style.visibility = 'visible';
  document.body.style.opacity = '1';
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
    if (!res.ok) {
      throw new Error('failed to get from json.bin');
    }
    document.body.removeChild(loader);
    ulList.style.visibility = 'visible';
    taskDone.style.visibility = 'visible';
    document.body.style.opacity = '1';
    return res.json().then(data => {
      arrOfObjTasks = data["my-todo"];
      insertTasksFromJSONBINToHtml();
    })
  }).catch(error => {
    console.log(error);
  });
}
