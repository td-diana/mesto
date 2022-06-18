import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')

    this._popupButton = this._form.querySelector('.popup__button')
    this._popupButtonContent = this._popupButton.textContent
  }

  setEventListeners() {
    super.setEventListeners()

    this._form.addEventListener('submit', evt => {
      evt.preventDefault()
      this._handleSubmitCallback()
    })
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action
  }

  renderLoadingWhileDeleting(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = this._popupButtonContent
    }
  }
}