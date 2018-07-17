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
    cheese: 1
};

/* 
  Необходимо создать функцию-конструктор Cashier.
  
  Поля будущего объекта кассира (🔔 объявляются как this.имя_поля в конструкторе): 
    - name - строка, имя кассира, передается при вызове конструктора
    
    - productsDatabase - объект база данных продуктов, передается при вызове конструктора
    
    - totalPrice - число, общая стоимость покупок текущего покупателя, всегда начинается с 0 
    
    - customerMoney - число, сумма введенная пользователем при запросе денег, всегда начинается с 0 
    
    - changeAmount - число, сдача, всегда начинается с 0
    
    - greet() - метод, выводит в консоль строку `Здравствуйте, вас обслуживает ${имя_кассира}`
    
    - onSuccess() - метод, выводит в консоль строку `Спасибо за покупку, ваша сдача ${сдача}` 
        если сдача больше 0, и строку `Спасибо за покупку` если сдача равна 0.
    
    - onError() - метод, выводит в консоль строку 'Очень жаль, вам не хватает денег на покупки'    
    
    - countTotalPrice(order) - метод, получает список покупок, считает общую стоимость исходя из 
        поля productsDatabase. Записывает результат в поле totalPrice.
      
    - getCustomerMoney(value) - метод, получает число - деньги покупателя и записывает его в поле customerMoney
        
    - countChange() - метод, считает сдачу, разницу между общей суммой покупок и деньгами покупателя, 
        записывает результат в поле changeAmount.
        * Обязательно проверьте что customerMoney не меньше чем значение поля totalPrice
        * Если денег было передано достаточно, возвращает текущее значение changeAmount
        * Если было передано меньше денег чем в поле totalPrice, возвращает null 
    
    - reset() - метод, сбрасывает поля totalPrice, customerMoney и changeAmount в 0.
*/

function Cashier(name, productsDatabase) {
    // 🔔 не забывайте о this при обращении к свойствам и методам будущего объекта
    this.name = name;
    this.productsDatabase = productsDatabase;
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;
    this.greet = function(name) {
        console.log(`Здравствуйте, вас обслуживает ${this.name} !`);
    }
    this.onSuccess = function() {
        if (this.customerMoney > this.totalPrice) {
            this.changeAmount = this.customerMoney - this.totalPrice;
            console.log(`Спасибо за покупку, ваша сдача [ ${this.changeAmount } (uah)]`)
        } else if (this.changeAmount > 0) {
            console.log(`Спасибо за покупку!`)
        }
    }
    this.onError = function() {
        if (this.customerMoney < this.totalPrice) {
            console.log('Очень жаль, вам не хватает денег на покупки')
        }
    }
    this.countTotalPrice = function(order) {
        console.log(`You've selected the following list of items (pcs):`, order);
        console.log("Your order details:");
        //   ----object - product_name: pcs*price
        this.orderCostPerItem = Object.assign({}, order);
        //   ---- Array - getting names of products in the order
        const productNames = Object.keys(this.orderCostPerItem);
        //   ----- Process each ordered Product: 
        for (productName of productNames) {
            this.totalCostPerItem = 0;
            //  ----- Condition when ordered product is in the productsDatabase:
            if (productsDatabase[productName]) {
                let productQty = order[productName];
                let productItemPrice = productsDatabase[productName]
                console.log("[", productName, "] => [quantity", productQty, "*", productItemPrice, "(uah)]");
                this.totalCostPerItem = (productQty * productItemPrice)
                console.log("total cost for", productName, "is: ", this.totalCostPerItem, "(uah)");
                this.totalPrice += this.totalCostPerItem;
                this.orderCostPerItem[productName] = this.totalCostPerItem;
            }
        }
        console.log("Your order is being prepared. Please, proceed to payment:");
        console.log("Your bill is: ", this.orderCostPerItem)
        console.log("Total amount to be paid: [", this.totalPrice, "(uah)]");
    }

    this.countTotalPrice(order)

    this.getCustomerMoney = function(value) {
        this.customerMoney = Number(value);
        console.log("Received cash: [", this.customerMoney, "(uah)]");
        return this.customerMoney;
    }

    this.getCustomerMoney(300);

    this.countChange = function() {
        this.result = this.customerMoney - this.totalPrice;
        this.onError();
        this.onSuccess();
    }
    this.countChange();
    this.reset = function() {
        this.totalPrice = 0;
        this.customerMoney = 0;
        this.changeAmount = 0;
    }
    this.reset();
}


/* Пример использования */
const mango = new Cashier('Mango', products);
// mango.greet();
// // Проверяем исходные значения полей
// console.log(mango.name); // Mango
// console.log(mango.productsDatabase); // ссылка на базу данных продуктов (объект products)
// console.log(mango.totalPrice); // 0
// console.log(mango.customerMoney); // 0
// console.log(mango.changeAmount); // 0

// // Вызываем метод greet
// // Здравствуйте, вас обслуживает Mango

// // Вызываем метод countTotalPrice для подсчета общей суммы
// // передавая order - список покупок пользователя
// mango.countTotalPrice(order);

// // Проверям что посчитали
// console.log(mango.totalPrice); // 110

// // Вызываем getCustomerMoney для запроса денег покупателя
// mango.getCustomerMoney(300);

// // Проверяем что в поле с деньгами пользователя
// console.log(mango.customerMoney); // 300

// // Вызываем countChange для подсчета сдачи
// const result = mango.countChange();

// // Проверяем что нам вернул countChange
// console.log(result); // 190

// // Проверяем результат подсчета денег
// if (result !== null) {
//     // При успешном обслуживании вызываем метод onSuccess
//     mango.onSuccess(); // Спасибо за покупку, ваша сдача 190
// } else {
//     // При неудачном обслуживании вызываем метод onError   
//     mango.onError(); // Очень жаль, вам не хватает денег на покупки
// }

// // Вызываем reset при любом исходе обслуживания
// mango.reset();

// Проверяем значения полей после reset
console.log("Проверяем значения: [totalPrice] после reset: ", mango.totalPrice); // 0
console.log("Проверяем значения: [customerMoney] после reset: ", mango.customerMoney); // 0
console.log("Проверяем значения: [changeAmount] после reset: ", mango.changeAmount); // 0