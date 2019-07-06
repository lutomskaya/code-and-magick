'use strict';
(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var setupSimilarDialog = document.querySelector('.setup-similar');


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var displayWizards = function (data) {
    var takeNumber = data.length > 4 ? 4 : data.length;
    setupSimilarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      setupSimilarList.appendChild(renderWizard(data[i]));
    }

    setupSimilarDialog.classList.remove('hidden');
  };

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    displayWizards(wizards.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
        }
        return rankDiff;
      }));
  };

  window.wizard.onEyesChange = window.util.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.util.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.onError = function (errorMessage) {
    var block = document.createElement('div');
    block.style.height = 150 + 'px';
    block.style.index = 100;
    block.style.position = 'fixed';
    block.style.color = 'red';
    block.style.fontWeight = 'bold';
    block.style.fontSize = '50px';

    block.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', block);
  };

  window.load(successHandler, window.onError);
})();
