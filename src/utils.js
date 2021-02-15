const API_KEY = ''; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";


//function to update tasks in JSONBIN
function updateTaskToJSONBin () {
  fetch('https://api.jsonbin.io/v3/b/6015e6c1abdf9c5567951e2d', {
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
  return res.json();
}).catch(error => {
  console.log(error);
});
}

//function to get tasks from JSONBIN   
function getTasksFromJSONBin() {
  fetch('https://api.jsonbin.io/v3/b/6015e6c1abdf9c5567951e2d/latest', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2b$10$3c8HlT7Mkm6Fmhp4/y0UveKGq8qFaFdTiTNKewqhEuXpQ9l7Itxdm",
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error('failed to update json.bin');
    }
    return res.json().then(data => {
      arrOfObjTasks = data.record["my-todo"];
      insertTasksFromJSONBINToHtml();
    })
  }).catch(error => {
    console.log(error);
  });
}
