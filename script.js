//Fetch dom elements and set variables
let todoItems = document.getElementById("todo-items"),
  todoInput = document.getElementById("todo-input"),
  todoForm = document.getElementById("todo-form"),
  todoSearch = document.getElementById("todo-search"),

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

