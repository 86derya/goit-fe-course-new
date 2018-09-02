/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
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

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
    { preview: 'img/photo1_320.jpeg', fullview: 'img/photo1_1280.jpeg', alt: "alt text 1" },
    { preview: 'img/photo2_320.jpeg', fullview: 'img/photo2_1280.jpeg', alt: "alt text 2" },
    { preview: 'img/photo3_320.jpeg', fullview: 'img/photo3_1280.jpeg', alt: "alt text 3" },
    { preview: 'img/photo4_320.jpeg', fullview: 'img/photo4_1280.jpeg', alt: "alt text 4" },
    { preview: 'img/photo5_320.jpeg', fullview: 'img/photo5_1280.jpeg', alt: "alt text 5" },
    { preview: 'img/photo6_320.jpeg', fullview: 'img/photo6_1280.jpeg', alt: "alt text 6" },
];

const imageGallery = document.querySelector(".js-image-gallery");

const fullviewContainer = document.createElement("div");
fullviewContainer.classList.add("fullview");

const fullviewImg = document.createElement("img");
fullviewImg.classList.add("fullview_img");
fullviewImg.setAttribute('src', galleryItems[0].fullview);
fullviewImg.setAttribute('alt', galleryItems[0].alt);
fullviewContainer.appendChild(fullviewImg);

const previewList = document.createElement("ul");
previewList.classList.add("preview_list");
imageGallery.append(fullviewContainer, previewList);

const createPreviewImg = ({ preview, fullview, alt }) => {
    const previewItem = document.createElement("li");
    previewItem.classList.add("preview_item");
    const previewImg = document.createElement("img");
    previewImg.classList.add('preview_image');
    previewImg.setAttribute('src', preview);
    previewImg.setAttribute('data-fullview', fullview);
    previewImg.setAttribute('alt', alt);
    previewItem.appendChild(previewImg);

    return previewItem
}

const createPreviewImages = Arr => {
    const previeImages = Arr.map(image => createPreviewImg(image));
    previewList.append(...previeImages);
}


const handleViewFullImageFromPreview = () => {
    const target = event.target;
    if (target.nodeName === "IMG") {
        fullviewImg.setAttribute('src', target.dataset.fullview);
        fullviewImg.setAttribute('alt', target.alt);
    }
}

const handleArrangePreviewItemHover = () => {
    const target = event.target;
    const targetParent = target.parentNode;
    const targetItemsArray = document.querySelectorAll(".preview_item");
    console.log(targetItemsArray)
    targetItemsArray.forEach(item => item.classList.remove("preview_item--hover"))
    if (target.nodeName === "IMG") {
        targetParent.classList.add("preview_item--hover");
    }
}
previewList.addEventListener('click', handleArrangePreviewItemHover);
previewList.addEventListener('click', handleViewFullImageFromPreview);

createPreviewImages(galleryItems);

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
  чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
  аналогичный заданию выше.
  
  При создании экземпляра конструктор получает:
    - items - список элементов для preview
    - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
    - defaultActiveItem - номер активного элемента preview по умолчанию
    
  Тогда создание экземпляра будет выглядеть следующим образом.
*/

// new Gallery({
//     items: galleryItems,
//     parentNode: document.querySelector('.image-gallery'),
//     defaultActiveItem: 1
// });

/* Далее плагин работает в автономном режиме */