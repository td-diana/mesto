
  
export default class FormValidator {
    constructor( {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    }, formElement) {
      this._formElement = formElement;
      this._inputSelector = inputSelector;
      this._submitButtonSelector = submitButtonSelector;
      this._inactiveButtonClass = inactiveButtonClass;
      this._inputErrorClass = inputErrorClass;
      this._errorClass = errorClass;    
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);  
    }

// показать ошибку ввода
_showInputError(inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
}

// скрыть ошибку ввода
_hideInputError (inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

 // проверка правильности ввода
 _checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage)
  } else {
    this._hideInputError(inputElement)
  };
};

// неверный ввод
_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
};

// состояние кнопки 
_toggleButtonState() {    
  if (this._hasInvalidInput(this._inputList)) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');        
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', 'disabled');      
  }
};

// слушатель на формы и отключение кнопки пустой формы 
_setEventListeners() {  
  this._formElement.addEventListener('submit',() => {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.setAttribute('disabled', 'disabled'); 
});
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
      this._toggleButtonState();
  });
}

// слушатель для валидации
 enableValidation () {    
    this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
  }

/*
  // показать ошибку ввода
  const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };

  
  // скрыть ошибку ввода
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = ''
  };
  
  // проверка правильности ввода
  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings)
    } else {
        hideInputError(formElement, inputElement, settings)
    };
  };
  
  // проверка неверный ввод
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };
  
  // состояние кнопки 
  const disablePopupButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled'); 
  }

  const enablePopupButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  } 
 
  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        disablePopupButton(buttonElement, settings.inactiveButtonClass);        
    } else {
      enablePopupButton(buttonElement, settings.inactiveButtonClass);      
    }
  };

  // набор слушателей на формы
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);    
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
        toggleButtonState(inputList, buttonElement, settings);
    });
  };
 
  // слушатель для валидации
  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        setEventListeners(formElement, settings);
    })
  };
  
  enableValidation(settings);
  */