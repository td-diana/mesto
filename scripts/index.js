import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import initialCards from "./initialCards.js";

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

const popup = document.querySelectorAll(".popup");
const elementsList = document.querySelector(".elements__list");

const createCard = (card) =>
  new Card(card, ".elements__template").generateCard();
const renderCards = (cards) =>
  cards.forEach((card) => elementsList.append(createCard(card)));

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
  popup.forEach((item) => {
    item.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__button-close")
      )
        closePopup(evt.target.closest(".popup"));
    });
  });
}
setlistenerClosePopup();

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

function openPopupEdit() {
  openPopup(popupEdit);
  popupFieldName.value = profileName.textContent;
  popupFieldAboutName.value = profileAboutName.textContent;
}

//редактирования профиля
popupEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = popupFieldName.value;
  profileAboutName.textContent = popupFieldAboutName.value;
  closePopup(popupEdit);
});

//закрытие попапа нажатием на Esc
function closeEsc(evt) {
  if (evt.key === "Escape") closePopup(document.querySelector(".popup_opened"));
}

function addCard(cardData) {
  const elementsList = document.querySelector(".elements__list");
  elementsList.prepend(createCard(cardData));
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
