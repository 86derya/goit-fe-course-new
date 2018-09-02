// 1. Модифицируйте готовую функцию createPostCard() из задания 
//     номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
//     чтобы она принимала объект post с данными для заполнения полей 
//     в карточке.

//   2. Создайте функцию createCards(posts), которая принимает массив
//     объектов-карточек, вызывает функцию createPostCard(post) столько
//     раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
//     массив DOM-элементов всех постов.

//   3. Повесьте все посты в какой-то уже существующий DOM-узел.
// */


const posts = [{
        img: "https://placeimg.com/400/150/arch",
        title: "Post title 1",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
        link: 'link-1.com'
    },
    {
        img: "https://placeimg.com/400/150/nature",
        title: "Post title 2",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
        link: 'link-2.com'
    },
    {
        img: "https://placeimg.com/400/150/arch",
        title: "Post title 3",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
        link: 'link-3.com'
    }
];



const body = document.querySelector("body");
const postCardsContainer = document.createElement("div");
body.append(postCardsContainer);
// __________________________________________________________________________________________



const createPostCard = ({ img, title, text, link }) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post");

    const postImage = document.createElement("img");
    postImage.classList.add('post__image');
    postImage.setAttribute('src', img);
    postImage.setAttribute('alt', 'post image');


    const postTitle = document.createElement("h2");
    postTitle.classList.add("post__title");
    postTitle.innerText = title;

    const postText = document.createElement("p");
    postText.classList.add("post__text");
    postText.innerText = text;

    const postButton = document.createElement("a");
    postButton.classList.add("button");
    postButton.innerText = link;
    postButton.setAttribute('href', '#')

    postCard.append(postImage, postTitle, postText, postButton);
    return postCard;
}


const createPostCards = Arr => {
    const postCards = Arr.map(post => createPostCard(post));

    postCardsContainer.append(...postCards)
    return postCards
};

createPostCards(posts);