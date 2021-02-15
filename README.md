# Primera aplicación web



## Html y el css de la aplicación web

Creamos dos archivos index.html y style.css:

1º `index.html`
Dentro de head ponemos el título de nuestra página, el tipo de letra que queremos y hacemos referencia al archivo `sytle.css`
~~~ html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-do's list | mis cosas pendientes</title>
    
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">   
    <link rel="stylesheet" href="css/sytle.css">
</head>
~~~
~~~ html
<body>
    
    <main>
        <header>
            <h1>TO-Do's</h1>
            <div class = 'first-panel'>
                <p>Listado de tareas pendientes (<span class="pending">0</span> tareas en total)</p>
            </div>
            

        </header>        
        <section>
            <div class = 'form-panel'>
               <form class = "items-form">
                   <input type="text" placeholder="Escribe tu tarea">
                   <button>Añadir tarea</button>
               </form>

            </div>

            <div class = 'list-panel'>
                
            </div>
        </section>

    </main>
    <script src="js/data.js"></script>
    <script src="js/app.js"></script>


</body>
</html>
~~~ 
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

## Segundo reto: almacenamiento local (Local Storage)

Con la función  `storeTasksLocally()` guardamos nuestro array en LocalStorage,

~~~ js
function storeTasksLocally(tasksArray){
   localStorage.setItem('Local',tasksArray) 
}
~~~

Con la función `getTasksLocally()` obtenemos los datos de LocalStorage y los convertimos en array para imprimirlos.
~~~ js
function getTasksLocally(){
    MyLocalStorage = localStorage.getItem('Local')
    
   
    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    tasksArray = MyLocalStorage ? MyLocalStorage.split(',') : [];
      
    printTasks()
     
}
~~~