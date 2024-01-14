import { component, renderTodos, renderProjects, pageLoadStorage } from "./functions.js";
import "./styles.css";


let toDoList = []; //all todo items will be stored here. 
let projectList = []; //all projects here. todo can have a projectID it is associated to.

class ToDoObject {
    constructor(title, desc, dueDate, priority, projectId, todoId, done=false) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.todoId = todoId;
        this.done = done;
    }
    toggleDone(){
        this.done = !this.done;
    }
}

class Project {
    constructor(title, projectId) {
        this.title = title;
        this.projectId = projectId;
    }
}

document.body.appendChild(component());

pageLoadStorage();

export { ToDoObject, Project, toDoList, projectList }