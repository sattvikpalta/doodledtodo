// Event listener for add task
document.getElementById('form-new-task').addEventListener('submit', function (e) {
  const newTask = document.getElementById('input-new-task').value;
  const todo = new Todo(newTask);
  const ui = new UI();

  if (!newTask) {
    // Show error
    ui.notify('Please add a task.', 'is-danger');
  } else {
    // Add task  to list
    ui.addTask(todo);
    // Show success
    ui.notify('Task added!', 'is-success');
    // Clear fields after reading
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete task
document.getElementById('ul-tasks').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteTask(e.target);
});

// Event listener for clear tasks
document.getElementById('form-display-task').addEventListener('submit', function (e) {
  const ui = new UI();
  if (!document.getElementById('ul-tasks').firstChild) {
    ui.notify('Nothing to clear.', 'is-danger');
  } else {
    ui.clearTasks();
    ui.notify('Tasks cleared!', 'is-success');
  }

  e.preventDefault();
});

// Event listener for filter tasks
document.getElementById('input-filter-tasks').addEventListener('keyup', function (e) {
  // Storing everything a user types in variable 
  const textInFilter = e.target.value.toLowerCase();

  // Select everything in li
  document.querySelectorAll('.li-task').forEach(function (li) {
    liText = li.firstChild.firstChild.value;

    // li value in lowercase if not equal to text input by user will return -1
    if (liText.toLowerCase().indexOf(textInFilter) != -1) {
      li.style.display = 'block'
    } else {
      li.style.display = 'none';
    }
  });
});