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
    todoForm.reset();
  }
}
