document.querySelector('.items-form').onsubmit = avoidSubmit

getTasksLocally()

function avoidSubmit(event){
    
    event.preventDefault()
    getValue()
}

function getValue(){
    let taskText = document.querySelector('.items-form input').value
    insertTask(taskText)
    document.querySelector('.items-form input').value = ''

    

}

function insertTask(taskText){
    tasksArray.push(taskText)
    storeTasksLocally(tasksArray)
    printTasks()
}

function printTasks(){
   
    let taskCard = ''
    
   
    tasksArray.forEach((eachTask, index) =>{
       taskCard +=  `<div class="item"> 
                        <span>${eachTask}</span>
                        <button class="delete-item" data-index="${index}">Realizada</button>
                    </div>`
    })
    document.querySelector('.list-panel').innerHTML = taskCard
     
    setEventListeners()
}
function setEventListeners(){
    document.querySelectorAll('.delete-item').forEach(eachButton => eachButton.onclick = removeTask)
    updatePendingTasksValue(tasksArray)
}
function removeTask(){
    let taskID = this.dataset.index
    tasksArray.splice(taskID,1)
    printTasks()
}

function updatePendingTasksValue(tasksArray){
 
    document.querySelector('.first-panel .pending').innerHTML = tasksArray.length
}


function storeTasksLocally(tasksArray){
    localStorage.setItem('Local',tasksArray)
}

function getTasksLocally(){
    MyLocalStorage = localStorage.getItem('Local')
      
    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    tasksArray = MyLocalStorage ? MyLocalStorage.split(',') : [];
      
    printTasks()
     
}