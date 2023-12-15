
function component() {
    const container = document.createElement('div');
    container.classList.add("container");
    
    const sideBar = document.createElement('div');
    sideBar.classList.add("sideBar");

    const showAllToDosOption = document.createElement('div');
    showAllToDosOption.classList.add("sidebarItem")
    showAllToDosOption.innerHTML = "Show All";
    sideBar.appendChild(showAllToDosOption);
    //On the side panel we could have list of projects and as the last option a button for adding a new project

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

    const modalDiv = document.createElement('div');
    modalDiv.classList.add("modal");

    const modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add("modalContent");
    modalContentDiv.innerHTML = "";
    //TODO: implement modal content divs here. 
    //Probably want to give each todo title, desc, etc a separate div in the modal.
    //After that, will have to start implementing changing, deleting todos etc.

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
    }

    window.onclick = function(event) {
        if (event.target == modalDiv) {
            modalDiv.style.display = "none";
        }
    }

    contentFooter.appendChild(addTodoButton);

    return container;
}

//Used to render todos to content box
function iterateToDoList(toDoList) {
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

export { component, iterateToDoList }