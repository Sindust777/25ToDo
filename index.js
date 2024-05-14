console.log('My code is running');

// Selecting elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const archivedList = document.getElementById('archived-list');

// Function to load todos from local storage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
}

// Load todos from local storage
let todos = loadTodos();

// Function to render todos
function renderTodos() {
    todoList.innerHTML = '';
    archivedList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the parent click event
            deleteTodo(index);
        });

        todoItem.appendChild(deleteBtn);

        if (todo.completed) {
            todoItem.classList.add('completed');
            archivedList.appendChild(todoItem);
        } else {
            todoItem.addEventListener('click', () => toggleCompleted(index));
            todoList.appendChild(todoItem);
        }
    });
}

// Function to save todos to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to add a new todo
function addTodo(todoText) {
    todos.push({ text: todoText, completed: false });
    saveTodos();
    renderTodos();
}

// Function to toggle todo completion
function toggleCompleted(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Event listener for form submission
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        addTodo(todoText);
        todoInput.value = '';
    }
});

// Initial rendering of todos
renderTodos();
