const input = document.getElementById("input");
let todo = []; //menampung nilainya
let selectedId = null;
const btnEdit = document.getElementById("edit-btn");

// tambah data
function add(){
    let value = document.getElementById('input').value
    let li = document.createElement('li')
    li.id = `todo-${todo.length+1}`;
    li.innerHTML = `
            <div class="todo-title">
             ${value} 
            </div>
                <div class="todo-actions">
                        <button id="edit-btn" class="edit-btn" data-index="0" onclick="openEditModal(${todo.length+1})">
                            edit<i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" data-index="0" onclick="openDeleteModal(${todo.length+1})">
                            delete<i class="fas fa-trash-alt"></i>
                        </button>
            </div>
            
    `
    document.getElementById('list').appendChild(li)
    document.getElementById('input').value = ''

    li.addEventListener('click', function(){
        li.classList.toggle('completed')
    })

    createToDo = {
        id : todo.length + 1, //unutk membrikan kode unik natara todo satu dan todo lainnya
        title : value,
        complete : false,
    }

    todo.push(createToDo);
}

function openEditModal(id) {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "block";
    const input = document.getElementById("edit-input");
    input.value = todo.find((v)=> v.id === id).title;
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

    // untuk mengedit
    todo = todo.map((v)=> {
        if(v.id === selectedId){
            return {...v, title: value}
        }
        return v
    }

);
    const elementToDo = document.getElementById(`todo-${selectedId}`)
    elementToDo.querySelector('.todo-title').innerText = value;
    closeEditModal()
}
function openDeleteModal(id) {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "block";
    selectedId = id;
}
function deleteToDo() {
    todo = todo.filter ((v)=> v.id !== selectedId)
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


