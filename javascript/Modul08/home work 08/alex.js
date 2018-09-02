'use strict';


const galleryItems = [{
        preview: 'img/smal1.jpeg',
        fullview: 'img/nature1.jpeg',
        alt: "alt text 1"
    },
    {
        preview: 'img/smal2.jpeg',
        fullview: 'img/nature2.jpeg',
        alt: "alt text 2"
    },
    {
        preview: 'img/smal3.jpg',
        fullview: 'img/nature3.jpg',
        alt: "alt text 3"
    },
    {
        preview: 'img/smal4.jpeg',
        fullview: 'img/nature4.jpeg',
        alt: "alt text 4"
    },
    {
        preview: 'img/smal5.jpg',
        fullview: 'img/nature5.jpg',
        alt: "alt text 5"
    },
    {
        preview: 'img/smal6.jpeg',
        fullview: 'img/nature6.jpeg',
        alt: "alt text 6"
    },
    {
        preview: 'img/smal3.jpg',
        fullview: 'img/nature3.jpg',
        alt: "alt text 3"
    },

];
/*
🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
Реализуйте функционал:
  
  - image-gallery есть изначально в HTML-разметке как контейнер для компонента.

  - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
    создается динамически при загрузке страницы.

  - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
    он содержит ссылку на большое изображение. preview и его элементы, также создаются 
    динамически, при загрузке страницы.
    
  - При клике в элемент preview, необходимо подменить src тега img внутри fullview
    на url из data-атрибута выбраного элемента.
    
  - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
    
  - Изображений может быть произвольное количество.
  
  - Используйте делегирование для элементов preview.
  
  - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
  
  - CSS-оформление и имена классов на свой вкус.
  
  
🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
  размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
  Подберите изображения одинаковых пропорций.
*/


const imageGallery = document.querySelector('.image-gallery');
console.log(imageGallery);




const createItem = ({

    preview,
    fullview,
    alt,
}) => {






    const markup = createNoteMarkup();
    list.insertAdjacentHTML('afterbegin', markup);

    function createNoteMarkup() {
        return `
      
      <li><img src="${preview}" data-fullview="${fullview}" alt= "${alt}"</li>`;
    }
};

const fullView = document.createElement('div');
imageGallery.appendChild(fullView);
//console.log(fullView);

const imgFullView = document.createElement('img');
fullView.appendChild(imgFullView);

imgFullView.classList.add('bigSize');
console.log(imgFullView);

const list = document.createElement('ul');
imageGallery.appendChild(list);
list.classList.add('preview');

fullView.classList.add('fullView');
const createPictures = (galleryItems) => {
    const elements = galleryItems.map(x => createItem(x))
    return elements;
};

const pictures = createPictures(galleryItems);
const items = document.querySelectorAll('li');
const images = list.querySelectorAll('img');
const arrImg = [...images];


const imageAddClass = () => arrImg.map(x => {
    x.classList.add('smallSize');



});
imageAddClass();

const atrFirstImg = arrImg[0].getAttribute("data-fullview");

imgFullView.setAttribute("src", `${atrFirstImg}`);





list.addEventListener('click', handlImageClick);

function handlImageClick(evt) {
    const target = evt.target;

    const nodeName = target.nodeName;
    if (nodeName === 'IMG') {
        const atribute = target.getAttribute("data-fullview");
        imgFullView.setAttribute("src", `${atribute}`);
    }

};

list.addEventListener('click', handleAddClassHover)

function handleAddClassHover(evt) {
    const target = evt.target;
    arrImg.forEach(x => x.classList.remove('hover'));
    const nodeName = target.nodeName;

    if (nodeName === 'IMG') {
        target.classList.add('hover')
    }
    return;

};