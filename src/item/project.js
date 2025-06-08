import Task from "./task.js"

export default class Project {

    static fromJSON(projectData) {
        const project = new Project(
            projectData.title,
            projectData.description,
            projectData.notes,
        );
        project.#taskList = projectData.tasks.map(taskData => Task.fromJSON(taskData));
        return project;
    }

    #taskList = [];

    constructor(title, description, notes) {
        // Use destructuring to assign fileds
        Object.assign(this, { title, description, notes });
    }

    addOneTask(newTask){
        this.#taskList.push(newTask);
    }

    deleteOneTask(taskIndex){
        this.#taskList.splice(taskIndex, 1);
    }

    modifyProjectInfo(newTitle, newDescription, newNotes) {
        this.title = newTitle;
        this.description = newDescription;
        this.notes = newNotes;
    }

    modifyOneTaskInfo(taskIndex, newTitle, newDes, newDate, newPri, newProID, newNote){
        this.#taskList[taskIndex].modifyInfo(newTitle, newDes, newDate, newPri, newProID, newNote);
    }

    modifyAllTasksProjectID(newProID){
        for (let index = 0 ; index < this.#taskList.length ; index++){
            this.#taskList[index].modifyProjectID(newProID);
        }
    }

    switchOneTaskState(taskIndex){
        this.#taskList[taskIndex].switchState();
    }

    displayAllTasks(){
        for (let index = 0 ; index < this.#taskList.length ; index++){
            this.#taskList[index].displayContent();
        }
    }

    getTitle(){
        return this.title;
    }

    // Deep Copy the task list
    getAllTasks() {
        return structuredClone(this.#taskList);
    }

    toJSON(){
        return {
            title: this.title,
            description: this.description,
            tasks: this.#taskList.map(task => task.toJSON()),
            notes: this.notes
        };
    }
}