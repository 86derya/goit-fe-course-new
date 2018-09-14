/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const DOMrefs = {
    allUsers: document.querySelector(".all_users__container"),
    getAllUsersBtn: document.querySelector(".submitGetAllUsersBtn"),
}

const user = {
    age: null,
    id: null,
    name: '',
}

const request = {
    API_URL: "https://test-users-api.herokuapp.com/users/",
}

function createUserList(users) {
    return users.reduce((acc, user) => acc +
        `<div class="user-wrapper"> 
        <p class="user-name"> user Name: ${user.name}</p>
        <p class="user-id">user ID: ${user.id}</p> 
        <p class="user-age"> user Age: ${user.age} </p> 
        </div>`, "",
    )
}

function getAllUsers() {

    fetchAllUsers().then(users => {
        const markup = createUserList(users);
        DOMrefs.allUsers.insertAdjacentHTML('beforeend', markup);
    })

}

function fetchAllUsers() {
    fetch(request.API_URL, {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.ok) return response.json();
            throw new Error(`Error while fetching: ${response.statusText}`)
        }).then(data => {
            console.log(data);
            return data.data;
        })
        .catch(error => {
            console.log("ERROR:" + error)
        })

}



getAllUsers()