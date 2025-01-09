const input = document.getElementById("input");
let todos = []; //menampung nilainya
let selectedId = null;
const btnEdit = document.getElementById("edit-btn");

tampilkanList();
// menampilkan list todo
function tampilkanList() {
    const listContainer = document.getElementById('listTodo');
    listContainer.innerHTML = ''; // menghapus, terus mensmpilkan lgi
    todos.forEach(todo =>  {
        let li = document.createElement('li');
        li.id = `todo-${todo.id}`;
        li.innerHTML = `
            <div class="todo-item">
                <div class="todo-content">
                    ${todo.title}
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
        listContainer.appendChild(li);

        li.addEventListener('click', function() {
            li.classList.toggle('completed');
        });
    });
}

// tamabah data
function add() {
    let value = document.getElementById('input').value;
    if (!value) return; // Prevent adding empty todo

    let id = todos.length + 1; // Simple ID generation
    let newToDo = {
        id: id,
        title: value,
        complete: false
    };

    todos.push(newToDo); // Save in array
    tampilkanList(); // Re-render the list
    document.getElementById('input').value = ''; // Clear input
}

// Open the edit modal
function openEditModal(id) {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "block";
    const input = document.getElementById("edit-input");
    input.value = todos.find(todo => todo.id === id).title;
    selectedId = id; // Store the selected ID for editing
}

// Close the edit modal
function closeEditModal() {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "none";
    selectedId = null; // Clear selected ID after closing
}

// Submit the edited todo
function submitEditModal() {
    let newValue = document.getElementById('edit-input').value;
    if (!newValue) return; // Don't allow empty input

    // Update the todo in the array
    const todoIndex = todos.findIndex(todo => todo.id === selectedId);
    if (todoIndex !== -1) {
        todos[todoIndex].title = newValue; // Update the title
    }

    // Re-render the list
    tampilkanList();
    closeEditModal(); // Close the modal
}

// Open the delete confirmation modal
function openDeleteModal(id) {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "block";
    selectedId = id; // Store the ID of the todo to be deleted
}

// Close the delete modal
function closeDeleteModal() {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "none";
    selectedId = null; // Clear selected ID after closing
}

// Delete a todo
function deleteToDo() {
    if (selectedId === null) return; // If no ID is selected, do nothing

    // Remove the todo from the array
    todos = todos.filter(todo => todo.id !== selectedId);

    // Remove the todo from the DOM
    const todoElement = document.getElementById(`todo-${selectedId}`);
    if (todoElement) {
        todoElement.remove();
    }

    closeDeleteModal(); // Close the modal after deletion
}

