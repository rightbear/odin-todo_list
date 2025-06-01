import {rename_Task_with_Project, delete_Task_with_Project} from "../task/task.js";

class Project {
    // Will be modified to localStorage version
    static projectList = [];

    constructor(title, description, notes) {
        title,
        description,
        notes
    }

    getTitle(){
        return this.title;
    }

    modifyInfo(newTitle, newDescription, newNotes) {
        this.title = newTitle;
        this.description = newDescription;
        this.notes = newNotes;
    }
}

// Add a specific project in project list
const addProject = function (title, description, notes){
    let newProject = new Project(title, description, notes);
    Project.projectList.push(newProject);
}

// Edit a specific project in project list
const modifyProject = function(projectIndex, newTitle, newDescription, newNotes) {
    const oldTitle = Project.projectList[projectIndex].getTitle();
    Project.projectList[projectIndex].modifyInfo(newTitle, newDescription, newNotes);

    // Modify the project name of tasks related to the modified project
    rename_Task_with_Project(oldTitle, newTitle);
}

// Delete a specific project in project list
const deleteProject = function (projectIndex) {
    const projectTitle = Project.projectList[projectIndex].getTitle();
    Project.projectList.splice(projectIndex, 1);

    // Delete all tasks related to the deleted project
    delete_Task_with_Project(projectTitle);
}

// Display all projects in project list
const displayProject = function () {
    for(let index=0 ; index<Project.projectList.length ; index++){
        console.log(Project.projectList[index]);
    }
}

export {addProject, modifyProject, deleteProject, displayProject};