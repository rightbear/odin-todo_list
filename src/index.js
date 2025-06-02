import "./styles.css";
import { loadInitialLayout } from "./function/DOMControl.js"
import * as itemLogic from "./item/itemLogic.js"

loadInitialLayout();

localStorage.clear();

itemLogic.addProject("project1", "des1", "note1");
itemLogic.addProject("project2", "des2", "note2");

itemLogic.addProject("project3", "des3", "note3");
itemLogic.addProject("project4", "des4", "note4");
itemLogic.addProject("project5", "des5", "note5");

itemLogic.addTask(0, "task00", "des00", "due00", "pri00", "project1", "note00", false);
itemLogic.addTask(0, "taske01", "des01", "due01", "pri01", "project1", "note01", false);
/*
itemLogic.modifyTask(0, 1, "task000", "des000", "due000", "pri000", "project1", "note000");
*/
itemLogic.switchTask(0, 0);
itemLogic.addTask(1, "task10", "des10", "due10", "pri10", "project2", "note10", false);

//itemLogic.deleteTask(0, 0);
/*
itemLogic.modifyProject(1, "project233333", "des2", "note2");
*/
//itemLogic.deleteProject(0);