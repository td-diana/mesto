import { openPopupImg } from '../scripts/utils.js';

export default class Card {

  constructor(cardData, cardSelector) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

      return cardElement;
  }


_likeButton() {  
  this._buttonLike.classList.toggle("elements__icon-like_mod_active");
}
 
  _removeButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
        this._likeButton();
      });

    this._element
      .querySelector(".elements__icon-delete")
      .addEventListener("click", () => {
        this._removeButton();
      });

    this._element
      .querySelector(".elements__img")
      .addEventListener("click", () => {
        openPopupImg(this._cardData);
      });
  }

  generateCard() {        
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector(".elements__img");
    elementImage.src = this._cardData.link;
    elementImage.alt = this._cardData.name;
    this._buttonLike = this._element.querySelector('.elements__icon-like');

    this._element.querySelector(".elements__title").textContent =
      this._cardData.name;
    this._setEventListeners();
    return this._element;
  }
}