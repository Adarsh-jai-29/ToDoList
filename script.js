const todoForm = document.querySelector(".form-todo");
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector(".todo-list");
const hamburgerIcon = document.querySelector(".hamburger");
const navItem = document.querySelector(".nav-items");

// Retrieve stored todos from localStorage
let storedTodo = localStorage.getItem("TodoData");
let userTodo = storedTodo ? JSON.parse(storedTodo) : [];

// Function to render the todo list
const renderTodos = (todos) => {
  todoList.innerHTML = ""; // Clear the list before re-rendering
  todos.forEach((todo) => {
    const newLi = document.createElement("li");
    const newLiInnerHtml = `
      <span class="text">${todo}</span>
      <div class="todo-buttons">
          <button class="todo-btn done">Done</button>
          <button class="todo-btn remove">Remove</button>
      </div>`;
    newLi.innerHTML = newLiInnerHtml;
    todoList.append(newLi);
  });
};

// Initial rendering of todos
renderTodos(userTodo);

// Add new todo
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoText = todoInput.value.trim();

  if (!newTodoText) {
    alert("Please enter a todo item");
    return;
  }

  userTodo.push(newTodoText); // Update the array
  localStorage.setItem("TodoData", JSON.stringify(userTodo)); // Save to localStorage
  renderTodos(userTodo); // Re-render the updated list
  todoInput.value = ""; // Clear the input field
});

// Event delegation for 'done' and 'remove' buttons
todoList.addEventListener("click", (e) => {
  const target = e.target;
  const targetedLi = target.closest("li");

  // Handle Remove button
  if (target.classList.contains("remove")) {
    const todoText = targetedLi.querySelector(".text").textContent;
    userTodo = userTodo.filter((item) => item !== todoText); // Remove from array
    localStorage.setItem("TodoData", JSON.stringify(userTodo)); // Update localStorage
    renderTodos(userTodo); // Re-render
  }

  // Handle Done button
  if (target.classList.contains("done")) {
    const liSpan = targetedLi.querySelector(".text");
    liSpan.style.textDecoration =
      liSpan.style.textDecoration === "line-through" ? "none" : "line-through";
  }
});

// Hamburger menu toggle
hamburgerIcon.addEventListener("click", () => {
  navItem.classList.toggle("active");
});
