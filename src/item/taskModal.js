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

export function createTaskEditDialog() {
  const taskDialog = document.querySelector(".taskDialog");

  const editPageDialog = document.createElement("dialog");
  editPageDialog.id = "task-edit-pageDialog";

  const dialogHeader = document.createElement("div");
  dialogHeader.classList.add("dialogHeader");

  const headerTitle= document.createElement("h2");
  headerTitle.classList.add("headerTitle");
  headerTitle.textContent = "Edit Task";

  const crossDialogBtn= document.createElement("button");
  crossDialogBtn.classList.add("crossDialogBtn");
  crossDialogBtn.id = "task-edit-crossDialogBtn";
  crossDialogBtn.value = "cross";
  crossDialogBtn.ariaLabel = "close";
  crossDialogBtn.textContent = "X";

  dialogHeader.append(headerTitle, crossDialogBtn);

  const dialogForm = document.createElement("form");
  dialogForm.classList.add("dialogForm");
  dialogForm.id = "task-edit-dialogForm";
  dialogForm.setAttribute("method", "dialog");
  const dialogFields = document.createElement("div");
  dialogFields.classList.add("dialogFields");

  const titleField = document.createElement("div");
  titleField.classList.add("field");
  titleField.id = "task-edit-titleField";
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "task-edit-title");
  titleLabel.innerHTML = 'Title<span class="requiredSign">*</span>:';
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "task-edit-title";
  titleInput.name = "title";
  titleInput.required = true;
  const editTitleMessage = document.createElement("div");
  editTitleMessage.classList.add("validation-message");
  editTitleMessage.id = "task-edit-title-message";
  titleField.append(titleLabel, titleInput, editTitleMessage)

  const descriptionField = document.createElement("div");
  descriptionField.classList.add("field");
  descriptionField.id = "task-edit-descriptionField";
  const descriptionLabel = document.createElement("div");
  descriptionLabel.setAttribute("for", "task-edit-description");
  descriptionLabel.textContent = "Description:";
  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.id = "task-edit-description";
  descriptionTextarea.name = "description";
  descriptionTextarea.maxLength = 200;
  descriptionTextarea.placeholder = "Start Editing...";
  const descriptionTextCount = document.createElement("div");
  descriptionTextCount.classList.add("textCount");
  const desCurrent = document.createElement("span");
  desCurrent.classList.add("current");
  desCurrent.id = "task-edit-desCurrent";
  desCurrent.textContent = "0";
  const desMaximum = document.createElement("span");
  desMaximum.classList.add("maximum");
  desMaximum.innerHTML = "&nbsp;/ 200";
  descriptionTextCount.append(desCurrent, desMaximum);
  descriptionField.append(descriptionLabel, descriptionTextarea, descriptionTextCount);

  const dueDateField = document.createElement("div");
  dueDateField.classList.add("field");
  dueDateField.id = "task-edit-dueDateField";
  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "task-edit-dueDate");
  dueDateLabel.innerHTML = 'Due Date<span class="requiredSign">*</span>:';
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.id = "task-edit-dueDate";
  dueDateInput.name = "dueDate";
  dueDateInput.required = true;
  dueDateField.append(dueDateLabel, dueDateInput);

  const priorityField = document.createElement("div");
  priorityField.classList.add("field");
  priorityField.id = "task-edit-priorityField";
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "task-edit-priority");
  priorityLabel.innerHTML = 'Priority<span class="requiredSign">*</span>:';
  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";
  prioritySelect.id = "task-edit-priority";
  prioritySelect.required = true;
  const prioritySelectOptText = document.createElement("option");
  prioritySelectOptText.value = "";
  prioritySelectOptText.disabled = true;
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

  const projectOfTaskField = document.createElement("div");
  projectOfTaskField.classList.add("field");
  projectOfTaskField.id = "task-edit-projectOfTaskField";
  const projectOfTaskLabel = document.createElement("label");
  projectOfTaskLabel.setAttribute("for", "task-edit-projectOfTask");
  projectOfTaskLabel.innerHTML = 'Project of task:<span class="requiredSign">*</span>:';
  const projectOfTaskSelect = document.createElement("select");
  projectOfTaskSelect.name = "projectOfTask";
  projectOfTaskSelect.id = "task-edit-projectOfTask";
  projectOfTaskSelect.required = true;
  projectOfTaskField.append(projectOfTaskLabel, projectOfTaskSelect);

  const notesField = document.createElement("div");
  notesField.classList.add("field");
  notesField.id = "task-edit-notesField";
  const notesLabel = document.createElement("div");
  notesLabel.setAttribute("for", "task-edit-notes");
  notesLabel.textContent = "Notes:";
  const notesTextarea = document.createElement("textarea");
  notesTextarea.id = "task-edit-notes";
  notesTextarea.name = "notes";
  notesTextarea.maxLength = 200;
  notesTextarea.placeholder = "Start Editing...";
  const notesTextCount = document.createElement("div");
  notesTextCount.classList.add("textCount");
  const notesCurrent = document.createElement("span");
  notesCurrent.classList.add("current");
  notesCurrent.id = "task-edit-notesCurrent";
  notesCurrent.textContent = "0";
  const notesMaximum = document.createElement("span");
  notesMaximum.classList.add("maximum");
  notesMaximum.innerHTML = "&nbsp;/ 200";
  notesTextCount.append(notesCurrent, notesMaximum);
  notesField.append(notesLabel, notesTextarea, notesTextCount); 

  dialogFields.append(titleField, descriptionField, dueDateField, priorityField, projectOfTaskField, notesField);

  const dialogButtons = document.createElement("div");
  dialogButtons.classList.add("dialogButtons");
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "submit";
  cancelBtn.id = "task-edit-cancelBtn";
  cancelBtn.value = "cancel";
  cancelBtn.formMethod = "dialog";
  cancelBtn.formNoValidate = true;
  cancelBtn.textContent = "Cancel";
  const editBtn = document.createElement("button");
  editBtn.type = "submit";
  editBtn.id = "task-edit-editBtn";
  editBtn.value = "edit";
  editBtn.autofocus = true;
  editBtn.textContent = "Edit";
  dialogButtons.append(cancelBtn, editBtn);

  dialogForm.append(dialogFields, dialogButtons);

  editPageDialog.append(dialogHeader, dialogForm);
  taskDialog.appendChild(editPageDialog);
}

export function createTaskInfoDialog() {
  const taskDialog = document.querySelector(".taskDialog");

  const infoPageDialog = document.createElement("dialog");
  infoPageDialog.id = "task-info-pageDialog";

  const dialogHeader = document.createElement("div");
  dialogHeader.classList.add("dialogHeader");

  const headerTitle= document.createElement("h2");
  headerTitle.classList.add("headerTitle");
  headerTitle.textContent = "Task Information";

  const crossDialogBtn= document.createElement("button");
  crossDialogBtn.classList.add("crossDialogBtn");
  crossDialogBtn.id = "task-info-crossDialogBtn";
  crossDialogBtn.value = "cross";
  crossDialogBtn.ariaLabel = "close";
  crossDialogBtn.textContent = "X";

  dialogHeader.append(headerTitle, crossDialogBtn);

  const dialogForm = document.createElement("form");
  dialogForm.classList.add("dialogForm");
  dialogForm.id = "task-info-dialogForm";
  dialogForm.setAttribute("method", "dialog");
  const dialogFields = document.createElement("div");
  dialogFields.classList.add("dialogFields");

  const titleField = document.createElement("div");
  titleField.classList.add("field");
  titleField.id = "task-info-titleField";
  const titleLabel = document.createElement("div");
  titleLabel.id = "task-info-title";
  titleLabel.innerHTML = 'Title:';
  const titleText = document.createElement("div");
  titleText.classList.add("infoText");
  titleText.id = "task-info-title-text";
  titleField.append(titleLabel, titleText)

  const descriptionField = document.createElement("div");
  descriptionField.classList.add("field");
  descriptionField.id = "task-info-descriptionField";
  const descriptionLabel = document.createElement("div");
  descriptionLabel.id = "task-info-description";
  descriptionLabel.textContent = "Description:";
  const descriptionText = document.createElement("div");
  descriptionText.classList.add("infoText");
  descriptionText.id = "task-info-description-text";
  descriptionField.append(descriptionLabel, descriptionText);

  const dueDateField = document.createElement("div");
  dueDateField.classList.add("field");
  dueDateField.id = "task-info-dueDateField";
  const dueDateLabel = document.createElement("div");
  dueDateLabel.id = "task-info-dueDate";
  dueDateLabel.textContent = "Due Date:";
  const dueDateText = document.createElement("div");
  dueDateText.classList.add("infoText");
  dueDateText.id = "task-info-dueDate-text";
  dueDateField.append(dueDateLabel, dueDateText);

  const priorityField = document.createElement("div");
  priorityField.classList.add("field");
  priorityField.id = "task-info-priorityField";
  const priorityLabel = document.createElement("div");
  priorityLabel.id = "task-info-priority";
  priorityLabel.textContent = "Priority:";
  const priorityText = document.createElement("div");
  priorityText.classList.add("infoText");
  priorityText.id = "task-info-priority-text";
  priorityField.append(priorityLabel, priorityText);

  const projectOfTaskField = document.createElement("div");
  projectOfTaskField.classList.add("field");
  projectOfTaskField.id = "task-info-projectOfTaskField";
  const projectOfTaskLabel = document.createElement("div");
  projectOfTaskLabel.id = "task-info-projectOfTask";
  projectOfTaskLabel.textContent = "Project of task:";
  const projectOfTaskText = document.createElement("div");
  projectOfTaskText.classList.add("infoText");
  projectOfTaskText.id = "task-info-projectOfTask-text";
  projectOfTaskField.append(projectOfTaskLabel, projectOfTaskText);

  const notesField = document.createElement("div");
  notesField.classList.add("field");
  notesField.id = "task-info-notesField";
  const notesLabel = document.createElement("div");
  notesLabel.setAttribute("for", "task-info-notes");
  notesLabel.textContent = "Notes:";
  const notesText = document.createElement("div");
  notesText.classList.add("infoText");
  notesText.id = "task-info-notes-text";
  notesField.append(notesLabel, notesText); 

  dialogFields.append(titleField, descriptionField, dueDateField, priorityField, projectOfTaskField, notesField);

  const dialogButtons = document.createElement("div");
  dialogButtons.classList.add("dialogButtons");
  const closeBtn = document.createElement("button");
  closeBtn.type = "submit";
  closeBtn.id = "task-info-closeBtn";
  closeBtn.value = "close";
  closeBtn.formMethod = "dialog";
  closeBtn.formNoValidate = true;
  closeBtn.textContent = "Close";
  dialogButtons.appendChild(closeBtn);

  dialogForm.append(dialogFields, dialogButtons);

  infoPageDialog.append(dialogHeader, dialogForm);
  taskDialog.appendChild(infoPageDialog);
}

export function createTaskDeleteDialog() {
  const taskDialog = document.querySelector(".taskDialog");

  const deletePageDialog = document.createElement("dialog");
  deletePageDialog.id = "task-delete-pageDialog";

  const dialogHeader = document.createElement("div");
  dialogHeader.classList.add("dialogHeader");

  const headerTitle= document.createElement("h2");
  headerTitle.classList.add("headerTitle");
  headerTitle.textContent = "Delete Task";

  const crossDialogBtn= document.createElement("button");
  crossDialogBtn.classList.add("crossDialogBtn");
  crossDialogBtn.id = "task-delete-crossDialogBtn";
  crossDialogBtn.value = "cross";
  crossDialogBtn.ariaLabel = "close";
  crossDialogBtn.textContent = "X";

  dialogHeader.append(headerTitle, crossDialogBtn);

  const dialogForm = document.createElement("form");
  dialogForm.classList.add("dialogForm");
  dialogForm.id = "task-delete-dialogForm";
  dialogForm.setAttribute("method", "dialog");
  const dialogFields = document.createElement("div");
  dialogFields.classList.add("dialogFields");

  const messageField = document.createElement("div");
  messageField.classList.add("field");
  messageField.id = "task-delete-message";
  const messageText = document.createElement("p");
  messageText.textContent = "Are you sure you want to delete the task";
  const deletedName = document.createElement("p");
  deletedName.innerHTML = '"<span id="deletedTask"></span>" ?';
  messageField.append(messageText, deletedName)

  dialogFields.appendChild(messageField);

  const dialogButtons = document.createElement("div");
  dialogButtons.classList.add("dialogButtons");
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "submit";
  cancelBtn.id = "task-delete-cancelBtn";
  cancelBtn.value = "cancel";
  cancelBtn.formMethod = "dialog";
  cancelBtn.formNoValidate = true;
  cancelBtn.textContent = "Cancel";
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "submit";
  deleteBtn.id = "task-delete-deleteBtn";
  deleteBtn.value = "delete";
  deleteBtn.autofocus = true;
  deleteBtn.textContent = "Delete";
  dialogButtons.append(cancelBtn, deleteBtn);

  dialogForm.append(dialogFields, dialogButtons);

  deletePageDialog.append(dialogHeader, dialogForm);
  taskDialog.appendChild(deletePageDialog);
}