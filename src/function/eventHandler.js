import * as DOMControlModule from "./DOMControl"
import * as itemLogicModule from "../item/itemLogic"
import * as projectModalModule from "../item/projectModal"

// Control checkbox in task items to change text
export function taskCheckboxEvent() {
    const content = document.querySelector(".content");

    content.addEventListener("click", function(event) {
        let clickedCheckbox = null;

        if(event.target.classList.contains(".taskCheckbox")){
            clickedCheckbox = event.target;
        }
        // If the clicked element is not ".taskCheckbox",
        // try finding the nearest ancestor that is ".taskCheckbox"
        else if(event.target.closest('.taskCheckbox')) {
            clickedCheckbox = event.target.closest('.taskCheckbox');
        }

        if(clickedCheckbox){
            const taskID = (clickedCheckbox.parentNode).dataset.taskid;
            const projectID = (clickedCheckbox.parentNode).dataset.task_projectid;

            const taskTitles = document.querySelectorAll(".taskTitle");

            // If checked, strike through the task title
            if (clickedCheckbox.checked) {
                taskTitles[taskID].style.textDecoration = "line-through";
            }
            else {
                taskTitles[taskID].style.textDecoration = "none";
            }

            itemLogicModule.switchTask(projectID, taskID);
        }

    });
}

// Click project to show all tasks inside the project.
// Also add classes about hovering and clicking effects on .projectItem
export function clickProjectToShowAllTasksEvent() {
    const projects = document.querySelector(".projects");

    projects.addEventListener("click", function(event) {
        let clickedItem = null;
        if(event.target.classList.contains(".projectItem")){
            clickedItem = event.target;
        }
        // If the clicked element is not ".projectItem",
        // try finding the nearest ancestor that is ".projectItem"
        else if(event.target.closest('.projectItem')) {
            clickedItem = event.target.closest('.projectItem');
        }

        if(clickedItem){
            const projectItems = document.querySelectorAll(".projectItem");
            const categoryItems = document.querySelectorAll(".categoryItem");

            for (let projectItem of projectItems) {
                if(projectItem.classList.contains("clickedItem")){
                    projectItem.classList.remove("clickedItem");
                }
            }
            for (let categoryItem of categoryItems) {
                if(categoryItem.classList.contains("clickedItem")){
                    categoryItem.classList.remove("clickedItem");
                }
            }
            
            clickedItem.classList.add("clickedItem");

            DOMControlModule.showTasksinProject(clickedItem.dataset.projectid);
        }

    });
}

// Add eventListners on "adding buttons in projects" and "project adding dialog"
export function projectAddDialogEvent() {
    const projects = document.querySelector(".projects");

    const pageDialog = document.querySelector('#project-add-pageDialog');
    const dialogForm = document.querySelector('#project-add-dialogForm');
    const project_addBtn = document.querySelector('#project-add-addBtn');
    const crossDialogBtn = document.querySelector('#project-add-crossDialogBtn');
    const title = document.querySelector('#project-add-title');
    const addTitleMessage = document.querySelector('#project-add-title-message');
    const description = document.querySelector('#project-add-description');
    const desCurrent = document.querySelector('#project-add-desCurrent');
    const notes = document.querySelector('#project-add-notes');
    const notesCurrent = document.querySelector('#project-add-notesCurrent');

    projects.addEventListener("click", function(event) {
        let clickedAddBtn = null;

        if(event.target.classList.contains("#projectAddBtn")){
            clickedAddBtn = event.target;
        }
        // If the clicked element is not "#projectAddBtn",
        // try finding the nearest ancestor that is "#projectAddBtn"
        else if(event.target.closest("#projectAddBtn")) {
            clickedAddBtn = event.target.closest("#projectAddBtn");
        }

        if(clickedAddBtn) {
            pageDialog.showModal();
        }
    });

    crossDialogBtn.addEventListener('click', (event) => {
        const crossButton = event.target;
        pageDialog.close(crossButton.value);
    });

    // If user click "Add" button in form of dialog, it will triger a close behavior for dialog
    dialogForm.addEventListener('submit', function(event) {
        const submitBtn = event.submitter;

        // We don't want to submit this fake form
        event.preventDefault();

        // Have to send the submitter value of form, as the returnValue of dialog.
        pageDialog.close(submitBtn.value);
    });

    pageDialog.addEventListener("close", () => {

        const buttomValue = pageDialog.returnValue;
    
        if(buttomValue == 'cross'){
            console.log('Dialog closed with crossDialogBtn');
        }
        else{
            if(buttomValue == 'add'){
                console.log('Dialog closed with addBtn');
                
                itemLogicModule.addProject(title.value, description.value, notes.value)
                DOMControlModule.showProjects();
            }
            else if (buttomValue == 'cancel'){
                console.log('Dialog closed with cancelBtn');
            }
            
            // reset title message and count value in the dialog
            title.classList.remove('normal','error', 'success');
            title.classList.add('normal');
            addTitleMessage.classList.remove('normal-message','error-message', 'success-message');
            addTitleMessage.classList.add('normal-message');
            addTitleMessage.textContent="";
            project_addBtn.disabled = false;
            desCurrent.textContent = 0;
            notesCurrent.textContent = 0;

            dialogForm.reset();
        }
    });

    description.addEventListener('input', function() {
        const allText = description.value;
        const charCount = allText.length;
        desCurrent.textContent = charCount;
    });

    notes.addEventListener('input', function() {
        const allText = notes.value;
        const charCount = allText.length;
        notesCurrent.textContent = charCount;
    });

    title.addEventListener('input', function() {
        const result = checkAddDuplicate(this.value, itemLogicModule.getAllProjects(), 'project');
        project_addBtn.disabled = result.isInValid; 
        displayAddMessage('title', result);
    });

    function checkAddDuplicate(value, array, fieldName) {
        const isDuplicate = array.some(item => (item.title).toLowerCase() === value.toLowerCase());

        if (value == ""){
            return { isInValid: false, message: ``, type: 'normal'};
        }
        else {
            if (isDuplicate) {
                return {  isInValid: true, message: `The ${fieldName} name is duplicate. Choose a new one.`, type: 'error'};
            }
            else {
                return { isInValid: false, message: `The ${fieldName} name is available.`, type: 'success' };
            }
        }
    }

    function displayAddMessage(fieldName, result) {
        const fieldElement = document.querySelector(`#project-add-${fieldName}`);
        const messageElement = document.querySelector(`#project-add-${fieldName}-message`);

        // Clear all classes about styles to title field
        fieldElement.classList.remove('normal', 'error', 'success');
        messageElement.classList.remove('normal-message','error-message', 'success-message');

        fieldElement.classList.add(`${result.type}`);
        messageElement.classList.add(`${result.type}-message`);

        // Add title field message based on classes about title field
        if(result.type == 'normal') {
            messageElement.textContent = '';
        }
        else{
            messageElement.textContent = result.message;
        }
    }
}

// Add eventListners on "editing buttons in projects" and "project editing dialog"
export function projectEditDialogEvent() {
    const projects = document.querySelector(".projects");

    const pageDialog = document.querySelector('#project-edit-pageDialog');
    const dialogForm = document.querySelector('#project-edit-dialogForm');
    const project_editBtn = document.querySelector('#project-edit-editBtn');
    const crossDialogBtn = document.querySelector('#project-edit-crossDialogBtn');
    const title = document.querySelector('#project-edit-title');
    const editTitleMessage = document.querySelector('#project-edit-title-message');
    const description = document.querySelector('#project-edit-description');
    const desCurrent = document.querySelector('#project-edit-desCurrent');
    const notes = document.querySelector('#project-edit-notes');
    const notesCurrent = document.querySelector('#project-edit-notesCurrent');
    
    let currentProjectName = null;
    let currentProjectID = null;

    projects.addEventListener("click", function(event) {
        const projectList = itemLogicModule.getAllProjects();
        let clickedEditBtn = null;

        if(event.target.classList.contains(".projectEdit")){
            clickedEditBtn = event.target;
        }
        // If the clicked element is not ".projectEdit",
        // try finding the nearest ancestor that is ".projectEdit"
        else if(event.target.closest('.projectEdit')) {
            clickedEditBtn = event.target.closest('.projectEdit');
        }

        if(clickedEditBtn) {
            currentProjectID = ((clickedEditBtn.parentNode).parentNode).dataset.projectid;
            const currentProject = projectList[currentProjectID];

            title.value = currentProject.title;
            description.value = currentProject.description;
            desCurrent.textContent = (currentProject.description).length;
            notes.value = currentProject.notes;
            notesCurrent.textContent = (currentProject.notes).length;
            currentProjectName = currentProject.title;
            pageDialog.showModal();
        }
    });

    crossDialogBtn.addEventListener('click', (event) => {
        const crossButton = event.target;
        pageDialog.close(crossButton.value);
    });

    dialogForm.addEventListener('submit', function(event) {
        const submitBtn = event.submitter;
        event.preventDefault();
        pageDialog.close(submitBtn.value);
    });

    pageDialog.addEventListener("close", () => {

        const buttomValue = pageDialog.returnValue;
    
        if(buttomValue == 'cross'){
            console.log('Dialog closed with crossDialogBtn');
        }
        else{
            if(buttomValue == 'edit'){
                console.log('Dialog closed with editBtn');
                
                itemLogicModule.modifyProject(currentProjectID, title.value, description.value, notes.value)
                DOMControlModule.showProjects();
                DOMControlModule.showTasksinProject(currentProjectID);
            }
            else if (buttomValue == 'cancel'){
                console.log('Dialog closed with cancelBtn');
            }
        }
        
        // reset title message
        title.classList.remove('normal','error', 'success');
        title.classList.add('normal');
        editTitleMessage.classList.remove('normal-message','error-message', 'success-message');
        editTitleMessage.classList.add('normal-message');
        editTitleMessage.textContent="";
        project_editBtn.disabled = false;
    
        dialogForm.reset();
    });

    description.addEventListener('input', function() {
        const allText = description.value;
        const charCount = allText.length;
        desCurrent.textContent = charCount;
    });

    notes.addEventListener('input', function() {
        const allText = notes.value;
        const charCount = allText.length;
        notesCurrent.textContent = charCount;
    });

    title.addEventListener('input', function() {
        const projectList = itemLogicModule.getAllProjects();
        const result = checkEditDuplicate(this.value, projectList, 'project');
        project_editBtn.disabled = result.isInValid; 
        displayEditMessage('title', result);
    });

    function checkEditDuplicate(value, array, fieldName) { 
        const isDuplicate = array.some(item => (item.title).toLowerCase() === value.toLowerCase());
    
        if ((value == "") || (currentProjectName.toLowerCase() == value.toLowerCase())){
            return { isInValid: false, message: ``, type: 'normal'};
        }
        else {
            if (isDuplicate) {
                return {  isInValid: true, message: `The ${fieldName} name is duplicate. Choose a new one.`, type: 'error'};
            }
            else {
                return { isInValid: false, message: `The ${fieldName} name is available.`, type: 'success' };
            }
        }
    }

    function displayEditMessage(fieldName, result) {
        const fieldElement = document.querySelector(`#project-edit-${fieldName}`);
        const messageElement = document.querySelector(`#project-edit-${fieldName}-message`);

        fieldElement.classList.remove('normal', 'error', 'success');
        messageElement.classList.remove('normal-message','error-message', 'success-message');

        fieldElement.classList.add(`${result.type}`);
        messageElement.classList.add(`${result.type}-message`);
        
        if(result.type == 'normal') {
            messageElement.textContent = '';
        }
        else{
            messageElement.textContent = result.message;
        }
    }
}

// Add eventListners on "informing buttons in projects" and "project informing dialog"
export function projectInfoDialogEvent() {
    const projects = document.querySelector(".projects");

    const pageDialog = document.querySelector('#project-info-pageDialog');
    const dialogForm = document.querySelector('#project-info-dialogForm');
    const crossDialogBtn = document.querySelector('#project-info-crossDialogBtn');
    const titleText = document.querySelector('#project-info-title-text');
    const descriptionText = document.querySelector('#project-info-description-text');
    const notesText = document.querySelector('#project-info-notes-text');

    let currentProjectID = null;

    projects.addEventListener("click", function(event) {
        const projectList = itemLogicModule.getAllProjects();
        let clickedInfoBtn = null;

        if(event.target.classList.contains(".projectInfo")){
            clickedInfoBtn = event.target;
        }
        // If the clicked element is not ".projectInfo",
        // try finding the nearest ancestor that is ".projectInfo"
        else if(event.target.closest('.projectInfo')) {
            clickedInfoBtn = event.target.closest('.projectInfo');
        }

        if(clickedInfoBtn) {
            currentProjectID = ((clickedInfoBtn.parentNode).parentNode).dataset.projectid;
            const currentProject = projectList[currentProjectID];

            titleText.textContent = currentProject.title;
            descriptionText.textContent = currentProject.description;
            notesText.textContent = currentProject.notes;
            pageDialog.showModal();
        }
    });

    crossDialogBtn.addEventListener('click', (event) => {
        const crossButton = event.target;
        pageDialog.close(crossButton.value);
    });

    dialogForm.addEventListener('submit', function(event) {
        const submitBtn = event.submitter;
        event.preventDefault();
        pageDialog.close(submitBtn.value);
    });

    pageDialog.addEventListener("close", () => {
        const buttomValue = pageDialog.returnValue;
    
        if(buttomValue == 'cross'){
            console.log('Dialog closed with crossDialogBtn');
        }
        else{
            console.log('Dialog closed with closeBtn');
        }
        dialogForm.reset();
    });
}

// Add eventListners on "deleteing buttons in projects" and "project deleteing dialog"
export function projectDeleteDialogEvent() {
    const projects = document.querySelector(".projects");

    const pageDialog = document.querySelector('#project-delete-pageDialog');
    const dialogForm = document.querySelector('#project-delete-dialogForm');
    const crossDialogBtn = document.querySelector('#project-delete-crossDialogBtn');
    const deletedProject = document.querySelector('#deletedProject');

    let currentProjectID = null;

    projects.addEventListener("click", function(event) {
        const projectList = itemLogicModule.getAllProjects();
        let clickedDeleteBtn = null;

        if(event.target.classList.contains(".projectDelete")){
            clickedDeleteBtn = event.target;
        }
        // If the clicked element is not ".projectDelete",
        // try finding the nearest ancestor that is ".projectDelete"
        else if(event.target.closest('.projectDelete')) {
            clickedDeleteBtn = event.target.closest('.projectDelete');
        }

        if(clickedDeleteBtn) {
            currentProjectID = ((clickedDeleteBtn.parentNode).parentNode).dataset.projectid;
            const currentProject = projectList[currentProjectID];

            deletedProject.textContent = currentProject.title;
            pageDialog.showModal();
        }
    });

    crossDialogBtn.addEventListener('click', (event) => {
        const crossButton = event.target;
        pageDialog.close(crossButton.value);
    });

    dialogForm.addEventListener('submit', function(event) {
        const submitBtn = event.submitter;
        event.preventDefault();
        pageDialog.close(submitBtn.value);
    });

    pageDialog.addEventListener("close", () => {

        const buttomValue = pageDialog.returnValue;
    
        if(buttomValue == 'cross'){
            console.log('Dialog closed with crossDialogBtn');
        }
        else{
            if(buttomValue == 'delete'){
                console.log('Dialog closed with deleteBtn');

                itemLogicModule.deleteProject(currentProjectID);
                DOMControlModule.showProjects();

                //Need yo modify to show all page
                DOMControlModule.showTasksinProject(0);
            }
            else if (buttomValue == 'cancel'){
                console.log('Dialog closed with cancelBtn');
            }
            
            dialogForm.reset();
        }
    });
}

// Add eventListners on "adding buttons in tasks" and "task adding dialog"
export function taskAddDialogEvent() {
    const content = document.querySelector('.content');

    const pageDialog = document.querySelector('#task-add-pageDialog');
    const dialogForm = document.querySelector('#task-add-dialogForm');
    const task_addBtn = document.querySelector('#task-add-addBtn');
    const crossDialogBtn = document.querySelector('#task-add-crossDialogBtn');
    const title = document.querySelector('#task-add-title');
    const addTitleMessage = document.querySelector("#task-add-title-message");
    const description = document.querySelector('#task-add-description');
    const desCurrent = document.querySelector('#task-add-desCurrent');
    const notes = document.querySelector('#task-add-notes');
    const notesCurrent = document.querySelector('#task-add-notesCurrent');
    const dueDate = document.querySelector('#task-add-dueDate');
    const priority = document.querySelector('#task-add-priority');
    
    let projectID = null;

    content.addEventListener("click", function(event) {
        let clickedAddBtn = null;

        if(event.target.classList.contains("#taskAddBtn")){
            clickedAddBtn = event.target;
        }
        // If the clicked element is not "#taskAddBtn",
        // try finding the nearest ancestor that is "#taskAddBtn"
        else if(event.target.closest("#taskAddBtn")) {
            clickedAddBtn = event.target.closest("#taskAddBtn");
        }

        if(clickedAddBtn) {
            projectID = clickedAddBtn.dataset.task_projectid;
            pageDialog.showModal();
        }
    });

    crossDialogBtn.addEventListener('click', (event) => {
        const crossButton = event.target;
        pageDialog.close(crossButton.value);
    });

    dialogForm.addEventListener('submit', function(event) {
        const submitBtn = event.submitter;

        // We don't want to submit this fake form
        event.preventDefault();

        // Have to send the submitter value of form, as the returnValue of dialog.
        pageDialog.close(submitBtn.value);
    });

    pageDialog.addEventListener("close", () => {

        const buttomValue = pageDialog.returnValue;
    
        if(buttomValue == 'cross') {
            console.log('Dialog closed with crossDialogBtn');
        }
        else {
            if(buttomValue == 'add'){
                console.log('Dialog closed with addBtn');
                 
                itemLogicModule.addTask(title.value, description.value, dueDate.value, priority.value, projectID, notes.value, false);
                DOMControlModule.showTasksinProject(projectID);
            }
            else if (buttomValue == 'cancel'){
                console.log('Dialog closed with cancelBtn');
            }
            
            // reset title message and count value in the dialog
            title.classList.remove('normal','error', 'success');
            title.classList.add('normal');
            addTitleMessage.classList.remove('normal-message','error-message', 'success-message');
            addTitleMessage.classList.add('normal-message');
            addTitleMessage.textContent="";
            task_addBtn.disabled = false;
            desCurrent.textContent = 0;
            notesCurrent.textContent = 0;
            
            dialogForm.reset();
        }
    });

    description.addEventListener('input', function() {
        const allText = description.value;
        const charCount = allText.length;
        desCurrent.textContent = charCount;
    });

    notes.addEventListener('input', function() {
        const allText = notes.value;
        const charCount = allText.length;
        notesCurrent.textContent = charCount;
    });

    title.addEventListener('input', function() {
        const result = checkAddDuplicate(this.value, itemLogicModule.getAllTasks(projectID), 'task');
        task_addBtn.disabled = result.isInValid; 
        displayAddMessage('title', result);
    });

    function checkAddDuplicate(value, array, fieldName) {
        const isDuplicate = array.some(item => (item.title).toLowerCase() === value.toLowerCase());

        if (value == ""){
            return { isInValid: false, message: ``, type: 'normal'};
        }
        else {
            if (isDuplicate) {
                return {  isInValid: true, message: `The ${fieldName} name is duplicate. Choose a new one.`, type: 'error'};
            }
            else {
                return { isInValid: false, message: `The ${fieldName} name is available.`, type: 'success' };
            }
        }
    }

    function displayAddMessage(fieldName, result) {
        const fieldElement = document.querySelector(`#task-add-${fieldName}`);
        const messageElement = document.querySelector(`#task-add-${fieldName}-message`);

        fieldElement.classList.remove('normal', 'error', 'success');
        messageElement.classList.remove('normal-message','error-message', 'success-message');

        fieldElement.classList.add(`${result.type}`);
        messageElement.classList.add(`${result.type}-message`);

        if(result.type == 'normal') {
            messageElement.textContent = '';
        }
        else{
            messageElement.textContent = result.message;
        }
    }
}

export function taskEditDialogEvent() {
    const content = document.querySelector('.content');

    const pageDialog = document.querySelector('#task-edit-pageDialog');
    const dialogForm = document.querySelector('#task-edit-dialogForm');
    const task_editBtn = document.querySelector('#task-edit-editBtn');
    const crossDialogBtn = document.querySelector('#task-edit-crossDialogBtn');
    const title = document.querySelector('#task-edit-title');
    const editTitleMessage = document.querySelector('#task-edit-title-message');
    const description = document.querySelector('#task-edit-description');
    const desCurrent = document.querySelector('#task-edit-desCurrent');
    const notes = document.querySelector('#task-edit-notes');
    const notesCurrent = document.querySelector('#task-edit-notesCurrent');
    const dueDate = document.querySelector('#task-edit-dueDate');
    const priority = document.querySelector('#task-edit-priority');
    const projectOfTask = document.querySelector('#task-edit-projectOfTask');
    
    let currentTaskName = null;
    let currentProjectID = null;
    let currentTaskList = null;
    let currentTaskID = null;

    content.addEventListener("click", function(event) {
        const projectList = itemLogicModule.getAllProjects();
        let clickedEditBtn = null;

        if(event.target.classList.contains(".taskEdit")){
            clickedEditBtn = event.target;
        }
        // If the clicked element is not ".taskEdit",
        // try finding the nearest ancestor that is ".taskEdit"
        else if(event.target.closest(".taskEdit")) {
            clickedEditBtn = event.target.closest(".taskEdit");
        }

        if(clickedEditBtn) {
            currentProjectID = ((clickedEditBtn.parentNode).parentNode).dataset.task_projectid;
            currentTaskID = ((clickedEditBtn.parentNode).parentNode).dataset.taskid;
            currentTaskList = itemLogicModule.getAllTasks(currentProjectID);
            const currentTask = currentTaskList[currentTaskID];

            title.value = currentTask.title;
            description.value = currentTask.description;
            desCurrent.textContent = (currentTask.description).length;
            dueDate.value = currentTask.dueDate;
            priority.value = currentTask.priority;
            notes.value = currentTask.notes;
            notesCurrent.textContent = (currentTask.notes).length;

            // remove all children from projectOfTask
            while (projectOfTask.firstChild) {
                projectOfTask.removeChild(projectOfTask.firstChild);
            }

            // add options to projectOfTask
            const projectSelectInfo = document.createElement("option");
            projectSelectInfo.value="";
            projectSelectInfo.disabled = true;
            projectSelectInfo.textContent = "Which project this task belong to ?";
            projectOfTask.appendChild(projectSelectInfo);

            for(let index = 0 ; index < projectList.length ; index++){
                const projectSelectItem = document.createElement("option");
                projectSelectItem.value = index;

                if (index == currentProjectID) {
                    projectSelectItem.selected = true;
                }

                let projectName = projectList[index].title;
                
                // Make sure the project name listed is not over 40 characters
                if(projectName.length > 40){
                    projectName = projectName.substring(0, 40) + "...";
                }
                projectSelectItem.textContent = projectName;
                
                projectOfTask.appendChild(projectSelectItem);
            }

            currentTaskName = currentTask.title;
            pageDialog.showModal();
        }
    });

    crossDialogBtn.addEventListener('click', (event) => {
        const crossButton = event.target;
        pageDialog.close(crossButton.value);
    });

    dialogForm.addEventListener('submit', function(event) {
        const submitBtn = event.submitter;
        event.preventDefault();
        pageDialog.close(submitBtn.value);
    });

    pageDialog.addEventListener("close", () => {

        const buttomValue = pageDialog.returnValue;
    
        if(buttomValue == 'cross'){
            console.log('Dialog closed with crossDialogBtn');
        }
        else{
            if(buttomValue == 'edit'){
                console.log('Dialog closed with editBtn');
                
                let newProjectID = projectOfTask.value;

                if(currentProjectID == newProjectID){
                    itemLogicModule.modifyTask(currentProjectID, currentTaskID, title.value, description.value, dueDate.value, priority.value, notes.value);
                }
                else {
                    itemLogicModule.addTask(title.value, description.value, dueDate.value, priority.value, newProjectID, notes.value, currentTaskList[currentTaskID].state);
                    itemLogicModule.deleteTask(currentProjectID, currentTaskID);
                }
                DOMControlModule.showTasksinProject(currentProjectID);
            }
            else if (buttomValue == 'cancel'){
                console.log('Dialog closed with cancelBtn');
            }
        }
    
        title.classList.remove('normal','error', 'success');
        title.classList.add('normal');
        editTitleMessage.classList.remove('normal-message','error-message', 'success-message');
        editTitleMessage.classList.add('normal-message');
        editTitleMessage.textContent="";
        task_editBtn.disabled = false;
        desCurrent.textContent = 0;
        notesCurrent.textContent = 0;
    
        dialogForm.reset();
    });

    description.addEventListener('input', function() {
        const allText = description.value;
        const charCount = allText.length;
        desCurrent.textContent = charCount;
    });

    notes.addEventListener('input', function() {
        const allText = notes.value;
        const charCount = allText.length;
        notesCurrent.textContent = charCount;
    });

    title.addEventListener('input', function() {
        let newProjectID = projectOfTask.value;
        let checkedTaskList = null;
        let result = null;

        if(currentProjectID == newProjectID) {
            result = checkEditDuplicate(this.value, currentTaskList, 'task');
        }
        else {
            checkedTaskList = itemLogicModule.getAllTasks(newProjectID);
            result = checkEditDuplicateInNewProject(this.value, checkedTaskList, 'task');
        }

        task_editBtn.disabled = result.isInValid; 
        displayEditMessage('title', result);
    });

    projectOfTask.addEventListener('change', function() {
        let newProjectID = this.value;
        let checkedTaskList = null;
        let result = null;

        if(currentProjectID == newProjectID) {
            result = checkEditDuplicate(title.value, currentTaskList, 'task');
        }
        else {
            checkedTaskList = itemLogicModule.getAllTasks(newProjectID);
            result = checkEditDuplicateInNewProject(title.value, checkedTaskList, 'task');
        }

        task_editBtn.disabled = result.isInValid; 
        displayEditMessage('title', result);
    });
    
    function checkEditDuplicate(value, array, fieldName) { 
        const isDuplicate = array.some(item => (item.title).toLowerCase() === value.toLowerCase());

        if ((value == "") || (currentTaskName.toLowerCase() == value.toLowerCase())){
            return { isInValid: false, message: ``, type: 'normal'};
        }
        else {
            if (isDuplicate) {
                return {  isInValid: true, message: `The ${fieldName} name is duplicate in the selected project`, type: 'error'};
            }
            else {
                return { isInValid: false, message: `The ${fieldName} name is available.`, type: 'success' };
            }
        }
    }

    function checkEditDuplicateInNewProject(value, array, fieldName) {
        const isDuplicate = array.some(item => (item.title).toLowerCase() === value.toLowerCase());

        if (isDuplicate) {
            return {  isInValid: true, message: `The ${fieldName} name is duplicate in the selected project`, type: 'error'};
        }
        else {
            return { isInValid: false, message: `The ${fieldName} name is available.`, type: 'success' };
        }
    }
    
    function displayEditMessage(fieldName, result) {
        const fieldElement = document.querySelector(`#task-edit-${fieldName}`);
        const messageElement = document.querySelector(`#task-edit-${fieldName}-message`);

        fieldElement.classList.remove('normal', 'error', 'success');
        messageElement.classList.remove('normal-message','error-message', 'success-message');

        fieldElement.classList.add(`${result.type}`);
        messageElement.classList.add(`${result.type}-message`);

        if(result.type == 'normal') {
            messageElement.textContent = '';
        }
        else{
            messageElement.textContent = result.message;
        }
    }
}

export function taskInfoDialogEvent() {
    const content = document.querySelector('.content');

    const pageDialog = document.querySelector('#task-info-pageDialog');
    const dialogForm = document.querySelector('#task-info-dialogForm');
    const crossDialogBtn = document.querySelector('#task-info-crossDialogBtn');
    const title = document.querySelector('#task-info-title-text');
    const description = document.querySelector('#task-info-description-text');
    const notes = document.querySelector('#task-info-notes-text');
    const dueDate = document.querySelector('#task-info-dueDate-text');
    const priority = document.querySelector('#task-info-priority-text');
    const projectOfTask = document.querySelector('#task-info-projectOfTask-text');

    let currentProjectID = null;
    let currentTaskID = null;
    let currentTaskList = null;

    content.addEventListener("click", function(event) {
        const projectList = itemLogicModule.getAllProjects();
        let clickedInfoBtn = null;

        if(event.target.classList.contains(".taskInfo")){
            clickedInfoBtn = event.target;
        }
        // If the clicked element is not ".taskInfo",
        // try finding the nearest ancestor that is ".taskInfo"
        else if(event.target.closest(".taskInfo")) {
            clickedInfoBtn = event.target.closest(".taskInfo");
        }

        if(clickedInfoBtn) {
            currentProjectID = ((clickedInfoBtn.parentNode).parentNode).dataset.task_projectid;
            currentTaskID = ((clickedInfoBtn.parentNode).parentNode).dataset.taskid;
            currentTaskList = itemLogicModule.getAllTasks(currentProjectID);
            const currentTask = currentTaskList[currentTaskID];

            title.textContent = currentTask.title;
            description.textContent = currentTask.description;
            dueDate.textContent = currentTask.dueDate;

            let priorityValue = currentTask.priority;
            priority.textContent = (priorityValue.charAt(0)).toUpperCase() + priorityValue.substring(1);

            projectOfTask.textContent = projectList[currentProjectID].title;
            notes.textContent = currentTask.notes;

            pageDialog.showModal();
        }
    });
}

export function setAllDialogEvent() {
    projectAddDialogEvent();
    projectEditDialogEvent();
    projectInfoDialogEvent();
    projectDeleteDialogEvent();
    taskAddDialogEvent();
    taskEditDialogEvent();
    taskInfoDialogEvent();
}