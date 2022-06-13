import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitEvtHandler = this._submitEvtHandler.bind(this);    
  }

  _getInputValues() {
    this._formValues = {};    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();    
  }

setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', this._submitEvtHandler);    
}

_submitEvtHandler(evt) {
  evt.preventDefault();
  this._handleFormSubmit(this._getInputValues());
}
}