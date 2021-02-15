# Primera aplicación web



## Html y el css de la aplicación web




## JavaScript de la aplicación web

Creamos dos archivos .js:

1º  `data.js`, donde se almacena los datos que vamos a utilizar en la aplicación, `TasksArray`

2º `app.js`, donde vamos a tener toda la lógica de la aplicación

* Primer paso: Cuando el ususario le da añadir tarea que el formulario no se reenvíe, no se recargue la página.

 
 ~~~ js
 document.querySelector('.items-form').onsubmit = avoidSubmit

 function avoidSubmit(event){

    event.preventDefault()
    getValue()
}
~~~
* Segundo paso: Conseguir el valor que el usuario a escrito en la caja `Escribe tu tarea` 
~~~ js
function  getValue(){
    let taskText = document.querySelector('.items-form input').value
    insertTask(taskText)
    document.querySelector('.items-form input').value = ''
}

function insertTask(taskText){
    taskArray.push(taskText)
    printTasks()
}
 ~~~ 


* Tercer paso: Meter el valor en  array `TaskArray`

~~~ js
function printTasks(){
    let taskCard = ''

    taskArray.forEach((eachTask, index) =>{
        taskCard = taskCard + `<div class="item"> 
        <span>${eachTask}</span>
        <button class="delete-item" data-index="${index}">Realizado</button>
        </div>`
        

    })
    document.querySelector('.list-panel').innerHTML = taskCard

    setEventListeners()
}
~~~

* Cuarto paso: borrar las tareas realizadas.

~~~js
function setEventListeners(){
    document.querySelectorAll('.delete-item').forEach(eachButton => eachButton.onclick = removeTask)
    updatePendingTasksValue(tasksArray)
}
function removeTask(){
    let taskID = this.dataset.index
    tasksArray.splice(taskID,1)
    printTasks()
}
~~~

## Primer reto: cantidad de tareas pendientes
Sería genial poder ver a tiempo real la cantidad de tareas pendientes en la aplicación, ¿verdad?

Creamos una funcion `updatePendingTaskValue` donde vamos cambiado el valor de la clase `.pending` por el valor del tamaño del array `tasksArray`
~~~js
function updatePendingTasksValue(tasksArray){
 
    document.querySelector('.first-panel .pending').innerHTML = tasksArray.length
}
~~~

