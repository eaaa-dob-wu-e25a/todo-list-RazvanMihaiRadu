// todo3.js - DOM manipulation scaffolded, focus on JS logic

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Create and insert the clear completed button
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Completed';
  clearBtn.className = 'clear-btn';
  clearBtn.style.display = 'none';
  form.parentNode.insertBefore(clearBtn, list);

  // Counter elements (already created for you)
  const todoCount = document.createElement('div');
  todoCount.className = 'todo-count';
  form.parentNode.insertBefore(todoCount, list);

  const completedCount = document.createElement('div');
  completedCount.className = 'completed-count';
  form.parentNode.insertBefore(completedCount, list);

  // Add a button for toggling all complete
  const toggleAllBtn = document.createElement('button');
  toggleAllBtn.textContent = 'Toggle All Complete';
  toggleAllBtn.className = 'toggle-all-btn';
  form.parentNode.insertBefore(toggleAllBtn, list);
  toggleAllBtn.addEventListener('click', function() {
    toggleAllComplete();
    updateClearButton();
    updateAllCounters();
  });

  // Event: Add todo
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const task = input.value.trim();
    if (task) {
        // TODO: write code to take the `task` and add it to the `list` variable defined at the top
        addTodo(task);
        input.value = '';
        updateClearButton();
    }
    updateAllCounters();
  });

  // Event: Clear completed
  clearBtn.addEventListener('click', function() {
    clearCompleted();
    updateClearButton();
    updateAllCounters();
  });

  // Add a todo item to the list
  function addTodo(task) {
    // DOM is handled for you:
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'task-text';
    li.appendChild(taskText);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    li.appendChild(delBtn);
    list.appendChild(li);

    // Event: Mark as complete
    taskText.addEventListener('click', function() {
      markAsComplete(li);
      updateClearButton();
      updateAllCounters();
    });
    // Event: Delete
    delBtn.onclick = function() {
      list.removeChild(li);
      updateClearButton();
      updateAllCounters();
    };
    // Event: Edit
    taskText.ondblclick = function() {
      editTodo(li);
    };
  }

  // Mark a todo item as completed
  function markAsComplete(todoItem) {
    if (todoItem.classList.contains('completed')) {
      todoItem.classList.remove('completed');
    } else {
      todoItem.classList.add('completed');
    }
    // TODO: Toggle the 'completed' class on todoItem
    // Hit: if (todoItem.classList.contains('completed')) { ... }
  }

  // Remove all completed tasks from the list
  function clearCompleted() {
    const completedItems = list.querySelectorAll('.completed');
    completedItems.forEach(item => list.removeChild(item));
    // TODO: Remove all items with the 'completed' class from the list
    // Hint: Use a loop to check each child of the list constant at the top of the document
  }

  // Show/hide the clear completed button
  function updateClearButton() {
    const completedItems = list.querySelectorAll('.completed');
    clearBtn.style.display = completedItems.length > 0 ? 'block' : 'none';
  }

  // Call update counters whenever the list changes
  function updateAllCounters() {
    updateTodoCount();
    updateCompletedCount();
    updateNoTodosMessage();
  }

  // Count and display the number of todos
  function updateTodoCount() {
    const todos = list.children.length;
    todoCount.textContent = 'Todos: ' + todos;
    // TODO: Count how many todo items are in the list
    // Hint: count the todos using a for each loop and save it in a variable x. Then use the below code to set the todoCount counter
    // Set todoCount.textContent = 'Todos: ' + x;
  }

  // Count and display the number of completed todos
  function updateCompletedCount() {
    const completedItems = list.querySelectorAll('.completed').length;
    completedCount.textContent = 'Completed: ' + completedItems;
    // TODO: Count how many todo items have the 'completed' class
    // Set completedCount.textContent = 'Completed: Y';
  }

  // Show a message if there are no todos left
  function updateNoTodosMessage() {
    if (list.children.length === 0) {
      todoCount.textContent = 'No todos left!';
    }
    // TODO: If there are no todos, show a message (e.g. 'No todos left!')
    // You can use todoCount.textContent for this, or create a new element
  }

  /**
   * Edits the text of a todo item
   * @param {HTMLElement} todoItem - The todo item to edit
   */
  function editTodo(todoItem) {
    if (todoItem.classList.contains('completed')) {
      return; // Do not allow editing completed tasks
    }
    const taskText = todoItem.querySelector('.task-text');
  const oldValue = taskText.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldValue;
  input.className = 'edit-input';
  todoItem.replaceChild(input, taskText);
  input.focus();
  input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const newValue = input.value.trim();
    if (newValue) {
      taskText.textContent = newValue;
    }
    todoItem.replaceChild(taskText, input);
  }
  if (e.key === 'Escape') {
    todoItem.replaceChild(taskText, input); // Cancel edit
  }
});
input.addEventListener('blur', function() {
  const newValue = input.value.trim();
  if (newValue) {
    taskText.textContent = newValue;
  }
  todoItem.replaceChild(taskText, input);
});
    // TODO: Allow editing the todo text
    // Hint: Use an input field and save changes on Enter
    // Use if statements to check for events
  }

  /**
   * Toggles all todos as completed or not completed
   */
  function toggleAllComplete() {
    const allItems = list.children;
    const allCompleted = Array.from(allItems).every(item => item.classList.contains('completed'));
    Array.from(allItems).forEach(item => {
      if (allCompleted) {
        item.classList.remove('completed');
      } else {
        item.classList.add('completed');
      }
    });
    // TODO: Use a loop to go through all todo items
    // Use if statements to check and toggle the 'completed' class
  }
});
