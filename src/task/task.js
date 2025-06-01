const TASK_FINISHED = true;
const TASK_UNFINISHED = false;

export default class Task {
    constructor(title, description, dueDate, priority, project, notes) {
        // Use destructuring to assign fileds
        // The value of priority: 0 is low, 1 is medium, 2 is high
        Object.assign(this, { title, description, dueDate, priority, project, notes });
        this.state = TASK_UNFINISHED;
    }

    // Change the current state of task
    switchState(){
        this.state = (this.state === TASK_FINISHED) ? TASK_UNFINISHED : TASK_FINISHED;
    }

    modifyProjectName(newProjectName){
        this.project = newProjectName;
    }

    modifyInfo(newTitle, newDescription, newDueDate, newPriority, newProject, newNotes){
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
        this.modifyProjectName(newProject);
        this.notes = newNotes;
    }

    displayContent(){
        console.log(`${this.title}, ${this.description}, ${this.dueDate}, ${this.priority}, ${this.project}, ${this.notes}, ${this.state}`);
    }
}