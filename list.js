
const taskBtn = document.querySelector(".todo");
const noteBtn = document.querySelector(".notes");
// const task = document.querySelector(".task");
// const note = document.querySelector(".note");
const main = document.querySelector(".main");
const main2 = document.querySelector(".main2");
const spaceInput= document.querySelector(".space-input");
const spaceIcon= document.querySelector(".icon");
const addSpace= document.querySelector(".add");
const sideBar= document.querySelector(".sidebar");
const taskData= document.querySelector(".data");
const taskItem= document.querySelector(".task-item");
const taskBlock= document.querySelector(".task");
const headingInput=document.querySelector(".headingInput");
const addTodoBtn= document.querySelector(".addtodobtn");
const todoApp= document.querySelector(".todoapp");
const todoSpace= document.querySelector(".todospace");

//button toggle and color change with block display
taskBtn.addEventListener("click", () => {
  if (taskBtn.style.backgroundColor === ":rgb(125, 16, 249)") {
    taskBtn.style.backgroundColor = "rgba(0, 0, 0, 0)";
    taskBtn.style.color = "rgb(125, 16, 249)";
    noteBtn.style.backgroundColor =" rgb(125, 16, 249)";
    noteBtn.style.color = "rgba(255, 255, 255, 1)";
    main.style.display="none";
    main2.style.display="block";
  } else {
    taskBtn.style.backgroundColor = "rgb(125, 16, 249)";
    taskBtn.style.color = "rgba(255, 255, 255, 1)";
    noteBtn.style.backgroundColor = "rgba(0, 0, 0, 0)";
    noteBtn.style.color = "rgb(125, 16, 249)";
    main.style.display="block";
    main2.style.display="none";
  }
});
noteBtn.addEventListener("click", () => {
  if (noteBtn.style.backgroundColor === "rgb(125, 16, 249)") {
    noteBtn.style.backgroundColor = "rgba(0, 0, 0, 0)";
    noteBtn.style.color = "rgb(125, 16, 249)";
    taskBtn.style.backgroundColor = "rgb(125, 16, 249)";
    taskBtn.style.color = "rgba(255, 255, 255, 1)";
    main.style.display="block";
    main2.style.display="none";
  } else {
    noteBtn.style.backgroundColor = "rgb(125, 16, 249)";
    noteBtn.style.color = "rgba(255, 255, 255, 1)";
    taskBtn.style.backgroundColor = "rgba(0, 0, 0, 0)";
    taskBtn.style.color = "rgb(125, 16, 249)";
    main.style.display="none";
    main2.style.display="block";
  }
});
//sidebar space
addSpace.addEventListener("click",()=>{
const space= spaceInput.value;
const newSpace= document.createElement("div");
const newHeading= document.createElement("h4");
newSpace.classList.add("spaces");
newHeading.classList.add("space-heading");
sideBar.appendChild(newSpace);
newHeading.innerText= space;
newSpace.appendChild(newHeading);
console.log(newSpace.innerText);
spaceInput.value = '';
});
//newtaskline and data entry
const dataEntry=(event)=>{
  if(event.key==="Enter" && taskData.value.trim()!==""){
    const newTaskItem= document.createElement("li");
    newTaskItem.classList.add("task-item");
    const taskText=document.createElement("div");
    taskText.innerText=taskData.value.trim();
    taskText.classList.add("taskText")
    const divLeft=document.createElement("div");
   divLeft.style.display="flex";
    newTaskItem.appendChild(divLeft);
    taskBlock.appendChild(newTaskItem);
    taskData.value="";
    const newDeleteDiv=document.createElement("div");
    newDeleteDiv.classList.add("delete");
    const newDelete=document.createElement("i");
    newDelete.classList.add('fa-solid','fa-circle-xmark');
    newDeleteDiv.appendChild(newDelete);
    newTaskItem.appendChild(newDeleteDiv);
    // console.log(newTaskItem);
    const newUncheckedDiv=document.createElement("div");
    newUncheckedDiv.classList.add(".uncheckedDiv");
    const newUnchecked=document.createElement("i");
    newUnchecked.classList.add('fa-regular','fa-circle','unchecked');
    newUncheckedDiv.appendChild(newUnchecked);
    divLeft.classList.add("divLeft");
    divLeft.insertBefore(newUncheckedDiv, divLeft.firstChild);
    console.log(taskBlock);
    divLeft.appendChild(taskText);

    newDelete.addEventListener("click",()=>{
      newTaskItem.remove(this);
    });

    newUncheckedDiv.addEventListener("click",()=>{
     if( newUnchecked.classList.contains('fa-regular','fa-circle','unchecked')){
      newUnchecked.classList.remove('fa-regular','fa-circle','unchecked');
      const newChecked= document.createElement("div");
      newChecked.classList.add("checked");
      newUncheckedDiv.appendChild(newChecked);
      taskText.style.textDecoration="line-through";
      taskText.style.color="grey";
      // newDeleteDiv.removeChild(newDelete);
     }
     else {
      newUnchecked.classList.add('fa-regular','fa-circle','unchecked');
      const existingChecked = newUncheckedDiv.querySelector(".checked");
        if (existingChecked) {
            newUncheckedDiv.removeChild(existingChecked);
            taskText.style.textDecoration="none";
            taskText.style.color="white";
            newDeleteDiv.appendChild(newDelete);
   }
   }});
   };
  }

  taskData.addEventListener("keypress",dataEntry);

  headingInput.addEventListener("keypress",
    (e)=>{
      // console.log("Key pressed:", e.key); 
      if (e.key==="Enter" && headingInput.innerText.trim()!==" "){
        // console.log("Switching focus");
        headingInput.blur();
        taskData.focus();
       }
    }
  );


  //add a todo space
  addTodoBtn.addEventListener("click",()=>{
    console.log(todoApp);
    const newTodoApp = todoApp.cloneNode(true);
todoSpace.append(newTodoApp);
  })