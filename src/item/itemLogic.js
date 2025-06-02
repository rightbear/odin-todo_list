import Task from "./task.js";
import Project from "./project.js"
import * as storageModule from "../function/localStorageService.js"
const projectList = [];

// Add a specific project in project list
export function addProject(title, description, notes){
    let newProject = new Project(title, description, notes);

    // Will be modified to localStorage version
    projectList.push(newProject);

    storeToJSON();
}

// Edit a specific project in project list
export function modifyProject(projectIndex, newTitle, newDescription, newNotes) {
    // Will be modified to localStorage version
    const oldTitle = projectList[projectIndex].getTitle();

    // Will be modified to localStorage version
    projectList[projectIndex].modifyProjectInfo(newTitle, newDescription, newNotes);

    // Modify the project name of tasks related to the modified project
    if(oldTitle != newTitle){
        renameProjectName(projectIndex, newTitle);
    }

    storeToJSON();
}

// Delete a specific project in project list
export function deleteProject(projectIndex) {
    // Will be modified to localStorage version
    // All tasks in the projects will also be deleted
    projectList.splice(projectIndex, 1);


    // Need to modify the data attribute of other projects

    storeToJSON();
}

// Display all projects in project list
export function displayProject() {
    for(let index=0 ; index < projectList.length ; index++){
        console.log(projectList[index]);
    }
}

// Add a specific task in task list
export function addTask(projectIndex, title, description, dueDate, priority, project, notes){
    let newTask = new Task(title, description, dueDate, priority, project, notes);

    // Will be modified to localStorage version
    projectList[projectIndex].addOneTask(newTask);

    storeToJSON();
}

// Edit a specific task in task list
export function modifyTask(projectIndex, taskIndex, newTitle, newDes, newDate, newPri, newPro, newNote) {
    // Will be modified to localStorage version
    projectList[projectIndex].modifyOneTaskInfo(taskIndex, newTitle, newDes, newDate, newPri, newPro, newNote);

    storeToJSON();
}

// Switch the checklist of a specific task in task list
export function switchTask(projectIndex, taskIndex) {
    // Will be modified to localStorage version
    projectList[projectIndex].switchOneTaskState(taskIndex);

    storeToJSON();
}

// Delete a specific task in task list
export function deleteTask(projectIndex, taskIndex) {
    // Will be modified to localStorage version
    projectList[projectIndex].deleteOneTask(taskIndex);

    // Need to modify the data attribute of other tasks
    storeToJSON();
}

// Change all tasks with specific project name to another project name
export function renameProjectName(projectIndex, newProjectName) {
    // Will be modified to localStorage version
    projectList[projectIndex].modifyAllTasksProjectName(newProjectName);

    storeToJSON();
}

// Display all tasks in task list
export function displayTask(projectIndex) {
    // Will be modified to localStorage version
    projectList[projectIndex].displayAllTasks();
}

// Convert ths task list to a JSON format string
function storeToJSON(){
    const JSONData = projectList.map(project => project.toJSON());
    storageModule.StoreListItem(JSONData);
}