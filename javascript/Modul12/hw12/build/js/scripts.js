"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var LOCALSTORAGE = function (w) {
    if (!w) return;

    var isActive = "localStorage" in w;
    // GET OBJECT ONLY
    var get = function get(key) {
        try {
            var LSData = localStorage.getItem(key);
            console.log(_typeof(JSON.parse(LSData)));
            return LSData === null && _typeof(JSON.parse(LSData)) != object ? undefined : JSON.parse(LSData);
        } catch (err) {
            console.error("Get state error: ", err);
        }
    };

    var set = function set(key, value) {
        try {
            var valueToSave = JSON.stringify(value);
            localStorage.setItem(key, valueToSave);
        } catch (err) {
            console.error("Set state error: ", err);
        }
    };

    var userAPI = {
        isActive: isActive,
        get: get,
        set: set
    };

    return userAPI;
}(window);

function handleOnDomcreated() {
    var urlList = LOCALSTORAGE.get("urlList") ? LOCALSTORAGE.get("urlList") : [];
    updateLocalStorage(urlList);
    createMarkup(urlList);
};

function updateLocalStorage(valueToUpdate) {
    LOCALSTORAGE.set("urlList", valueToUpdate);
}

function checkForPrevSaved(name) {
    var urlListFromLS = LOCALSTORAGE.get("urlList");
    var savedUrlNames = urlListFromLS ? urlListFromLS.map(function (i) {
        return i.name;
    }) : [];
    return savedUrlNames.some(function (bookmark) {
        return bookmark === name;
    });
}

function checkForValidUrlSyntax(url) {
    var regExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return regExp.test(url);
}

function handleAddBookmark(e) {
    e.preventDefault();

    var target = event.target;
    var urlListFromLS = LOCALSTORAGE.get("urlList");

    if (target.textContent === "Add") {
        var urlList = urlListFromLS.reverse();
        var bookmark = {
            name: ""
        };

        if (!checkForValidUrlSyntax(input.value)) {
            alert("Not valid Url");
            form.reset();
            return;
        }

        if (!checkForPrevSaved(input.value)) {
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

        var urlListFromLS = LOCALSTORAGE.get("urlList");
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