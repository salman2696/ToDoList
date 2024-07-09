var btnClick = document.getElementById("button-addon2");
var list = document.getElementById("todo-list");
var input = document.getElementById("text");
var date = document.getElementById('date');
var searchInput = document.getElementById("search");

btnClick.addEventListener("click",  addListItem)

document.body.addEventListener("keydown", function (e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
    addListItem();
  }
});



function addListItem() {
  const newElement = document.createElement("li");
  const newDate = document.createElement("p");
  const newIcon = document.createElement("i");
  const newCheckMark = document.createElement("i");
  const newList = document.createTextNode((list.childElementCount +1)+ '. ' + input.value);
  if (input.value.trim() === "" || date.value.trim() === "") {
    alert("Enter valid List & Date");
  } else {
    newElement.appendChild(newCheckMark);
    newElement.appendChild(newList);
    newDate.textContent = date.value;
    newElement.classList = "list-item";
    
    newCheckMark.classList = "fa-solid fa-check";
    newCheckMark.addEventListener("click", () => {
      newElement.classList.toggle("completed"); 
    });
  
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

searchInput.addEventListener("input", filterListItems);

function filterListItems() {
  const filter = searchInput.value.toLowerCase();
  const items = list.getElementsByTagName('li');
  Array.from(items).forEach(item => {
    const text = item.childNodes[0].textContent.toLowerCase();
    if (text.indexOf(filter) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}