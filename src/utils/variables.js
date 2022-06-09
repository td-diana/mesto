//validator
export const settingsValidator = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_invalid",
    errorClass: "popup__input-error_active",
  };
  
  // DOM
  export const popupList = document.querySelectorAll(".popup");
  
  export const profileName = document.querySelector(".profile__name");
  export const profileAboutName = document.querySelector(".profile__about-name");
  
  export const profileButtonEdit = document.querySelector(
    ".profile__button-edit"
  );
  export const profileButtonAdd = document.querySelector(".profile__button-add");
  
  export const popupAdd = document.querySelector(".popup-add");
  export const popupAddForm = popupAdd.querySelector(".popup__form");
  export const popupFieldTitle = popupAdd.querySelector(".popup__field-title");
  export const popupFieldUrl = popupAdd.querySelector(".popup__field-url");
  
  export const popupEdit = document.querySelector(".popup-edit");
  export const popupEditForm = popupEdit.querySelector(".popup__form");
  export const popupFieldName = popupEdit.querySelector(".popup__field-name");
  export const popupFieldAboutName = popupEdit.querySelector(
    ".popup__field-about-name"
  );
  
 // export const cardsContainer = document.querySelector(".elements__list");
  
  //selectors
  export const popupWithImageSelector = ".popup_img";
  export const cardTemplateSelector = ".elements__template";
  export const containerSelector = ".elements__list";
  export const popupAddSelector = ".popup-add";
  export const profileNameSelector = ".profile__name";
  export const profileAboutNameSelector = ".profile__about-name";
  export const popupEditSelector = ".popup-edit";