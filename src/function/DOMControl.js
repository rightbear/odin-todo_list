import * as itemLogicModule from "../item/itemLogic"
import calenderIcon from "../images/calendar.png"
import checkMarkIcon from "../images/check-mark.png"
import layersIcon from "../images/layers.png"
import deleteIcon from "../images/delete.png"
import documentIcon from "../images/document.png"
import editIcon from "../images/editing.png"
import infoIcon from "../images/information.png" 
import addIcon from "../images/add.png"

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

    const hTitle = document.createElement("h1");
    hTitle.classList.add("hTitle");
    hTitle.textContent = "ToDo";
    header.appendChild(hTitle);
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
    categoryTitle.classList.add("sTitle");
    categoryTitle.textContent = "Category";
    const categoryDivs = document.createElement("div");
    categoryDivs.classList.add("categoryDivs");
    category.append(categoryTitle, categoryDivs);

    const todayCategory = addCategory(calenderIcon, "calender", 20, "today", "Today");
    const weekCategory = addCategory(calenderIcon, "calender", 20, "week", "Week");
    const completeCategory = addCategory(checkMarkIcon, "check-mark", 20, "completed", "Completed");
    const allCategory = addCategory(layersIcon, "layers", 20, "all", "All");

    categoryDivs.append(todayCategory, weekCategory, completeCategory, allCategory);
    
    showProjects();
}

function addCategory(iconSrc, iconAlt, iconHeight, textID, text, ) {

    const divContainer = document.createElement("div");

    let divIcon = document.createElement("img");
    divIcon.src = iconSrc;
    divIcon.alt = iconAlt;
    divIcon.height = iconHeight;

    let divText = document.createElement("div");
    divText.id = textID;
    divText.textContent = text;

    divContainer.append(divIcon, divText);
    divContainer.classList.add("categoryDiv");

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

export function loadInitialLayout(){
    addMainRegion();
    addHeaderRegion();
    addSidebarRegion();
    addContentRegion();
}

// Show all projects in the sidebar
export function showProjects() {

    const projects = document.querySelector(".projects");

    //Remove all old project items on page
    if (projects.firstChild) {
        projects.removeChild(projects.firstChild);
    }

    const projectList = itemLogicModule.restoreFromJSON();
    const projectNum = projectList.length;

    const projectHeader = document.createElement("div");

    projectHeader.classList.add("projectHeader");
    const projectsTitle = document.createElement("h2");
    projectsTitle.classList.add("sTitle");
    projectsTitle.textContent = `Projects (${projectNum})`;
    let addBtn = document.createElement("button");
    addBtn.classList.add("editBtn");
    const addBtnImg = document.createElement("img");
    addBtnImg.src = addIcon;
    addBtnImg.alt = "add";
    addBtnImg.height = 25;
    addBtn.appendChild(addBtnImg);
    const addBtnTooltip = document.createElement("span");
    addBtnTooltip.classList.add("btnTooltip");
    addBtnTooltip.textContent = "Add a project";
    addBtn.appendChild(addBtnTooltip);
    
    projectHeader.append(projectsTitle, addBtn);

    const projectsDivs = document.createElement("div");
    projectsDivs.classList.add("projectsDivs");

    projects.append(projectHeader, projectsDivs);

    for (let index = 0 ; index < projectNum ; index++){
        let projectTitle = projectList[index].getTitle();
        const projectItemDiv = addProject(documentIcon, document, 20, projectTitle);
        projectItemDiv.dataset.projectid = index;
        projectsDivs.appendChild(projectItemDiv);
    }
}

function addProject(iconSrc, iconAlt, iconHeight, text) {

    const divContainer = document.createElement("div");

    let divIcon = document.createElement("img");
    divIcon.src = iconSrc;
    divIcon.alt = iconAlt;
    divIcon.height = iconHeight;

    let divText = document.createElement("div");
    divText.classList.add("projectTitle");
    divText.textContent = text;

    let divFuncBtns = document.createElement("div");
    divFuncBtns.classList.add("projectBtns");
    let editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    let editBtnImg = document.createElement("img");
    editBtnImg.src = editIcon;
    editBtnImg.alt = "edit";
    editBtnImg.height = iconHeight;
    editBtn.appendChild(editBtnImg);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    let deleteBtnImg = document.createElement("img");
    deleteBtnImg.src = deleteIcon;
    deleteBtnImg.alt = "delete";
    deleteBtnImg.height = iconHeight;
    deleteBtn.appendChild(deleteBtnImg);

    let infoBtn = document.createElement("button");
    infoBtn.classList.add("infoBtn");
    let infoBtnImg = document.createElement("img");
    infoBtnImg.src = infoIcon;
    infoBtnImg.alt = "edit";
    infoBtnImg.height = iconHeight;
    infoBtn.appendChild(infoBtnImg);

    divFuncBtns.append(editBtn, deleteBtn, infoBtn);

    divContainer.append(divIcon, divText, divFuncBtns);
    divContainer.classList.add("projectDiv");

    return divContainer;
}

// Show all tasks of the specific project in the content region
export function showTasks() {
    
}

//after remove projects Update the projectid of all tasks


