const TASK_FINISHED = true;
const TASK_UNFINISHED = false;

export default class Task {

    static fromJSON(taskData) {
        const task = new Task(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
            taskData.project,
            taskData.notes,
            taskData.state
        );
        
        return task;
    }

    constructor(title, description, dueDate, priority, project, notes, state) {
        // Use destructuring to assign fileds
        // The value of priority: 0 is low, 1 is medium, 2 is high
        Object.assign(this, { title, description, dueDate, priority, project, notes, state});
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

    toJSON(){
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            project: this.project,
            notes: this.notes,
            state: this.state
        };
    }
}