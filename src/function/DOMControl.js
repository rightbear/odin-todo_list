import * as itemLogicModule from "../item/itemLogic"
import * as eventHandlerModule from "./eventHandler"
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

function addCategory(iconSrc, iconAlt, iconHeight, textID, text, ) {

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

    const dialog = document.querySelector('.dialog');
    const projectDialog = document.createElement("div");
    projectDialog.classList.add("projectDialog");
    dialog.appendChild(projectDialog);
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

    const allProjects = itemLogicModule.restoreFromJSON();
    const projectName = allProjects[projectID].getTitle();
    const allTasksinProject = allProjects[projectID].getAllTasks();
    const taskNum = allTasksinProject.length;

    const contentwithSlogan = addSlogan(documentIcon, "docment", projectName);

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

    contentwithSlogan.appendChild(tasks);

    for (let index = 0 ; index < taskNum ; index++){
        let taskTitle = allTasksinProject[index].title;
        let taskState = allTasksinProject[index].state;
        const taskItem = addTask(20, taskTitle, taskState);
        taskItem.dataset.taskid = index;
        taskItem.dataset.task_projectid = projectID;
        taskList.appendChild(taskItem);
    }

    eventHandlerModule.taskCheckboxEvent();
}

function addSlogan(iconSrc, iconAlt, sloganText) {
    const content = document.querySelector(".content");

    //Remove all old task items on page
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

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
    content.appendChild(sloganTitle);

    return content;
}

function addTask(iconHeight, taskTitle, taskState) {

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

    divContainer.append(divChecklist, divTaskTitle, divFuncBtns);

    return divContainer;
}

//after remove projects, Update the data attribute of other projects, and update projectid of all tasks



