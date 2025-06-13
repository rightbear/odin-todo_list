import Task from "./task.js";
import Project from "./project.js"
import * as storageModule from "../function/localStorageService.js"

import { format, differenceInDays } from 'date-fns';

let projectList = [];

// Add a specific project in project list
export function addProject(title, description, notes){
    projectList = restoreFromJSON();

    let newProject = new Project(title, description, notes);

    projectList.push(newProject);

    storeWithJSON(projectList);
}

// Edit a specific project in project list
export function modifyProject(projectIndex, newTitle, newDescription, newNotes) {
    projectList = restoreFromJSON();

    projectList[projectIndex].modifyProjectInfo(newTitle, newDescription, newNotes);

    storeWithJSON(projectList);
}

// Delete a specific project in project list
export function deleteProject(projectIndex) {
    projectList = restoreFromJSON();

    // All tasks in the projects will also be deleted
    projectList.splice(projectIndex, 1);

    // Need to modify the data attribute of other projects

    const newLength = projectList.length;
    // if the length of current projectList is bigger than projectIndex, that 
    // means the deleted project is not the last project in the old projectList.
    // Need to modify the project number in tasks inside all projects after 
    // the deleted project in the old projectList.
    if(newLength > projectIndex) {
        for(let projectID = projectIndex ; projectID < newLength ; projectID++){
            projectList[projectID].modifyAllTasksProjectID(projectID);
        }
    }

    storeWithJSON(projectList);
}

// Display all projects in project list
export function displayProject() {
    projectList = restoreFromJSON();

    for(let index=0 ; index < projectList.length ; index++){
        console.log(projectList[index]);
    }
}

// Deep Copy the project list
export function getAllProjects() {
    projectList = restoreFromJSON();

    return structuredClone(projectList);
}

// Get the amount of all projects
export function getNumOfProjects() {
    projectList = restoreFromJSON();

    return projectList.length;
}

// Add a specific task in task list
export function addTask(title, description, dueDate, priority, projectIndex, notes, state){
    projectList = restoreFromJSON();
    let newTask = new Task(title, description, dueDate, priority, projectIndex, notes, state);

    // Will be modified to localStorage version
    projectList[projectIndex].addOneTask(newTask);

    storeWithJSON(projectList);
}

// Edit a specific task in task list
export function modifyTask(projectIndex, taskIndex, newTitle, newDes, newDate, newPri, newNote) {
    projectList = restoreFromJSON();

    projectList[projectIndex].modifyOneTaskInfo(taskIndex, newTitle, newDes, newDate, newPri, newNote);

    storeWithJSON(projectList);
}

// Switch the checklist of a specific task in task list
export function switchTask(projectIndex, taskIndex) {
    projectList = restoreFromJSON();

    projectList[projectIndex].switchOneTaskState(taskIndex);

    storeWithJSON(projectList);
}

// Delete a specific task in task list
export function deleteTask(projectIndex, taskIndex) {
    projectList = restoreFromJSON();

    projectList[projectIndex].deleteOneTask(taskIndex);

    storeWithJSON(projectList);
}

// Display all tasks in task list
export function displayTask(projectIndex) {
    projectList = restoreFromJSON();
    projectList[projectIndex].displayAllTasks();
}

// Deep Copy the task list in specific project
export function getAllTasks(projectIndex) {
    projectList = restoreFromJSON();

    const taskList = projectList[projectIndex].getAllTasks();

    return taskList;
}

// Deep Copy all task lists in all projects
export function getAllProjectsTasks() {
    projectList = restoreFromJSON();
    const allTaskList = [];

    for(let projectIndex = 0 ; projectIndex < projectList.length ; projectIndex++){
        const currentTaskList = getAllTasks(projectIndex);

        for(let taskIndex = 0 ; taskIndex < currentTaskList.length ; taskIndex++){
            currentTaskList[taskIndex].taskID = taskIndex;
        }

        allTaskList.push(...currentTaskList);
    }

    return allTaskList;
}

// Deep Copy tasks of today in all projects
export function getTodayTasks() {
    // Get the current date
    const currentDate = new Date();
    // Format the date
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const allTodayTaskList = [];

    for(let projectIndex = 0 ; projectIndex < projectList.length ; projectIndex++){
        const currentTaskList = getAllTasks(projectIndex);

        for(let taskIndex = 0 ; taskIndex < currentTaskList.length ; taskIndex++){
            if (currentTaskList[taskIndex].dueDate === formattedDate){
                currentTaskList[taskIndex].taskID = taskIndex;
                allTodayTaskList.push(currentTaskList[taskIndex]);
            }
        }
    }

    return allTodayTaskList;
}

// Deep Copy tasks within future 7 days in all projects
export function getWeekTasks() {
    // Get the current date
    const currentDate = new Date();
    // Format the date
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const allWeekTaskList = [];

    for(let projectIndex = 0 ; projectIndex < projectList.length ; projectIndex++){
        const currentTaskList = getAllTasks(projectIndex);

        for(let taskIndex = 0 ; taskIndex < currentTaskList.length ; taskIndex++){
            const differenceDays = differenceInDays(currentTaskList[taskIndex].dueDate, formattedDate);
            if (differenceDays >= 0 && differenceDays <= 7){
                currentTaskList[taskIndex].taskID = taskIndex;
                allWeekTaskList.push(currentTaskList[taskIndex]);
            }
        }
    }

    return allWeekTaskList;
}

// Deep Copy completed tasks in all projects
export function getCompletedTask() {
    const allCompletedTaskList = [];

    for(let projectIndex = 0 ; projectIndex < projectList.length ; projectIndex++){
        const currentTaskList = getAllTasks(projectIndex);

        for(let taskIndex = 0 ; taskIndex < currentTaskList.length ; taskIndex++){
            if (currentTaskList[taskIndex].state === true){
                currentTaskList[taskIndex].taskID = taskIndex;
                allCompletedTaskList.push(currentTaskList[taskIndex]);
            }
        }
    }

    return allCompletedTaskList;
}


// Convert the object array of Project class to a JSON format object
function storeWithJSON(projectData) {
    const JSONData = projectData.map(project => project.toJSON());
    storageModule.saveToStorage(JSONData);
}

// Convert the JSON format object back to object array of Project class
export function restoreFromJSON() {
    const JSONData = storageModule.loadFromStorage();
    return JSONData.map(projectData => Project.fromJSON(projectData));
}