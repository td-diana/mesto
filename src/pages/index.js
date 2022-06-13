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
  popupFieldName,
  popupFieldAboutName
} from "../utils/variables.js";


const profileForm = () => {
  const userData = userInfo.getUserInfo();
  popupFieldName.value = userData.name;
  popupFieldAboutName.value = userData.aboutname;
};

const validationEdit = new FormValidator(settingsValidator, popupEditForm);
const validationAdd = new FormValidator(settingsValidator, popupAddForm);

validationEdit.enableValidation();
validationAdd.enableValidation();

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const editPopupAdd = data => {  
  const item = {
    name: data.title,
    link: data.link,
  };
  cardsList.addItem(item);
  popupAdd.close();
}

const popupAdd = new PopupWithForm(
  popupAddSelector,
  editPopupAdd
  );

popupAdd.setEventListeners();

const userInfo = new UserInfo(profileNameSelector, profileAboutNameSelector);

const editPopupEdit = data => {
  userInfo.setUserInfo(data);
  popupEdit.close();
}

const popupEdit = new PopupWithForm(
  popupEditSelector,
  editPopupEdit
  ); 

popupEdit.setEventListeners();

// -----------------------------------------создание новой карточки
const createCard = (data) => new Card(data, cardTemplateSelector, () => popupWithImage.open(data)).generateCard();


// ----------------------------------------- отрисовка элементов
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => createCard(cardItem),    
  },
  containerSelector
);
cardsList.addItems();

profileButtonAdd.addEventListener("click", () => {  
  popupAdd.open();
});

profileButtonEdit.addEventListener("click", () => {  
  profileForm();
  popupEdit.open();
});
