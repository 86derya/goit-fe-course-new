/*
  Есть список с классом .size-filter из произвольного 
  количества чекбоксов, каждый из которых содержит 
  размер одежды в фильтре.
  
  Напишите функцию getInputsData(inputs), которая
  принимает 1 параметр inputs - массив тех инпутов
  у которых состояние checked.
  
  Возвращает массив значений атрибута value.
*/

const checkedArr = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
console.log("checkedArr", checkedArr);


const getInputsData = inputs => inputs.map(elem => elem = elem.value);
console.log(getInputsData(checkedArr));