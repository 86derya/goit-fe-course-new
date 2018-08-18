/*
  Есть список категорий с классом categories (на вкладке HTML).
  
  Напишите код, который для каждого элемента li (первая вложенность) 
  в списке categories выведет в консоль:
  - Текст непосредственно в нём (название категории)
  - Количество всех вложенных в него элементов li
  
  К примеру:
    Категория: Животные
    Количество вложенных li: 4
*/
const list = document.querySelectorAll(".categories > li");
console.log("list", list)
const Arr = Array.from(list);
console.log("Arr", Arr)
for (i of list) {
    let categoryName = i.firstChild;
    const contentArr = Array.from(i.querySelectorAll("li"));
    const Arr = contentArr.map(elem => elem = elem.textContent)
    console.log("Категория:", categoryName, "Количество вложенных li:", i.querySelectorAll("li").length, " контент категории:", Arr)

}