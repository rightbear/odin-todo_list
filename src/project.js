class Project {
    // Will be modified to localStorage version
    static projectList = [];

    constructor(title, description, notes) {
        this.title = title;
        this.description = description;
        this.notes = notes;
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
let addProject = function (title, description, notes){
    let newProject = new Project(title, description, notes);
    Project.projectList.push(newProject);
}

// Edit a specific project in project list
let modifyProject = function(projectIndex, newTitle, newDescription, newNotes) {
    const oldTitle = Project.projectList[projectIndex].getTitle();
    Project.projectList[projectIndex].modifyInfo(newTitle, newDescription, newNotes);

    // Modify the project name of tasks related to the modified project
    // if (oldTitle !== newTitle)
}

// Delete a specific project in project list
let deleteProject = function (projectIndex) {
    const projectTitle = Project.projectList[projectIndex].getTitle();
    Project.projectList.splice(projectIndex, 1);

    // Delete all tasks related to the deleted project
    // if (task.getProject() === projectTitle)
}

// Display all projects in project list
let displayeProject = function () {
    for(let i=0 ; i<Project.projectList.length ; i++){
        console.log(Project.projectList[i]);
    }
}

export {addProject, modifyProject, deleteProject, displayeProject};