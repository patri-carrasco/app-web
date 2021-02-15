# Primera aplicación web

## Html y el css de la aplicación web

Creamos dos archivos index.html y style.css:

1º `index.html`
* Dentro de head ponemos el título de nuestra página, el tipo de letra que queremos y hacemos referencia al archivo `sytle.css`
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

* Hacemos las divisiones de los contenedores de la información y también hacemos la llamada al script
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
2º `sytle.css`
Con este archivo le damos el formato deseado a la aplicación. 
* Fuentes y sombreado del contenedor main
 ~~~ css
main{
    font-family: 'Comfortaa', cursive;
    font-family: 'Noto Sans JP', sans-serif;
    width: 60%;
    margin-left: 20%;
    margin-top: 50px;
   

    border: 2px solid black;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12)
      ;

}
~~~
* Tamaño del H1, estilo del header y section
~~~ css
h1{
    font-size: 2.5em;
}
header{
    border-bottom: 2px solid black;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
}
section{
    display: flex;
}

~~~
* Formato de las clases usadas en los contenedores.
~~~css
.form-panel{
    
    width: 50%;
    height: 50vh;
    border-right: 2px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;

}

.list-panel{
    
    width: 50%;
    height: 50vh;
}
.items-form input, .items-form button{
   width: 60%;
   margin-left: 20%;
    margin-top: 20px;
    font-size: 1.2em


}
.items-form input{
    border-width: 0 0 2px 0;
}
.item {
    border: 2px solid black;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 80%;
    margin: 10px auto;
} 
.delete-item {
    background-color: #006519;
    border: none;
    color: #ffffff;
    transition-duration: 0.4s;
    outline: none;
    cursor: pointer;
  }
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