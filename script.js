var btnClick = document.getElementById("button-addon2");
var list = document.getElementById("todo-list");
var input = document.getElementById("text");
var date = document.getElementById('date');
var searchInput = document.getElementById("search");

// Set default date to today
function setDefaultDate() {
  var today = new Date().toISOString().split('T')[0];
  date.value = today;
}

window.onload = function() {
  setDefaultDate();
  loadListItems();
};

btnClick.addEventListener("click", addListItem);

document.body.addEventListener("keydown", function (e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
    addListItem();
  }
});

searchInput.addEventListener("input", filterListItems);

function addListItem() {
  const newElement = document.createElement("li");
  const newDate = document.createElement("p");
  const newIcon = document.createElement("i");
  const newCheckMark = document.createElement("i");
  const newList = document.createElement("p");
  const textValue = input.value.trim();

  if (textValue === "" || date.value.trim() === "") {
    alert("Enter valid List & Date");
    return;
  }

  newCheckMark.classList = "fa-solid fa-check";
  newCheckMark.addEventListener("click", () => {
    newElement.classList.toggle("completed");
    saveListItems();
  });

  newList.textContent = textValue;
  newElement.appendChild(newCheckMark);
  newElement.appendChild(newList);

  newDate.textContent = date.value;
  newElement.classList = "list-item";
  newElement.setAttribute('draggable', true);
  newElement.addEventListener('dragstart', dragStart);
  newElement.addEventListener('dragover', dragOver);
  newElement.addEventListener('drop', drop);

  newIcon.classList = "fa-solid fa-trash";
  newIcon.addEventListener("click", () => {
    list.removeChild(newElement);
    saveListItems();
  });

  newElement.appendChild(newDate);
  newElement.appendChild(newIcon);
  list.appendChild(newElement);
  input.value = "";
  setDefaultDate(); // Reset the date to today

  saveListItems();
}

function filterListItems() {
  const filter = searchInput.value.toLowerCase();
  const items = list.getElementsByTagName('li');
  Array.from(items).forEach(item => {
    const text = item.querySelector('p').textContent.toLowerCase();
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

  saveListItems();
  return false;
}

function reattachEventListeners(element) {
  const newIcon = element.querySelector(".fa-trash");
  const newCheckMark = element.querySelector(".fa-check");

  newIcon.addEventListener("click", () => {
    list.removeChild(element);
    saveListItems();
  });

  newCheckMark.addEventListener("click", () => {
    element.classList.toggle("completed");
    saveListItems();
  });

  element.setAttribute('draggable', true);
  element.addEventListener('dragstart', dragStart);
  element.addEventListener('dragover', dragOver);
  element.addEventListener('drop', drop);
}

function saveListItems() {
  const items = [];
  list.querySelectorAll('li').forEach(item => {
    const checkMarkClass = item.classList.contains('completed');
    const textElement = item.querySelector('p:nth-child(2)');
    const dateElement = item.querySelector('p:nth-child(3)');
    if (textElement && dateElement) {
      const text = textElement.textContent;
      const date = dateElement.textContent;
      items.push({ checkMarkClass, text, date });
    }
  });
  localStorage.setItem('todoList', JSON.stringify(items));
}

function loadListItems() {
  const items = JSON.parse(localStorage.getItem('todoList')) || [];
  items.forEach(item => {
    const newElement = document.createElement("li");
    const newDate = document.createElement("p");
    const newIcon = document.createElement("i");
    const newCheckMark = document.createElement("i");
    const newList = document.createElement("p");

    newCheckMark.classList = "fa-solid fa-check";
    newCheckMark.addEventListener("click", () => {
      newElement.classList.toggle("completed");
      saveListItems();
    });

    newList.textContent = item.text;
    newElement.appendChild(newCheckMark);
    newElement.appendChild(newList);

    newDate.textContent = item.date;
    newElement.classList = "list-item";
    newElement.setAttribute('draggable', true);
    newElement.addEventListener('dragstart', dragStart);
    newElement.addEventListener('dragover', dragOver);
    newElement.addEventListener('drop', drop);

    if (item.checkMarkClass) {
      newElement.classList.add('completed');
    }

    newIcon.classList = "fa-solid fa-trash";
    newIcon.addEventListener("click", () => {
      list.removeChild(newElement);
      saveListItems();
    });

    newElement.appendChild(newDate);
    newElement.appendChild(newIcon);
    list.appendChild(newElement);
  });
}
