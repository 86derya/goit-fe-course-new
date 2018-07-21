/*
  Создайте скрипт кассира, который получает список продуктов и деньги, 
  подсчитывает общую стоимость продуктов, и в зависимости от того хватает 
  денег или нет, уведомляет покупателя о результате.
*/

/* Есть база данных товаров, в формате "имя-товара":"цена за одну единицу" */
const products = {
    bread: 10,
    milk: 15,
    apples: 20,
    chicken: 50,
    cheese: 40,
};
/* Заказ пользователя хранится в виде объекта следующего формата. "имя-продукта":"количество-единиц" */
const order = {
    bread: 2,
    milk: 2,
    apples: 1,
    cheese: 1,
};


function Cashier(name, productsDatabase) {
    this.name = name;
    this.productsDatabase = productsDatabase;
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;
    this.greet = function() {
        console.log(`Здравствуйте, вас обслуживает ${this.name} !`);
    };
    this.onSuccess = function() {
        if (this.changeAmount === 0) {
            console.log(`Спасибо за покупку!`);
        } else {
            console.log('Спасибо за покупку, ваша сдача: ', this.changeAmount);
        }
    };
    this.onError = function() {
        console.log('Очень жаль, вам не хватает денег на покупки');
    };
    this.countTotalPrice = function(order) {
        const productNames = Object.keys(order);
        for (productName of productNames) {
            if (productsDatabase[productName]) {
                this.totalPrice += order[productName] * productsDatabase[productName];
            }
        }
        return this.totalPrice;
    };

    this.getCustomerMoney = function(value) {
        this.customerMoney = Number(value);
        return this.customerMoney;
    };

    this.countChange = function() {
        if (this.customerMoney >= this.totalPrice) {
            this.changeAmount = this.customerMoney - this.totalPrice;
        } else {
            this.changeAmount = null;
        }
        return this.changeAmount;
    };

    this.reset = function() {
        this.totalPrice = 0;
        this.customerMoney = 0;
        this.changeAmount = 0;
    };
}

// ===========================================================================================

const mango = new Cashier('Mango', products);

// // Проверяем исходные значения полей
console.log(mango.name); // Mango
console.log('mango.productsDatabase: ', mango.productsDatabase); // ссылка на базу данных продуктов (объект products)
console.log('mango.totalPrice -Initial: ', mango.totalPrice); // 0
console.log('mango.customerMoney -Initial: ', mango.customerMoney); // 0
console.log('mango.changeAmount -Initial: ', mango.changeAmount); // 0
// // Вызываем метод greet
mango.greet(); // Здравствуйте, вас обслуживает Mango

// // Вызываем метод countTotalPrice для подсчета общей суммы
// // передавая order - список покупок пользователя
mango.countTotalPrice(order);

// // Проверям что посчитали
console.log('mango.totalPrice: ', mango.totalPrice); // 110

// // Вызываем getCustomerMoney для запроса денег покупателя
mango.getCustomerMoney(300);

// // Проверяем что в поле с деньгами пользователя
console.log('mango.customerMoney: ', mango.customerMoney); // 300

// // Вызываем countChange для подсчета сдачи
const result = mango.countChange();

// // Проверяем что нам вернул countChange
console.log('result: ', result); // 190

// // Проверяем результат подсчета денег
if (result !== null) {
    //     // При успешном обслуживании вызываем метод onSuccess
    mango.onSuccess(); // Спасибо за покупку, ваша сдача 190
} else {
    //     // При неудачном обслуживании вызываем метод onError
    mango.onError(); // Очень жаль, вам не хватает денег на покупки
}

// // Вызываем reset при любом исходе обслуживания
mango.reset();

// Проверяем значения полей после reset
console.log('Проверяем значения: [totalPrice] после reset: ', mango.totalPrice); // 0
console.log(
    'Проверяем значения: [customerMoney] после reset: ',
    mango.customerMoney,
); // 0
console.log(
    'Проверяем значения: [changeAmount] после reset: ',
    mango.changeAmount,
); // 0