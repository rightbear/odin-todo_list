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

itemLogic.addTask("task00", "des00", "due00", "low", "0", "note00", false);
itemLogic.addTask("task01", "des01", "due01", "low", "0", "note01", false);
itemLogic.addTask("task02", "des01", "due01", "low", "0", "note01", false);
itemLogic.addTask("task03555555555555555555555555555555555555666666666666655555555555555555555555555555555555555555", "des01", "due01", "low", "0", "note01", false);
itemLogic.addTask("task04", "des01", "due01", "medium", "0", "note01", false);
itemLogic.addTask("task05", "des01", "due01", "medium", "0", "note01", false);
itemLogic.addTask("task06", "des01", "due01", "medium", "0", "note01", false);
itemLogic.addTask("task07", "des01", "due01", "medium", "0", "note01", false);
itemLogic.addTask("task08", "des01", "due01", "high", "0", "note01", false);
itemLogic.addTask("task09", "des01", "due01", "high", "0", "note01", false);
itemLogic.addTask("task10", "des01", "due01", "high", "0", "note01", false);


itemLogic.modifyTask(0, 1, "task000", "des000", "due000", "low", "note000");

itemLogic.switchTask(0, 0);
itemLogic.addTask("task10", "des10", "due10", "high", "1", "note10", false);

//itemLogic.deleteTask(0, 0);

itemLogic.modifyProject(1, "dddddddd7898788979d555d", "des2", "note2");

//itemLogic.deleteProject(0);

DOMControlModule.showProjects();
createAllModal();
eventHandlerModule.setAllDialogEvent();
DOMControlModule.showTasksinProject(0);
eventHandlerModule.taskCheckboxEvent();
eventHandlerModule.clickProjectToShowAllTasksEvent();

function createAllModal() {
    projectModalModule.createProjectAddDialog();
    projectModalModule.createProjectEditDialog();
    projectModalModule.createProjectInfoDialog();
    projectModalModule.createProjectDeleteDialog();
    taskModalModule.createTaskAddDialog();
}