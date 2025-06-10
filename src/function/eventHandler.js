import * as DOMControlModule from "./DOMControl"
import * as itemLogicModule from "../item/itemLogic"
import * as projectModalModule from "../item/projectModal"

// Add new project in the page list
export function addNewProjectEvent() {
    const projectAddBtn = document.querySelector(".projectHeader .addBtn");

    projectAddBtn.addEventListener("click", function(){
        
    })
}



// Control checkbox in task items to change text
export function taskCheckboxEvent() {
    const taskCheckboxes = document.querySelectorAll(".taskCheckbox");
    const taskTitles = document.querySelectorAll(".taskTitle");

    for (let index = 0; index < taskCheckboxes.length; index++) {
        taskCheckboxes[index].addEventListener("change", function() {

            // If checked, strike through the task title
            if (this.checked) {
                taskTitles[index].style.textDecoration = "line-through";
            }
            // If unchecked, remove the strikethrough
            else {
                taskTitles[index].style.textDecoration = "none";
            }
     });
    }
}

// Click project to show all tasks inside the project
export function clickProjectToShowAllTasksEvent() {
    const projectItems = document.querySelectorAll(".projectItem");
    const categoryItems = document.querySelectorAll(".categoryItem");

    for (let index = 0; index < projectItems.length; index++) {
        
        projectItems[index].addEventListener("click", function(event) {
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
            
            this.classList.add("clickedItem");

            DOMControlModule.showTasksinProject(index);
        });
    }
}

export function setAddDialogEvent() {
    const addBtn = document.querySelector("#projectAddBtn");

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

    addBtn.addEventListener("click", function() {
        desCurrent.textContent = (description.value).length;
        notesCurrent.textContent = (notes.value).length;
        pageDialog.showModal();
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
            
            title.classList.remove('normal','error', 'success');
            title.classList.add('normal');
            addTitleMessage.classList.remove('normal-message','error-message', 'success-message');
            addTitleMessage.classList.add('normal-message');
            addTitleMessage.textContent="";
            
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

        // 清除所有樣式
        fieldElement.classList.remove('normal', 'error', 'success');
        messageElement.classList.remove('normal-message','error-message', 'success-message');

        fieldElement.classList.add(`${result.type}`);
        messageElement.classList.add(`${result.type}-message`);
        // 根據結果類型添加樣式
        if(result.type == 'normal') {
            messageElement.textContent = '';
        }
        else{
            messageElement.textContent = result.message;
        }
    }
}

export function setEditDialogEvent() {
    const editBtn = document.querySelectorAll(".projectEdit");

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
    let currentProjectName = title.value;
    let currentProjectID = null;
    const projectList = itemLogicModule.getAllProjects();


    for(let index = 0; index < editBtn.length; index++) {
        editBtn[index].addEventListener('click', (event) => {

            // Put "currentProjectID" inside EventListener to avoid closure problem.
            // If "currentProjectID" inside th loop but ouside EventListener, the referred "index" will always be "editBtn.length"
            // You can also write as -> const clickedEditBtn = editBtn[index];
            const clickedEditBtn = event.currentTarget;
            currentProjectID = ((clickedEditBtn.parentNode).parentNode).dataset.projectid;

            const currentProject = projectList[currentProjectID];
            console.log(currentProject);
            title.value = currentProject.title;
            description.value = currentProject.description;
            desCurrent.textContent = (currentProject.description).length;
            notes.value = currentProject.notes;
            notesCurrent.textContent = (currentProject.notes).length;
            currentProjectName = currentProject.title;
            pageDialog.showModal();
        });
    }

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
        
        title.classList.remove('normal','error', 'success');
        title.classList.add('normal');
        editTitleMessage.classList.remove('normal-message','error-message', 'success-message');
        editTitleMessage.classList.add('normal-message');
        editTitleMessage.textContent="";
    
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

        // 清除所有樣式
        fieldElement.classList.remove('normal', 'error', 'success');
        messageElement.classList.remove('normal-message','error-message', 'success-message');

        fieldElement.classList.add(`${result.type}`);
        messageElement.classList.add(`${result.type}-message`);
        // 根據結果類型添加樣式
        if(result.type == 'normal') {
            messageElement.textContent = '';
        }
        else{
            messageElement.textContent = result.message;
        }
    }
}