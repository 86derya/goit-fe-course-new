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
    allFetchedUsersWrapper: document.querySelector(".user-list-wrapper"),
    fetchedUserCard: document.querySelector(".user-card"),
    fetchedUserId: document.querySelector(".user-ID"),
    fetchedUserName: document.querySelector(".user-Name"),
    fetchedUserAge: document.querySelector(".user-Age"),
    fetchedUserDeleteBtn: document.querySelector(".user-card-deleteBtn"),
    fetchedUserEditBtn: document.querySelector(".user-card-editBtn"),

    findUserByIdContainer: document.querySelector(".user_getByid_container"),
    findUserByIdForm: document.querySelector(".user_getByid_form"),
    findUserByIdInput: document.querySelector(".user_getByid_id"),
    findUserByIdWrapper: document.querySelector(".user_gotById-wrapper"),
    findUserByIdName: document.querySelector(".user_gotById-name"),
    findUserByIdUserId: document.querySelector(".user_gotById-id"),
    findUserByIdAge: document.querySelector(".user_gotById-age"),

    createNewUserForm: document.querySelector(".New-user_create__form"),
    createNewUserBtn: document.querySelector(".New-user_create__button"),
    createNewUserName: document.querySelector(".New-user_create__name"),
    createNewUserAge: document.querySelector(".New-user_create__age"),

    // deleteUserbyIdBtn: document.querySelector(".delete-userbyId_button"),
}

const request = {
    API_URL: "https://test-users-api.herokuapp.com/users/",
    UserID: null,
    UserName: null,
    UserAge: null,
    fetchAllUsers() {
        return fetch(request.API_URL, {
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
        }).catch(error => {
            console.log("ERROR:" + error)
        })

    },
    fetchUserById(id) {
        return request.fetchAllUsers().then(
            users => {
                return users.find(user => user.id === id);
            }
        ).then(founduser => {
            if (founduser) return founduser;
            throw new Error(`Error while fetching: ${response.statusText}`)
        })
    },
    fetchPostUser({ user }) {
        return fetch(request.API_URL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            return response.json();
        }).then(
            newuser => {
                return console.log(newuser);
            }

        ).catch(error => {
            alert(`User ID   "${error}"  is Invalid `);
            console.log("ERROR:" + error)
        })
    },
    fetchDeleteUser(id) {
        return fetch(request.API_URL, {
            method: 'DELETE',
            body: JSON.stringify(id),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response.json());
            return response.json();
        }).then(
            deleteUser => {
                alert(`deleteUuser "${deleteUser}"`)
                return console.log("deleteUser: " + deleteUser);
            }

        ).catch(error => {
            alert(`User ID   "${error}"  is Invalid `);
            console.log("ERROR:" + error)
        })
    },

}

// ==============getAllUsers()================================================================================
function createUserList(users) {
    return users.reduce((acc, user) => acc +
        `<div class="user-card"> 
        <div class="user-name"> user Name:<p class="user-Name"> ${user.name}</p></div>
        <div class="user-id">user ID: <p class="user-ID"> ${user.id}</p></div> 
        <div class="user-age"> user Age: <p class="user-Age"> ${user.age}</p> </div>
        <div class="user-card-buttons">
        <button class="user-card-deleteBtn user-card-Btn">delete</button>
        <button class="user-card-editBtn user-card-Btn">edit</button>
        </div>
        </div>`, "",
    )
}

function removeUserList() {
    DOMrefs.allFetchedUsersWrapper.innerHTML = "";
}

function updateAllUsersBtnActive() {
    DOMrefs.getAllUsersBtn.textContent = "Update List";
}

function getAllUsers() {

    request.fetchAllUsers().then(users => {
        const markup = createUserList(users);
        DOMrefs.allFetchedUsersWrapper.insertAdjacentHTML('beforeend', markup);

    })

}

function handleGetAllUsers() {
    updateAllUsersBtnActive();
    removeUserList();
    getAllUsers();



}

// ======================getUserById(id)==============================================================
function updateUserFoundById(user) {

    DOMrefs.findUserByIdName.textContent = `User name:   ${user.name}`;
    DOMrefs.findUserByIdUserId.textContent = `User ID: ${user.id}`;
    DOMrefs.findUserByIdAge.textContent = `User Age:  ${user.age}`;
}

function resetUserFoundById() {

    DOMrefs.findUserByIdName.textContent = `User name:`;
    DOMrefs.findUserByIdUserId.textContent = `User ID:`;
    DOMrefs.findUserByIdAge.textContent = `User Age:`;
}



function getUserById(id) {
    return request.fetchUserById(id).then(
        user => {
            console.log(`User fetched By Id: 
            User Name "${user.name}",
            User ID "${user.id}",
            User Age "${user.age}".`);
            updateUserFoundById(user);
        },
        error => {
            console.log(" ERROR:" + error);
            alert(`User ID   "${request.UserID}"  is Invalid `);
        }
    )
}

function handleGetUserById(evt) {
    evt.preventDefault();
    const target = event.target;
    if (target.textContent !== "Find user") return;
    // if (target.textContent !== "Find user") return;
    resetUserFoundById();
    request.UserID = DOMrefs.findUserByIdInput.value;

    getUserById(request.UserID)
    DOMrefs.findUserByIdForm.reset();
}


// ==========================addUser(name, age)==========================================================

function addUser(nameToAdd, ageToAdd) {

    const user = {
        name: nameToAdd,
        age: ageToAdd,
    };
    request.fetchPostUser({ user });

}

function handleCreateNewUser(e) {
    e.preventDefault();

    request.UserName = DOMrefs.createNewUserName.value;
    request.UserAge = DOMrefs.createNewUserAge.value;

    if (request.UserAge === "" || request.UserName === "") {
        DOMrefs.createNewUserForm.reset();
        return alert("all fields should be filled properly");
    }

    addUser(request.UserName, request.UserAge);
    DOMrefs.createNewUserForm.reset();
}

// ==================removeUser(id)==========================================================




function removeUser(id) {

    request.fetchDeleteUser(id);
};

function handleDeleteUserById(evt) {
    evt.preventDefault();

    const target = event.target;
    const card = target.closest(".user-card");

    if (target.textContent !== "delete") return;
    const idTotoDelete = card.childNodes[3].childNodes[1].textContent;
    console.log("ID to delete: " + idTotoDelete);
    // console.log("id: ---- " + id);
    removeUser(idTotoDelete);

}



DOMrefs.getAllUsersBtn.addEventListener('click', handleGetAllUsers);
DOMrefs.findUserByIdForm.addEventListener('click', handleGetUserById);
DOMrefs.createNewUserBtn.addEventListener('click', handleCreateNewUser);
DOMrefs.allUsers.addEventListener('click', handleDeleteUserById);