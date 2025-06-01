import Task from "./task.js";
import Project from "../project/project.js"

// Add a specific task in task list
export function addTask(projectIndex, title, description, dueDate, priority, project, notes){
    let newTask = new Task(title, description, dueDate, priority, project, notes);

    // Will be modified to localStorage version
    Project.projectList[projectIndex].addOneTask(newTask);
}

// Edit a specific task in task list
export function modifyTask(projectIndex, taskIndex, newTitle, newDes, newDate, newPri, newPro, newNote) {
    // Will be modified to localStorage version
    Project.projectList[projectIndex].modifyOneTaskInfo(taskIndex, newTitle, newDes, newDate, newPri, newPro, newNote);
}

// Switch the checklist of a specific task in task list
export function switchTask(projectIndex, taskIndex) {
    // Will be modified to localStorage version
    Project.projectList[projectIndex].switchOneTaskState(taskIndex);
}

// Delete a specific task in task list
export function deleteTask(projectIndex, taskIndex) {
    // Will be modified to localStorage version
    Project.projectList[projectIndex].deleteOneTask(taskIndex);

    // Need to modify the data attribute of other tasks
}

// Change all tasks with specific project name to another project name
export function renameProjectName(projectIndex, newProjectName) {
    // Will be modified to localStorage version
    Project.projectList[projectIndex].modifyAllTasksProjectName(newProjectName);
}

// Display all tasks in task list
export function displayTask(projectIndex) {
    // Will be modified to localStorage version
    Project.projectList[projectIndex].displayAllTasks();
}