document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todo_input');
    const submitButton = document.getElementById('Submit');
    const todoList = document.getElementById('Todo_list');

    submitButton.addEventListener('click', function () {
        addTask();
    });

    todoList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteTask(event.target);
        }
    });

    // Load tasks from local storage when the page loads
    loadTasks();
    todoInput.addEventListener('keyup', function (event) {
        // Check if the Enter key is pressed
        if (event.key === 'Enter') {
            addTask();
        }
    });
    function addTask() {
        const taskText = todoInput.value;

        if (taskText.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <label>${taskText}</label>
                <button class="delete-btn">Delete</button>
            `;

            todoList.appendChild(listItem);
            todoInput.value = '';

            // Save tasks to local storage
            saveTasks();
        }
    }

    function deleteTask(button) {
        const listItem = button.parentElement;
        todoList.removeChild(listItem);

        // Save tasks to local storage after deletion
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const taskElements = document.querySelectorAll('#Todo_list li label');

        taskElements.forEach(function (taskElement) {
            tasks.push(taskElement.textContent);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasksString = localStorage.getItem('tasks');
        if (tasksString) {
            const tasks = JSON.parse(tasksString);

            tasks.forEach(function (taskText) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <label>${taskText}</label>
                    <button class="delete-btn">Delete</button>
                `;

                todoList.appendChild(listItem);
            });
        }
    }
});
