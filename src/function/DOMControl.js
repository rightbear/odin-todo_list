import * as itemLogicModule from "../item/itemLogic"
import calenderIcon from "../images/calendar.png"
import checkMarkIcon from "../images/check-mark.png"
import layersIcon from "../images/layers.png"
import deleteIcon from "../images/delete.png"
import documentIcon from "../images/document.png"
import editIcon from "../images/editing.png"
import infoIcon from "../images/information.png" 
import addIcon from "../images/add.png"
import twoTicsIcon from "../images/two-ticks.png"

function addMainRegion (){
    const main = document.createElement("div");
    main.classList.add("main");
    document.body.appendChild(main);
}

function addHeaderRegion (){
    const main = document.querySelector(".main");

    const header = document.createElement("div");
    header.classList.add("header");
    main.appendChild(header);

    const hIcon = document.createElement("img");
    hIcon.classList.add("hIcon");
    hIcon.src = twoTicsIcon;
    hIcon.alt = "two-ticks";
    hIcon.height = 40;

    const hTitle = document.createElement("h1");
    hTitle.classList.add("hTitle");
    hTitle.textContent = "ToDo";

    header.append(hIcon, hTitle);
}

function addSidebarRegion (){
    const main = document.querySelector(".main");

    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    main.appendChild(sidebar);

    const category = document.createElement("div");
    category.classList.add("category");
    const projects = document.createElement("div");
    projects.classList.add("projects");
    sidebar.append(category, projects);

    const categoryTitle = document.createElement("h2");
    categoryTitle.classList.add("itemsTitle");
    categoryTitle.textContent = "Category";
    const categoryList = document.createElement("div");
    categoryList.classList.add("categoryList");
    category.append(categoryTitle, categoryList);

    const allCategory = addCategory(layersIcon, "layers", 20, "all", "All");
    const todayCategory = addCategory(calenderIcon, "calender", 20, "today", "Today");
    const weekCategory = addCategory(calenderIcon, "calender", 20, "week", "Week");
    const completeCategory = addCategory(checkMarkIcon, "check-mark", 20, "completed", "Completed");

    categoryList.append(allCategory, todayCategory, weekCategory, completeCategory);
}

function addCategory(iconSrc, iconAlt, iconHeight, textID, text) {

    const divContainer = document.createElement("div");

    let divIcon = document.createElement("img");
    divIcon.src = iconSrc;
    divIcon.alt = iconAlt;
    divIcon.height = iconHeight;

    let divText = document.createElement("div");
    divText.id = textID;
    divText.classList.add("categoryTitle");
    divText.textContent = text;

    divContainer.append(divIcon, divText);
    divContainer.classList.add("categoryItem");

    return divContainer;
}

function addContentRegion(){
    const main = document.querySelector(".main");

    const content = document.createElement("div");
    content.classList.add("content");
    main.appendChild(content);

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");
    content.appendChild(tasks);
}

function addDialogRegion(){
    const main = document.querySelector(".main");

    const dialog = document.createElement("div");
    dialog.classList.add("dialog");
    main.appendChild(dialog);

    const projectDialog = document.createElement("div");
    projectDialog.classList.add("projectDialog");
    const taskDialog = document.createElement("div");
    taskDialog.classList.add("taskDialog")
    dialog.append(projectDialog, taskDialog);
}

export function loadInitialLayout(){
    addMainRegion();
    addHeaderRegion();
    addSidebarRegion();
    addContentRegion();
    addDialogRegion();
}

// Show all projects in the sidebar
export function showProjects() {

    const projects = document.querySelector(".projects");

    //Remove all old project items on page
    while (projects.firstChild) {
        projects.removeChild(projects.firstChild);
    }

    const allProjects = itemLogicModule.restoreFromJSON();
    const projectNum = allProjects.length;

    const projectHeader = document.createElement("div");

    projectHeader.classList.add("projectHeader");
    const projectsTitle = document.createElement("h2");
    projectsTitle.classList.add("itemsTitle");
    projectsTitle.textContent = `Projects (${projectNum})`;
    const projectAddBtn = document.createElement("button");
    projectAddBtn.classList.add("addBtn");
    projectAddBtn.id = "projectAddBtn";
    const addBtnImg = document.createElement("img");
    addBtnImg.src = addIcon;
    addBtnImg.alt = "add";
    addBtnImg.height = 25;
    projectAddBtn.appendChild(addBtnImg);
    const addBtnTooltip = document.createElement("span");
    addBtnTooltip.classList.add("btnTooltip");
    addBtnTooltip.textContent = "Add a project";
    projectAddBtn.appendChild(addBtnTooltip);
    
    projectHeader.append(projectsTitle, projectAddBtn);

    const projectList = document.createElement("div");
    projectList.classList.add("projectList");

    projects.append(projectHeader, projectList);

    for (let index = 0 ; index < projectNum ; index++){
        let projectTitle = allProjects[index].getTitle();
        const projectItem = addProject(20, projectTitle);
        projectItem.dataset.projectid = index;
        projectList.appendChild(projectItem);
    }
}

function addProject(iconHeight, projectTitle) {

    const divContainer = document.createElement("div");
    divContainer.classList.add("projectItem");

    const divIcon = document.createElement("img");
    divIcon.src = documentIcon;
    divIcon.alt = "document";
    divIcon.height = iconHeight;

    const divText = document.createElement("div");
    divText.classList.add("projectTitle");
    divText.textContent = projectTitle;

    const divFuncBtns = document.createElement("div");
    divFuncBtns.classList.add("projectBtns");
    const editBtn = document.createElement("button");
    editBtn.classList.add("projectEdit");
    const editBtnImg = document.createElement("img");
    editBtnImg.src = editIcon;
    editBtnImg.alt = "edit";
    editBtnImg.height = iconHeight;
    editBtn.appendChild(editBtnImg);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("projectDelete");
    const deleteBtnImg = document.createElement("img");
    deleteBtnImg.src = deleteIcon;
    deleteBtnImg.alt = "delete";
    deleteBtnImg.height = iconHeight;
    deleteBtn.appendChild(deleteBtnImg);

    const infoBtn = document.createElement("button");
    infoBtn.classList.add("projectInfo");
    const infoBtnImg = document.createElement("img");
    infoBtnImg.src = infoIcon;
    infoBtnImg.alt = "info";
    infoBtnImg.height = iconHeight;
    infoBtn.appendChild(infoBtnImg);

    divFuncBtns.append(editBtn, deleteBtn, infoBtn);

    divContainer.append(divIcon, divText, divFuncBtns);

    return divContainer;
}

// Show all tasks of the specific project in the content region
export function showTasksinProject(projectID) {

    const content = document.querySelector(".content");

    //Remove all old task items on page
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    const allProjects = itemLogicModule.restoreFromJSON();
    const projectName = allProjects[projectID].getTitle();
    const allTasksinProject = allProjects[projectID].getAllTasks();
    const taskNum = allTasksinProject.length;
    
    const sloganTitle = addSlogan(documentIcon, "docment", projectName);

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const taskHeader = document.createElement("div");

    taskHeader.classList.add("taskHeader");
    const tasksTitle = document.createElement("h2");
    tasksTitle.classList.add("itemsTitle");
    tasksTitle.textContent = `Tasks (${taskNum})`;
    const taskAddBtn = document.createElement("button");
    taskAddBtn.classList.add("addBtn");
    taskAddBtn.id = "taskAddBtn";
    taskAddBtn.dataset.task_projectid = projectID;
    const addBtnImg = document.createElement("img");
    addBtnImg.src = addIcon;
    addBtnImg.alt = "add";
    addBtnImg.height = 25;
    taskAddBtn.appendChild(addBtnImg);
    const addBtnTooltip = document.createElement("span");
    addBtnTooltip.classList.add("btnTooltip");
    addBtnTooltip.textContent = "Add a task";
    taskAddBtn.appendChild(addBtnTooltip);

    taskHeader.append(tasksTitle, taskAddBtn);

    const taskList = document.createElement("div");
    taskList.classList.add("taskList");
    tasks.append(taskHeader, taskList);

    content.append(sloganTitle, tasks);

    for (let index = 0 ; index < taskNum ; index++){
        let taskTitle = allTasksinProject[index].title;
        let taskDueDate = allTasksinProject[index].dueDate;
        let taskState = allTasksinProject[index].state;

        const taskItem = addTaskinProject(20, taskTitle, taskDueDate, taskState);
        taskItem.dataset.taskid = index;
        taskItem.dataset.task_projectid = projectID;

        let taskPriority = allTasksinProject[index].priority;

        if(taskPriority === "low"){
            taskItem.classList.add("priority-low");
        }
        else if(taskPriority === "medium"){
            taskItem.classList.add("priority-medium");
        }
        else if(taskPriority === "high"){
            taskItem.classList.add("priority-high");
        }

        taskList.appendChild(taskItem);
    }
}

// Show all tasks of all projects in the content region
export function showAllTasksinAllProjects() {

    const content = document.querySelector(".content");

    //Remove all old task items on page
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    const categoryItem = document.querySelector("#all");
    const categoryName = categoryItem.textContent;
    const allTasksinCategory = itemLogicModule.getAllProjectsTasks();
    const taskNum = allTasksinCategory.length;
    
    const sloganTitle = addSlogan(layersIcon, "layers", categoryName);

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const taskHeader = document.createElement("div");

    taskHeader.classList.add("taskHeader");
    const tasksTitle = document.createElement("h2");
    tasksTitle.classList.add("itemsTitle");
    tasksTitle.textContent = `Tasks (${taskNum})`;

    taskHeader.appendChild(tasksTitle);

    const taskList = document.createElement("div");
    taskList.classList.add("taskList");
    tasks.append(taskHeader, taskList);

    content.append(sloganTitle, tasks);

    for (let index = 0 ; index < taskNum ; index++){
        let taskTitle = allTasksinCategory[index].title;
        let taskDueDate = allTasksinCategory[index].dueDate;
        let taskState = allTasksinCategory[index].state;

        const taskItem = addTaskinProject(20, taskTitle, taskDueDate, taskState);
        taskItem.dataset.taskid = allTasksinCategory[index].taskID;
        taskItem.dataset.task_projectid = allTasksinCategory[index].projectID;

        let taskPriority = allTasksinCategory[index].priority;

        if(taskPriority === "low"){
            taskItem.classList.add("priority-low");
        }
        else if(taskPriority === "medium"){
            taskItem.classList.add("priority-medium");
        }
        else if(taskPriority === "high"){
            taskItem.classList.add("priority-high");
        }

        taskList.appendChild(taskItem);
    }
}

// Show all tasks of today in the content region
export function showTodayTasks() {

    const content = document.querySelector(".content");

    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    const categoryItem = document.querySelector("#today");
    const categoryName = categoryItem.textContent;
    const allTasksinCategory = itemLogicModule.getTodayTasks();
    const taskNum = allTasksinCategory.length;
    
    const sloganTitle = addSlogan(calenderIcon, "calender", categoryName);

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const taskHeader = document.createElement("div");

    taskHeader.classList.add("taskHeader");
    const tasksTitle = document.createElement("h2");
    tasksTitle.classList.add("itemsTitle");
    tasksTitle.textContent = `Tasks (${taskNum})`;

    taskHeader.appendChild(tasksTitle);

    const taskList = document.createElement("div");
    taskList.classList.add("taskList");
    tasks.append(taskHeader, taskList);

    content.append(sloganTitle, tasks);

    for (let index = 0 ; index < taskNum ; index++){
        let taskTitle = allTasksinCategory[index].title;
        let taskDueDate = allTasksinCategory[index].dueDate;
        let taskState = allTasksinCategory[index].state;

        const taskItem = addTaskinProject(20, taskTitle, taskDueDate, taskState);
        taskItem.dataset.taskid = allTasksinCategory[index].taskID;
        taskItem.dataset.task_projectid = allTasksinCategory[index].projectID;

        let taskPriority = allTasksinCategory[index].priority;

        if(taskPriority === "low"){
            taskItem.classList.add("priority-low");
        }
        else if(taskPriority === "medium"){
            taskItem.classList.add("priority-medium");
        }
        else if(taskPriority === "high"){
            taskItem.classList.add("priority-high");
        }

        taskList.appendChild(taskItem);
    }
}

// Show all tasks within future 7 days in the content region
export function showWeekTasks() {

    const content = document.querySelector(".content");

    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    const categoryItem = document.querySelector("#week");
    const categoryName = categoryItem.textContent;
    const allTasksinCategory = itemLogicModule.getWeekTasks();
    const taskNum = allTasksinCategory.length;
    
    const sloganTitle = addSlogan(calenderIcon, "calender", categoryName);

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const taskHeader = document.createElement("div");

    taskHeader.classList.add("taskHeader");
    const tasksTitle = document.createElement("h2");
    tasksTitle.classList.add("itemsTitle");
    tasksTitle.textContent = `Tasks (${taskNum})`;

    taskHeader.appendChild(tasksTitle);

    const taskList = document.createElement("div");
    taskList.classList.add("taskList");
    tasks.append(taskHeader, taskList);

    content.append(sloganTitle, tasks);

    for (let index = 0 ; index < taskNum ; index++){
        let taskTitle = allTasksinCategory[index].title;
        let taskDueDate = allTasksinCategory[index].dueDate;
        let taskState = allTasksinCategory[index].state;

        const taskItem = addTaskinProject(20, taskTitle, taskDueDate, taskState);
        taskItem.dataset.taskid = allTasksinCategory[index].taskID;
        taskItem.dataset.task_projectid = allTasksinCategory[index].projectID;

        let taskPriority = allTasksinCategory[index].priority;

        if(taskPriority === "low"){
            taskItem.classList.add("priority-low");
        }
        else if(taskPriority === "medium"){
            taskItem.classList.add("priority-medium");
        }
        else if(taskPriority === "high"){
            taskItem.classList.add("priority-high");
        }

        taskList.appendChild(taskItem);
    }
}

// Show all completed tasks in the content region
export function showCompletedTasks() {

    const content = document.querySelector(".content");

    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    const categoryItem = document.querySelector("#completed");
    const categoryName = categoryItem.textContent;
    const allTasksinCategory = itemLogicModule.getCompletedTask();
    const taskNum = allTasksinCategory.length;
    
    const sloganTitle = addSlogan(checkMarkIcon, "check-mark", categoryName);

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const taskHeader = document.createElement("div");

    taskHeader.classList.add("taskHeader");
    const tasksTitle = document.createElement("h2");
    tasksTitle.classList.add("itemsTitle");
    tasksTitle.textContent = `Tasks (${taskNum})`;

    taskHeader.appendChild(tasksTitle);

    const taskList = document.createElement("div");
    taskList.classList.add("taskList");
    tasks.append(taskHeader, taskList);

    content.append(sloganTitle, tasks);

    for (let index = 0 ; index < taskNum ; index++){
        let taskTitle = allTasksinCategory[index].title;
        let taskDueDate = allTasksinCategory[index].dueDate;
        let taskState = allTasksinCategory[index].state;

        const taskItem = addTaskinProject(20, taskTitle, taskDueDate, taskState);
        taskItem.dataset.taskid = allTasksinCategory[index].taskID;
        taskItem.dataset.task_projectid = allTasksinCategory[index].projectID;

        let taskPriority = allTasksinCategory[index].priority;

        if(taskPriority === "low"){
            taskItem.classList.add("priority-low");
        }
        else if(taskPriority === "medium"){
            taskItem.classList.add("priority-medium");
        }
        else if(taskPriority === "high"){
            taskItem.classList.add("priority-high");
        }

        taskList.appendChild(taskItem);
    }
}


function addSlogan(iconSrc, iconAlt, sloganText) {
    const sloganTitle = document.createElement("div");
    sloganTitle.classList.add("sloganTitle");
    const sloganIcon = document.createElement("img");
    sloganIcon.src = iconSrc;
    sloganIcon.alt = iconAlt;
    sloganIcon.height = 40;
    const sloganName = document.createElement("div");
    sloganName.classList.add("sloganName")
    sloganName.textContent = sloganText;
    
    sloganTitle.append(sloganIcon, sloganName);

    return sloganTitle;
}

function addTaskinProject(iconHeight, taskTitle, taskDueDate, taskState) {

    const divContainer = document.createElement("div");
    divContainer.classList.add("taskItem");

    const divChecklist = document.createElement("input");
    divChecklist.type = "checkbox";
    divChecklist.classList.add("taskCheckbox");
    divChecklist.checked = (taskState === true) ? true : false;

    const divTaskTitle = document.createElement("div");
    divTaskTitle.classList.add("taskTitle");
    divTaskTitle.textContent = taskTitle;

    if (divChecklist.checked) {
        divTaskTitle.style.textDecoration = "line-through";
    }
    else {
        divTaskTitle.style.textDecoration = "none";
    }
    
    const divTaskDueDate = document.createElement("div");
    divTaskDueDate.classList.add("taskDueDate");
    divTaskDueDate.textContent = taskDueDate;

    const divFuncBtns = document.createElement("div");
    divFuncBtns.classList.add("taskBtns");
    const editBtn = document.createElement("button");
    editBtn.classList.add("taskEdit");
    const editBtnImg = document.createElement("img");
    editBtnImg.src = editIcon;
    editBtnImg.alt = "edit";
    editBtnImg.height = iconHeight;
    editBtn.appendChild(editBtnImg);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("taskDelete");
    const deleteBtnImg = document.createElement("img");
    deleteBtnImg.src = deleteIcon;
    deleteBtnImg.alt = "delete";
    deleteBtnImg.height = iconHeight;
    deleteBtn.appendChild(deleteBtnImg);

    const infoBtn = document.createElement("button");
    infoBtn.classList.add("taskInfo");
    const infoBtnImg = document.createElement("img");
    infoBtnImg.src = infoIcon;
    infoBtnImg.alt = "info";
    infoBtnImg.height = iconHeight;
    infoBtn.appendChild(infoBtnImg);

    divFuncBtns.append(editBtn, deleteBtn, infoBtn);

    divContainer.append(divChecklist, divTaskTitle, divTaskDueDate, divFuncBtns);

    return divContainer;
}