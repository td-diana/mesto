const allSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active'
  };
  
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
  
  // отключить кнопку
  const disablePopupButton = (button) => {
    button.classList.add("popup__button_disabled");
    button.disabled = "disabled";
  }
  // состояние кнопки переключения
  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        disablePopupButton(buttonElement);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = "";
    }
  };
  
  // набор слушателей на формы
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
  
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
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
  
  enableValidation(allSettings);
  