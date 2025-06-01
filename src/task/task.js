class Task {
    // Will be modified to localStorage version
    static taskList = [];

    static TASK_FINISHED = true;
    static TASK_UNFINISHED = false;

    constructor(title, description, dueDate, priority, project, notes, state) {
        title,
        description,
        dueDate,
        priority,
        project,
        notes,
        state
    }

    // Change the current state of 
    switchState(){
        (this.state === TASK_FINISHED) ? TASK_UNFINISHED : TASK_FINISHED;
    }

    modifyInfo(newTitle, newDescription, newDueDate, newPriority, newProject, newNotes){
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
        this.project = newProject;
        this.notes = newNotes;
    }

    modifyProject(oldProjectName, newProjectName) {
        if (this.project === oldProjectName) {
            this.project = newProjectName; 
        }
    }

    getProject() {
        return this.project;
    }
}

// Add a specific task in task list
const addTask = function (title, description, dueDate, priority, project, notes, checklist){
    let newTask = new Task(title, description, dueDate, priority, project, notes, checklist);
    Task.taskList.push(newTask);
}

// Edit a specific task in task list
const modifyTask = function(taskIndex, newTitle, newDescription, newDueDate, newPriority, newProject, newNotes) {
    Task.taskList[taskIndex].modifyInfo(newTitle, newDescription, newDueDate, newPriority, newProject, newNotes);
}

// Switch the checklist of a specific task in task list
const switchTask = function(taskIndex) {
    Task.taskList[taskIndex].switchState();
}

// Delete a specific task in task list
const deleteTask = function (taskIndex) {
    Task.taskList.splice(taskIndex, 1);
}

// Change all tasks with specific project name to another project name
const rename_Task_with_Project = function (oldProjectName, newProjectName) {
    for(let index = 0 ; index < Task.taskList.length; index++){
        Task[index].modifyProject(oldProjectName, newProjectName);
    }
}

// Delete all tasks with specific project name
const delete_Task_with_Project = function (projectName){
    // Use loop backwards to prevent looping to wrong array length
    for(let index = Task.taskList.length - 1 ; index >= 0 ; index--){
        if (Task[index].getProject() === projectName){
            deleteTask(index);
        }
    }
}

// Display all tasks in task list
let displayTask = function () {
    for(let index=0 ; index<Task.taskList.length ; index++){
        console.log(Task.taskList[index]);
    }
}

export {addTask, modifyTask, switchTask, deleteTask, rename_Task_with_Project, delete_Task_with_Project, displayTask};