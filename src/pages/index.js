import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import initialCards from "../utils/initialCards.js";


//import Section from "../components/Section.js";

const profileName = document.querySelector(".profile__name");
const profileAboutName = document.querySelector(".profile__about-name");

const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileButtonAdd = document.querySelector(".profile__button-add");

const popupAdd = document.querySelector(".popup-add");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupFieldTitle = popupAdd.querySelector(".popup__field-title");
const popupFieldUrl = popupAdd.querySelector(".popup__field-url");

const popupEdit = document.querySelector(".popup-edit");
const popupEditForm = popupEdit.querySelector(".popup__form");
const popupFieldName = popupEdit.querySelector(".popup__field-name");
const popupFieldAboutName = popupEdit.querySelector(".popup__field-about-name");

const popupList = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".elements__list");
//const elementsList = document.querySelector(".elements__list");



const createCard = (card) =>  new Card(card, ".elements__template").generateCard();
const renderCards = (cards) =>  cards.forEach((card) => cardsContainer.append(createCard(card)));

renderCards(initialCards);

const settingsValidator = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_active",
};

const validationEdit = new FormValidator(settingsValidator, popupEditForm);
const validationAdd = new FormValidator(settingsValidator, popupAddForm);

validationEdit.enableValidation();
validationAdd.enableValidation();

//закрытие всех попапов
function setlistenerClosePopup() {
  popupList.forEach((item) => {
    item.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__button-close")
      )
        //closePopup(evt.target.closest(".popup"));
        closePopup(item);
    });
  });
}
setlistenerClosePopup();

function closePopup(popupList) {
  popupList.classList.remove("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

function openPopup(popupList) {
  popupList.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

function openPopupEdit() {
  openPopup(popupEdit);
  popupFieldName.value = profileName.textContent;
  popupFieldAboutName.value = profileAboutName.textContent;
}

/*
В качестве второго параметра метода addEventListener следует использовать ранее объявленую функцию. 
Код имеет свойство расширяться и повторно использоваться. Поэтому функцию из второго параметра слушателя следует вынести и декларировать отдельно. А в методе addEventListener только ее вызывать. 
Это позволит:
облегчить читаемость кода,
переиспользовать функцию при необходимости,
удалить обработчик события с элемента при необходимости,
название функции будет давать дополнительную информацию об её назначении.
popupEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = popupFieldName.value;
  profileAboutName.textContent = popupFieldAboutName.value;
  closePopup(popupEdit);
});
*/

const handleEditForm = (evt) => {
  evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAboutName.textContent = popupFieldAboutName.value;
    closePopup(popupEdit);
  };
  
popupEditForm.addEventListener("submit", handleEditForm);

//закрытие попапа нажатием на Esc
function closeEsc(evt) {
  if (evt.key === "Escape") closePopup(document.querySelector(".popup_opened"));
}

function addCard(cardData) {  
  cardsContainer.prepend(createCard(cardData));
}

popupAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: popupFieldTitle.value,
    link: popupFieldUrl.value,
  };
  addCard(cardData);
  popupAddForm.reset();
  closePopup(popupAdd);
});

profileButtonAdd.addEventListener("click", () => openPopup(popupAdd));
profileButtonEdit.addEventListener("click", openPopupEdit);


export { openPopup };