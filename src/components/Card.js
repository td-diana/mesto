export default class Card {
  constructor(
    { data, handleCardClick, handleLikeButton, handleCardDelete },
    cardTemplateSelector,
    api,
    userId
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;

    this._api = api;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;

    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  //_handleLikeButton() {
  // this._buttonLike.classList.toggle("elements__icon-like_mod_active");}

  handleLikeCard() {
    const likeButton = this.__element.querySelector(".elements__icon-like");
    const likeCount = this.__element.querySelector(".elements__like-counter");

    if (!likeButton.classList.contains("elements__icon-like_mod_active")) {
      this._api
        .like(this._id)
        .then((data) => {
          likeButton.classList.add("elements__icon-like_mod_active");
          likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .dislike(this._id)
        .then((data) => {
          likeButton.classList.remove("elements__icon-like_mod_active");
          likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  removeButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleCardDelete();
    });

    this._elementImage.addEventListener("click", () => {
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
    this._element.querySelector(".elements__like-counter").textContent =
      this._likes.length;
    if (!(this._ownerId === this._userId)) {
      this._element.querySelector(".elements__icon-delete").style.display =
        "none";
    }
    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._element
        .querySelector(".elements__icon-like")
        .classList.add("elements__icon-like_mod_active");
    }
    this._setEventListeners();

    return this._element;
  }
}