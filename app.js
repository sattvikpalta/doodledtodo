const form = document.getElementById('form');
const input = document.getElementById('input');
const ulTodos = document.getElementById('ulTodos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const liTodo = document.createElement('li');
    if (todo && todo.completed) {
      liTodo.classList.add('completed');
    }

    liTodo.innerText = todoText;

    liTodo.addEventListener('click', () => {
      liTodo.classList.toggle('completed')
      updateLocalStorage();
    });

    liTodo.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      liTodo.remove();
      updateLocalStorage();
    });

    ulTodos.appendChild(liTodo);

    input.value = '';

    updateLocalStorage();
  }
}

// Save to local storage
function updateLocalStorage() {
  liTodos = document.querySelectorAll('li');

  const todos = [];

  liTodos.forEach(liTodo => {
    todos.push({
      text: liTodo.innerText,
      completed: liTodo.classList.contains('completed')
    })
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}