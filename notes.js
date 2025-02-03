//WILL TRY TO USE MOSTLY EVENT LISTENER CONCEPTS HERE

const notesContainer = document.querySelector(".notesContainer");
const createBtn = document.querySelector(".btn");

function showNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notesContainer.innerHTML = notes.map(note => `
        <div class="inputBox">
            <div class="note-header">
                <span class="date">${note.date}</span>
                <div class="note-actions">
                    <img src="Images/edit.png" class="edit-btn format-btn" title="Edit">
                    <img src="Images/format.png" class="format-btn" title="Format">
                    <img src="Images/delete.png" class="delete-btn" title="Delete">
                </div>
            </div>
            <div class="note-content" contenteditable="true" spellcheck="false">
                ${note.content}
            </div>
        </div>
    `).join('');
}

function updateStorage() {
    const notes = Array.from(notesContainer.querySelectorAll('.inputBox')).map(notess => ({
        content: notess.querySelector('.note-content').innerHTML,
        date: notess.querySelector('.date').textContent
    }));
    localStorage.setItem("notes", JSON.stringify(notes));
}

createBtn.addEventListener("click", () => {
    const now = new Date().toLocaleString();
    const noteHTML = `
        <div class="inputBox">
            <div class="note-header">
                <span class="date">${now}</span>
                <div class="note-actions">
                    <img src="Images/edit.png" class="edit-btn" title="Edit">
                    <img src="Images/format.png" class="format-btn" title="Format">
                    <img src="Images/delete.png" class="delete-btn" title="Delete">
                </div>
            </div>
            <div class="note-content" contenteditable="true" spellcheck="false"></div>
        </div>
    `;
    notesContainer.insertAdjacentHTML('beforeend', noteHTML);
});

notesContainer.addEventListener("click", (e) => {
    const target = e.target;
    const noteBox = target.closest('.inputBox');
    
    if (!noteBox) return;

    if (target.classList.contains('delete-btn')) {
        if (confirm('Are you sure you want to delete this note?')) {
            noteBox.remove();
            updateStorage();
        }
    } else if (target.classList.contains('format-btn')) {
        const formatMenu = document.createElement('div');
        formatMenu.className = 'format-menu';
        formatMenu.innerHTML = `
            <button onclick="document.execCommand('bold')">B</button>
            <button onclick="document.execCommand('italic')">I</button>
            <button onclick="document.execCommand('underline')">U</button>
            <input type="color" onchange="document.execCommand('foreColor', false, this.value)">
        `;
        noteBox.appendChild(formatMenu);
    }
});

notesContainer.addEventListener("input", (e) => {
    if (e.target.classList.contains('note-content')) {
        updateStorage();
    }
});
showNotes();