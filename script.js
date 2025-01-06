const todoForm = document.querySelector(".form-todo");
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector(".todo-list");
const hamburgerIcon = document.querySelector(".hamburger");
const navItem = document.querySelector(".nav-items");

// console.log(todoForm)
const storedTodo = localStorage.getItem('TodoData')
const storedTodoArr = storedTodo.split(',')
// console.log(storedTodoArr)

const userTodo = [...storedTodoArr]
 
storedTodoArr && 
storedTodoArr.map((curElem)=>{
  const newLi = document.createElement("li");
  const newLiInnerHtml = `
        <span class="text">${curElem}</span>
        <div class="todo-buttons">
            <button class="todo-btn done">Done</button>
            <button class="todo-btn remove">Remove</button>
        </div>`;
        newLi.innerHTML = newLiInnerHtml;
        todoList.append(newLi);
 })

todoForm.addEventListener("submit", (e) => {
  if (!todoInput.value) {
    alert("Please enter a todo item");
    return;
  }
  e.preventDefault();
  const newTodoText = todoInput.value;
  const newLi = document.createElement("li");
  const newLiInnerHtml = `
        <span class="text">${newTodoText}</span>
        <div class="todo-buttons">
            <button class="todo-btn done">Done</button>
            <button class="todo-btn remove">Remove</button>
        </div>`;
        
        newLi.innerHTML = newLiInnerHtml;
        todoList.append(newLi);
        userTodo.push(todoInput.value)

        // storing data in localStorage
    localStorage.setItem('TodoData',userTodo)
    todoInput.value = "";
});

todoList.addEventListener("click", (e) => {
  // check if user clicked on remove button
  if (e.target.classList.contains("remove")) {
    const targetedLi = e.target.parentNode.parentNode;
    targetedLi.remove();
    const todoText = targetedLi.children[0].textContent
    const updatedTodos = userTodo.filter((item) => item !== todoText);

    // Update the userTodo array and save it back to localStorage
    localStorage.setItem('TodoData', updatedTodos);
    userTodo.length = 0; // Clear the original array
    userTodo.push(...updatedTodos); // Repopulate the array with the updated items
  }
    
  
  // check if user clicked on done button
  if (e.target.classList.contains("done")) {
    const liSpan = e.target.parentNode.previousElementSibling;
    liSpan.style.textDecoration = "line-through";
  }
});

hamburgerIcon.addEventListener("click", () => {
  navItem.classList.toggle('active');
});