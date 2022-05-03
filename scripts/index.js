const profileButtonEdit = document.querySelector(".profile__button-edit");
const popupGlobal = document.querySelector(".popup");
const popupCloseBtnEdit = popupGlobal.querySelector(".popup__button-close");
const popupFormEdit = document.querySelector(".popup__form");
const popupFormAdd = document.querySelector(".popup__form_add");
const profileButtonAdd = document.querySelector(".profile__button-add");
const popupProfileAdd = document.querySelector(".popup_add");
const popupCloseBtnAdd = popupProfileAdd.querySelector(
  ".popup__button-close_add"
);
const popupFieldTitle = document.querySelector(".popup__field-title");
const popupFieldUrl = document.querySelector(".popup__field-url");
const popupFieldName = document.querySelector(".popup__field-name");
const popupFieldAboutName = document.querySelector(".popup__field-about-name");
const profileName = document.querySelector(".profile__name");
const profileAboutName = document.querySelector(".profile__about-name");
const elementsTemplate = document.querySelector(".elements__template").content;
const elementsList = document.querySelector(".elements__list");
const popupImg = document.querySelector(".popup_img");
const popupCloseImg = popupImg.querySelector(".popup__button-close_img");
const popupImages = document.querySelector(".popup__images");
const popupTitleImg = document.querySelector(".popup__title-img");

function createCard(image, title) {
  const elementsElement = elementsTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const elementImage = elementsElement.querySelector(".elements__img");
  const elementsTitle = elementsElement.querySelector(".elements__title");
  elementImage.src = image;
  elementImage.alt = title;
  elementsTitle.textContent = title;
  elementsElement
    .querySelector(".elements__icon-delete")
    .addEventListener("click", elementRemove);
  elementsElement
    .querySelector(".elements__icon-like")
    .addEventListener("click", like);

  elementImage.addEventListener("click", imgElement);
  popupCloseImg.addEventListener("click", imgElement);

  function elementRemove(evt) {
    evt.target.closest(".elements__element").remove();
  }

  function like() {
    this.classList.toggle("elements__icon-like_mod_active");
  }

  function imgElement(evt) {
    openPopup(popupImg);
    popupImages.src = evt.target.src;
    popupTitleImg.textContent = evt.target.alt;
  }

  popupCloseImg.addEventListener("click", () => closePopup(popupImg));
  return elementsElement;
}

function renderCard(element) {
  elementsList.prepend(element);
}

initialCards.forEach(function (element) {
  const title = element.name;
  const image = element.link;
  renderCard(createCard(image, title));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopupEdit() {
  openPopup(popupGlobal);
}

function closePopupEdit() {
  closePopup(popupGlobal);
}

function openPopupAdd() {
  openPopup(popupProfileAdd);
}

function closePopupAdd() {
  closePopup(popupProfileAdd);
}

function popupEditFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupFieldName.value;
  profileAboutName.textContent = popupFieldAboutName.value;
  closePopupEdit();
  popupFieldName.value = "";
  popupFieldAboutName.value = "";
}

function popupAddFormSubmitHandler(evt) {
  evt.preventDefault();
  const image = popupFieldUrl.value;
  const title = popupFieldTitle.value;
  renderCard(createCard(image, title));
  closePopupAdd();
  popupFieldUrl.value = "";
  popupFieldTitle.value = "";
}

profileButtonEdit.addEventListener("click", openPopupEdit);
popupCloseBtnEdit.addEventListener("click", closePopupEdit);
popupFormEdit.addEventListener("submit", popupEditFormSubmitHandler);
profileButtonAdd.addEventListener("click", openPopupAdd);
popupCloseBtnAdd.addEventListener("click", closePopupAdd);
popupFormAdd.addEventListener("submit", popupAddFormSubmitHandler);
