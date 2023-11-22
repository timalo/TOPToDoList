import { component } from "./initialLoad.js"

import "./styles.css";

//To-Do object should have at least a title, description, due date, and a priority, also an optional project it is under.
//Priority object could be int on range 1-5, 5 being the most important, and 1 having least importance

document.body.appendChild(component());

class ToDoObject {
    constructor(title, desc, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    getTitle() {
        return this.title;
    }
}

//On page load we should have 'default' view of to-dos visible to the user. Probably just show all toDos
//All todos will be added to some project.
//Could be a neat idea to have a progress bar on every project, based on how many of the todos are checked out as done.
