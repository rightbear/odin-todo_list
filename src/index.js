import "./styles.css";
import { addProject, modifyProject, deleteProject, displayeProject} from "./project.js";

addProject("title1", "des1", "note1");
addProject("title2", "des2", "note2");
addProject("title3", "des3", "note3");
addProject("title4", "des4", "note4");
addProject("title5", "des5", "note5");
displayeProject();
// print {"title1", "des1", "note1"}, {"title2", "des2", "note2"}, {"title3", "des3", "note3"}, {"title4", "des4", "note4"}, {"title5", "des5", "note5"}
modifyProject(4, "title2.5", "des2.5", "note2.5");
displayeProject();
// print {"title1", "des1", "note1"}, {"title2", "des2", "note2"}, {"title3", "des3", "note3"}, {"title4", "des4", "note4"}, {"title2.5", "des2.5", "note2.5"}
deleteProject(1);
displayeProject();
// print {"title1", "des1", "note1"}, {"title3", "des3", "note3"}, {"title4", "des4", "note4"}, {"title2.5", "des2.5", "note2.5"}