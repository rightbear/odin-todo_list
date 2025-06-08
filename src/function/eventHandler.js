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
        });
        
    }
}