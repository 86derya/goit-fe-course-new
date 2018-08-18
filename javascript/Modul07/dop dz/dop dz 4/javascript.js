/*
  Напишите скрипт для создания списка ul.
  
  Для каждого пункта:
    - Запрашивайте содержимое пункта li у пользователя с помощью prompt.
    - Создавайте пункт и добавляйте его к ul.
    - Процесс прерывается, когда пользователь нажимает Cancel.
    - Все элементы списка должны создаваться динамически.
*/
"use strict"
let userInput = 0;
const numbers = [];
let total = 0;









let list = document.createElement('ul');
list.classList.add("list");
document.body.insertBefore(list, null);
let element = 0;
let list2 = document.querySelector(".list");
const elements = [];
do {
    element = prompt("введите будущий li");
    elements.push(element);
} while (element !== null);

elements.pop()
const elementsA = elements.map(elem => elem = `<li>${elem}</li>`);
console.log(elementsA)
list.innerHTML += elementsA;