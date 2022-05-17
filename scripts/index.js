//1. Валидация формы «Редактировать профиль»
//Валидируйте форму «Редактировать профиль» заготовьте элементы ошибок по макету в «Фигме»
//Если поле формы «Редактировать профиль» не прошло валидацию, под ним должен появляться красный текст ошибки.
//Настройки валидации такие:
//оба поля обязательные;
//в поле «Имя» должно быть от 2 до 40 символов;
//в поле «О себе» должно быть от 2 до 200 символов;
//Используйте стандартные браузерные тексты ошибок.
//Если хотя бы одно из полей не прошло валидацию, кнопка «Сохранить» должна быть неактивной. Если оба поля прошли — активной. Цвета неактивных кнопок возьмите из макета.

//2. Валидация формы «Новое место»
//Валидируйте форму добавления места. Задание аналогично предыдущему, но есть отличия:
//Не нужна проверка длины текста у поля ссылки.
//Нужна проверка того, что ввели именно ссылку.
//Настройки валидации такие:
//оба поля обязательные,
//в поле «Название» должно быть от 2 до 30 символов,
//в поле «Ссылка на картинку» должен быть URL.
//И снова используйте стандартные браузерные тексты ошибок.
//Если хотя бы одно из полей не прошло валидацию, кнопка «Сохранить» должна быть неактивной. Если оба поля прошли — активной. Цвета неактивных кнопок те же.

//3. Закрытие попапа кликом на оверлей

//4. Закрытие попапа нажатием на Esc

//Все кнопки на закрытие работают через один class="popup__button-close", все окна закрываются через overlay




const profileName = document.querySelector(".profile__name");
const profileAboutName = document.querySelector(".profile__about-name");

const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileButtonAdd = document.querySelector(".profile__button-add");

const popupAdd = document.querySelector(".popup-add");
const popupAddForm = popupAdd.querySelector('.form');

const popupEdit = document.querySelector('.popup-edit');
const popupEditForm = popupEdit.querySelector('.form');

const popupGlobal = document.querySelectorAll(".popup");

const popupFieldTitle = document.querySelector(".popup__field-title");
const popupFieldUrl = document.querySelector(".popup__field-url");
const popupFieldName = document.querySelector(".popup__field-name");
const popupFieldAboutName = document.querySelector(".popup__field-about-name");

const popupImg = document.querySelector(".popup_img");


function createCard(cardData) {
  const elementsTemplate = document.querySelector(".elements__template").content;
  const elementsElement = elementsTemplate.querySelector(".elements__element").cloneNode(true);  
  const elementImage = elementsElement.querySelector(".elements__img");
  const elementsTitle = elementsElement.querySelector(".elements__title");
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;  
  elementsTitle.textContent = cardData.name;
  elementsElement.querySelector(".elements__icon-like").addEventListener("click", likeButton);
  elementsElement.querySelector(".elements__icon-delete").addEventListener("click", removeButton); 

  function removeButton(evt) {evt.target.closest(".elements__element").remove();}
  function likeButton(evt) {evt.target.classList.toggle("elements__icon-like_mod_active");}

  elementImage.addEventListener("click", () => imgElement(cardData));   
  
  return elementsElement;
}

//popup картнки
function imgElement(cardData) {
  const popupImages = document.querySelector(".popup__images");
  const popupTitleImg = document.querySelector(".popup__title-img");    
  popupImages.src = cardData.link;
  popupImages.alt = cardData.name;
  popupTitleImg.textContent = cardData.name;
  openPopup(popupImg);
}

function renderCard(cardData) {
  const elementsList = document.querySelector(".elements__list");
  elementsList.prepend(createCard(cardData));
}

//дефолтные карточки
initialCards.forEach(cardData => {
  renderCard(cardData);
});

//закрытие всех попапов
function setlistenerClosePopup() {
  popupGlobal.forEach(item => {
    item.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close'))
      closePopup(evt.target.closest('.popup'));
    })
  })
}
setlistenerClosePopup();

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openPopupEdit() {
  openPopup(popupEdit);
  popupFieldName.value = profileName.textContent;
  popupFieldAboutName.value = profileAboutName.textContent;
}

function openPopupAdd() {
  openPopup(popupAdd);  
}

//редактирования профиля
popupEditForm.addEventListener("submit", evt => {
  evt.preventDefault();
  profileName.textContent = popupFieldName.value;
  profileAboutName.textContent = popupFieldAboutName.value;
  closePopup(popupEdit);  
});

//добавления карточки
popupAddForm.addEventListener("submit", evt => {
  evt.preventDefault();
  const cardData = {
    name: popupFieldTitle.value,
    link: popupFieldUrl.value,
  }; 
  popupAddForm.reset(); 
  renderCard(cardData);  
  closePopup(popupAdd);  
});

profileButtonEdit.addEventListener("click", openPopupEdit);
profileButtonAdd.addEventListener("click", openPopupAdd);