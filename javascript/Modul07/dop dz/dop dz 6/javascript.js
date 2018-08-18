/*
  Создайте функцию createPostCard(), которая 
  создает и возвращает DOM-узел карточки поста.
  
  Разметка с классами есть на вкладке HTML.
  Стили на вкладке CSS.
  
  Используйте createElement для создания узлов.
  Добавьте классы и атрибуты.
*/
// {/* <div class="post">
//     <img class="post__image" src="http://via.placeholder.com/400x150" alt="post image">
//     <h2 class="post__title">Lorem ipsum dolor</h2>
//     <p class="post__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!</p>

//     <a class="button" href="#">Read more</a>
// </div> */}

// const body = document.createElement("body");
const body = document.querySelector("body");
const postCard = document.createElement("div");
body.append(postCard)
    // __________________________________________________________________________________________



const createPostCard = () => {
    const postCard = document.createElement("div");
    postCard.classList.add("post");
    body.prepend(postCard);

    const image = document.createElement("img");
    image.classList.add('post__image');
    image.setAttribute('src', 'http://via.placeholder.com/400x150');
    image.setAttribute('alt', 'post image');


    const title = document.createElement("h2");
    title.classList.add("post__title");
    title.innerText = "Lorem ipsum dolor";

    const text = document.createElement("p");
    text.classList.add("post__text");
    text.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!";

    const button = document.createElement("a");
    button.classList.add("button");
    button.innerText = "Read more";
    button.setAttribute('href', '#')

    postCard.append(image, title, text, button);
    return postCard;
}

createPostCard();