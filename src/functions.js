
function component() {
    const container = document.createElement('div');
    container.classList.add("container");
    
    const sideBar = document.createElement('div');
    sideBar.classList.add("sideBar");

    const showAllToDosOption = document.createElement('div');
    showAllToDosOption.classList.add("option")
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

function testFunction(toDoList) {
    toDoList.forEach((item) => {
        drawToDo(item);
    })
}

function drawToDo(todo) {
    console.log("trying to print content.");
    const contentMain = document.getElementsByClassName("contentMain")[0];
    let toDoDiv = document.createElement('div');
    
    toDoDiv.innerHTML = todo.title + " " + todo.desc + " " + todo.dueDate + " " + todo.priority + " " + todo.done;
    //The above line will be split into several divs later.
    toDoDiv.classList.add("todoItem");
    contentMain.appendChild(toDoDiv);
}

export { component, testFunction }