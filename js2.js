const input = document.getElementById("input");
let todos = []; //menampung nilainya
let selectedId = null;
const btnEdit = document.getElementById("edit-btn");

tampilkanList();
function tampilkanList() {
    const listContainer = document.getElementById('listTodo');  
    listContainer.innerHTML = ''; // menghapus, terus menampilkan lgi
    todos.forEach(todo =>  {
        let li = document.createElement('li');
        li.id = `todo-${todo.id}`;
        // manipulasi a
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
        const inputCheckbox = li.querySelector('.check-input');  // ambil checkbox di dalam  li untk class dan id
        inputCheckbox.addEventListener('change', function() {
            let todoSpan = inputCheckbox.nextElementSibling; 
            todoSpan.classList.toggle('completed-text');  //di buatkan di css
            todos.find(v => v.id === todo.id).complete = inputCheckbox.checked;  // simpan di array todos
                //plh brdsrkn id
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
    document.getElementById('input').value = ''; // clear input (setelah menginput, inputannya langsung kosong)
}
}

// Open the edit modal
function openEditModal(id) {
    // document.getElementById('edit-modal1').style.display = 'block';
    
    const editmodal = document.getElementById("edit-modal1");
    const modal = document.getElementById("modal-container");
    modal.style.top = "0"; 
    // top bg nya yg gelap
    editmodal.style.display = "block";
    const input = document.getElementById("edit-input");
    input.value = todos.find(todo => todo.id === id).title;  
    selectedId = id; 
    // berdasrakan id 
}

// Close edit modal
function closeEditModal() {
    const editmodal = document.getElementById("edit-modal1");
    const modal = document.getElementById("modal-container");
    modal.style.top = "";
    editmodal.style.display = 'none';
}

// Submit the edited todo
function submitEditModal() {
    let newValue = document.getElementById('edit-input').value;
    if (!newValue) return; 

    // berhasil di submit
    const todoIndex = todos.findIndex(todo => todo.id === selectedId);
    if (todoIndex !== -1) {
        todos[todoIndex].title = newValue; 
    }

    tampilkanList();
    closeEditModal(); // Close  modal
}

function openDeleteModal(id) {
    // const modal = document.getElementById("delete-modal");
    // modal.style.display = "block";
    selectedId = id; 
    if (confirm("apakah anda yakin ingin menghapus tugas ini?")) {
        deleteToDo();
        closeDeleteModal();
    }
  
}
function deleteToDo() {
    if (selectedId === null) return;

    // agar yg sudh di hapus hilang di tampilan
    const hapus = document.getElementById(`todo-${selectedId}`);
    if (hapus) {
        hapus.remove();
    }
    // agar yg sdh di hapus tdk muncul lagi di tampilan saat membuat baru
    todos = todos.filter(todo => todo.id !== selectedId); 
    
}

// enter tambah data
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();

    }
});
// enter update stlh edit
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