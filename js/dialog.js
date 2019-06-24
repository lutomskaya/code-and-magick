'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var dialogHandler = userDialog.querySelector('.upload');
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedElement = null;

  var bounds = {};
  var isBoundsSet = false;
  var userDialogWidth = userDialog.offsetWidth;
  var userDialogHeight = userDialog.offsetHeight;
  var windowWidth = screen.width;
  var windowHeight = screen.height;

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (!isBoundsSet) {
      bounds = {
        minX: 0 + userDialog.scrollLeft,
        maxX: windowWidth - userDialogWidth + userDialog.scrollLeft,
        minY: 0 + userDialog.scrollTop,
        maxY: windowHeight - userDialogHeight + userDialog.scrollTop
      };

      isBoundsSet = true;
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var coordX = moveEvt.clientX;
      var coordY = moveEvt.clientY;

      var shift = {
        x: startCoords.x - coordX,
        y: startCoords.y - coordY
      };

      startCoords = {
        x: coordX,
        y: coordY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

      if (coordX < bounds.minX) {
        userDialog.style.left = bounds.minX + 'px';
      }

      if (coordX > bounds.maxX) {
        userDialog.style.left = bounds.maxX + 'px';
      }

      if (coordY < bounds.minY) {
        userDialog.style.top = bounds.minY + 'px';
      }

      if (coordY > bounds.maxY) {
        userDialog.style.top = bounds.maxY + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  dialogHandler.addEventListener('mousedown', dialogHandler);

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedElement = evt.target;
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.appendChild(draggedElement);
  });
})();
