const TASK_FINISHED = true;
const TASK_UNFINISHED = false;

export default class Task {

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