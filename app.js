class Todo {
  constructor(newTask) {
    this.newTask = newTask;
  }
}

class UI {
  addTaskToUI(todo) {
    // Create a task list 
    const taskList = document.querySelector('.menu-list');

    // Create list item
    const li = document.createElement('li');
    li.className = 'li-task';

    // Method 1 using innerHTML
    // li.innerHTML = `
    //   <p class="control has-icons-right">
    //     <input class="input pl-2 is-static" value=${task} readonly>
    //     <span class="icon pr-2 is-right">
    //       <i class="delete is-small"></i>
    //     </span>
    //   </p>
    // `;

    // Method 2 using js
    const liChild = document.createElement('p');
    liChild.className = 'control has-icons-right';

    const liChildChild1 = document.createElement('input');
    liChildChild1.className = 'input pl-2 is-static';
    liChildChild1.value = todo.newTask;
    liChildChild1.readOnly;

    const liChildChild2 = document.createElement('span');
    liChildChild2.className = 'icon pr-2 is-right';

    const liChildChild2Child = document.createElement('i');
    liChildChild2Child.className = 'delete is-small';

    liChildChild2.appendChild(liChildChild2Child);
    liChild.appendChild(liChildChild1);
    liChild.appendChild(liChildChild2);
    li.appendChild(liChild);

    taskList.appendChild(li);
  }

  clearInputFieldsInUI() {
    document.getElementById('input-new-task').value = '';
    document.getElementById('input-filter-tasks').value = '';
  }

  notify(message, className) {
    // Create a notification div
    const notification = document.createElement('div');
    notification.className = `notification is-light ${className}`;
    notification.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');

    // Insert alert in container
    const cardInput = document.querySelector('#card-input');
    container.insertBefore(notification, cardInput);

    // Timeout after 2 sec
    setTimeout(function () {
      document.querySelector('.notification').remove();
    }, 2000);
  }

  deleteTask(delItem) {
    // delItem = delete icon, remove parent li element
    if (delItem.classList.contains('delete')) {
      delItem.parentElement.parentElement.parentElement.remove();
    }
  }

  clearTasks() {
    let menuList = document.getElementById('ul-tasks');
    while (menuList.firstChild) {
      menuList.removeChild(menuList.firstChild);
    }
  }
}

class Storage {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static displayTasks() {
    const tasks = Storage.getTasks();

    tasks.forEach(function (task) {
      const ui = new UI;

      // Add task to UI
      ui.addTaskToUI(task);
    });
  }

  static addTaskToLS(task) {
    const tasks = Storage.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static deleteTask(delItem) {
    const tasks = Storage.getTasks();
    tasks.forEach(function (task, index) {
      if (Object.values(task)[0] === delItem) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static clearTasks() {
    localStorage.clear();
  }

}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Storage.displayTasks);

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
    ui.addTaskToUI(todo);
    // Add to Local Storage
    Storage.addTaskToLS(todo);
    // Show success
    ui.notify('Task added!', 'is-success');
    // Clear fields after reading
    ui.clearInputFieldsInUI();
  }

  e.preventDefault();
});

// Event listener for delete task
document.getElementById('ul-tasks').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteTask(e.target);

  // Remove from Local Storage
  Storage.deleteTask(e.target.parentElement.parentElement.firstChild.value);
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

  // Clear from Local Storage
  Storage.clearTasks();

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