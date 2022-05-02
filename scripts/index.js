const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupProfile = document.querySelector('.popup');
const popupCloseBtn = popupProfile.querySelector('.popup__button-close');
const popupForm = document.querySelector('.popup__form');
const popupFormAdd = document.querySelector('.popup__form_add');
const profileButtonAdd = document.querySelector('.profile__button-add');
const popupProfileAdd = document.querySelector('.popup_add');
const popupCloseBtnAdd = popupProfileAdd.querySelector('.popup__button-close_add');
const popupFieldTitle = document.querySelector('.popup__field-title');
const popupFieldUrl = document.querySelector('.popup__field-url');
const popupFieldName = popupForm.querySelector('.popup__field-name');
const popupFieldAboutName = popupForm.querySelector('.popup__field-about-name');
const profileName = document.querySelector('.profile__name');
const profileAboutName = document.querySelector('.profile__about-name');
const elementsTemplate = document.querySelector('.elements__template').content;
const elementsList = document.querySelector('.elements__list');
const popupImg = document.querySelector('.popup_img');
const popupCloseImg = popupImg.querySelector('.popup__button-close_img');
const popupImages = document.querySelector('.popup__images');
const popupTitleImg = document.querySelector('.popup__title_img');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Архыз'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Челябинская область'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Иваново'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Камчатка'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Холмогорский район'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Байкал'
    }
  ];

  function displayElements(elementsList) {
    const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
    elementsElement.querySelector('.elements__img').src = elementsList.link;
    elementsElement.querySelector('.elements__img').alt = elementsList.alt;
    elementsElement.querySelector('.elements__title').textContent = elementsList.name;
    elementsElement.querySelector('.elements__icon-delete').addEventListener('click', elementRemove); 
    elementsElement.querySelector('.elements__icon-like').addEventListener('click', like); 
    elementsElement.querySelector('.elements__img').addEventListener('click', imgElement); 
    popupCloseImg.addEventListener('click', imgElement);
    displayElement(elementsElement);
  };
  
  initialCards.map(displayElements);


function popupOpen() {
    popupProfile.classList.add('popup_opened');
}

function popupClose() {
    popupProfile.classList.remove('popup_opened');
}

function popupOpenAdd() {
    popupProfileAdd.classList.add('popup_opened');
}

function popupCloseAdd() {
    popupProfileAdd.classList.remove('popup_opened');
}

function popupFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAboutName.textContent = popupFieldAboutName.value;
    popupClose();
  }

function addElement(evt) {
    evt.preventDefault();
    const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
    const elementImage = elementsElement.querySelector('.elements__img');
    elementImage.src = popupFieldUrl.value;
    elementImage.alt = popupFieldTitle.value;
    elementsElement.querySelector('.elements__title').textContent = popupFieldTitle.value;      
    elementsElement.querySelector('.elements__icon-delete').addEventListener('click', elementRemove); 
    elementsElement.querySelector('.elements__icon-like').addEventListener('click', like); 
    elementImage.addEventListener('click', imgElement);
    displayElement(elementsElement); 
    popupCloseAdd();
}

function displayElement(element) {
  elementsList.prepend(element);
};

function elementRemove(evt) {
  evt.target.closest('.elements__element').remove();
}

function like() {
  this.classList.toggle('elements__icon-like_mod_active');
};

function imgElement(evt) {  
  popupImg.classList.toggle('popup_opened');  
  popupImages.src = evt.target.src;
  popupTitleImg.textContent = evt.target.alt;
}

profileButtonEdit.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupFormSubmitHandler);
profileButtonAdd.addEventListener('click', popupOpenAdd);
popupCloseBtnAdd.addEventListener('click', popupCloseAdd);
popupFormAdd.addEventListener('submit', addElement);