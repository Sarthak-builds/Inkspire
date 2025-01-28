//WILL TRY TO USE MOSTLY EVENT LISTENER CONCEPTS HERE

const notesContainer= document.querySelector(".notesContainer");
const createBtn= document.querySelector(".btn");
const notes= document.querySelectorAll(".inputBox");

function showNotes(){
    notesContainer.innerHTML=localStorage.getItem("notes");
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes",notesContainer.innerHTML);
}
createBtn.addEventListener("click",()=>{
    let inputBox = document.createElement("p");
    let img =document.createElement("img");
    inputBox.className="inputBox";
    // inputBox.style.textTransform="Capitalize";
    inputBox.setAttribute("spellCheck","false");
    inputBox.setAttribute("contenteditable","true");
    img.src= "Images/delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
})
notesContainer.addEventListener("click", (e)=>{
if (e.target.tagName==="IMG"){
    e.target.parentElement.remove();
    updateStorage();
}
else if (e.target.tagName==="p"){
    notes = document.querySelectorAll(".inputBox");
    notes.forEach(note=>{
        note.onkeyup= function (){
            updateStorage();
        }
    })
}
})
document.addEventListener("keydown", event=>{
    if (event.key==="Enter"){
        document.execCommand("insertLineBreak");
// The document.execCommand() method is an older API used to execute browser commands for rich text editing. It allows you to apply formatting, manipulate content, or insert elements within a contenteditable element or a textarea.
        event.preventDefault();
    }
})