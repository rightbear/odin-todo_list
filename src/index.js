import "./styles.css";
import * as DOMControlModule from "./function/DOMControl"
import * as eventHandlerModule from "./function/eventHandler"
import * as projectModalModule from "./item/projectModal"
import * as taskModalModule from "./item/taskModal"
import * as itemLogic from "./item/itemLogic"
import { format, addDays, subDays } from 'date-fns';

// If there is no created key of "projectList" in localStorage, set some default projects and tasks inside.
if(!localStorage.getItem('projectList')){
    const today = new Date();
    itemLogic.addProject("Default project1", "project desciption1", "project note1");
    itemLogic.addProject("Default project2", "project desciption2", "project note2");
    itemLogic.addProject("Default project3", "project desciption3", "project note3");

    itemLogic.addTask("Default task1.1", "task desciption1.1", convertDays(today), "low", "0", "task note1.1", true);
    itemLogic.addTask("Default task1.2", "task desciption1.2", convertDays(addDays(today, 2)), "medium", "0", "task note1.2", false);
    itemLogic.addTask("Default task1.3", "task desciption1.3", convertDays(addDays(today, 5)), "medium", "0", "task note1.3", true);
    itemLogic.addTask("Default task1.4", "task desciption1.4", convertDays(addDays(today, 8)), "high", "0", "task note1.4", false);
    itemLogic.addTask("Default task2.1", "task desciption2.1", convertDays(subDays(today, 5)), "low", "1", "task note2.1", false);
    itemLogic.addTask("Default task2.2", "task desciption2.2", convertDays(subDays(today, 2)), "medium", "1", "task note2.2", true);
    itemLogic.addTask("Default task2.3", "task desciption2.3", convertDays(today), "high", "1", "task note2.3", false);
    itemLogic.addTask("Default task2.4", "task desciption2.4", convertDays(addDays(today, 2)), "high", "1", "task note2.4", true);
    itemLogic.addTask("Default task3.1", "task desciption3.1", convertDays(today), "high", "2", "task note3.1", true);
    itemLogic.addTask("Default task3.2", "task desciption3.2", convertDays(subDays(today, 10)), "medium", "2", "task note3.2", true);
    itemLogic.addTask("Default task3.3", "task desciption3.3", convertDays(addDays(today, 10)), "low", "2", "task note3.3", false);
}

// Load basic DOM elements
DOMControlModule.loadInitialLayout();

// Load projectList, taskList and dialogs
DOMControlModule.showProjects();
DOMControlModule.showAllTasksinAllProjects();
createAllModals();

// Load all eventListners
setAllEventListners();

function createAllModals() {
    projectModalModule.createProjectAddDialog();
    projectModalModule.createProjectEditDialog();
    projectModalModule.createProjectInfoDialog();
    projectModalModule.createProjectDeleteDialog();
    taskModalModule.createTaskAddDialog();
    taskModalModule.createTaskEditDialog();
    taskModalModule.createTaskInfoDialog();
    taskModalModule.createTaskDeleteDialog();
}

function setAllEventListners() {
    eventHandlerModule.setAllItemListEvent();
    eventHandlerModule.setAllDialogEvent();
}

function convertDays(convertedDate) {
    return (format(convertedDate, 'yyyy-MM-dd'));
}