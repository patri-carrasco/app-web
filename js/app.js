document.querySelector('.items-form').onsubmit = avoidSubmit

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
