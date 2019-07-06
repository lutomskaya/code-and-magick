'use strict';
(function () {
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

  var wizardElement = document.querySelector('.setup-wizard');
  var setupWizardCoat = wizardElement.querySelector('.wizard-coat');
  var setupWizardEyes = wizardElement.querySelector('.wizard-eyes');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var getArrayRandomValue = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  var onWizardCoatClick = function () {
    var getRandomColor = getArrayRandomValue(COAT_COLORS);
    setupWizardCoat.style.fill = getRandomColor;
    wizard.onCoatChange(getRandomColor);
  };

  var onWizardEyesClick = function () {
    var getRandomColor = getArrayRandomValue(EYES_COLORS);
    setupWizardEyes.style.fill = getRandomColor;
    wizard.onEyesChange(getRandomColor);
  };

  var onWizardFireballClick = function () {
    var getRandomColor = getArrayRandomValue(FIREBALL_COLORS);
    setupWizardFireball.style.background = getRandomColor;
    inputFireballColor.value = getRandomColor;
  };

  setupWizardCoat.addEventListener('click', onWizardCoatClick);
  setupWizardEyes.addEventListener('click', onWizardEyesClick);
  setupWizardFireball.addEventListener('click', onWizardFireballClick);

  window.wizard = wizard;
  return window.wizard;
})();
