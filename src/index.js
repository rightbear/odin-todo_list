import "./styles.css";
import * as DOMControlModule from "./function/DOMControl"
import * as eventHandlerModule from "./function/eventHandler"
import * as projectModalModule from "./item/projectModal"
import * as itemLogic from "./item/itemLogic"

localStorage.clear();

DOMControlModule.loadInitialLayout();

itemLogic.addProject("project1", "des1", "note1");
itemLogic.addProject("project2", "des2", "note2");
itemLogic.addProject("project3", "des3", "note3");
itemLogic.addProject("project4", "des4", "note4");
itemLogic.addProject("project5", "des5", "note5");
itemLogic.addProject("project6", "des6", "note6");

itemLogic.addTask(0, "task00", "des00", "due00", "pri00", "project1", "note00", false);
itemLogic.addTask(0, "task01", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task02", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task03555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task04", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task05", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task06", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task07", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task08", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task09", "des01", "due01", "pri01", "project1", "note01", false);
itemLogic.addTask(0, "task10", "des01", "due01", "pri01", "project1", "note01", false);


itemLogic.modifyTask(0, 1, "task000", "des000", "due000", "pri000", "project1", "note000");

itemLogic.switchTask(0, 0);
itemLogic.addTask(1, "task10", "des10", "due10", "pri10", "project2", "note10", false);

//itemLogic.deleteTask(0, 0);

itemLogic.modifyProject(1, "dddddddd7898788979d555d", "des2", "note2");

//itemLogic.deleteProject(0);

DOMControlModule.showProjects();
projectModalModule.createProjectAddDialog();
eventHandlerModule.setAddDialogEvent();
DOMControlModule.showTasksinProject(0);
eventHandlerModule.taskCheckboxEvent();
eventHandlerModule.clickProjectToShowAllTasksEvent();