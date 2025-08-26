const addBtn = document.querySelector("button");
const inputBox = document.querySelector("input");
const listContent = document.querySelector("#list-content");

addBtn.addEventListener("click", ()=>{

if( inputBox.value ===""){
    alert("Input field is empty ");
    
}
else{
let li = document.createElement ("li");
li.innerHTML = inputBox.value;
 listContent.appendChild(li);
 let span = document.createElement("span");
 span.innerHTML ='\u00d7';
 li.appendChild(span);
}
inputBox.value = "";
saveData();
});

listContent.addEventListener("click",(e)=>{
   if(e.target.tagName == "LI"){
e.target.classList.toggle('checked');
saveData();
   }
     else if(e.target.tagName == "SPAN"){
e.target.parentElement.remove();
saveData();
   }
})
function saveData(){
    localStorage.setItem("tasks", listContent.innerHTML)
}
function showData(){
listContent.innerHTML = localStorage.getItem('tasks')
}
showData();