var btnClick = document.getElementById("button-addon2");
var list = document.getElementById("todo-list");
var input = document.getElementById("text");

btnClick.addEventListener("click", function () {
  addListItem();
});

document.body.addEventListener("keydown", function (e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
    addListItem();
  }
});

function addListItem() {
  const newElement = document.createElement("li");
  const newList = document.createTextNode((list.childElementCount +1)+ '. ' + input.value);
  if (input.value.trim() === "") {
    alert("Enter valid List");
  } else {
    newElement.appendChild(newList);
    newElement.classList = "list-item"
    list.appendChild(newElement);
    console.log(list.childElementCount)
    input.value = "";
  }
}
