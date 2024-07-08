var btnClick = document.getElementById("button-addon2");
var list = document.getElementById("todo-list");
var input = document.getElementById("text");
var date = document.getElementById('date')

btnClick.addEventListener("click",  addListItem)

document.body.addEventListener("keydown", function (e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
    addListItem();
  }
});

function addListItem() {
  const newElement = document.createElement("li");
  const newIcon = document.createElement("i");
  const newDate = document.createElement("p");
  const newList = document.createTextNode((list.childElementCount +1)+ '. ' + input.value);
  if (input.value.trim() === "" || date.value.trim() === "") {
    alert("Enter valid List & Date");
  } else {
    newElement.appendChild(newList);
    newDate.textContent = date.value;
    newElement.classList = "list-item";
    
    
    newIcon.classList = "fa-solid fa-trash";
    newIcon.addEventListener("click", () => {
      list.removeChild(newElement);
    });
    
    newElement.appendChild(newDate);
    newElement.appendChild(newIcon);
    list.appendChild(newElement);
    input.value = "";
    date.value = "";
  }
}
