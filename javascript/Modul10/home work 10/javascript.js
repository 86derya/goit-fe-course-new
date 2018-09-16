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

    fetchedUserDeleteBtn: document.querySelector(".user-card-deleteBtn"),
    fetchedUserEditBtn: document.querySelector(".user-card-editBtn"),

    updateUserPopUp: document.querySelector(".edit-user-overlay"),
    updateUserPopUpName: document.querySelector(".name--overlay"),
    updateUserPopUpAge: document.querySelector(".age--overlay"),
    updateUserId: document.querySelector(".id"),

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
            if (response.ok) return response.json();
            throw new Error(`Error while fetching: ${response.statusText}`);
        }).then(
            newuser => {
                alert(`created ${newuser.data.name}`)
                return console.log(newuser);
            }

        ).catch(error => {
            alert(`ERROR  "${error}"  `);
            console.log("ERROR:" + error)
        })
    },
    fetchDeleteUser(id, name) {
        return fetch(request.API_URL + id, {
            method: 'DELETE',
        }).then(response => {
            console.log(response);
            alert(`User Name "${name}" was succesfully deleted!!!`);
            handleGetAllUsers();
            return response;
        }).
        catch(error => {
            alert(`ERROR  "${error}"  `);
            console.log("ERROR:" + error)
        })
    },
    fetchUpdateUser(id, user) {
        return fetch(request.API_URL + id, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.ok) return response.json();
                throw new Error(`Error while fetching: ${response.statusText}`);
            }).then(
                udateduser => {
                    handleGetAllUsers();
                    updateModalDisable();
                    alert("updated")
                    return console.log(udateduser);
                })
            .catch(error => {
                alert(`ERROR  "${error}"  `);
                console.log("ERROR:" + error)
            })
    },
}

// ==============getAllUsers()================================================================================
function createUserList(users) {
    return users.reduce((acc, user) => acc +
        `<div class="user-card"> 
        <div class="user-name"> user Name:<p class="user-Name">${user.name}</p></div>
        <div class="user-id">user ID: <p class="user-ID">${user.id}</p></div> 
        <div class="user-age"> user Age: <p class="user-Age">${user.age}</p> </div>
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

function removeUser(id, name) {
    request.fetchDeleteUser(id, name);
};

function handleDeleteUserById(evt) {
    evt.preventDefault();

    const target = event.target;
    const card = target.closest(".user-card");

    if (target.textContent !== "delete") return;
    const idToDelete = card.childNodes[3].childNodes[1].textContent;
    const nameToDelete = card.childNodes[1].childNodes[1].textContent;
    console.log("ID to delete: " + idToDelete);

    removeUser(idToDelete, nameToDelete);

}

// ======================updateUser(id, user)===================================================
function updateModalVisible() {
    DOMrefs.updateUserPopUp.style.display = "block";
}

function updateModalDisable() {
    DOMrefs.updateUserPopUp.style.display = "none";
}

function updateUser(id, user) {
    request.fetchUpdateUser(id, user)
}

function getUserToUpdate(target) {

    const card = target.closest(".user-card");

    const idToUpdate = card.childNodes[3].childNodes[1].textContent;
    const nameToUpdate = card.childNodes[1].childNodes[1].textContent;
    const ageToUpdate = card.childNodes[5].childNodes[1].textContent;

    DOMrefs.updateUserId.textContent = idToUpdate;
    DOMrefs.updateUserPopUpName.value = nameToUpdate;
    DOMrefs.updateUserPopUpAge.value = ageToUpdate;

}

function handleUpdateUser(e) {
    e.preventDefault();
    const target = event.target;

    if (target.textContent === "edit") {
        updateModalVisible();

        return getUserToUpdate(target);
    }

    if (target.textContent === "Cancel") {
        updateModalDisable()
    }

    if (target.textContent === "Save") {
        const idToUpdate = DOMrefs.updateUserId.textContent;
        const userEdited = {
            name: DOMrefs.updateUserPopUpName.value,
            age: Number(DOMrefs.updateUserPopUpAge.value),
        }
        console.log("idToUpdate" + idToUpdate)
        console.log("userEdited" + userEdited);
        updateUser(idToUpdate, userEdited);
    };
}
//==================Listeners===================================================================
DOMrefs.getAllUsersBtn.addEventListener('click', handleGetAllUsers);
DOMrefs.findUserByIdForm.addEventListener('click', handleGetUserById);
DOMrefs.createNewUserBtn.addEventListener('click', handleCreateNewUser);
DOMrefs.allUsers.addEventListener('click', handleDeleteUserById);
DOMrefs.allUsers.addEventListener('click', handleUpdateUser);