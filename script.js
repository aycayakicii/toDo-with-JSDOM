//Eleman tanımlama işlemleri
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName')
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

//load items
loadItems();

//call- event listener
eventListener();

function eventListener(){
  //Submit event
  form.addEventListener('submit', addNewItem);
  //Delete Item
  taskList.addEventListener('click', deleteItem);
  //Delete All Items
  btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems(){
  items = getItemsFromLS();
  items.forEach(function(item){
    createItem(item);
  })
}

//get items from Local storage
function getItemsFromLS(){
  if (localStorage.getItem('items')===null) {
    items=[];
  }else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items;
}

//set items to LS
function setItemsFromLS(text){
   items = getItemsFromLS();
   items.push(text);
   localStorage.setItem('items', JSON.stringift(items));
}

//delete item from LS
function deleteItemFromLS(text){
  items = getItemsFromLS();
  items.forEach(function(item,index) {
    if (item===text) {
      items.splice(index,1);
    }
  });
  localStorage.setItem('items',JSON.stringify(items));

}

function createItem(text){
  //create li
  const li = document.createElement('li');
  li.className = 'list-group-item list-group-item-secondary';
  li.appendChild(document.createTextNode(text));  //eklenecek olan yazı listede görünsün.

  //create a
  const a = document.createElement('a');
  a.classList = 'delete-item float-right';
  a.setAttribute('href', '#');
  a.innerHTML = '<i class = "fas fa-times"></i>';


    //add a to li
  li.appendChild(a);

  //add li to ul
  taskList.appendChild(li);

}

function addNewItem(e){
  if(input.value === ''){
    alert('add new item');
  }

  //clear item
  createItem(input.value);

  //clear input
  input.value = '';

  e.preventDefault();
}

function deleteItem(e){
    if (e.target.className==='fas fa-times') {
      if (confirm('are you sure')) {
      e.target.parentElement.parentElement.remove();}

    }

  e.preventDefault();
}

function deleteAllItems(e){
  if (confirm('are you sure?')) {
    //taskList.innerHTML='';   1. Yöntem
    //taskList.childNodes.forEach(function(item){    2. Yöntem
    //if (item.nodeType === 1) {
    //    item.remove();
    //  }
    //});
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}
