import "./styles.css";
import * as DOMControlModule from "./function/DOMControl"
import * as eventHandlerModule from "./function/eventHandler"
import * as projectModalModule from "./item/projectModal"
import * as taskModalModule from "./item/taskModal"
import * as itemLogic from "./item/itemLogic"

localStorage.clear();

DOMControlModule.loadInitialLayout();

itemLogic.addProject("project1", "des1", "note1");
itemLogic.addProject("project2", "des2", "note2");
itemLogic.addProject("project3", "des3", "note3");
itemLogic.addProject("project4", "des4", "note4");
itemLogic.addProject("project5", "des5", "note5");
itemLogic.addProject("project6", "des6", "note6");

itemLogic.addTask("task00", "des00", "2025-06-13", "low", "0", "note00", false);
itemLogic.addTask("task01", "des01", "2025-06-11", "low", "0", "note01", false);
itemLogic.addTask("task02", "des01", "2025-06-15", "low", "0", "note01", false);
itemLogic.addTask("task03555555555555555555555555555555555555666666666666655555555555555555555555555555555555555555", "des01", "2025-06-16", "low", "0", "note01", false);
itemLogic.addTask("task04", "des01", "2025-06-17", "medium", "0", "note01", false);
itemLogic.addTask("task05", "des01", "2025-06-18", "medium", "0", "note01", false);
itemLogic.addTask("task06", "des01", "2025-06-19", "medium", "0", "note01", false);
itemLogic.addTask("task07", "des01", "2025-06-20", "medium", "0", "note01", false);
itemLogic.addTask("task08", "des01", "2025-06-21", "high", "0", "note01", false);
itemLogic.addTask("task09", "des01", "2025-06-22", "high", "0", "note01", false);
itemLogic.addTask("task10", "des01", "2025-06-23", "high", "0", "note01", false);


itemLogic.modifyTask(0, 1, "task000", "des000", "2025-06-10", "low", "note000");

itemLogic.switchTask(0, 0);
itemLogic.addTask("task11", "des10", "2025-06-13", "high", "1", "note10", true);

//itemLogic.deleteTask(0, 0);

itemLogic.modifyProject(1, "dddddddd7898788979d555d", "des2", "note2");

//itemLogic.deleteProject(0);

DOMControlModule.showProjects();
createAllModal();
eventHandlerModule.setAllDialogEvent();
const categoryAllItem = document.querySelector("#category-all");
categoryAllItem.classList.add("clickedItem");
DOMControlModule.showAllTasksinAllProjects();

eventHandlerModule.taskCheckboxEvent();
eventHandlerModule.clickProjectToShowAllTasksEvent();
eventHandlerModule.clickCategoryToShowAllTasksEvent();

function createAllModal() {
    projectModalModule.createProjectAddDialog();
    projectModalModule.createProjectEditDialog();
    projectModalModule.createProjectInfoDialog();
    projectModalModule.createProjectDeleteDialog();
    taskModalModule.createTaskAddDialog();
    taskModalModule.createTaskEditDialog();
    taskModalModule.createTaskInfoDialog();
    taskModalModule.createTaskDeleteDialog();
}