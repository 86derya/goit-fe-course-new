/*
  Дан ul склассом .list и массив строк. 
  
  Вставьте элементы этого массива в ul так, чтобы каждый элемент стоял в своем li.
*/
const list = document.querySelector(".list")
const elements = ['HTML', 'CSS', 'JavaScript', 'React', 'NodeJS'];
const elementsA = elements.map(elem => elem = `<li> ${elem} </li>`);
console.log(elementsA)
list.innerHTML += elementsA;