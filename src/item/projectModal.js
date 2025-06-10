export function createProjectAddDialog() {
    const projectDialog = document.querySelector(".projectDialog");

    const addPageDialog = document.createElement("dialog");
    addPageDialog.id = "project-add-pageDialog";

    const dialogHeader = document.createElement("div");
    dialogHeader.classList.add("dialogHeader");

    const headerTitle= document.createElement("h2");
    headerTitle.classList.add("headerTitle");
    headerTitle.textContent = "Add Project";

    const crossDialogBtn= document.createElement("button");
    crossDialogBtn.classList.add("crossDialogBtn");
    crossDialogBtn.id = "project-add-crossDialogBtn";
    crossDialogBtn.value = "cross";
    crossDialogBtn.ariaLabel = "close";
    crossDialogBtn.textContent = "X";

    dialogHeader.append(headerTitle, crossDialogBtn);

    const dialogForm = document.createElement("form");
    dialogForm.classList.add("dialogForm");
    dialogForm.id = "project-add-dialogForm";
    dialogForm.setAttribute("method", "dialog");
    const dialogFields = document.createElement("div");
    dialogFields.classList.add("dialogFields");

    const titleField = document.createElement("div");
    titleField.classList.add("field");
    titleField.id = "project-add-titleField";
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "project-add-title");
    titleLabel.innerHTML = 'Title<span class="requiredSign">*</span>:';
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "project-add-title";
    titleInput.name = "title";
    titleInput.required = true;
    const addTitleMessage = document.createElement("div");
    addTitleMessage.classList.add("validation-message");
    addTitleMessage.id = "project-add-title-message";
    titleField.append(titleLabel, titleInput, addTitleMessage)

    const descriptionField = document.createElement("div");
    descriptionField.classList.add("field");
    descriptionField.id = "project-add-descriptionField";
    const descriptionLabel = document.createElement("div");
    descriptionLabel.setAttribute("for", "project-add-description");
    descriptionLabel.textContent = "Description:";
    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.id = "project-add-description";
    descriptionTextarea.name = "description";
    descriptionTextarea.maxLength = 400;
    descriptionTextarea.placeholder = "Start Typing...";
    const descriptionTextCount = document.createElement("div");
    descriptionTextCount.classList.add("textCount");
    const desCurrent = document.createElement("span");
    desCurrent.classList.add("current");
    desCurrent.id = "project-add-desCurrent";
    desCurrent.textContent = "0";
    const desMaximum = document.createElement("span");
    desMaximum.classList.add("maximum");
    desMaximum.innerHTML = "&nbsp;/ 400";
    descriptionTextCount.append(desCurrent, desMaximum);
    descriptionField.append(descriptionLabel, descriptionTextarea, descriptionTextCount);

    const notesField = document.createElement("div");
    notesField.classList.add("field");
    notesField.id = "project-add-notesField";
    const notesLabel = document.createElement("div");
    notesLabel.setAttribute("for", "project-add-notes");
    notesLabel.textContent = "Notes:";
    const notesTextarea = document.createElement("textarea");
    notesTextarea.id = "project-add-notes";
    notesTextarea.name = "notes";
    notesTextarea.maxLength = 400;
    notesTextarea.placeholder = "Start Typing...";
    const notesTextCount = document.createElement("div");
    notesTextCount.classList.add("textCount");
    const notesCurrent = document.createElement("span");
    notesCurrent.classList.add("current");
    notesCurrent.id = "project-add-notesCurrent";
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
    cancelBtn.id = "project-add-cancelBtn";
    cancelBtn.value = "cancel";
    cancelBtn.formMethod = "dialog";
    cancelBtn.formNoValidate = true;
    cancelBtn.textContent = "Cancel";
    const addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.id = "project-add-addBtn";
    addBtn.value = "add";
    addBtn.autofocus = true;
    addBtn.textContent = "Add";
    dialogButtons.append(cancelBtn, addBtn);

    dialogForm.append(dialogFields, dialogButtons);

    addPageDialog.append(dialogHeader, dialogForm);
    projectDialog.appendChild(addPageDialog);
}

/*

<dialog id="project-add-pageDialog">
    <div class="dialogHeader">
        <h2 class="headerTitle">Add Project</h2>
        <button class="crossDialogBtn" id="project-add-crossDialogBtn" value="cross" aria-label="close">X</button>
    </div>
    <form class="dialogForm" id="project-add-dialogForm" method="dialog">
        <div class="dialogFields">
         
          <div class="field" id="project-add-titleField">
            <label for="project-add-title">Title<span class="requiredSign">*</span>:</label>
            <input type="text" id="project-add-title" name="title" required>
            <div class="validation-message" id="project-add-title-message"></div>
          </div>
          
          <div class="field" id="project-add-descriptionField">
            <div for="project-add-description">Description:</div>
            <textarea id="project-add-description" name="description" maxlength="400" placeholder="Start Typing..."></textarea>
            <div class="textCount">
              <span class="current" id="project-add-desCurrent">0</span>
              <span class="maximum">&nbsp;/ 400</span>
            </div>
          </div>
          
          <div class="field" id="project-add-notesField">
            <div for="project-add-notes">Notes:</div>
            <textarea id="project-add-notes" name="notes" maxlength="400" placeholder="Start Typing..."></textarea>
            <div class="textCount">
              <span class="current" id="project-add-notesCurrent">0</span>
              <span class="maximum">&nbsp;/ 400</span>
            </div>
          </div>
        </div>
      
        <div class="dialogButtons">
          <button type="submit" id="project-add-cancelBtn" value="cancel" formmethod="dialog" formnovalidate>Cancel</button>
          <button type="submit" id="project-add-addBtn" value="add" autofocus>Add</button>
        </div>
    </form>
</dialog>

*/

export function createProjectEditDialog() {
    const projectDialog = document.querySelector(".projectDialog");

    const editPageDialog = document.createElement("dialog");
    editPageDialog.id = "project-edit-pageDialog";

    const dialogHeader = document.createElement("div");
    dialogHeader.classList.add("dialogHeader");

    const headerTitle= document.createElement("h2");
    headerTitle.classList.add("headerTitle");
    headerTitle.textContent = "Edit Project";

    const crossDialogBtn= document.createElement("button");
    crossDialogBtn.classList.add("crossDialogBtn");
    crossDialogBtn.id = "project-edit-crossDialogBtn";
    crossDialogBtn.value = "cross";
    crossDialogBtn.ariaLabel = "close";
    crossDialogBtn.textContent = "X";

    dialogHeader.append(headerTitle, crossDialogBtn);

    const dialogForm = document.createElement("form");
    dialogForm.classList.add("dialogForm");
    dialogForm.id = "project-edit-dialogForm";
    dialogForm.setAttribute("method", "dialog");
    const dialogFields = document.createElement("div");
    dialogFields.classList.add("dialogFields");

    const titleField = document.createElement("div");
    titleField.classList.add("field");
    titleField.id = "project-edit-titleField";
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "project-edit-title");
    titleLabel.innerHTML = 'Title<span class="requiredSign">*</span>:';
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "project-edit-title";
    titleInput.name = "title";
    titleInput.required = true;
    const addTitleMessage = document.createElement("div");
    addTitleMessage.classList.add("validation-message");
    addTitleMessage.id = "project-edit-title-message";
    titleField.append(titleLabel, titleInput, addTitleMessage)

    const descriptionField = document.createElement("div");
    descriptionField.classList.add("field");
    descriptionField.id = "project-edit-descriptionField";
    const descriptionLabel = document.createElement("div");
    descriptionLabel.setAttribute("for", "project-edit-description");
    descriptionLabel.textContent = "Description:";
    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.id = "project-edit-description";
    descriptionTextarea.name = "description";
    descriptionTextarea.maxLength = 400;
    descriptionTextarea.placeholder = "Start Editing...";
    const descriptionTextCount = document.createElement("div");
    descriptionTextCount.classList.add("textCount");
    const desCurrent = document.createElement("span");
    desCurrent.classList.add("current");
    desCurrent.id = "project-edit-desCurrent";
    desCurrent.textContent = "0";
    const desMaximum = document.createElement("span");
    desMaximum.classList.add("maximum");
    desMaximum.innerHTML = "&nbsp;/ 400";
    descriptionTextCount.append(desCurrent, desMaximum);
    descriptionField.append(descriptionLabel, descriptionTextarea, descriptionTextCount);

    const notesField = document.createElement("div");
    notesField.classList.add("field");
    notesField.id = "project-edit-notesField";
    const notesLabel = document.createElement("div");
    notesLabel.setAttribute("for", "project-edit-notes");
    notesLabel.textContent = "Notes:";
    const notesTextarea = document.createElement("textarea");
    notesTextarea.id = "project-edit-notes";
    notesTextarea.name = "notes";
    notesTextarea.maxLength = 400;
    notesTextarea.placeholder = "Start Editing...";
    const notesTextCount = document.createElement("div");
    notesTextCount.classList.add("textCount");
    const notesCurrent = document.createElement("span");
    notesCurrent.classList.add("current");
    notesCurrent.id = "project-edit-notesCurrent";
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
    cancelBtn.id = "project-edit-cancelBtn";
    cancelBtn.value = "cancel";
    cancelBtn.formMethod = "dialog";
    cancelBtn.formNoValidate = true;
    cancelBtn.textContent = "Cancel";
    const editBtn = document.createElement("button");
    editBtn.type = "submit";
    editBtn.id = "project-edit-editBtn";
    editBtn.value = "edit";
    editBtn.autofocus = true;
    editBtn.textContent = "Edit";
    dialogButtons.append(cancelBtn, editBtn);

    dialogForm.append(dialogFields, dialogButtons);

    editPageDialog.append(dialogHeader, dialogForm);
    projectDialog.appendChild(editPageDialog);
}

/*
<dialog id="project-edit-pageDialog">
    <div class="dialogHeader">
        <h2 class="headerTitle">Edit Project</h2>
        <button class="crossDialogBtn" id="project-edit-crossDialogBtn" value="cross" aria-label="close">X</button>
    </div>
    <form class="dialogForm" id="project-edit-dialogForm" method="dialog">
        <div class="dialogFields">
         
          <div class="field" id="project-edit-titleField">
            <label for="project-edit-title">Title<span class="requiredSign">*</span>:</label>
            <input type="text" id="project-edit-title" name="title" required>
            <div class="validation-message" id="project-edit-title-message"></div>
          </div>
          
          <div class="field" id="project-edit-descriptionField">
            <div for="project-edit-description">Description:</div>
            <textarea id="project-edit-description" name="description" maxlength="400" placeholder="Start Editing..."></textarea>
            <div class="textCount">
              <span class="current" id="project-edit-desCurrent">0</span>
              <span class="maximum">&nbsp;/ 400</span>
            </div>
          </div>
          
          <div class="field" id="notesField">
            <div for="project-edit-notes">Notes:</div>
            <textarea id="project-edit-notes" name="notes" maxlength="400" placeholder="Start Editing..."></textarea>
            <div class="textCount">
              <span class="current" id="project-edit-notesCurrent">0</span>
              <span class="maximum">&nbsp;/ 400</span>
            </div>
          </div>
        </div>
      
        <div class="dialogButtons">
          <button type="submit" id="project-edit-cancelBtn" value="cancel" formmethod="dialog" formnovalidate>Cancel</button>
          <button type="submit" id="project-edit-editBtn" value="edit" autofocus>Edit</button>
        </div>
    </form>
</dialog>
*/

export function createProjectInfoDialog() {
  const projectDialog = document.querySelector(".projectDialog");

    const infoPageDialog = document.createElement("dialog");
    infoPageDialog.id = "project-info-pageDialog";

    const dialogHeader = document.createElement("div");
    dialogHeader.classList.add("dialogHeader");

    const headerTitle= document.createElement("h2");
    headerTitle.classList.add("headerTitle");
    headerTitle.textContent = "Project Information";

    const crossDialogBtn= document.createElement("button");
    crossDialogBtn.classList.add("crossDialogBtn");
    crossDialogBtn.id = "project-info-crossDialogBtn";
    crossDialogBtn.value = "cross";
    crossDialogBtn.ariaLabel = "close";
    crossDialogBtn.textContent = "X";

    dialogHeader.append(headerTitle, crossDialogBtn);

    const dialogForm = document.createElement("form");
    dialogForm.classList.add("dialogForm");
    dialogForm.id = "project-info-dialogForm";
    dialogForm.setAttribute("method", "dialog");
    const dialogFields = document.createElement("div");
    dialogFields.classList.add("dialogFields");

    const titleField = document.createElement("div");
    titleField.classList.add("field");
    titleField.id = "project-info-titleField";
    const titleLabel = document.createElement("div");
    titleLabel.id = "project-info-title";
    titleLabel.innerHTML = 'Title:';
    const titleText = document.createElement("div");
    titleText.classList.add("infoText");
    titleText.id = "project-info-title-text";
    titleField.append(titleLabel, titleText)

    const descriptionField = document.createElement("div");
    descriptionField.classList.add("field");
    descriptionField.id = "project-info-descriptionField";
    const descriptionLabel = document.createElement("div");
    descriptionLabel.id = "project-info-description";
    descriptionLabel.textContent = "Description:";
    const descriptionText = document.createElement("div");
    descriptionText.classList.add("infoText");
    descriptionText.id = "project-info-description-text";
    descriptionField.append(descriptionLabel, descriptionText);

    const notesField = document.createElement("div");
    notesField.classList.add("field");
    notesField.id = "project-info-notesField";
    const notesLabel = document.createElement("div");
    notesLabel.setAttribute("for", "project-info-notes");
    notesLabel.textContent = "Notes:";
    const notesText = document.createElement("div");
    notesText.classList.add("infoText");
    notesText.id = "project-info-notes-text";
    notesField.append(notesLabel, notesText); 

    dialogFields.append(titleField, descriptionField, notesField);

    const dialogButtons = document.createElement("div");
    dialogButtons.classList.add("dialogButtons");
    const closeBtn = document.createElement("button");
    closeBtn.type = "submit";
    closeBtn.id = "project-info-closeBtn";
    closeBtn.value = "close";
    closeBtn.formMethod = "dialog";
    closeBtn.formNoValidate = true;
    closeBtn.textContent = "Close";
    dialogButtons.appendChild(closeBtn);

    dialogForm.append(dialogFields, dialogButtons);

    infoPageDialog.append(dialogHeader, dialogForm);
    projectDialog.appendChild(infoPageDialog);
}

/*

<dialog id="project-info-pageDialog">
    <div class="dialogHeader">
        <h2 class="headerTitle">Project Information</h2>
        <button class="crossDialogBtn" id="project-info-crossDialogBtn" value="cross" aria-label="close">X</button>
    </div>
    <form class="dialogForm" id="project-info-dialogForm" method="dialog">
        <div class="dialogFields">
         
          <div class="field" id="project-info-titleField">
            <div id="project-info-title">Title:</div>
            <div class="infoText" id="project-info-title-text"></div>
          </div>
          
          <div class="field" id="project-info-descriptionField">
            <div id="project-info-description">Description:</div>
            <div class="infoText" id="project-info-description-text"></div>
          </div>
          
          <div class="field" id="project-info-notesField">
            <div id="project-info-notes">Notes:</div>
            <div class="infoText" id="project-info-notes-text"></div>
          </div>
        </div>
      
        <div class="dialogButtons">
          <button type="submit" id="project-info-closeBtn" value="close" formmethod="dialog" formnovalidate>Close</button>
        </div>
    </form>
</dialog>

*/