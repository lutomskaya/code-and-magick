'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');

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

// open / close popup
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// функция случайного числа
var getArrayRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// изменение цвета по клику
var onWizardCoatClick = function () {
  var getRandomColor = getArrayRandomValue(COAT_COLORS);
  setupWizardCoat.style.fill = getRandomColor;
  inputCoatColor.value = getRandomColor;
};

var onWizardEyesClick = function () {
  var getRandomColor = getArrayRandomValue(EYES_COLORS);
  setupWizardEyes.style.fill = getRandomColor;
  inputEyesColor.value = getRandomColor;
};

var onWizardFireballClick = function () {
  var getRandomColor = getArrayRandomValue(FIREBALL_COLORS);
  setupWizardFireball.style.background = getRandomColor;
  inputFireballColor.value = getRandomColor;
};

setupWizardCoat.addEventListener('click', onWizardCoatClick);
setupWizardEyes.addEventListener('click', onWizardEyesClick);
setupWizardFireball.addEventListener('click', onWizardFireballClick);

// создание массива волшебников
var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: getArrayRandomValue(NAMES) + ' ' + getArrayRandomValue(SURNAMES),
      coatColor: getArrayRandomValue(COAT_COLORS),
      eyesColor: getArrayRandomValue(EYES_COLORS)
    });
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

var wizards = generateWizards();

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

setupSimilarList.appendChild(fragment);

setupSimilarDialog.classList.remove('hidden');
