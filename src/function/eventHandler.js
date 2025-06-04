

// EventHandler about controling checkbox in task items on page
export function taskCheckboxEvent() {
    const taskCheckboxes = document.querySelectorAll(".taskCheckbox");
    const taskTitles = document.querySelectorAll(".taskTitle");

    for (let index = 0; index < taskCheckboxes.length; index++) {
        taskCheckboxes[index].addEventListener("change", function() {

            // If checked, strike through the task title
            if (this.checked) {
                taskTitles[index].style.textDecoration = "line-through";
            }
            // If unchecked, remove the strikethrough
            else {
                taskTitles[index].style.textDecoration = "none";
            }
     });
 }
}