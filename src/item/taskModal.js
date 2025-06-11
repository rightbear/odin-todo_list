export function createTaskAddDialog() {
  const taskDialog = document.querySelector(".taskDialog");

  const addPageDialog = document.createElement("dialog");
  addPageDialog.id = "task-add-pageDialog";

  const dialogHeader = document.createElement("div");
  dialogHeader.classList.add("dialogHeader");

  const headerTitle= document.createElement("h2");
  headerTitle.classList.add("headerTitle");
  headerTitle.textContent = "Add Task";

  const crossDialogBtn= document.createElement("button");
  crossDialogBtn.classList.add("crossDialogBtn");
  crossDialogBtn.id = "task-add-crossDialogBtn";
  crossDialogBtn.value = "cross";
  crossDialogBtn.ariaLabel = "close";
  crossDialogBtn.textContent = "X";

  dialogHeader.append(headerTitle, crossDialogBtn);

  const dialogForm = document.createElement("form");
  dialogForm.classList.add("dialogForm");
  dialogForm.id = "task-add-dialogForm";
  dialogForm.setAttribute("method", "dialog");
  const dialogFields = document.createElement("div");
  dialogFields.classList.add("dialogFields");

  const titleField = document.createElement("div");
  titleField.classList.add("field");
  titleField.id = "task-add-titleField";
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "task-add-title");
  titleLabel.innerHTML = 'Title<span class="requiredSign">*</span>:';
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "task-add-title";
  titleInput.name = "title";
  titleInput.required = true;
  const addTitleMessage = document.createElement("div");
  addTitleMessage.classList.add("validation-message");
  addTitleMessage.id = "task-add-title-message";
  titleField.append(titleLabel, titleInput, addTitleMessage)

  const descriptionField = document.createElement("div");
  descriptionField.classList.add("field");
  descriptionField.id = "task-add-descriptionField";
  const descriptionLabel = document.createElement("div");
  descriptionLabel.setAttribute("for", "task-add-description");
  descriptionLabel.textContent = "Description:";
  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.id = "task-add-description";
  descriptionTextarea.name = "description";
  descriptionTextarea.maxLength = 200;
  descriptionTextarea.placeholder = "Start Typing...";
  const descriptionTextCount = document.createElement("div");
  descriptionTextCount.classList.add("textCount");
  const desCurrent = document.createElement("span");
  desCurrent.classList.add("current");
  desCurrent.id = "task-add-desCurrent";
  desCurrent.textContent = "0";
  const desMaximum = document.createElement("span");
  desMaximum.classList.add("maximum");
  desMaximum.innerHTML = "&nbsp;/ 200";
  descriptionTextCount.append(desCurrent, desMaximum);
  descriptionField.append(descriptionLabel, descriptionTextarea, descriptionTextCount);

  const dueDateField = document.createElement("div");
  dueDateField.classList.add("field");
  dueDateField.id = "task-add-dueDateField";
  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "task-add-dueDate");
  dueDateLabel.innerHTML = 'Due Date<span class="requiredSign">*</span>:';
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.id = "task-add-dueDate";
  dueDateInput.name = "dueDate";
  dueDateInput.required = true;
  dueDateField.append(dueDateLabel, dueDateInput);

  const priorityField = document.createElement("div");
  priorityField.classList.add("field");
  priorityField.id = "task-add-priorityField";
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "task-add-priority");
  priorityLabel.innerHTML = 'Priority<span class="requiredSign">*</span>:';
  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";
  prioritySelect.id = "task-add-priority";
  prioritySelect.required = true;
  const prioritySelectOptText = document.createElement("option");
  prioritySelectOptText.value = "";
  prioritySelectOptText.disabled = true;
  prioritySelectOptText.selected = true;
  prioritySelectOptText.textContent = "How important the task is?";
  const prioritySelectOptLow = document.createElement("option");
  prioritySelectOptLow.value = "low";
  prioritySelectOptLow.textContent = "Low";
  const prioritySelectOptMed = document.createElement("option");
  prioritySelectOptMed.value = "medium";
  prioritySelectOptMed.textContent = "Medium";
  const prioritySelectOptHigh = document.createElement("option");
  prioritySelectOptHigh.value = "high";
  prioritySelectOptHigh.textContent = "High";
  prioritySelect.append(prioritySelectOptText, prioritySelectOptLow, prioritySelectOptMed, prioritySelectOptHigh);
  priorityField.append(priorityLabel, prioritySelect);

  const notesField = document.createElement("div");
  notesField.classList.add("field");
  notesField.id = "task-add-notesField";
  const notesLabel = document.createElement("div");
  notesLabel.setAttribute("for", "task-add-notes");
  notesLabel.textContent = "Notes:";
  const notesTextarea = document.createElement("textarea");
  notesTextarea.id = "task-add-notes";
  notesTextarea.name = "notes";
  notesTextarea.maxLength = 200;
  notesTextarea.placeholder = "Start Typing...";
  const notesTextCount = document.createElement("div");
  notesTextCount.classList.add("textCount");
  const notesCurrent = document.createElement("span");
  notesCurrent.classList.add("current");
  notesCurrent.id = "task-add-notesCurrent";
  notesCurrent.textContent = "0";
  const notesMaximum = document.createElement("span");
  notesMaximum.classList.add("maximum");
  notesMaximum.innerHTML = "&nbsp;/ 200";
  notesTextCount.append(notesCurrent, notesMaximum);
  notesField.append(notesLabel, notesTextarea, notesTextCount); 

  dialogFields.append(titleField, descriptionField, dueDateField, priorityField, notesField);

  const dialogButtons = document.createElement("div");
  dialogButtons.classList.add("dialogButtons");
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "submit";
  cancelBtn.id = "task-add-cancelBtn";
  cancelBtn.value = "cancel";
  cancelBtn.formMethod = "dialog";
  cancelBtn.formNoValidate = true;
  cancelBtn.textContent = "Cancel";
  const addBtn = document.createElement("button");
  addBtn.type = "submit";
  addBtn.id = "task-add-addBtn";
  addBtn.value = "add";
  addBtn.autofocus = true;
  addBtn.textContent = "Add";
  dialogButtons.append(cancelBtn, addBtn);

  dialogForm.append(dialogFields, dialogButtons);

  addPageDialog.append(dialogHeader, dialogForm);
  taskDialog.appendChild(addPageDialog);
}

/*

<dialog id="task-add-pageDialog">
    <div class="dialogHeader">
        <h2 class="headerTitle">Add Task</h2>
        <button id="crossDialogBtn" id="task-add-crossDialogBtn" value="cross" aria-label="close">X</button>
    </div>
    <form class="dialogForm" id="task-add-dialogForm" method="dialog">
        <div class="dialogFields">
         
          <div class="field" id="task-add-titleField">
            <label for="task-add-title">Title<span class="requiredSign">*</span>:</label>
            <input type="text" id="task-add-title" name="title" required>
            <div class="validation-message" id="task-add-title-message"></div>
          </div>
          
          <div class="field" id="task-add-descriptionField">
            <div for="task-add-description">Description:</div>
            <textarea id="task-add-description" name="description" maxlength="200" placeholder="Start Typing..."></textarea>
            <div class="textCount">
              <span class="current" id="task-add-desCurrent">0</span>
              <span class="maximum">&nbsp;/ 200</span>
            </div>
          </div>
          
          <div class="field" id="task-add-dueDateField">
            <label for="task-add-dueDate">Due Date<span class="requiredSign">*</span>:</label>
            <input type="date" id="task-add-dueDate" name="dueDate" required>
          </div>
          
          <div class="field" id="task-add-priorityField">
            <label for="task-add-priority">Priority<span class="requiredSign">*</span>:</label>
            <select name="priority" id="task-add-priority" required>
              <option value="" disabled>How important the task is?</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div class="field" id="task-add-notesField">
            <div for="task-add-notes">Notes:</div>
            <textarea id="task-add-notes" name="notes" maxlength="200" placeholder="Start Typing..."></textarea>
            <div class="textCount">
              <span class="current" id="task-add-notesCurrent">0</span>
              <span class="maximum">&nbsp;/ 200</span>
            </div>
          </div>
        </div>
      
        <div class="dialogButtons">
          <button type="submit" id="task-add-cancelBtn" value="cancel" formmethod="dialog" formnovalidate>Cancel</button>
          <button type="submit" id="task-add-addBtn" value="add" autofocus>Add</button>
        </div>
    </form>
</dialog>

*/