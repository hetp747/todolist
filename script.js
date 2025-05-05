// Load tasks on page load
window.onload = function () {
    loadTasks();
  };
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
  
    if (taskText === '') return;
  
    const task = { text: taskText, completed: false };
    const tasks = getTasksFromStorage();
    tasks.push(task);
    saveTasksToStorage(tasks);
  
    renderTasks();
    taskInput.value = '';
  }
  
  function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear current list
  
    const tasks = getTasksFromStorage();
  
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.completed) li.classList.add('completed');
  
      li.onclick = function () {
        tasks[index].completed = !tasks[index].completed;
        saveTasksToStorage(tasks);
        renderTasks();
      };
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '❌';
      deleteBtn.onclick = function (e) {
        e.stopPropagation();
        tasks.splice(index, 1);
        saveTasksToStorage(tasks);
        renderTasks();
      };
  
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }
  
  function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    renderTasks();
  }
  