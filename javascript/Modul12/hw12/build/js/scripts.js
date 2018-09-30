"use strict";

/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

var form = document.querySelector(".bookmarks__form");
var addButton = document.querySelector(".bookmark-add__button");
var container = document.querySelector(".bookmarks__container");
var input = document.querySelector(".bookmark__input");
var urlListWrap = document.querySelector(".bookmarks__list");

function handleOnDomcreated() {
    var urlListFromLS = localStorage.getItem("urlList") ? JSON.parse(localStorage.getItem("urlList")) : [];
    var urlList = [];
    updateLocalStorage(urlList);
    createMarkup(urlListFromLS.reverse());
};

function updateLocalStorage(toUpdate) {
    localStorage.setItem("urlList", JSON.stringify(toUpdate));
}

function checkForPrevSaved(name) {
    var urlListFromLS = JSON.parse(localStorage.getItem("urlList"));
    var savedUrlNames = [];
    urlListFromLS.map(function (bookmark) {
        return savedUrlNames.push(bookmark.name);
    });
    if (!savedUrlNames.includes(name)) return true;
}

function handleAddBookmark(e) {
    e.preventDefault();

    var target = event.target;
    var regExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    var urlListFromLS = JSON.parse(localStorage.getItem("urlList"));

    if (target.textContent === "Add") {
        if (!regExp.test(input.value)) {
            alert("Not valid Url");
            form.reset();
            return;
        };

        var bookmark = {
            name: ""
        };

        var urlList = urlListFromLS.reverse();

        if (checkForPrevSaved(input.value)) {
            bookmark.name = input.value;
            urlList.push(bookmark);

            createMarkup(urlListFromLS.reverse());
            updateLocalStorage(urlList);
            form.reset();
        } else {
            alert("This URL has been already saved!!!");
            form.reset();
        }
    }
}

function createMarkup(list) {
    urlListWrap.innerHTML = "";
    var source = document.querySelector("#bookmark__template").innerHTML.trim();
    var template = Handlebars.compile(source);
    var markup = list.reduce(function (acc, bookmark) {
        return acc + template(bookmark);
    }, "");
    urlListWrap.insertAdjacentHTML("beforeend", markup);
}

function handleRemoveBookmark(e) {
    e.preventDefault();
    var target = event.target;

    if (target.textContent === "Delete") {
        var card = target.parentNode;
        var bookmarkToDelete = target.previousElementSibling.textContent;

        var urlListFromLS = JSON.parse(localStorage.getItem("urlList"));
        var updatedUrlList = urlListFromLS.filter(function (e) {
            return e.name != bookmarkToDelete;
        });

        localStorage.removeItem('urlList');
        updateLocalStorage(updatedUrlList);

        card.remove();
        form.reset();
    }
}

form.addEventListener('click', handleAddBookmark);
container.addEventListener('click', handleRemoveBookmark);
document.addEventListener('DOMContentLoaded', handleOnDomcreated);