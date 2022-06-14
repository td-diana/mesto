
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
  popupFieldName,
  popupFieldAboutName, 
  popupWithImageSelector,
  cardTemplateSelector,
  containerSelector,
  popupAddSelector,
  popupEditSelector,
  profileNameSelector,
  profileAboutNameSelector,
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

const popupAdd = new PopupWithForm(popupAddSelector, formValues => {
  const card = createCard(formValues);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement)
  popupAdd.close();
});
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

const createCard = (data) => {
  const card = new Card( {
    data: data, 
    handleCardClick: () => {
    popupWithImage.open(data)
    }
  }, cardTemplateSelector)
  return card
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const card = createCard(item);
      const cardElement = card.generateCard(); 
      cardsList.addItem(cardElement)
  }
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