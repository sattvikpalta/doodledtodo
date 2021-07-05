class UI {
  addTask(todo) {
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

  clearFields() {
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