/*
  В HTML-документе уже есть тег с id="root" (вкладка HTML)
  
  Создайте функцию createBoxes(num), которая принимает 1 параметр num - число.
  
  Функция создает столько div, сколько указано в num и возвращает их в одном
  общем контейнере. После чего необходимо повесить результат работы функции
  в div с id="#root"
  
  Каждый div:
    - Имеет случайный rgb цвет фона
    - Размеры самого первого div - 30px на 30px.
    - Каждый следующий div после первого, должен быть шире и выше предыдущего
      на 10px
*/
const root = document.querySelector("#root");


const createBoxes = (num) => {

    let boxContainer = document.createElement("div");
    boxContainer.classList.add("container");



    do {
        let boxItem = document.createElement("div");
        boxItem.classList.add("container__item");

        boxItem.style.width = 20 + "px";
        boxItem.style.height = 20 + "px";

        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
        boxItem.style.background = rgb;

        boxContainer.append(boxItem);
    } while (boxContainer.children.length !== (num));

    let boxContainerArr = Array.from(boxContainer.children);
    boxContainerArr.forEach(i => console.log(i));
    boxContainerArr.forEach(i => i.style.width = parseInt(i.style.width) + 40 + "px");
    boxContainerArr.forEach(i => i.style.width += 40 + "px");


    boxContainer.append(...boxContainerArr);
    console.log(boxContainerArr);
    root.append(boxContainer);
    return boxContainer;
}
createBoxes(5);