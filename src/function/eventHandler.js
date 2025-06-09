import * as DOMControlModule from "./DOMControl"
import * as itemLogicModule from "../item/itemLogic"

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
    const addBtn = document.querySelector(".addBtn");

    const add_pageDialog = document.querySelector('#add-pageDialog');
    const dialogForm = document.querySelector('.dialogForm');
    const project_addBtn = document.querySelector('#project-addBtn');
    const crossDialogBtn = document.querySelector('.crossDialogBtn');
    const title = document.querySelector('#title');
    const addTitleMessage = document.querySelector('#add-title-message');
    const description = document.querySelector('#description');
    const desCurrent = document.querySelector('#desCurrent');
    const notes = document.querySelector('#notes');
    const notesCurrent = document.querySelector('#notesCurrent');

    addBtn.addEventListener("click", function() {
        desCurrent.textContent = (description.value).length;
        notesCurrent.textContent = (notes.value).length;
        add_pageDialog.showModal();
    });

    crossDialogBtn.addEventListener('click', (event) => {
        const crossButton = event.target;
        add_pageDialog.close(crossButton.value);
    });

    // If user click "Add" button in form of dialog, it will triger a close behavior for dialog
    dialogForm.addEventListener('submit', function(event) {
        const submitBtn = event.submitter;

        // We don't want to submit this fake form
        event.preventDefault();

        // Have to send the submitter value of form, as the returnValue of dialog.
        add_pageDialog.close(submitBtn.value);
    });

    add_pageDialog.addEventListener("close", () => {

        const buttomValue = add_pageDialog.returnValue;
    
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
        const fieldElement = document.querySelector(`#${fieldName}`);
        const messageElement = document.querySelector(`#add-${fieldName}-message`);

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