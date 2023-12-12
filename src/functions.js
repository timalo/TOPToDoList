
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

    const contentArea = document.createElement('div');
    contentArea.classList.add("contentArea");

    contentDiv.appendChild(contentArea);

    container.appendChild(sideBar);
    container.appendChild(contentDiv);

    const contentMain = document.createElement('div');
    contentMain.classList.add("contentMain");
    contentArea.appendChild(contentMain);

    const contentFooter = document.createElement('div');
    contentFooter.classList.add("contentFooter");
    contentArea.appendChild(contentFooter);

    const addTodoButton = document.createElement('button');
    addTodoButton.classList.add("addButton");
    addTodoButton.innerHTML = "+";
    contentFooter.appendChild(addTodoButton);
    return container;
}

function iterateToDoList(toDoList) {
    toDoList.forEach((item) => {
        drawToDo(item);
    })
}

function drawToDo(todo) {
    const contentMain = document.getElementsByClassName("contentMain")[0];
    let toDoDiv = document.createElement('div');
    
    //toDoDiv.innerHTML = todo.title + " " + todo.desc + " " + todo.dueDate + " " + todo.priority + " " + todo.done;
    //The above line will be split into several divs later. desc and done are not shown as they are.
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