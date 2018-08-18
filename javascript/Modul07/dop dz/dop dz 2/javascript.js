/*
  Дан список с классом .list
	- Найдите первого потомка списка и сделайте его текст красного цвета
	- Найдите последнего потомка списка и сделайте его текст синего цвета
*/
const list = document.querySelectorAll(".list > li");
console.log(list)
list[0].style.color = "red";
list[list.length - 1].style.color = "blue";