export default class Card {  
  constructor( { data, handleCardClick },
    cardTemplateSelector) {
  this._link = data.link;
  this._name = data.name;   
  this._cardTemplateSelector = cardTemplateSelector;
  this._handleCardClick = handleCardClick;
}

_getTemplate() {
  const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content.querySelector(".elements__card")
    .cloneNode(true);

  return cardElement;
}

_handleLikeButton() {
  this._buttonLike.classList.toggle("elements__icon-like_mod_active");
}

_removeButton() {
  this._element.remove();
  this._element = null;
}

_setEventListeners() {
  this._buttonLike.addEventListener("click", () => {
    this._handleLikeButton();
  });

  this._buttonDelete.addEventListener("click", () => {
    this._removeButton();
  });

  this._elementImage.addEventListener('click', () => {
  this._handleCardClick({ name: this._name, src: this._link });    
});  
}

generateCard() {
  this._element = this._getTemplate();  
  this._elementImage = this._element.querySelector(".elements__img"); 
  this._elementImage.src = this._link;
  this._elementImage.alt = this._name;
  this._element.querySelector(".elements__title").textContent = this._name;
  this._buttonLike = this._element.querySelector(".elements__icon-like");
  this._buttonDelete = this._element.querySelector(".elements__icon-delete");
  this._setEventListeners();
  return this._element;
}
}