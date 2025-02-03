//MADE THIS TO DO LIST FUNCTIONALITY USING ONLY DOM CONCEPTS




const main = document.querySelector(".main");
const addSpace = document.querySelector(".add");
const taskData = document.querySelector(".data");
const taskItem = document.querySelector(".task-item");
const taskBlock = document.querySelector(".task");
const headingInput = document.querySelector(".headingInput");
const addTodoBtn = document.querySelector(".addtodobtn");
const todoApp = document.querySelector(".todoapp");
const todoSpace = document.querySelector(".todospace");
//sidebar space

//newtaskline and data entry
function dataEntry(event) {
  if (event.key === "Enter" && taskData.value.trim() !== "") {
    const newTaskItem = document.createElement("li");
    newTaskItem.classList.add("task-item");
    const taskText = document.createElement("div");
    taskText.innerText = taskData.value.trim();
    taskText.classList.add("taskText");
    const divLeft = document.createElement("div");
    divLeft.style.display = "flex";
    newTaskItem.appendChild(divLeft);
    taskBlock.appendChild(newTaskItem);
    taskData.value = "";

    const newDeleteDiv = document.createElement("div");
    newDeleteDiv.classList.add("delete");
    const newDelete = document.createElement("i");
    newDelete.classList.add('fa-solid', 'fa-circle-xmark');
    newDeleteDiv.appendChild(newDelete);
    newTaskItem.appendChild(newDeleteDiv);
    
    const newUncheckedDiv = document.createElement("div");
    newUncheckedDiv.classList.add("uncheckedDiv");
    const newUnchecked = document.createElement("i");
    newUnchecked.classList.add('fa-regular', 'fa-circle', 'unchecked');
    newUncheckedDiv.appendChild(newUnchecked);
    divLeft.classList.add("divLeft");
    divLeft.insertBefore(newUncheckedDiv, divLeft.firstChild);
    divLeft.appendChild(taskText);

    newDelete.addEventListener("click", () => {
      newTaskItem.remove();
    });

    newUncheckedDiv.addEventListener("click", () => {
      if (newUnchecked.classList.contains('unchecked')) {
        newUnchecked.classList.remove('fa-regular', 'fa-circle', 'unchecked');
        const newChecked = document.createElement("div");
        newChecked.classList.add("checked");
        newUncheckedDiv.appendChild(newChecked);
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "grey";
      } else {
        newUnchecked.classList.add('fa-regular', 'fa-circle', 'unchecked');
        const existingChecked = newUncheckedDiv.querySelector(".checked");
        if (existingChecked) {
          newUncheckedDiv.removeChild(existingChecked);
          taskText.style.textDecoration = "none";
          taskText.style.color = "white";
        }
      }
    });
  }
}

headingInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && headingInput.value.trim() !== "") {
    setTimeout(() => taskData.focus(), 0);
    headingInput.blur();
  }
});

// Function to save todos to localStorage
function saveTodosToLocalStorage() {
  const todoApps = document.querySelectorAll('.todoapp');
  const todosData = Array.from(todoApps).map(app => {
    const heading = app.querySelector('.headingInput').value;
    const tasks = Array.from(app.querySelectorAll('.task-item')).map(task => {
      const taskText = task.querySelector('.taskText')?.innerText || task.querySelector('.data').value;
      const isCompleted = task.querySelector('.checked') !== null;
      return { text: taskText, completed: isCompleted };
    });
    return { heading, tasks };
  });
  localStorage.setItem('todos', JSON.stringify(todosData));
}

// Function to load todos from localStorage
function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    const todos = JSON.parse(savedTodos);
    // Remove initial todo if it's empty
    if (todoSpace.children.length === 1 && 
        !todoSpace.querySelector('.headingInput').value.trim() && 
        !todoSpace.querySelector('.task-item .taskText')) {
      todoSpace.innerHTML = '';
    }
    
    todos.forEach(todoData => {
      const newTodoApp = todoApp.cloneNode(true);
      newTodoApp.innerHTML = `
        <div class="todoheading">
          <input autocomplete="off" type="text" class="headingInput textfield" placeholder="TO-DO" value="${todoData.heading}">
          <div class="settings"><img src="Images/delete.png" alt="" class="delete-todo"></div>
        </div>
        <ol class="task">
          <li class="task-item">
            <div class="taskBox">
              <div class="uncheckedDiv">
                <i class="fa-regular fa-circle unchecked"></i>
              </div>
              <div class="content">
                <input type="text" class="data textfield" placeholder="new task">
              </div>
            </div>
            <div class="delete">
              <i class="fa-solid fa-circle-xmark"></i>
            </div>
          </li>
        </ol>
      `;
      todoSpace.appendChild(newTodoApp);

      // Add tasks
      const taskList = newTodoApp.querySelector('.task');
      todoData.tasks.forEach(taskData => {
        if (taskData.text.trim()) {
          const taskItem = document.createElement('li');
          taskItem.classList.add('task-item');
          taskItem.innerHTML = `
            <div class="taskBox">
              <div class="uncheckedDiv">
                <i class="fa-regular fa-circle unchecked"></i>
              </div>
              <div class="divLeft">
                <div class="taskText">${taskData.text}</div>
              </div>
            </div>
            <div class="delete">
              <i class="fa-solid fa-circle-xmark"></i>
            </div>
          `;
          
          if (taskData.completed) {
            const unchecked = taskItem.querySelector('.unchecked');
            const taskText = taskItem.querySelector('.taskText');
            const uncheckedDiv = taskItem.querySelector('.uncheckedDiv');
            
            unchecked.classList.remove('fa-regular', 'fa-circle', 'unchecked');
            const checked = document.createElement('div');
            checked.classList.add('checked');
            uncheckedDiv.appendChild(checked);
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = 'grey';
          }
          
          taskList.appendChild(taskItem);
        }
      });

      // Add event listeners for the new todo
      addTodoEventListeners(newTodoApp);
    });
  }
}

// Function to add event listeners to a todo app
function addTodoEventListeners(todoApp) {
  const taskData = todoApp.querySelector('.data');
  const taskBlock = todoApp.querySelector('.task');
  const headingInput = todoApp.querySelector('.headingInput');
  const deleteTodoBtn = todoApp.querySelector('.delete-todo');

  // Add task entry functionality
  taskData.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && taskData.value.trim() !== '') {
      // ... existing task creation code ...
      saveTodosToLocalStorage();
    }
  });

  // Add heading functionality
  headingInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && headingInput.value.trim() !== '') {
      setTimeout(() => taskData.focus(), 0);
      headingInput.blur();
      saveTodosToLocalStorage();
    }
  });

  // Add delete functionality
  deleteTodoBtn.addEventListener('click', function() {
    if (confirm('Do you want to delete this list?')) {
      this.closest('.todoapp').remove();
      saveTodosToLocalStorage();
    }
  });

  // Add delete and check functionality for existing tasks
  todoApp.querySelectorAll('.task-item').forEach(taskItem => {
    const deleteBtn = taskItem.querySelector('.delete i');
    const uncheckedDiv = taskItem.querySelector('.uncheckedDiv');
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        saveTodosToLocalStorage();
      });
    }
    
    if (uncheckedDiv) {
      uncheckedDiv.addEventListener('click', () => {
        const unchecked = uncheckedDiv.querySelector('.unchecked');
        const taskText = taskItem.querySelector('.taskText');
        
        if (unchecked?.classList.contains('unchecked')) {
          unchecked.classList.remove('fa-regular', 'fa-circle', 'unchecked');
          const checked = document.createElement('div');
          checked.classList.add('checked');
          uncheckedDiv.appendChild(checked);
          taskText.style.textDecoration = 'line-through';
          taskText.style.color = 'grey';
        } else {
          const checked = uncheckedDiv.querySelector('.checked');
          if (checked) {
            checked.remove();
            const unchecked = document.createElement('i');
            unchecked.classList.add('fa-regular', 'fa-circle', 'unchecked');
            uncheckedDiv.appendChild(unchecked);
            taskText.style.textDecoration = 'none';
            taskText.style.color = 'white';
          }
        }
        saveTodosToLocalStorage();
      });
    }
  });
}

// Modify the newtodo function to save to localStorage
function newtodo() {
  const newTodoApp = todoApp.cloneNode(true);
  newTodoApp.innerHTML = `
    <div class="todoheading">
      <input autocomplete="off" type="text" class="headingInput textfield" placeholder="TO-DO">
      <div class="settings"><img src="Images/delete.png" alt="" class="delete-todo"></div>
    </div>
    <ol class="task">
      <li class="task-item">
        <div class="taskBox">
          <div class="uncheckedDiv">
            <i class="fa-regular fa-circle unchecked"></i>
          </div>
          <div class="content">
            <input type="text" class="data textfield" placeholder="new task">
          </div>
        </div>
        <div class="delete">
          <i class="fa-solid fa-circle-xmark"></i>
        </div>
      </li>
    </ol>
  `;
  todoSpace.append(newTodoApp);

  const newTaskData = newTodoApp.querySelector(".data");
  const newTaskBlock = newTodoApp.querySelector(".task");
  const newHeadingInput = newTodoApp.querySelector(".headingInput");
  const newDeleteTodoBtn = newTodoApp.querySelector(".delete-todo");

  newTaskData.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && newTaskData.value.trim() !== "") {
      const newTaskItem = document.createElement("li");
      newTaskItem.classList.add("task-item");
      const taskText = document.createElement("div");
      taskText.innerText = newTaskData.value.trim();
      taskText.classList.add("taskText");
      const divLeft = document.createElement("div");
      divLeft.style.display = "flex";
      newTaskItem.appendChild(divLeft);
      newTaskBlock.appendChild(newTaskItem);
      newTaskData.value = "";

      const newDeleteDiv = document.createElement("div");
      newDeleteDiv.classList.add("delete");
      const newDelete = document.createElement("i");
      newDelete.classList.add("fa-solid", "fa-circle-xmark");
      newDeleteDiv.appendChild(newDelete);
      newTaskItem.appendChild(newDeleteDiv);

       const newUncheckedDiv = document.createElement("div");
       newUncheckedDiv.classList.add("uncheckedDiv");
        const newUnchecked = document.createElement("i");
         newUnchecked.classList.add("fa-regular", "fa-circle", "unchecked");
      newUncheckedDiv.appendChild(newUnchecked);
      divLeft.classList.add("divLeft");
        divLeft.insertBefore(newUncheckedDiv, divLeft.firstChild);
       divLeft.appendChild(taskText);

      newDelete.addEventListener("click", () => {
        newTaskItem.remove();
      });
      newUncheckedDiv.addEventListener("click", () => {
        if (newUnchecked.classList.contains("unchecked")) {
          newUnchecked.classList.remove("fa-regular", "fa-circle", "unchecked");
            const newChecked = document.createElement("div");
          newChecked.classList.add("checked");
          newUncheckedDiv.appendChild(newChecked);
          taskText.style.textDecoration = "line-through";
              taskText.style.color = "grey";
        } else {
           newUnchecked.classList.add("fa-regular", "fa-circle", "unchecked");
          const existingChecked = newUncheckedDiv.querySelector(".checked");
          if (existingChecked) {
              newUncheckedDiv.removeChild(existingChecked);
            taskText.style.textDecoration = "none";
             taskText.style.color = "white";
          }
        }
      });
    }
  });
  newHeadingInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && newHeadingInput.value.trim() !== "") {
      setTimeout(() => newTaskData.focus(), 0);
      newHeadingInput.blur();
    }
  });
  newDeleteTodoBtn.addEventListener('click', function() {
    if (confirm('Do you want to delete this list?')) {
      this.closest('.todoapp').remove();
    }
  });

  // Add this at the end of the function
  addTodoEventListeners(newTodoApp);
  saveTodosToLocalStorage();
}
// Add event listener for initial todo delete button
const initialDeleteBtn = document.querySelector('.delete-todo');
if (initialDeleteBtn) {
  initialDeleteBtn.addEventListener('click', function() {
    if (confirm('Do you want to delete this list?')) {
      this.closest('.todoapp').remove();
    }
  });
}

addTodoBtn.addEventListener("click", newtodo);
taskData.addEventListener("keypress", dataEntry);

// Load todos when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadTodosFromLocalStorage();
  // Add event listeners to initial todo if it exists
  const initialTodo = document.querySelector('.todoapp');
  if (initialTodo) {
    addTodoEventListeners(initialTodo);
  }
});

// Add save functionality to existing event listeners
taskData.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && taskData.value.trim() !== '') {
    dataEntry(event);
    saveTodosToLocalStorage();
  }
});

headingInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && headingInput.value.trim() !== '') {
    setTimeout(() => taskData.focus(), 0);
    headingInput.blur();
    saveTodosToLocalStorage();
  }
});

  