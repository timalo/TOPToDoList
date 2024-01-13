import {ToDoObject, Project, toDoList, projectList } from "./index.js";

//This file bloated terribly and nothing like this should ever be done. lol

let currentProject = 0; //This global var holds the projectId of the currently visible project. Can be used to push todos with correct projectId. 0 = show all
let editedTodo = 0; // Store currently edited todo here. Couldn't come up with any better way to do this with my crap implementation.

function component() { //This function creates the HTML structure for the page on page load.
    const container = document.createElement('div');
    container.classList.add("container");
    
    const sideBar = document.createElement('div');
    sideBar.classList.add("sideBar");

    const showAllToDosOption = document.createElement('div');
    showAllToDosOption.classList.add("sidebarHeader")
    showAllToDosOption.innerHTML = "Show All";
    showAllToDosOption.onclick = function() { renderTodos() };
    sideBar.appendChild(showAllToDosOption);
    //On the side panel we could have list of projects and as the last option a button for adding a new project

    const sideBarContent = document.createElement('div');
    sideBarContent.classList.add("sideBarContent");
    sideBar.appendChild(sideBarContent);

    const addProjectButton = document.createElement('div');
    addProjectButton.classList.add("sidebarFooter");
    addProjectButton.innerHTML = "New project"
    addProjectButton.onclick = function(){ newProjectModal.style.display = "block"; document.getElementsByClassName("projectTitleInput")[0].focus(); }
    sideBar.appendChild(addProjectButton);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add("contentDiv");

    const contentHeader = document.createElement('div');
    contentHeader.classList.add("contentHeader");
    contentHeader.innerHTML = "All todos";

    const contentArea = document.createElement('div');
    contentArea.classList.add("contentArea");

    contentDiv.appendChild(contentHeader);
    contentDiv.appendChild(contentArea);

    container.appendChild(sideBar);
    container.appendChild(contentDiv);
    
    //Project modal -----------------------
    const newProjectModal = document.createElement('div');
    newProjectModal.classList.add("projectModal");
    const projectModalContentDiv = document.createElement('form');
    projectModalContentDiv.classList.add("projectModalContent");

    const projectModalHeader = document.createElement('p');
    projectModalHeader.classList.add("modalHeader");
    projectModalHeader.innerHTML = "Add new project";
    projectModalContentDiv.appendChild(projectModalHeader);

    const projectModalTitle = document.createElement('div');
    projectModalTitle.classList.add("projectTitleDiv");
    const projectModalTitleInput = document.createElement('input');
    projectModalTitleInput.classList.add("projectTitleInput");
    projectModalTitleInput.setAttribute("placeholder", "Project Title");
    projectModalTitleInput.required = true;
    
    const projectModalButton = document.createElement('button');
    projectModalButton.innerHTML = "Add new project";
    projectModalButton.classList.add("projectModalButton");
    projectModalButton.addEventListener("click", function(event) {
        event.preventDefault();
        const todoProjectValidation = ValidateProject();
        if(todoProjectValidation) {
            let projectTitle = projectModalTitleInput.value;
            submitProject(projectTitle); //This pushes the project into the array.
            projectModalTitleInput.value = "";
            newProjectModal.style.display = "none";
        }
    });

    projectModalTitle.appendChild(projectModalTitleInput);
    projectModalContentDiv.appendChild(projectModalTitle);
    projectModalContentDiv.appendChild(projectModalButton);
    newProjectModal.appendChild(projectModalContentDiv); //This looks absolutely horrible ;_;

    const projectModalSubmitDiv = document.createElement('div');
    projectModalSubmitDiv.classList.add("projectSubmitDiv");
    const projectModalSubmitButton = document.createElement('button');
    projectModalSubmitButton.classList.add("projectModalSubmitButton");
    projectModalSubmitDiv.appendChild(projectModalSubmitButton);
    //projectModal end------------------------

    //Add todo modal window, hidden on page load.
    const modalDiv = document.createElement('div');
    modalDiv.classList.add("modal");

    const modalContentDiv = document.createElement('form');
    modalContentDiv.onsubmit = function(){ submitTodo(); return false};
    modalContentDiv.classList.add("modalContent");
    
    //modal form -------------------------
    const modalHeader = document.createElement('p');
    modalHeader.innerHTML = "Add new todo";
    modalHeader.classList.add("modalHeader");
    modalContentDiv.appendChild(modalHeader);

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modalTitleDiv');
    const modalTitleInput = document.createElement('input');
    modalTitleInput.classList.add("titleInput");
    modalTitleInput.setAttribute("placeholder", "Todo Title");
    modalTitleInput.required = true;
    modalTitle.appendChild(modalTitleInput);
    modalContentDiv.appendChild(modalTitle);

    const modalDescription = document.createElement('div');
    modalDescription.classList.add("modalDescription");
    const modalDescriptionInput = document.createElement('textarea');    
    modalDescriptionInput.classList.add("descriptionInput");
    modalDescriptionInput.setAttribute("placeholder", "Description. Can be left empty.");
    modalDescription.appendChild(modalDescriptionInput);
    modalContentDiv.appendChild(modalDescription);

    const modalDueDate = document.createElement('div');
    modalDueDate.classList.add("modalDueDate");
    const dueDateLabel = document.createElement('label');
    dueDateLabel.innerHTML = "Due date: ";
    modalDueDate.appendChild(dueDateLabel);
    const dueDateInput = document.createElement('input');
    dueDateInput.classList.add("dueDateInput");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.required = true;
    modalDueDate.appendChild(dueDateInput);
    modalContentDiv.appendChild(modalDueDate);

/*     const modalProject = document.createElement('div'); //This block commented out since we don't probably need to project input on the modal.
    modalProject.classList.add("modalProject");
    const projectLabel = document.createElement('label');
    projectLabel.innerHTML = "Project: (Leave empty if no project) ";
    const projectInput = document.createElement('select');
    projectInput.classList.add("projectInput");
    //projectInput.setAttribute('id', 'projectInput');
    modalProject.appendChild(projectLabel);
    modalProject.appendChild(projectInput);
    modalContentDiv.appendChild(modalProject); */

    const modalPriority = document.createElement('div'); //We can attach the submit button to the same bottom div as the priority selector.
    modalPriority.classList.add("modalPriority");
    const priorityInputLabel = document.createElement("label");
    priorityInputLabel.innerHTML = "Priority: ";
    const priorityInput = document.createElement('select');
    priorityInput.classList.add("priorityInput");

    const placeholderPriority = document.createElement('option');
    placeholderPriority.innerHTML = "";
    placeholderPriority.disabled = true;
    placeholderPriority.hidden = true;
    placeholderPriority.selected = true;
    const minPriority = document.createElement('option');
    minPriority.innerHTML = "Low";
    const medPriority = document.createElement('option');
    medPriority.innerHTML = "Medium";
    const hiPriority = document.createElement('option');
    hiPriority.innerHTML = "High";
    priorityInput.appendChild(placeholderPriority);
    priorityInput.appendChild(minPriority);
    priorityInput.appendChild(medPriority);
    priorityInput.appendChild(hiPriority);

    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add("priorityDiv");
    
    priorityDiv.appendChild(priorityInputLabel);
    priorityDiv.appendChild(priorityInput);
    modalPriority.appendChild(priorityDiv);

    const submitButton = document.createElement('button');
    submitButton.classList.add("submitButton");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        const todoValidation = Validate();
        if(todoValidation) {
            let newTitle = modalTitleInput.value;
            let newDescription = ""; //this is fukked up but will do.
            if (modalDescriptionInput.value != "") {
                newDescription = modalDescriptionInput.value;
            }
            let newDueDate = dueDateInput.value;
            let newProject = currentProject;
            let newPriority = priorityInput.value;
            let newTodoId = findFirstTodoID(toDoList);
            submitTodo(newTitle, newDescription, newDueDate, newPriority, newProject, newTodoId); //This pushes the todo into the array.
        }
    });

    submitButton.innerHTML = "Add todo";

    modalContentDiv.appendChild(modalPriority);
    modalPriority.appendChild(submitButton);
    //Modal form end---------------------
    
    //edit modal ---------------------------
    const editModalDiv = document.createElement('div');
    editModalDiv.classList.add("editModal");

    const editModalContentDiv = document.createElement('form');
    editModalContentDiv.onsubmit = function(){ submitEdit(); return false}; //may need to change the function here?
    editModalContentDiv.classList.add("editModalContent");

    const editModalHeader = document.createElement('p');
    editModalHeader.innerHTML = "Add new todo";
    editModalHeader.classList.add("editModalHeader");
    editModalContentDiv.appendChild(editModalHeader);

    const editModalTitle = document.createElement('div');
    editModalTitle.classList.add('editModalTitleDiv');
    const editModalTitleInput = document.createElement('input');
    editModalTitleInput.classList.add("editTitleInput");
    editModalTitleInput.setAttribute("placeholder", "Todo Title");
    editModalTitleInput.required = true;
    editModalTitle.appendChild(editModalTitleInput);
    editModalContentDiv.appendChild(editModalTitle);

    const editModalDescription = document.createElement('div');
    editModalDescription.classList.add("editModalDescription");
    const editModalDescriptionInput = document.createElement('textarea');
    editModalDescriptionInput.classList.add("editDescriptionInput");
    editModalDescriptionInput.setAttribute("placeholder", "Description. Can be left empty.");
    editModalDescription.appendChild(editModalDescriptionInput);
    editModalContentDiv.appendChild(editModalDescription);

    const editModalDueDate = document.createElement('div');
    editModalDueDate.classList.add("editModalDueDate");
    const editDueDateLabel = document.createElement('label');
    editDueDateLabel.innerHTML = "Due date: ";
    editModalDueDate.appendChild(editDueDateLabel);
    const editDueDateInput = document.createElement('input');
    editDueDateInput.classList.add("editDueDateInput");
    editDueDateInput.setAttribute("type", "date");
    editDueDateInput.required = true;
    editModalDueDate.appendChild(editDueDateInput);
    editModalContentDiv.appendChild(editModalDueDate);

    const editPriority = document.createElement('div');
    editPriority.classList.add("editPriority");

    const editModalPriority = document.createElement('div');
    editModalPriority.classList.add("editModalPriority");

    const editPriorityInputLabel = document.createElement("label");
    editPriorityInputLabel.innerHTML = "Priority: ";
    const editPriorityInput = document.createElement('select');
    editPriorityInput.classList.add("editPriorityInput");

    const editMinPriority = document.createElement('option');
    editMinPriority.innerHTML = "Low";
    const editMedPriority = document.createElement('option');
    editMedPriority.innerHTML = "Medium";
    const editHiPriority = document.createElement('option');
    editHiPriority.innerHTML = "High";
    editPriorityInput.appendChild(editMinPriority);
    editPriorityInput.appendChild(editMedPriority);
    editPriorityInput.appendChild(editHiPriority);
    const editPriorityDiv = document.createElement('div');
    editPriorityDiv.classList.add("editPriorityDiv");
    
    editModalPriority.appendChild(editPriority);
    editPriority.appendChild(editPriorityInputLabel);
    editPriority.appendChild(editPriorityInput);

    editModalContentDiv.appendChild(editModalPriority);

    const editSubmitButton = document.createElement('button');
    editSubmitButton.classList.add("editSubmitButton");
    editSubmitButton.addEventListener("click", function(event) {
        event.preventDefault();
        const submitValidation = ValidateEdit();
        if(submitValidation) {
            let todoIndex = toDoList.findIndex(todo => todo.todoId == editedTodo);
            let newTitle = editModalTitleInput.value;
            let newDescription = ""; //this is fukked up but will do.
            if (modalDescriptionInput.value != "") { //the further I look at this, the worse it looks. wtf
                newDescription = modalDescriptionInput.value;
            }
            let newDueDate = editDueDateInput.value;
            let newPriority = editPriorityInput.value;
            document.getElementsByClassName("editModal")[0].style.display = "none";
            editTodo(todoIndex, newTitle, newDescription, newDueDate, newPriority);

            renderTodos(currentProject); 
        }
    });

    editSubmitButton.innerHTML = "Submit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = "Delete todo";
    deleteButton.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("clicked delete. Trying to delete todo with id: " + editedTodo);
        let todoIndex = toDoList.findIndex(todo => todo.todoId == editedTodo);
        console.log("index for the given todo is: " + todoIndex + ". Deleting it now.");
        deleteTodo(todoIndex, true);
        document.getElementsByClassName("editModal")[0].style.display = "none";
    });
    
    editModalPriority.appendChild(editSubmitButton);
    editModalPriority.appendChild(deleteButton);
    editModalDiv.appendChild(editPriorityDiv);

    editModalDiv.appendChild(editModalContentDiv);
    //edit modal end---------------------------


    modalDiv.appendChild(modalContentDiv);
    container.appendChild(newProjectModal);
    container.appendChild(modalDiv);
    container.appendChild(editModalDiv);


    const contentMain = document.createElement('div');
    contentMain.classList.add("contentMain");
    contentArea.appendChild(contentMain);

    const contentFooter = document.createElement('div');
    contentFooter.classList.add("contentFooter");
    contentArea.appendChild(contentFooter);

    const addTodoButton = document.createElement('button');
    addTodoButton.classList.add("addButton");
    addTodoButton.innerHTML = "+";

    addTodoButton.onclick = function() {
        modalDiv.style.display = "block";
        document.getElementsByClassName("titleInput")[0].focus();
    }

    window.onclick = function(event) {
        if (event.target == modalDiv) {
            modalDiv.style.display = "none";
        }
        else if (event.target == newProjectModal) {
            newProjectModal.style.display = "none";
        }
        else if (event.target == editModalDiv) {
            editModalDiv.style.display = "none";
        }
    }

    contentFooter.appendChild(addTodoButton);
    return container;
}

function submitTodo(title, desc, dueDate, priority, projectId) {
    let todoId = findFirstTodoID(toDoList);
    //console.log(title, desc, dueDate, projectId, priority);
    let newTodo = new ToDoObject(title, desc, dueDate, priority, projectId, todoId);
    toDoList.splice(todoId, 0, newTodo)
    renderTodos(currentProject);
    clearModalInputs();
}

function submitProject(title) {
    let newProjectId = findFirstFreeID(projectList);
    //console.log("adding project: " + title);
    //console.log("project ID: " + newProjectId);

    let newProject = new Project(title, newProjectId);
    //console.log("Adding project: " + title + " with id " + newProjectId);
    projectList.splice(newProjectId, 0, newProject);
    renderProjects(projectList);
}

function clearModalInputs() { //clears the modal and hides it
    document.getElementsByClassName("titleInput")[0].value = "";
    document.getElementsByClassName("descriptionInput")[0].value = "";
    document.getElementsByClassName("dueDateInput")[0].value = "";
    document.getElementsByClassName("priorityInput")[0].value = "";
    document.getElementsByClassName("modal")[0].style.display = "none";
}

function Validate() { // returns true if new todo modal form or edit is filled correctly. Throws alert if some of the required windows is not filled.
    if(document.getElementsByClassName("titleInput")[0].value == ""){
        alert("Please enter a title.");
        return false;
    }
    if (document.getElementsByClassName("dueDateInput")[0].value.length == 0) {
        alert("Please enter a due date.");
        return false;
    }
    if (document.getElementsByClassName("priorityInput")[0].value == "") {
        alert("Please choose a priority for the todo.");
        return false;
    }
    return true; // if the function reaches here, the form is valid.
}

function ValidateProject() { //works the same as for the todo modal. returns bool for validity.
    if(document.getElementsByClassName("projectTitleInput")[0].value == "") {
        alert("Enter a title for the project.");
        return false;
    }
    return true;
}

function ValidateEdit() { //yes yes, works the same as both of the above. If anyone reads this, send me coffee.
    if(document.getElementsByClassName("editTitleInput")[0].value == ""){
        alert("Please enter a title.");
        return false;
    }
    if (document.getElementsByClassName("editDueDateInput")[0].value.length == 0) {
        alert("Please enter a due date.");
        return false;
    }
    if (document.getElementsByClassName("editPriorityInput")[0].value == "") {
        alert("Please choose a priority for the todo.");
        return false;
    }
    return true; // if the function reaches here, the form is valid.
}

function renderProjects(projectList) {
    document.getElementsByClassName("sideBarContent")[0].innerHTML = "";
    projectList.forEach((item) => {
        drawProject(item);
    })
}

//Used to render todos to content window
function renderTodos(projectId="") { //takes projectId as parameter. Only todos with that projectId are rendered. Also changes the title above the main content window
    document.getElementsByClassName("contentMain")[0].innerHTML = ""; //clear the content window first.
    let titleDiv = document.getElementsByClassName("contentHeader")[0];
    if(projectId == ""){
        titleDiv.innerHTML = "All todos";
        currentProject = 0;
        toDoList.forEach((item) => {
            drawToDo(item);
        })
    }
    else {
        let projectTitle = projectList.filter((project) => project.projectId == projectId)[0].title; //there is most likely a better way to do this.
        //console.log("this should be now the project title: " + projectTitle);
        titleDiv.innerHTML = projectTitle;
        let filteredList = toDoList.filter((todo) => todo.projectId == projectId);
        currentProject = projectId; //this should always exist if ended here.
        filteredList.forEach((item) => {
            drawToDo(item);
        })
    }
}

function drawProject(project) { //divide sideItem into clickable project name and delete project icon.
    const sideBar = document.getElementsByClassName("sideBarContent")[0];
    let projectDiv = document.createElement('div');
    projectDiv.classList.add("sideItem");
    let sideItemTitle = document.createElement('div');
    sideItemTitle.classList.add("sideItemTitle");
    sideItemTitle.setAttribute("id", project.projectId);
    sideItemTitle.innerHTML = project.title;
    sideItemTitle.onclick = function(){ renderTodos(project.projectId); }
    const sideItemDelete = document.createElement('img');
    sideItemDelete.classList.add("sideItemDelete");
    sideItemDelete.src = "../src/recycle-bin-line-icon.svg";
    sideItemDelete.onclick = function() { deleteProject(project.projectId); }
    projectDiv.appendChild(sideItemTitle);
    projectDiv.appendChild(sideItemDelete);
    sideBar.appendChild(projectDiv);
}

function drawToDo(todo) {
    const contentMain = document.getElementsByClassName("contentMain")[0];
    let toDoDiv = document.createElement('div');
    
    addCheckbox(todo.done, toDoDiv);
    addTitleDiv(todo.title, toDoDiv);
    addDueDateDiv(todo.dueDate, toDoDiv);
    addPriorityDiv(todo.priority, toDoDiv);
    addDetailsButton(toDoDiv);

    toDoDiv.classList.add("todoItem");
    toDoDiv.setAttribute('id', todo.todoId);
    contentMain.appendChild(toDoDiv);
}

function addCheckbox(todoDone, div) {
    let checkboxDiv = document.createElement('div');
    checkboxDiv.classList.add("checkboxDiv");
    checkboxDiv.innerHTML = "<input type=\"checkbox\">";
    checkboxDiv.onclick = function () { changeTodoStatus(div.id) }
    div.appendChild(checkboxDiv);
    console.log("done status: " + todoDone);
    if(todoDone) {
        checkboxDiv.firstChild.checked = true;
    }
}

function addTitleDiv(todoTitle, div) {
    let titleDiv = document.createElement('div');
    titleDiv.classList.add("todoTitleDiv");
    titleDiv.innerHTML = todoTitle;
    div.appendChild(titleDiv);
}

function addDueDateDiv(todoDueDate, div) {
    let dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add("dueDateDiv");
    dueDateDiv.innerHTML = todoDueDate;
    div.appendChild(dueDateDiv);
}

function addPriorityDiv(todoPriority, div) {
    let priorityDiv = document.createElement('div');
    if(todoPriority == "Low"){priorityDiv.classList.add("low", "priority")};
    if(todoPriority == "Medium"){priorityDiv.classList.add("medium", "priority")};
    if(todoPriority == "High"){priorityDiv.classList.add("high", "priority")};
    priorityDiv.innerHTML = todoPriority;
    div.appendChild(priorityDiv);
}

function addDetailsButton(div) {
    let detailsButton = document.createElement('button');
    detailsButton.classList.add("detailsButton");
    detailsButton.innerHTML = "Details / Edit";
    detailsButton.onclick = function() { showEditModal(div.id) } //calls the function with id of parent div
    div.appendChild(detailsButton);
}

function deleteProject(projectId) { //This deletes the project with the given projectId.
    deleteProjectTodos(projectId);
    let projectIndex = projectList.findIndex(project => project.projectId == projectId);
    projectList.splice(projectIndex, 1); //this finally deletes the project.
    renderProjects(projectList);
}

function deleteProjectTodos(projectId) { // This deletes all todos with given projectId.
    // removing objects from array in js is done using .splice(), which requires array indexes.
    // By going through the array from the end to start, we can remove the elements without messing up the indexes of future yet-to-be-removed items.
    // Switch to show all view after deleting.
    if(toDoList.length == 0){
        return;
    }
    for (let i = toDoList.length; i > 0; i--) {
        if (toDoList[i-1].projectId == projectId) {
            deleteTodo(i-1);
        }
    }
    renderTodos();
}

function deleteTodo(todoIndex, calledFromEdit=false) { //deletes a single todo with the given index in toDoList. If this is called from edit modal, render the project todos again. Otherwise return to showAll view.
    toDoList.splice(todoIndex, 1);
    if(calledFromEdit){
        renderTodos(currentProject);
    }
}

function editTodo(todoId, title, desc, dueDate, priority) { //Edits an existing todo at given index (not todoId!) in the array.
        toDoList[todoId].title = title;
        toDoList[todoId].desc = desc;
        toDoList[todoId].dueDate = dueDate;
        toDoList[todoId].priority = priority;
}

function showEditModal(todoId) { // creates the modal for editing or deleting a todo. We populate the form inputs with info gotten form todoId.
    let todoIndex = toDoList.findIndex(todo => todo.todoId == todoId);
    let todo = toDoList[todoIndex]; //this should point directly to the todo object.

    editedTodo = todoId; //changes the global var.

    // populate inputs in modal and make modal visible.
    document.getElementsByClassName("editModalHeader")[0].innerHTML = "Editing todo: " + todo.title;
    document.getElementsByClassName("editTitleInput")[0].value = todo.title;
    document.getElementsByClassName("editDescriptionInput")[0].value = todo.desc;
    document.getElementsByClassName("editDueDateInput")[0].value = todo.dueDate;
    document.getElementsByClassName("editPriorityInput")[0].value = todo.priority;
    document.getElementsByClassName("editModal")[0].style.display = "block";
}

function changeTodoStatus(todoId) {
    let todoIndex = toDoList.findIndex(todo => todo.todoId == todoId);
    let todo = toDoList[todoIndex];
    todo.toggleDone();
}

function findFirstFreeID(list) { 
    // This is used to find the first free projectId. 
    // If a project is deleted, all its associated todos are deleted and the projectId is freed up.
    // if a project is deleted from between other projects, it is possible to find the free projectId with this func.
    if (list.length == 0) {
        return 1;
    }
    let counter = 1;
    for(let i = 0; i < list.length; i++) {
        if (counter == list[i].projectId) {
            counter++;
        }
        else {
            return counter;
        } 
    }
    return counter;
}

function findFirstTodoID(list) {
    if (list.length == 0) {
        return 1;
    }
    let counter = 1;
    for(let i = 0; i < list.length; i++) {
        if (counter == list[i].todoId) {
            counter++;
        }
        else {
            return counter;
        }
    }
    return counter;
}

export { component, renderTodos }