/*
  Есть форма с набором радиокнопок. Пользователь выбирает вариант ответа, 
  после чего нажимает кнопку "Send" и происходит отправка формы.
  
  При отправке формы:
    - не должна перезагружаться страница
    - необходимо получить выбранную опцию и вывести в абзац с классом .result
*/
"use strict"
const form = document.querySelector(".question-form");
const radioInputs = document.querySelectorAll('input[type = "radio"]');

const sendBtn = document.querySelector(".btn");
const result = document.querySelector(".result");

function handleSubmitForm(event) {
    event.preventDefault();

    for (let i of radioInputs) {
        console.log(i);
        if (i.checked) {
            result.textContent = "Result: " + i.value;
        }
    }
}




sendBtn.addEventListener('click', handleSubmitForm);
console.log(radioInputs);
console.log(Arr);