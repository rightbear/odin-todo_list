const TASK_FINISHED = true;
const TASK_UNFINISHED = false;

export default class Task {

    // Convert task item from JSON format to Task object format
    static fromJSON(taskData) {
        const task = new Task(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
            taskData.projectID,
            taskData.notes,
            taskData.state
        );
        
        return task;
    }

    constructor(title, description, dueDate, priority, projectID, notes, state) {
        // Use destructuring to assign fileds
        Object.assign(this, { title, description, dueDate, priority, projectID, notes, state});
    }

    // Change the current state of task
    switchState(){
        this.state = (this.state === TASK_FINISHED) ? TASK_UNFINISHED : TASK_FINISHED;
    }


    modifyInfo(newTitle, newDescription, newDueDate, newPriority, newNotes){
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
        this.notes = newNotes;
    }

    displayContent(){
        console.log(`${this.title}, ${this.description}, ${this.dueDate}, ${this.priority}, ${this.projectID}, ${this.notes}, ${this.state}`);
    }

    modifyProjectID(newProID) {
        this.projectID = newProID;
    }

    // Convert task item from Task object format to JSON format
    toJSON(){
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            projectID: this.projectID,
            notes: this.notes,
            state: this.state
        };
    }
}