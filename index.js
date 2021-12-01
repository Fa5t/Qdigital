'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('.taskManagement_form_add-input'),
          addBtn = document.querySelector('.taskManagement_form_add-btn'),
          taskContent = document.querySelector('.taskContent');

    let tasks = [];

    function addNewTask() {
        addBtn.addEventListener('click', () => {
            if(taskInput.value) {
                let newTask = {
                    text: taskInput.value,
                    ready: false
                };
    
                tasks.push(newTask);
                localStorage.setItem('task', JSON.stringify(tasks));
                showTasks();
            }           
        })
    }

    function showTasks() {
        let allTasks = '';
        tasks.forEach((task, i) => {
            allTasks += `<div class="taskContent_Card" id="task-${i}">
            <div class="taskContent_Card_left">
                <div class="taskContent_Card_left_text">
                    <p>${task.text}</p>
                </div>
                <div class="taskContent_Card_left_btns">
                    <button class="btn taskContent_Card_btnStatus" id="btnReady_${i}">READY</button>
                    <button hidden class="btn taskContent_Card_btnStatus" id="btnUnready_${i}">UNREADY</button>
                    <button class="btn taskContent_Card_btnDelete" id="btnDelete_${i}">DELETE</button>
                </div>
            </div>
            <div class="taskContent_Card_right">
                <div class="taskContent_Card_colorStatus">
                    <div hidden class="taskContent_Card_colorStatus-ready" id="colorStatus-ready-${i}"></div>
                    <div class="taskContent_Card_colorStatus-unready" id="colorStatus-unready-${i}"></div>
                </div>
            </div>
        </div>
            `;
        });
        taskContent.innerHTML = allTasks;
        console.log(tasks);
        console.log(localStorage.getItem('task'));
        for (let i = 0; i < tasks.length; i++) {
            ready(i);
            unready(i);
            deleteTask(i);
        }
    }

    function readyAll() {
        document.querySelector('.taskManagement_form_btn-ready').addEventListener('click', () => {
            for (let i = 0; i < tasks.length; i++) {  
                document.querySelector('#colorStatus-ready-'+i).hidden = false;
                document.querySelector('#colorStatus-unready-'+i).hidden = true;
                document.querySelector('#btnReady_'+i).hidden = true;
                document.querySelector('#btnUnready_'+i).hidden = false;
                console.log(tasks);
            }
        })
        
    }

    function removeAll() {
        document.querySelector('.taskManagement_form_btn-remove').addEventListener('click', () => {
            localStorage.clear();
            tasks.length = 0;
            taskContent.innerHTML = '';
            console.log(localStorage.getItem('task'));
        });
    }

    function ready(i) {
        document.querySelector('#btnReady_'+i).addEventListener('click', () => {
            document.querySelector('#colorStatus-ready-'+i).hidden = false;
            document.querySelector('#colorStatus-unready-'+i).hidden = true;
            document.querySelector('#btnReady_'+i).hidden = true;
            document.querySelector('#btnUnready_'+i).hidden = false;
        });  
    }

    function unready(i) {
        document.querySelector('#btnUnready_'+i).addEventListener('click', () => {
            document.querySelector('#colorStatus-ready-'+i).hidden = true;
            document.querySelector('#colorStatus-unready-'+i).hidden = false;
            document.querySelector('#btnReady_'+i).hidden = false;
            document.querySelector('#btnUnready_'+i).hidden = true;
        });  
    }

    function deleteTask(i) {
        document.querySelector('#btnDelete_'+i).addEventListener('click', (e) => {
            document.querySelector('#task-'+i).remove();
            tasks.splice(i, 1);
            localStorage.setItem('task', JSON.stringify(tasks));
            console.log(localStorage.getItem('task'));
            //localStorage.removeItem('task');
        }); 
    }

    if (localStorage.getItem('task')) {
        tasks = JSON.parse(localStorage.getItem('task'));
        showTasks();
    };

    addNewTask();
    showTasks();
    readyAll();
    removeAll();
});