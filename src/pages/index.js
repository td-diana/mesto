import './index.css'; 
import initialCards from "../utils/initialCards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

import {
  settingsValidator,  
  profileButtonEdit,
  profileButtonAdd,  
  popupAddForm,    
  popupEditForm,      
  cardTemplateSelector,
  containerSelector,
  popupWithImageSelector,
  popupAddSelector,
  popupEditSelector,
  profileNameSelector,
  profileAboutNameSelector,
} from "../utils/variables.js";

const validationEdit = new FormValidator(settingsValidator, popupEditForm);
const validationAdd = new FormValidator(settingsValidator, popupAddForm);

validationEdit.enableValidation();
validationAdd.enableValidation();

// ----------------------------- всплывающее окно с изображением (изображение, название, подпись к картинке)

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();


// ----------------------------------------- отрисовка элементов
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => createCard(cardItem),
  },
  containerSelector
);

// --------------------------------------- управление отображением информации о пользователе
const userInfo = new UserInfo(profileNameSelector, profileAboutNameSelector);


// -----------------------------------------создание нового элемента

const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, () =>
    popupWithImage.open(data)
  );
  return card.generateCard();
};

cardsList.addItems();

// ------------------------------------ попап добавления нового элемента
const popupAdd = new PopupWithForm(popupAddSelector, (data) => {
  const { title: name, link } = data;
  cardsList.addItem({ name, link });
});

popupAdd.setEventListeners();

profileButtonAdd.addEventListener("click", () => {
  popupAdd.open();
});

//------------------------------------- попап редактирования профиля
const popupEdit = new PopupWithForm(
  popupEditSelector,
  ({ name, aboutname }) => {
    userInfo.setUserInfo({ name, aboutname });
  });

popupEdit.setEventListeners();

profileButtonEdit.addEventListener("click", () => {
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
});