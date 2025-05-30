class Task {
    // Will be modified to localStorage version
    static taskList = [];

    constructor(title, description, dueDate, priority, project, notes, state) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.notes = notes;
        this.state = state;
    }
}

// Add a specific task in project list
let addTask = function (title, description, dueDate, priority, project, notes, checklist){
    let newTask = new Task(title, description, dueDate, priority, project, notes, checklist);
    Task.taskList.push(newTask);
}

// Edit a specific task in project list
let modifyTask = function(title) {}

// Switch the checklist of a specific task in project list
let switchState = function() {}

// Delete a specific task in project list
let deleteTask = function (title) {
    const index = Task.taskList.indexOf(title);
    Project.taskList.splice(index, 1);
}

export {addTask, deleteTask};