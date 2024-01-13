import { component, renderTodos } from "./functions.js";
import "./styles.css";

//To-Do object should have at least a title, due date, and a priority, also an optional project it is under. Description also optional
//Priority is a string out of the following: [Low, Medium, High]

let toDoList = []; //all todo items will be stored here. 
let projectList = []; //all projects here. todo can have a projectID it is associated to.


class ToDoObject {
    constructor(title, desc, dueDate, priority, projectId, todoId) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.todoId = todoId;
        this.done = false;
    }
    toggleDone(){
        this.done = !this.done;
    }
    showInfo() {
        return(this.title, this.desc. this.dueDate, this.priority, this.projectId, this.todoId);
    }
    //Should've written more methods for these classes and used them.
}

class Project {
    constructor(title, projectId) {
        this.title = title;
        this.projectId = projectId;
    }
}

document.body.appendChild(component());


renderTodos(toDoList); //This will be called for todos we want rendered.

export { ToDoObject, Project, toDoList, projectList }