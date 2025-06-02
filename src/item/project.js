export default class Project {

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

    modifyOneTaskInfo(taskIndex, newTitle, newDes, newDate, newPri, newPro, newNote){
        this.#taskList[taskIndex].modifyInfo(newTitle, newDes, newDate, newPri, newPro, newNote);
    }

    modifyAllTasksProjectName(newPro){
        for (let index = 0 ; index < this.#taskList.length ; index++){
            this.#taskList[index].modifyProjectName(newPro);
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

    toJSON(){
        return {
            title: this.title,
            description: this.description,
            tasks: this.#taskList.map(task => task.toJSON()),
            notes: this.notes
        };
    }
}