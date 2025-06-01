import Project from "./project.js"
import {renameProjectName} from "../task/taskLogic.js";

// Add a specific project in project list
export function addProject(title, description, notes){
    let newProject = new Project(title, description, notes);

    // Will be modified to localStorage version
    Project.projectList.push(newProject);
}

// Edit a specific project in project list
export function modifyProject(projectIndex, newTitle, newDescription, newNotes) {
    // Will be modified to localStorage version
    const oldTitle = Project.projectList[projectIndex].getTitle();

    // Will be modified to localStorage version
    Project.projectList[projectIndex].modifyProjectInfo(newTitle, newDescription, newNotes);

    // Modify the project name of tasks related to the modified project
    if(oldTitle != newTitle){
        renameProjectName(projectIndex, newTitle);
    }
}

// Delete a specific project in project list
export function deleteProject(projectIndex) {
    // Will be modified to localStorage version
    const projectTitle = Project.projectList[projectIndex].getTitle();

    // Will be modified to localStorage version
    // All tasks in the projects will also be deleted
    Project.projectList.splice(projectIndex, 1);

    // Need to modify the data attribute of other projects
}

// Display all projects in project list
export function displayProject() {
    for(let index=0 ; index<Project.projectList.length ; index++){
        console.log(Project.projectList[index]);
    }
}