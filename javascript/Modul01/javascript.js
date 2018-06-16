"use strict"

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'm4ngo1zh4ackz0r';
const msgAccessDenied = 'Доступ запрещен!'
const msgCanceledByUser = 'Отменено пользователем!';
const msgWelcome = 'Добро пожаловать!'
let userLogin = prompt("Введите Логин", "");
let userPassword;

if (userLogin === null) {
    alert(msgCanceledByUser);
} else if (userLogin !== ADMIN_LOGIN) {
    alert(msgAccessDenied);
} else {
    userPassword = prompt("Введите Пароль", "");
}

if (userPassword === null) {
    alert(msgCanceledByUser);
} else if (userPassword === ADMIN_PASSWORD) {
    alert(msgWelcome);
} else {
    alert(msgAccessDenied);
}