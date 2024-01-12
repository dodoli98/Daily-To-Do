window.onload = function(){
    class TaskManager {
    constructor() {
        // localStorage에서 tasks 데이터를 가져오고, 없으면 빈 배열로 초기화
        this.tasks = JSON.parse(localStorage.getItem('task')) || [];
        this.taskList = document.getElementById('todo_list');
        this.addTaskInput = document.getElementById('input');

        this.addTaskInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.displayTasks();
    }

    handleKeyDown(event) {
        // IME 이슈 방지
        if (event.isComposing) return;

        const inputValue = this.addTaskInput.value.trim();

        if (event.key === 'Enter' && inputValue) {
            if (!this.tasks.some(task => task.text === inputValue)) {
                this.tasks.push({ text: inputValue, completed: false });
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
                this.displayTasks();
            } else {
                alert("중복된 내용입니다");
            }
            this.addTaskInput.value = '';
        }
    }

    displayTasks() {
        this.taskList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'list_item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.name = 'checkbox';
            checkbox.checked = task.completed;
            li.appendChild(checkbox);

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            li.appendChild(taskText);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';

            deleteButton.addEventListener('click', () => {
                this.tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
                this.displayTasks();
            });

            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
                this.displayTasks();
            });

            li.appendChild(deleteButton);
            this.taskList.appendChild(li);

            if (task.completed) {
                li.classList.add('complete');
            }
        });
    }
}

const taskManager = new TaskManager();




}