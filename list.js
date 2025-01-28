//MADE THIS TO DO LIST FUNCTIONALITY USING ONLY DOM CONCEPTS




const main = document.querySelector(".main");
const addSpace= document.querySelector(".add");
const sideBar= document.querySelector(".sidebar");
const taskData= document.querySelector(".data");
const taskItem= document.querySelector(".task-item");
const taskBlock= document.querySelector(".task");
const headingInput=document.querySelector(".headingInput");
const addTodoBtn= document.querySelector(".addtodobtn");
const todoApp= document.querySelector(".todoapp");
const todoSpace= document.querySelector(".todospace");
const spaceList=document.querySelector(".space-list");

//sidebar space

//newtaskline and data entry
const dataEntry=(event)=>{
  if(event.key==="Enter" && taskData.value.trim()!==""){
    const newTaskItem= document.createElement("li");
    newTaskItem.classList.add("task-item");
    const taskText=document.createElement("div");
    taskText.innerText=taskData.value.trim();
    taskText.classList.add("taskText");
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
   addTodoBtn.addEventListener("click", newtodo);
   NewtaskData.addEventListener("keypress",dataEntry);
   
  }

  taskData.addEventListener("keypress",dataEntry);

  headingInput.addEventListener("keypress",
    (e)=>{
      if (e.key==="Enter" && headingInput.innerText.trim()!==" "){
        const listItem= document.createElement("li");
        listItem.innerText=headingInput.value;
        listItem.classList.add("space-li");
        spaceList.appendChild(listItem);
        const newDeleteDiv=document.createElement("div");
    newDeleteDiv.classList.add("delete");
    const newDelete=document.createElement("i");
    newDelete.classList.add('fa-solid','fa-circle-xmark');
    newDeleteDiv.appendChild(newDelete);
    listItem.appendChild(newDeleteDiv);
    // headingInput.value = "";
    setTimeout(() => taskData.focus(), 0);
    console.log(taskBlock);
    divLeft.appendChild(taskText);
    headingInput.blur();
    taskData.focus();
   }
    newDelete.addEventListener("click",()=>{
      listItem.remove(this);
    });
    }
  );
function newtodo() {
  const newTodoApp = todoApp.cloneNode(true);
  newTodoApp.innerHTML = `
    <div class="todoheading">
      <input autocomplete="off" type="text" class="headingInput textfield" placeholder="TO-DO">
    </div>
    <ol class="task">
      <li class="task-item">
        <div class="taskBox">
          <div class="uncheckedDiv">
            <i class="fa-regular fa-circle unchecked"></i>
          </div>
          <div class="content">
            <input type="text" class="data textfield" placeholder="new task">
          </div>
        </div>
        <div class="delete">
          <i class="fa-solid fa-circle-xmark"></i>
        </div>
      </li>
    </ol>
  `;
  todoSpace.append(newTodoApp);
  const newTaskData = newTodoApp.querySelector(".data");
   const newTaskBlock = newTodoApp.querySelector(".task");
  const newHeadingInput = newTodoApp.querySelector(".headingInput");
  newTaskData.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && newTaskData.value.trim() !== "") {
      const newTaskItem = document.createElement("li");
      newTaskItem.classList.add("task-item");
       const taskText = document.createElement("div");
      taskText.innerText = newTaskData.value.trim();
      taskText.classList.add("taskText");
      const divLeft = document.createElement("div");
      divLeft.style.display = "flex";
      newTaskItem.appendChild(divLeft);
      newTaskBlock.appendChild(newTaskItem);
      newTaskData.value = "";
      const newDeleteDiv = document.createElement("div");
      newDeleteDiv.classList.add("delete");
      const newDelete = document.createElement("i");
      newDelete.classList.add("fa-solid", "fa-circle-xmark");
      newDeleteDiv.appendChild(newDelete);
      newTaskItem.appendChild(newDeleteDiv);
      const newUncheckedDiv = document.createElement("div");
      newUncheckedDiv.classList.add("uncheckedDiv");
      const newUnchecked = document.createElement("i");
      newUnchecked.classList.add("fa-regular", "fa-circle", "unchecked");
      newUncheckedDiv.appendChild(newUnchecked);
      divLeft.classList.add("divLeft");
      divLeft.insertBefore(newUncheckedDiv, divLeft.firstChild);
      divLeft.appendChild(taskText);
      newDelete.addEventListener("click", () => {
        newTaskItem.remove();
      });

      newUncheckedDiv.addEventListener("click", () => {
        if (newUnchecked.classList.contains("unchecked")) {
          newUnchecked.classList.remove("fa-regular", "fa-circle", "unchecked");
          const newChecked = document.createElement("div");
          newChecked.classList.add("checked");
          newUncheckedDiv.appendChild(newChecked);
          taskText.style.textDecoration = "line-through";
          taskText.style.color = "grey";
        } else {
          newUnchecked.classList.add("fa-regular", "fa-circle", "unchecked");
          const existingChecked = newUncheckedDiv.querySelector(".checked");
          if (existingChecked) {
            newUncheckedDiv.removeChild(existingChecked);
            taskText.style.textDecoration = "none";
            taskText.style.color = "white";
          }
        }
      });
    }
  });
  newHeadingInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && newHeadingInput.value.trim() !== "") {
      const listItem= document.createElement("li");
      listItem.innerText=newHeadingInput.value;
      listItem.classList.add("space-li");
      spaceList.appendChild(listItem);
      const newDeleteDiv=document.createElement("div");
    newDeleteDiv.classList.add("delete");
    const newDelete=document.createElement("i");
    newDelete.classList.add('fa-solid','fa-circle-xmark');
    newDeleteDiv.appendChild(newDelete);
    listItem.appendChild(newDeleteDiv);
    // console.log(newTaskItem);
    // newHeadingInput.value = "";
    setTimeout(() => newTaskData.focus(), 0);
   console.log(taskBlock);
    divLeft.appendChild(taskText);
    newHeadingInput.blur();
    newTaskData.focus();
    newDelete.addEventListener("click",()=>{
      newTaskItem.remove(this);
    });
    }
  });
}
addTodoBtn.addEventListener("click", newtodo);

  