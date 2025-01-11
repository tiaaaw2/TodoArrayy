const input = document.getElementById("input");
let todos = []; 
let selectedId = null;
const btnEdit = document.getElementById("edit-btn");

tampilkanList();
function tampilkanList() {
    const listContainer = document.getElementById('listTodo');  
    listContainer.innerHTML = ''; 
    todos.forEach(todo =>  {
        let li = document.createElement('li');
        li.id = `todo-${todo.id}`;
        // console.log(li);
        // console.log(li.innerHTML);
        li.innerHTML = `
            <div class="todo-item">
                <div class="todo-content">
                    <input type="checkbox" id="check-${todo.id}" class="check-input" ${todo.complete ? 'checked' : ''}> 
                    <span class="${todo.complete ? 'completed-text' : ''}">${todo.title}</span>

                </div>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="openEditModal(${todo.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="openDeleteModal(${todo.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;

        // ini checkboxes
        const inputCheckbox = li.querySelector('.check-input');  
        inputCheckbox.addEventListener('change', function() {
            let todoSpan = inputCheckbox.nextElementSibling; 
            todoSpan.classList.toggle('completed-text');  
            todos.find(v => v.id === todo.id).complete = inputCheckbox.checked;  
        });
        // end checkboxes
        
        listContainer.appendChild(li);
        li.addEventListener('click', function() { 
            li.classList.toggle('completed');
        });
    });
}

// tamabah data
function add() {
    let value = document.getElementById('input').value;
    if (!value) alert("inputan kosong"); 

else{
    let id = todos.length + 1; 
    let newToDo = {
        id: id,
        title: value,
        complete: false
    };
    todos.push(newToDo); 
    tampilkanList(); 
    document.getElementById('input').value = '';
    }
}

// Open the edit modal
function openEditModal(id) {
    const editmodal = document.getElementById("edit-modal1");
    const modal = document.getElementById("modal-container");
    modal.style.top = "0"; 
    editmodal.style.display = "block";
    const input = document.getElementById("edit-input");
    input.value = todos.find(todo => todo.id === id).title;  
    selectedId = id; 
}

function submitEditModal() {
    let newValue = document.getElementById('edit-input').value;
    if (!newValue) return; 

    const todoIndex = todos.findIndex(todo => todo.id === selectedId);
    if (todoIndex !== -1) {
        todos[todoIndex].title = newValue; 
    }

    tampilkanList();
    closeEditModal(); 
}

// Close edit modal
function closeEditModal() {
    const editmodal = document.getElementById("edit-modal1");
    const modal = document.getElementById("modal-container");
    modal.style.top = "";
    editmodal.style.display = 'none';
}

function openDeleteModal(id) {
    const modal = document.getElementById("delete-modal");
    const modalContainer = document.getElementById("modal-container");
    modal.style.display = "block"; 
    modalContainer.style.top = "0"; 
    input.value = todos.find(todo => todo.id === id).title;  
    selectedId = id;  
    tampilkanList();
}
function deleteToDo() {
    if (selectedId === null) return;

    const hapus = document.getElementById(`todo-${selectedId}`);
    if (hapus) {
        hapus.remove();
    }
    todos = todos.filter(todo => todo.id !== selectedId);
    closeDeleteModal(); 
}
function closeDeleteModal(){
    const modal = document.getElementById("delete-modal");
    const modalContainer = document.getElementById("modal-container");
    modal.style.display = "none";
    modalContainer.style.top = "";
    selectedId = null; 
}
// enter tambah data
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();

    }
});
document.getElementById('edit-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitEditModal();
    }
});

                                    // function closeDeleteModal() {
                                    //     const modal = document.getElementById("delete-modal");
                                    //     modal.style.display = "none";
                                    //     selectedId = null; // Clear selected ID after closing
                                    // }
                                    // Swal.fire({
                                    //     title: "Hapus",
                                    //     text: "Apakah Anda yakin ingin menghapus tugas ini?",
                                    //     // icon: "warning",
                                    //     showCancelButton: true,
                                    //     confirmButtonColor: "#d33",
                                    //     cancelButtonColor: "#3085d6",
                                    //     confirmButtonText: "Hapus",
                                    //     cancelButtonText: "Batal"
                                    //   }).then((result) => {
                                    //     if (result.isConfirmed) {
                                    //         deleteToDo();
                                    //       Swal.fire({
                                    //         title: "Hapus!",
                                    //         icon: "warning"
                                    //       });
                                    //     }
                                    //   }); 