var todoList = {
    tasks: [],
    currentFilter: 'all',

    init: function () {
        this.loadTasks();
        this.render();
        this.updateStats();

        // Add Enter key support for task input
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    },

    addTask: function () {
        const input = document.getElementById('taskInput');
        const taskText = input.value.trim();

        if (taskText === '') {
            input.focus();
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.render();
        this.updateStats();

        input.value = '';
        input.focus();
    },

    toggleTask: function (id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            this.updateStats();
        }
    },

    editTask: function (id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const newText = prompt('Edit task:', task.text);
        if (newText && newText.trim() !== '') {
            task.text = newText.trim();
            this.saveTasks();
            this.render();
        }
    },

    deleteTask: function (id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
            this.updateStats();
        }
    },

    filterTasks: function (filter) {
        this.currentFilter = filter;

        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === filter) {
                tab.classList.add('active');
            }
        });

        this.render();
    },

    clearCompleted: function () {
        const completedCount = this.tasks.filter(t => t.completed).length;

        if (completedCount === 0) {
            alert('No completed tasks to clear.');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.updateStats();
        }
    },

    clearAll: function () {
        if (this.tasks.length === 0) {
            alert('No tasks to clear.');
            return;
        }

        if (confirm('Delete all tasks? This cannot be undone.')) {
            this.tasks = [];
            this.saveTasks();
            this.render();
            this.updateStats();
        }
    },

    getFilteredTasks: function () {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    },

    render: function () {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '';
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');

        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}"
                     onclick="todoList.toggleTask(${task.id})">
                    <i class="fas fa-check"></i>
                </div>
                <div class="task-text">${this.escapeHtml(task.text)}</div>
                <div class="task-actions">
                    <button class="task-btn edit" onclick="todoList.editTask(${task.id})"
                            title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete" onclick="todoList.deleteTask(${task.id})"
                            title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    updateStats: function () {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
    },

    saveTasks: function () {
        localStorage.setItem('todoList', JSON.stringify(this.tasks));
    },

    loadTasks: function () {
        const saved = localStorage.getItem('todoList');
        if (saved) {
            try {
                this.tasks = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading tasks:', e);
                this.tasks = [];
            }
        }
    },

    escapeHtml: function (text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize todo list when page loads
document.addEventListener('DOMContentLoaded', function () {
    todoList.init();
});
