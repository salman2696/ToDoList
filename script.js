
var btnClick = document.getElementById("button-addon2");
var list = document.getElementById("todo-list");
var input = document.getElementById("text");
var date = document.getElementById('date');
var searchInput = document.getElementById("search");

// Set default date to today
function defaultDate() {
  var today = new Date().toISOString().split('T')[0];
  date.value = today;
};

window.onload = defaultDate;
btnClick.addEventListener("click", addListItem);
btnClick.addEventListener("click", defaultDate);

document.body.addEventListener("keydown", function (e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
    addListItem();
    defaultDate();
  }
});

searchInput.addEventListener("input", filterListItems);

function addListItem() {
  const newElement = document.createElement("li");
  const newItem = document.createElement("p");
  const newDate = document.createElement("p");
  const newIcon = document.createElement("i");
  const newCheckMark = document.createElement("i");
  const newList = document.createTextNode((list.childElementCount + 1) + '. ');

  if (input.value.trim() === "" || date.value.trim() === "") {
    alert("Enter valid List & Date");
    return;
  }

  newElement.appendChild(newCheckMark);
  newElement.appendChild(newList);
  newElement.appendChild(newItem);
  newDate.textContent = date.value;
  newItem.textContent = input.value;
  newElement.classList = "list-item";
  newElement.setAttribute('draggable', true);
  newElement.addEventListener('dragstart', dragStart);
  newElement.addEventListener('dragover', dragOver);
  newElement.addEventListener('drop', drop);

  newCheckMark.classList = "fa-solid fa-check";
  newCheckMark.addEventListener("click", () => {
    newElement.classList.toggle("completed");
  });

  newIcon.classList = "fa-solid fa-trash";
  newIcon.addEventListener("click", () => {
    list.removeChild(newElement);
    filterListItems(); // Update filter after removing an item
  });

  newElement.appendChild(newDate);
  newElement.appendChild(newIcon);
  list.appendChild(newElement);
  input.value = "";
  date.value = "";
}

function filterListItems() {
  const filter = searchInput.value.toLowerCase();
  const items = list.getElementsByTagName('li');
  Array.from(items).forEach(item => {
    const text = item.childNodes[1].textContent.toLowerCase(); // Adjusted index to access the correct text node
    if (text.indexOf(filter) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// Drag and Drop functions
let dragSrcEl = null;

function dragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  return false;
}

function drop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');

    reattachEventListeners(dragSrcEl);
    reattachEventListeners(this);
  }

  return false;
}

function reattachEventListeners(element) {
  const newIcon = element.querySelector(".fa-trash");
  const newCheckMark = element.querySelector(".fa-check");

  newIcon.addEventListener("click", () => {
    list.removeChild(element);
    filterListItems(); // Update filter after removing an item
  });

  newCheckMark.addEventListener("click", () => {
    element.classList.toggle("completed");
  });

  element.setAttribute('draggable', true);
  element.addEventListener('dragstart', dragStart);
  element.addEventListener('dragover', dragOver);
  element.addEventListener('drop', drop);
}
