import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

import initialCards from "../utils/initialCards.js";

import {
  settingsValidator,
  profileButtonEdit,
  profileButtonAdd,
  popupAddForm,
  popupEditForm,
  popupFieldName,
  popupFieldAboutName,
  avatarEditButton,
  popupAvatarForm,
  popupWithImageSelector,
  cardTemplateSelector,
  containerSelector,
  popupAddSelector,
  popupEditSelector,
  profileINameSelector,
  profileInfoSelector,
  profileAvatarSelector,
  popupDeleteConfirmSelector,
  popupAvatarEditSelector,
} from "../utils/variables.js";

let userId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "cd3dfc8b-e143-41af-a84b-cea0d68401cf",
    "Content-Type": "application/json",
  },
});

const validationEdit = new FormValidator(settingsValidator, popupEditForm);
const validationAdd = new FormValidator(settingsValidator, popupAddForm);
const validationAvatar = new FormValidator(settingsValidator, popupAvatarForm);

validationEdit.enableValidation();
validationAdd.enableValidation();
validationAvatar.enableValidation();

const userInfo = new UserInfo({
  name: profileINameSelector,
  info: profileInfoSelector,
  avatar: profileAvatarSelector,
});

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const confirmDeletePopup = new PopupWithConfirm(popupDeleteConfirmSelector);
confirmDeletePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => popupWithImage.open(data),
      handleLikeButton: () => card.handleLikeCard(),
      handleCardDelete: () => {
        confirmDeletePopup.setSubmitAction(() => {
          confirmDeletePopup.renderLoadingWhileDeleting(true);
          api
            .delete(data._id)
            .then(() => {
              card.removeButton();
              confirmDeletePopup.close();
            })
            .catch((err) => console.log(err))
            .finally(() =>
              confirmDeletePopup.renderLoadingWhileDeleting(false)
            );
        });
        confirmDeletePopup.open();
      },
    },
    cardTemplateSelector,
    api,
    userId
  );
  return card;
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  containerSelector
);

//cardsList.addItems();

const popupAdd = new PopupWithForm(popupAddSelector, (formValues) => {
  //  const card = createCard(formValues);
  //  const cardElement = card.generateCard();
  //  cardsList.addItem(cardElement)
  api
    .addUserCard(formValues)
    .then((data) => {
      const card = createCard(data);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
      validationAdd.disablePopupButton();
      popupAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAdd.renderLoading(true));
});
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(popupEditSelector, (formValues) => {
  popupEdit.renderLoading(true);
  api
    .setUserInfoApi(formValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEdit.renderLoading(false));
});
popupEdit.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarEditSelector, (formValues) => {
  popupAvatar.renderLoading(true);
  api
    .handleUserAvatar(formValues)
    .then((data) => {
      userInfo.setUserAvatar(data);
      validationAvatar.disablePopupButton();
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatar.renderLoading(false));
});
popupAvatar.setEventListeners();

api
  .getAllNeededData()
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.addItems(cards);
  })
  .catch((err) => console.log(err));

profileButtonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupFieldName.value = userData.name;
  popupFieldAboutName.value = userData.info;
  validationEdit.disablePopupButton();
  validationEdit.removeErrors();
  popupEdit.open();
});

profileButtonAdd.addEventListener("click", () => {
  validationAdd.removeErrors();
  popupAdd.renderLoading(false);
  popupAdd.open();
});

avatarEditButton.addEventListener("click", () => {
  validationAvatar.removeErrors();
  popupAvatar.open();
});
