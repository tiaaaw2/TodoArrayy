const input = document.getElementById("input");
let todo = []; //menampung nilainya
let selectedId = null;
const btnEdit = document.getElementById("edit-btn");

// tambah data
function add(){
    let value = document.getElementById('input').value
    let li = document.createElement('li')
    li.innerHTML = `
            <div id="todo-${todo.length}"> 
            <div class="todo-title">
             ${value} 
            </div>
                <div class="todo-actions">
                        <button id="edit-btn" class="edit-btn" data-index="0" onclick="openEditModal(${todo.length})">
                            edit<i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" data-index="0">
                            delete<i class="fas fa-trash-alt"></i>
                        </button>
                </div>
            </div>
    `
    document.getElementById('list').appendChild(li)
    document.getElementById('input').value = ''

    li.addEventListener('click', function(){
        li.classList.toggle('completed')
    })
    todo.push(value);

}
// menampilkan terus
function read() {
    const todosContainer = document.querySelector(".todos-container");
    todosContainer.innerHTML = ""; 
    
    
    todo.forEach((todo, id) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <p>${todo}</p> <!-- Tampilkan item -->
            <div class="todo-actions">
                <button class="edit-btn" onclick="openEditPopup(${selectedId})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="openDeletePopup(${selectedId})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        todosContainer.appendChild(todoItem); 
    });
}

function openEditModal(id) {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "block";
    const input = document.getElementById("edit-input");
    input.value = todo[id];
    selectedId = id;
}
function closeEditModal(id) {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "none";
    selectedId=null;

}

function submitEditModal() {
    let value = document.getElementById('edit-input').value
    todo[selectedId] = value;
    const selectedToDo = document.getElementById(`todo-${selectedId}`)
    selectedToDo.querySelector('.todo-title').innerText = value;
}


