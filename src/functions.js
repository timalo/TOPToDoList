
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
    priorityInput.setAttribute("type", "select")
    priorityInput.setAttribute("id", "priority");
    priorityInput.setAttribute("name", "priority");
    const minPriority = document.createElement('option');
    minPriority.innerHTML = "Low";
    const medPriority = document.createElement('option');
    medPriority.innerHTML = "Medium";
    const hiPriority = document.createElement('option');
    hiPriority.innerHTML = "High";
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

function submitTodo() {
    console.log("add todo with acceptable vars");
}

//Not sure if these will be used?
function todoHandler() {

}

function projectHandler() {

}


function populateProjectList() {
    return 0;
}

//Used to render todos to content box
function renderTodos(toDoList) {
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