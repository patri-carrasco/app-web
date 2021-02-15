document.querySelector('.items-form').onsubmit = avoidSubmit

function avoidSubmit(event){

    event.preventDefault()
    getValue()
}

function  getValue(){
    let taskText = document.querySelector('.items-form input').getValue
    insertTask(taskText)
    document.querySelector('.items-form input').getValue = ''
}

function insertTask(taskText){
    taskArray.push(taskText)
    printTasks()
}

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
function setEventeListeners(){
    document.querySelectorAll('.delete-item').forEach(eachButton => eachButton.onclick = removeTask)
}
function removeTask(){
    let taskID = this.dataset.index
    taskArray.splice(taskID,1)
    printTasks()
}