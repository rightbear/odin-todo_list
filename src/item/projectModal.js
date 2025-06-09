function clearProjecDialog(projectDialog){
  while (projectDialog.firstChild) {
    projectDialog.removeChild(projectDialog.firstChild);
  }
}

function addDialogHeader(headerText) {
    const dialogHeader = document.createElement("div");
    dialogHeader.classList.add("dialogHeader");

    const headerTitle= document.createElement("h2");
    headerTitle.classList.add("headerTitle");
    headerTitle.textContent = headerText;

    const crossDialogBtn= document.createElement("button");
    crossDialogBtn.classList.add("crossDialogBtn");
    crossDialogBtn.value = "cross";
    crossDialogBtn.ariaLabel = "close";
    crossDialogBtn.textContent = "X";

    dialogHeader.append(headerTitle, crossDialogBtn);
    return dialogHeader;
}

export function createProjectAddDialog() {
    const projectDialog = document.querySelector(".projectDialog");

    clearProjecDialog(projectDialog);

    const addPageDialog = document.createElement("dialog");
    addPageDialog.id = "add-pageDialog";

    const dialogHeader = addDialogHeader("Add Project");

    const dialogForm = document.createElement("form");
    dialogForm.classList.add("dialogForm");
    dialogForm.setAttribute("method", "dialog");
    const dialogFields = document.createElement("div");
    dialogFields.classList.add("dialogFields");

    const titleField = document.createElement("div");
    titleField.classList.add("field");
    titleField.id = "titleField";
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.innerHTML = 'Title<span class="requiredSign">*</span>:';
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.required = true;
    const addTitleMessage = document.createElement("div");
    addTitleMessage.classList.add("validation-message");
    addTitleMessage.id = "add-title-message";
    titleField.append(titleLabel, titleInput, addTitleMessage)

    const descriptionField = document.createElement("div");
    descriptionField.classList.add("field");
    descriptionField.id = "descriptionField";
    const descriptionLabel = document.createElement("div");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description:";
    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.id = "description";
    descriptionTextarea.name = "description";
    descriptionTextarea.maxLength = 400;
    descriptionTextarea.placeholder = "Start Typing...";
    const descriptionTextCount = document.createElement("div");
    descriptionTextCount.classList.add("textCount");
    const desCurrent = document.createElement("span");
    desCurrent.classList.add("current");
    desCurrent.id = "desCurrent";
    desCurrent.textContent = "0";
    const desMaximum = document.createElement("span");
    desMaximum.classList.add("maximum");
    desMaximum.innerHTML = "&nbsp;/ 400";
    descriptionTextCount.append(desCurrent, desMaximum);
    descriptionField.append(descriptionLabel, descriptionTextarea, descriptionTextCount);

    const notesField = document.createElement("div");
    notesField.classList.add("field");
    notesField.id = "notesField";
    const notesLabel = document.createElement("div");
    notesLabel.setAttribute("for", "notes");
    notesLabel.textContent = "Notes:";
    const notesTextarea = document.createElement("textarea");
    notesTextarea.id = "notes";
    notesTextarea.name = "notes";
    notesTextarea.maxLength = 400;
    notesTextarea.placeholder = "Start Typing...";
    const notesTextCount = document.createElement("div");
    notesTextCount.classList.add("textCount");
    const notesCurrent = document.createElement("span");
    notesCurrent.classList.add("current");
    notesCurrent.id = "notesCurrent";
    notesCurrent.textContent = "0";
    const notesMaximum = document.createElement("span");
    notesMaximum.classList.add("maximum");
    notesMaximum.innerHTML = "&nbsp;/ 400";
    notesTextCount.append(notesCurrent, notesMaximum);
    notesField.append(notesLabel, notesTextarea, notesTextCount); 

    dialogFields.append(titleField, descriptionField, notesField);

    const dialogButtons = document.createElement("div");
    dialogButtons.classList.add("dialogButtons");
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "submit";
    cancelBtn.id = "project-cancelBtn";
    cancelBtn.value = "cancel";
    cancelBtn.formMethod = "dialog";
    cancelBtn.formNoValidate = true;
    cancelBtn.textContent = "Cancel";
    const addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.id = "project-addBtn";
    addBtn.value = "add";
    addBtn.autofocus = true;
    addBtn.textContent = "Add";
    dialogButtons.append(cancelBtn, addBtn);

    dialogForm.append(dialogFields, dialogButtons);

    addPageDialog.append(dialogHeader, dialogForm);
    projectDialog.appendChild(addPageDialog);
}

/*

<dialog id="add-pageDialog">
    <div class="dialogHeader">
        <h2 class="headerTitle">Add Project</h2>
        <button class="crossDialogBtn" value="cross" aria-label="close">X</button>
    </div>
    <form class="dialogForm" method="dialog">
        <div class="dialogFields">
         
          <div class="field" id="titleField">
            <label for="title">Title<span class="requiredSign">*</span>:</label>
            <input type="text" id="title" name="title" required>
            <div class="validation-message" id="add-title-message"></div>
          </div>
          
          <div class="field" id="descriptionField">
            <div for="description">Description:</div>
            <textarea id="description" name="description" maxlength="400" placeholder="Start Typing..."></textarea>
            <div class="textCount">
              <span class="current" id="desCurrent">0</span>
              <span class="maximum">&nbsp;/ 400</span>
            </div>
          </div>
          
          <div class="field" id="notesField">
            <div for="notes">Notes:</div>
            <textarea id="notes" name="notes" maxlength="400" placeholder="Start Typing..."></textarea>
            <div class="textCount">
              <span class="current" id="notesCurrent">0</span>
              <span class="maximum">&nbsp;/ 400</span>
            </div>
          </div>
        </div>
      
        <div class="dialogButtons">
          <button type="submit" id="project-cancelBtn" value="cancel" formmethod="dialog" formnovalidate>Cancel</button>
          <button type="submit" id="project-addBtn" value="add" autofocus>Add</button>
        </div>
    </form>
</dialog>

*/