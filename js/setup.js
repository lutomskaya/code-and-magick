'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var setupSimilarList = document.querySelector('.setup-similar-list');

var setupSimilarDialog = document.querySelector('.setup-similar');

var getRandomElement = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateWizards = function () {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var wizards = [];

  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: names[getRandomElement(0, names.length)] + ' ' + surnames[getRandomElement(0, surnames.length)],
      coatColor: coatColors[getRandomElement(0, coatColors.length)],
      eyesColor: eyesColors[getRandomElement(0, eyesColors.length)]
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
