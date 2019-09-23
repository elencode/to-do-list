
var taskInput = document.getElementById('new-task');
var addButton = document.querySelector('button');
var incompleteTaskHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

/* add new task */
var createNewTaskElement = function(task) {
    var listItem = document.createElement('li');
    var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
    var label = document.createElement('label');
        label.innerText = task;
    var inputText = document.createElement('input');
        inputText.type = "text";
    var editTask = document.createElement('button');
        editTask.className = "edit";
        editTask.innerText = "Edit";
    var deleteTask = document.createElement('button');
        deleteTask.className = "delete";
        deleteTask.innerText = "Delete";

    /*appending elements*/
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(inputText);
    listItem.appendChild(editTask);
    listItem.appendChild(deleteTask);

    return listItem;
}

var addTask = function(){
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = "";
}

addButton.addEventListener("click", addTask);

var taskCompleted = function(){
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete=function(){
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	//Bind editTask to edit button.
    editButton.addEventListener('click', function(){
        var listItem = this.parentNode;   
        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector("label");
        var containsClass = listItem.classList.contains("editMode");

        if(containsClass){    
            label.innerText = editInput.value;
        }
        else {
            editInput.value = label.innerText;
        }
            listItem.classList.toggle("editMode");
    });
    
	//Bind deleteTask to delete button.
	deleteButton.addEventListener('click', function(){
        var listItem = this.parentNode;
        var ul = listItem.parentNode;
        alert('remove the task?');
        ul.removeChild(listItem);
    });

    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

	for (var i=0; i < incompleteTaskHolder.children.length; i++){
		//bind events to list items children(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}

   for (var i=0; i < completedTasksHolder.children.length; i++){
	//bind events to list items children(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
    }

    var searchTask = document.querySelector('#search-task input');

    searchTask.addEventListener('keyup', function(event) {
        var text = event.target.value.trim().toLowerCase();  
        var listTask = document.querySelectorAll('#incomplete-tasks li'); 
  
        listTask.forEach( function(task) {
            var taskName = task.children[1].textContent;

            if (taskName.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        });
    });