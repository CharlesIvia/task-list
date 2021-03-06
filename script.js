//Fetch dom elements and set variables
let todoItems = document.getElementById("todo-items"),
  todoInput = document.getElementById("todo-input"),
  todoForm = document.getElementById("todo-form"),
  todoSearch = document.getElementById("todo-search");

//Add event listerners

todoItems.addEventListener("click", removeItem);
todoForm.addEventListener("submit", addTodo);
todoSearch.addEventListener("keyup", searchItem);
document.addEventListener("DOMContentLoaded", loadItems);

//Functions

//Remove item

function removeItem(e) {
  if (e.target.classList.contains("btn")) {
    let item = e.target.parentElement;

    //remove item from local storage

    removeFromLocalStorage(item);

    //remove from dom

    item.remove();
  }
}

//Add todo item

function addTodo(e) {
  e.preventDefault();

  let todo = todoInput.value;

  if (todo != "") {
    //Create a list item

    let li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = todo;

    //Create close(X) button and append it to "li"

    let xBtn = document.createElement("button");
    xBtn.className = "btn btn-dark btn-sm float-right";
    xBtn.textContent = "X";
    li.appendChild(xBtn);

    //Append todo  item to list

    todoItems.appendChild(li);
    todoForm.reset();

    //append todo item to local storage

    addToLocalStorage(todo);
    checkLocalStorage();
  }
}

//Search logic

function searchItem() {
  let searchInput = todoSearch.value.toUpperCase();
  let items = todoItems.getElementsByTagName("li");
  for (let i = 0; 0 < items.length; i++) {
    let val = items[i].textContent.toUpperCase();
    if (val.indexOf(searchInput) != -1) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
}

//Add to Local storage

function addToLocalStorage(todo) {
  let storageItems = getFromLocalStorage();
  storageItems.push(todo);
  localStorage.setItem("todo", JSON.stringify(storageItems));
}

//Fetch from local storage

function getFromLocalStorage() {
  let items = localStorage.getItem("todo");
  if (items === null) {
    items = [];
  } else {
    items = JSON.parse(items);
  }

  return items;
}

//Remove items from local storage

function removeFromLocalStorage(todo) {
  let liValue = todo.firstChild.textContent;
  let storageArray = getFromLocalStorage();
  storageArray.forEach((item, index) => {
    if (item === liValue) {
      storageArray.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(storageArray));
    }
    checkLocalStorage();
  });
}

///Load items from local storage

function loadItems() {
  todoInput.focus();
  let items = getFromLocalStorage();
  checkLocalStorage();
  items.forEach((item) => {
    if (item != "") {
      //create li

      let li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = item;

      //Create "X" close btn

      let btn = document.createElement("button");
      btn.className = "btn btn-dark btn-sm float-right";
      btn.textContent = "X";

      li.appendChild(btn);
      todoItems.appendChild(li);
    }
  });
}

//Check local storage

function checkLocalStorage() {
  let arr = getFromLocalStorage();
  if (arr.length != 0) {
    todoItems.parentElement.style.display = "block";
  } else {
    todoItems.parentElement.style.display = "none";
  }
}
