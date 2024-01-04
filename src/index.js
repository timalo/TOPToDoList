import { component, renderTodos } from "./functions.js";
import "./styles.css";

//To-Do object should have at least a title, due date, and a priority, also an optional project it is under. Description also optional
//Priority is a string out of the following: [Low, Medium, High]

let toDoList = []; //all todo items will be stored here. 
let projectList = []; //all projects here. todo can have a projectID it is associated to.


class ToDoObject {
    constructor(title, desc, dueDate, priority, projectId) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.done = false;
    }

    toggleDone(){
        this.done = !this.done;
    }
    setPriority(priority) {
        this.priority = priority;
    }
    setTitle(title) {
        this.title = title;
    }
}

class Project {
    constructor(title, projectId) {
        this.title = title;
        this.projectId = projectId;
    }
}

document.body.appendChild(component());

//On page load we should have 'default' view of to-dos visible to the user. Probably just show all toDos
//todos can be added to some project.
//todo that is not assigned to a project could have projectID=0 ??

//Could be a neat idea to have a progress bar on every project, based on how many of the todos are checked out as done.

//Placeholder todos to populate the page on load. 
/* let toDoItem = new ToDoObject("test", "This is a test to do.", Date.now(), "Low");
let toDoItem2 = new ToDoObject("This is a proper fine well structured sentence.", "This is the second test item.", Date.now(), "High");
toDoList.push(toDoItem);
toDoList.push(toDoItem2); */

renderTodos(toDoList); //This will be called for todos we want rendered.

export { ToDoObject, Project, toDoList, projectList }