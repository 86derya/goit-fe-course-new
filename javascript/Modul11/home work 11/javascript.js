/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  
  Есть массив объектов (дальше в задании), каждый из которых описывает 
  ноутбук с определенными характеристиками.
  
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы 
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал 
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам. 
  
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
    
  После чего выберите из массива только те объекты, которые подходят 
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается, 
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/

"use strict"
const laptops = [{
        size: 13,
        color: 'white',
        price: 28000,
        release_date: 2015,
        name: 'Macbook Air White 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'gray',
        price: 32000,
        release_date: 2016,
        name: 'Macbook Air Gray 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'black',
        price: 35000,
        release_date: 2017,
        name: 'Macbook Air Black 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'white',
        price: 45000,
        release_date: 2015,
        name: 'Macbook Air White 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'gray',
        price: 55000,
        release_date: 2016,
        name: 'Macbook Pro Gray 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'black',
        price: 45000,
        release_date: 2017,
        name: 'Macbook Pro Black 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'white',
        price: 65000,
        release_date: 2015,
        name: 'Macbook Air White 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'gray',
        price: 75000,
        release_date: 2016,
        name: 'Macbook Pro Gray 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'black',
        price: 80000,
        release_date: 2017,
        name: 'Macbook Pro Black 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
];


const colorInputsList = document.querySelectorAll('input[name = "color"]');
const sizeInputsList = document.querySelectorAll('input[name = "size"]');
const releaseDateInputsList = document.querySelectorAll('input[name = "release_date"]');
const filterBtn = document.querySelector('button[type ="submit"]');
const resetBtn = document.querySelector('button[type ="reset"]');
const filtersForm = document.querySelector('.form');
const grid = document.querySelector(".good-grid");


function createLaptopsGridMarkup(list) {
    grid.innerHTML = "";
    const source = document.querySelector("#good-card").innerHTML.trim();
    const template = Handlebars.compile(source);
    const markup = list.reduce((acc, laptop) => acc + template(laptop), "");
    grid.insertAdjacentHTML("afterbegin", markup);
}
const filter = { size: [], color: [], release_date: [], }

function getFilterColor() {
    if (Array.from(colorInputsList).find(item => item.checked === true)) {
        colorInputsList.forEach(item => {
            if (item.checked) {
                filter.color.push(item.value)
            }
        })
    } else {
        colorInputsList.forEach(item => {
            filter.color.push(item.value)
        })
    }
}

function getFilterSize() {
    if (Array.from(sizeInputsList).find(item => item.checked === true)) {
        sizeInputsList.forEach(item => {
            if (item.checked) {
                filter.size.push(item.value)
            }
        })
    } else {
        sizeInputsList.forEach(item => {
            filter.size.push(item.value)
        })
    }
}

function getFilterRelDate() {
    if (Array.from(releaseDateInputsList).find(item => item.checked === true)) {
        releaseDateInputsList.forEach(item => {
            if (item.checked) {
                filter.release_date.push(item.value)
            }
        })
    } else {
        releaseDateInputsList.forEach(item => {
            filter.release_date.push(item.value)
        })
    }
}

function getFilterData() {
    getFilterColor();
    getFilterSize();
    getFilterRelDate()
    filter.size = filter.size.map(i => i = Number(i))
    filter.release_date = filter.release_date.map(i => i = Number(i))
}

function getFilteredLaptopsList() {
    const filtered = laptops.filter(item => filter.color.includes(item.color))
        .filter(item => filter.size.includes(item.size))
        .filter(item => filter.release_date.includes(item.release_date))
    return filtered;
}

function resetFilter() {
    filter.color.length = 0;
    filter.size.length = 0;
    filter.release_date.length = 0;
}

function handleFilterLaptops(e) {
    e.preventDefault();

    getFilterData();
    const filtered = getFilteredLaptopsList();
    createLaptopsGridMarkup(filtered);
    resetFilter();
    console.log(filter);

}

createLaptopsGridMarkup(laptops);

function handleFilterLaptopsReset() {
    filtersForm.reset();
    createLaptopsGridMarkup(laptops);
}


filterBtn.addEventListener('click', handleFilterLaptops);
resetBtn.addEventListener('click', handleFilterLaptopsReset);