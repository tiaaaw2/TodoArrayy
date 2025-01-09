const input = document.getElementById("input");
let todos = []; //menampung nilainya
let selectedId = null;
const btnEdit = document.getElementById("edit-btn");

// const todos = [
//     { id: 1, title: 'Test Task 1', complete: false },
// ];

tampilkanList();

// menampilkan list todo
function tampilkanList() {
    todos.forEach(todo =>  {
        console.log(todo.id);
        console.log(todo.title);
        let value = document.getElementById('input').value
        let li = document.createElement('li')
        li.id = `todo-${todo.id}`;
        li.innerHTML = `
                <div class="todo-item" id="">
                        <div class="todo-content">
                            ${todo.title} 
                        </div>
                        <div class="todo-actions">
                            <button id="edit-btn" class="edit-btn" data-index="0" onclick="openEditModal(${todo.length+1})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="delete-btn" data-index="0" onclick="openDeleteModal(${todo.length+1})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                
        `
        document.getElementById('listTodo').appendChild(li)
    });
}

// tambah data
function add(){
    let id = todos.length+1;
    let value = document.getElementById('input').value
    let li = document.createElement('li')
    li.id = `todo-${id}`;
    li.innerHTML = `
            <div class="todo-item" id="">
                    <div class="todo-content">
                     ${value} 
                    </div>
                    <div class="todo-actions">
                        <button id="edit-btn" class="edit-btn" data-index="0" onclick="openEditModal(${id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" data-index="0" onclick="openDeleteModal(${id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                   </div>
                </div>
            
    `
    document.getElementById('listTodo').appendChild(li)
    document.getElementById('input').value = ''

    li.addEventListener('click', function(){
        li.classList.toggle('completed')
    })
    
    createToDo = {
        id : id,
        title : value,
        complete : false,
    }

    todos.push(createToDo); // simpan data di array
    console.log(todos);
}

function openEditModal(id) {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "block";
    const input = document.getElementById("edit-input");
    input.value = todos.find((v)=> v.id === id).title;
    selectedId = id;
}

function closeEditModal(id) {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "none";
    selectedId=null;
}

function submitEditModal() {
    let value = document.getElementById('edit-input').value
    // todo[selectedId] = value;
    updateToDo = {
        id : selectedId,
        title : value,
        complete : false,
    }

    // untuk mengedit
    // todos = todos.map((v)=> {
    //     if(v.id === selectedId){
    //         return {...v, title: value}
    //     }
    //     return v
    //     }
    // );

    updateTodoById(selectedId, { title: value, complete: false });
    console.log(todos);

    closeEditModal();
    tampilkanList();
}

// Function to update a to-do item by id
function updateTodoById(id, newData) {
    const index = todos.findIndex(todo => todo.id === id); // Find the index of the item by id
    
    if (index !== -1) {
      // Update the item at the found index
      todos[index] = { ...todos[index], ...newData }; // Merge old data with new data
    }
}


function openDeleteModal(id) {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "block";
    selectedId = id;
}

// delete data di array
function deleteToDo() {
    todos = todos.filter ((v)=> v.id !== selectedId)
    //to do yg bukan mau dihpaus
    const elementToDo = document.getElementById(`todo-${selectedId}`)
    elementToDo.parentNode.removeChild(elementToDo);
    closeDeleteModal()
}

function closeDeleteModal(id) {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "none";
    selectedId=null;

}


