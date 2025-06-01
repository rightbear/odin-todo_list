import "./styles.css";
import { loadInitialLayout } from "./function/DOMControl.js"
import { addProject, modifyProject, deleteProject, displayProject} from "./project/projectLogic.js";
import { addTask, modifyTask, switchTask, deleteTask, displayTask} from "./task/taskLogic.js";

loadInitialLayout();

addProject("project1", "des1", "note1");
addProject("project2", "des2", "note2");
addProject("project3", "des3", "note3");
addProject("project4", "des4", "note4");
addProject("project5", "des5", "note5");
displayProject();
// print {{"project1", "des1", "note1"}, {"project2", "des2", "note2"}, {"project3", "des3", "note3"}, {"project4", "des4", "note4"}, {"project5", "des5", "note5"}}

addTask(0, "task00", "des00", "due00", "pri00", "project1", "note00");
addTask(0, "taske01", "des01", "due01", "pri01", "project1", "note01");
displayTask(0);
// print {{"task00", "des00", "due00", "pri00", "project1", "note00", "false"}, 
//        {"task01", "des01", "due01", "pri01", "project1", "note01", "false"}}
modifyTask(0, 1, "task000", "des000", "due000", "pri000", "project1", "note000");
switchTask(0, 0);
displayTask(0);
// print {{"task00", "des00", "due00", "pri00", "project1", "note00", "true"}, 
//        {"task000", "des000", "due000", "pri000", "project1", "note000", false}}
addTask(1, "task10", "des10", "due10", "pri10", "project2", "note10");
displayTask(1);
// print {{"task10", "des10", "due10", "pri10", "project2", "note10", "false"}} 
deleteTask(0, 0);
displayTask(0);
// print {{"task000", "des000", "due000", "pri000", "project1", "note000", false}}
modifyProject(1, "project233333", "des2", "note2");
displayProject();
// print {"project1", "des1", "note1"}, {"project233333", "des2", "note2"}, {"project3", "des3", "note3"}, {"project4", "des4", "note4"}, {"project5", "des5", "note5"}
displayTask(1);
// print {{"task10", "des10", "due10", "pri10", "project233333", "note10", "false"}} 