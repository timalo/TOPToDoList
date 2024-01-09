import {ToDoObject, Project, toDoList, projectList } from "./index.js";

//This file bloated terribly. lol

let currentProject = 0; //This global var holds the projectId of the currently visible project. Can be used to push todos with correct projectId. 0 = show all

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
    addProjectButton.onclick = function(){ newProjectModal.style.display = "block"; }
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
    
    //Modal window, hidden on page load.
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
/*     priorityInput.setAttribute("type", "select")
    priorityInput.setAttribute("id", "priority");
    priorityInput.setAttribute("name", "priority"); */
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
            submitTodo(newTitle, newDescription, newDueDate, newPriority, newProject); //This pushes the todo into the array.
            clearModalInputs();
        }
    });

    submitButton.innerHTML = "Add todo";

    modalPriority.appendChild(submitButton);

    modalContentDiv.appendChild(modalPriority);
    //Modal form end---------------------

    modalDiv.appendChild(modalContentDiv);
    container.appendChild(newProjectModal);
    container.appendChild(modalDiv);


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
        //when this button is clicked, we want to populate the dropdown menu selector for a project with existing projects.
        //Could be done calling a function which changes modalProject innerHTML
        //addProjectsToModal(projectList);
    }

    window.onclick = function(event) {
        if (event.target == modalDiv) {
            modalDiv.style.display = "none";
            //document.getElementsByClassName("projectInput")[0].innerHTML = ""; //empties the project list if the modal is hidden.
            //This prevents duplicate projects from showing up.
        }
        else if (event.target == newProjectModal) {
            newProjectModal.style.display = "none";
            //document.getElementsByClassName("projectTitleInput")[0].value = "";
        }
    }

    contentFooter.appendChild(addTodoButton);
    return container;
}

/* function addProjectsToModal(projectList) { //COMMENTED OUT DUE TO SCRAPPING THE PROJECT SELECT IN MODAL
    const projectInputDiv = document.getElementsByClassName("projectInput")[0];
    let emptyOption = document.createElement('option');
    emptyOption.selected = true;
    emptyOption.value = "";
    projectInputDiv.appendChild(emptyOption);
    projectList.forEach((item) => {
        addProjectSelect(item, projectInputDiv);
    })
}

function addProjectSelect(project, div){
    let optionDiv = document.createElement('option');
    optionDiv.value = project.projectId;
    optionDiv.innerHTML = project.title;
    div.appendChild(optionDiv);
} */

function submitTodo(title, desc, dueDate, priority, projectId) {
    console.log("adding todo");
    console.log(title, desc, dueDate, projectId, priority);
    let newTodo = new ToDoObject(title, desc, dueDate, priority, projectId);
    toDoList.push(newTodo);
    renderTodos(currentProject);
}

function submitProject(title) {
    let newProjectId = findFirstFreeID(projectList);
    console.log("adding project: " + title);
    console.log("project ID: " + newProjectId);

    let newProject = new Project(title, newProjectId);
    projectList.push(newProject);
    renderProjects(projectList);
}

function clearModalInputs() { //clears the modal and hides it
    document.getElementsByClassName("titleInput")[0].value = "";
    document.getElementsByClassName("descriptionInput")[0].value = "";
    document.getElementsByClassName("dueDateInput")[0].value = "";
    document.getElementsByClassName("priorityInput")[0].value = "";
    document.getElementsByClassName("modal")[0].style.display = "none";
}

function Validate() { // returns true if new todo modal form is filled correctly. Throws alert if some of the required windows is not filled.
    console.log("Validating form...");
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
        console.log("this should be now the project title: " + projectTitle);
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
    
    //Description only shown when todo is expanded. Done status is shown with the checkbox.
    addCheckbox(toDoDiv);
    addTitleDiv(todo.title, toDoDiv);
    addDueDateDiv(todo.dueDate, toDoDiv);
    addPriorityDiv(todo.priority, toDoDiv);
    addDetailsButton(toDoDiv);

    toDoDiv.classList.add("todoItem");
    contentMain.appendChild(toDoDiv);
}

function addCheckbox(div) {
    let checkboxDiv = document.createElement('div');
    checkboxDiv.classList.add("checkboxDiv");
    checkboxDiv.innerHTML = "<input type=\"checkbox\">";
    div.appendChild(checkboxDiv);
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
    div.appendChild(detailsButton);
}

function deleteProject(projectId) {
    console.log("ProjectList looks like: " + projectList);
    console.log("Deleting project: " + projectList[parseInt(projectId-1)]);

    deleteProjectTodos(parseInt(projectId));

    projectList.splice(parseInt(projectId-1), 1); //this finally deletes the project.
    renderProjects(projectList);
}

function deleteProjectTodos(projectId) { // This deletes all todos with given projectId.
    // removing objects from array in js is done using .splice(), which requires array indexes.
    // By going through the array from the end to start, we can remove the elements without messing up the indexes of future yet-to-be-removed items.
    // Switch to show all view after deleting.
    for (let i = toDoList.length; i > 0; i--) {
        console.log("checking for delete " + i-1);
        if (toDoList[i-1].projectId == projectId) {
            deleteTodo(i-1);
        }
    }
    currentProject = 0;
    renderTodos();
}

function deleteTodo(index) { //deletes a single todo at the given index in toDoList.
    console.log("deleting " + index);
    toDoList.splice(index, 1);
    renderTodos(currentProject);
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
            // push project to array in correct index here.
            // project should be in correct index so deleting it will be easier.
            // .splice() works here. f. ex. .splice(2, 0, 3) inserts number 3 at index 2.
        }
    }
    return (counter);
}

export { component, renderTodos }