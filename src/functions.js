import {ToDoObject, toDoList, projectList } from "./index.js";

function component() { //This function creates the HTML structure for the page on page load.
    const container = document.createElement('div');
    container.classList.add("container");
    
    const sideBar = document.createElement('div');
    sideBar.classList.add("sideBar");

    const showAllToDosOption = document.createElement('div');
    showAllToDosOption.classList.add("sidebarItem")
    showAllToDosOption.innerHTML = "Show All";
    sideBar.appendChild(showAllToDosOption);
    //On the side panel we could have list of projects and as the last option a button for adding a new project

    const addProjectButton = document.createElement('div');
    addProjectButton.classList.add("sidebarItem");
    addProjectButton.innerHTML = "New project"
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
    
    //Modal window, hidden on page load.
    const modalDiv = document.createElement('div');
    modalDiv.classList.add("modal");

    const modalContentDiv = document.createElement('form');
    modalContentDiv.onsubmit = function(){ submitTodo(); return false};
    modalContentDiv.classList.add("modalContent");
    
    
    //modal form -------------------------
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

    const modalProject = document.createElement('div');
    modalProject.classList.add("modalProject");
    const projectLabel = document.createElement('label');
    projectLabel.innerHTML = "Project: (Leave empty if no project) ";
    const projectInput = document.createElement('select');
    projectInput.classList.add("projectInput");
    modalProject.appendChild(projectLabel);
    modalProject.appendChild(projectInput);
    modalContentDiv.appendChild(modalProject);


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
            let newProject = ""; //for now
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
    }

    window.onclick = function(event) {
        if (event.target == modalDiv) {
            modalDiv.style.display = "none";
        }
    }

    contentFooter.appendChild(addTodoButton);
    return container;
}

function submitTodo(title, desc, dueDate, priority, projectId) {
    console.log("adding todo");
    console.log(title, desc, dueDate, projectId, priority);
    let newTodo = new ToDoObject(title, desc, dueDate, priority, projectId);
    toDoList.push(newTodo);
    renderTodos(toDoList);
}

function clearModalInputs() { //clears the modal and hides it
    document.getElementsByClassName("titleInput")[0].value = "";
    document.getElementsByClassName("descriptionInput")[0].value = "";
    document.getElementsByClassName("dueDateInput")[0].value = "";
    document.getElementsByClassName("projectInput")[0].value = "";
    document.getElementsByClassName("priorityInput")[0].value = "";
    document.getElementsByClassName("modal")[0].style.display = "none";
}

function Validate() { // returns true if new todo form is filled correctly. Throws alert if some of the required windows is not filled.
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
    return true; // if reached here, form is valid.
}

/* Not sure if these will be used?
function todoHandler() {

}

function projectHandler() {

} */


function populateProjectList() {
    return 0; //? wtf
}

//Used to render todos to content box
function renderTodos(toDoList) {
    document.getElementsByClassName("contentMain")[0].innerHTML = ""; //clear the content window first.
    toDoList.forEach((item) => {
        drawToDo(item);
    })
}

function drawToDo(todo) {
    const contentMain = document.getElementsByClassName("contentMain")[0];
    let toDoDiv = document.createElement('div');
    
    //Description only shown when todo is expanded. Done status is shown with the checkbox.
    addCheckbox(toDoDiv);
    addTitleDiv(todo.title, toDoDiv);
    addDueDateDiv(todo.dueDate, toDoDiv);
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

function addDetailsButton(div) {
    let detailsButton = document.createElement('button');
    detailsButton.classList.add("detailsButton");
    detailsButton.innerHTML = "Details / Edit";
    div.appendChild(detailsButton);
}

export { component, renderTodos }