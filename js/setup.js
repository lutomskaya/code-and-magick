'use strict';

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var setupForm = userDialog.querySelector('.setup-wizard-form');
var setupDefaultCoords = {};

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var setupSimilarList = document.querySelector('.setup-similar-list');

var setupSimilarDialog = document.querySelector('.setup-similar');

var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
var inputFireballColor = document.querySelector('input[name="fireball-color"]');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
};

var displayWizards = function (similarWizards) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < 4; j++) {
    var wizard = renderWizard(similarWizards[j]);
    fragment.appendChild(wizard);
  }
  setupSimilarList.appendChild(fragment);
};

var onError = function (errorMessage) {
  var block = document.createElement('div');
  block.style.height = 150 + 'px';
  block.style.index = 100;
  block.style.position = 'fixed';
  block.style.color = 'red';
  block.style.fontWeight = 'bold';
  block.style.fontSize = '50px';

  block.textContent = errorMessage;
  return block;
};

window.load(displayWizards, onError);

// open / close popup
var onPopupEscPress = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE && evt.target !== setupUserName) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupDefaultCoords = {
    x: userDialog.offsetLeft,
    y: userDialog.offsetTop
  };
  setupForm.addEventListener('submit', onSetupSubmit);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  userDialog.style.left = setupDefaultCoords.x + 'px';
  userDialog.style.top = setupDefaultCoords.y + 'px';
  setupForm.removeEventListener('submit', onSetupSubmit);
};

var setupSubmitClose = function () {
  closePopup();
};

var onSetupSubmit = function (evt) {
  evt.preventDefault();
  window.save(new FormData(setupForm), setupSubmitClose, onError);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ENTER_KEYCODE) {
    closePopup();
  }
});

// функция случайного числа
var getArrayRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// изменение цвета по клику
var onWizardCoatClick = function () {
  var getRandomColor = getArrayRandomValue(window.util.COAT_COLORS);
  setupWizardCoat.style.fill = getRandomColor;
  inputCoatColor.value = getRandomColor;
};

var onWizardEyesClick = function () {
  var getRandomColor = getArrayRandomValue(window.util.EYES_COLORS);
  setupWizardEyes.style.fill = getRandomColor;
  inputEyesColor.value = getRandomColor;
};

var onWizardFireballClick = function () {
  var getRandomColor = getArrayRandomValue(window.util.FIREBALL_COLORS);
  setupWizardFireball.style.background = getRandomColor;
  inputFireballColor.value = getRandomColor;
};

setupWizardCoat.addEventListener('click', onWizardCoatClick);
setupWizardEyes.addEventListener('click', onWizardEyesClick);
setupWizardFireball.addEventListener('click', onWizardFireballClick);

setupSimilarDialog.classList.remove('hidden');
