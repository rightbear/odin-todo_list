import Task from "./task.js";
import Project from "./project.js"
import * as storageModule from "../function/localStorageService.js"

let projectList = [];

// Add a specific project in project list
export function addProject(title, description, notes){
    restoreFromJSON();

    let newProject = new Project(title, description, notes);

    // Will be modified to localStorage version
    projectList.push(newProject);

    storeWithJSON();
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

    storeWithJSON();
}

// Delete a specific project in project list
export function deleteProject(projectIndex) {
    // Will be modified to localStorage version
    // All tasks in the projects will also be deleted
    projectList.splice(projectIndex, 1);


    // Need to modify the data attribute of other projects

    storeWithJSON();
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

    storeWithJSON();
}

// Edit a specific task in task list
export function modifyTask(projectIndex, taskIndex, newTitle, newDes, newDate, newPri, newPro, newNote) {
    // Will be modified to localStorage version
    projectList[projectIndex].modifyOneTaskInfo(taskIndex, newTitle, newDes, newDate, newPri, newPro, newNote);

    storeWithJSON();
}

// Switch the checklist of a specific task in task list
export function switchTask(projectIndex, taskIndex) {
    // Will be modified to localStorage version
    projectList[projectIndex].switchOneTaskState(taskIndex);

    storeWithJSON();
}

// Delete a specific task in task list
export function deleteTask(projectIndex, taskIndex) {
    // Will be modified to localStorage version
    projectList[projectIndex].deleteOneTask(taskIndex);

    // Need to modify the data attribute of other tasks
    storeWithJSON();
}

// Change all tasks with specific project name to another project name
export function renameProjectName(projectIndex, newProjectName) {
    // Will be modified to localStorage version
    projectList[projectIndex].modifyAllTasksProjectName(newProjectName);

    storeWithJSON();
}

// Display all tasks in task list
export function displayTask(projectIndex) {
    // Will be modified to localStorage version
    projectList[projectIndex].displayAllTasks();
}

// Convert ths task list to a JSON format string
function storeWithJSON(){
    const JSONData = projectList.map(project => project.toJSON());
    storageModule.saveToStorage(JSONData);
}

function restoreFromJSON(){
    const JSONData = storageModule.loadFromStorage();
    projectList = JSONData.map(projectData => Project.fromJSON(projectData));
}