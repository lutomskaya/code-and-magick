'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_BETWEEN = 50;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);

  var maxTime = getMaxElement(times);

  for (var j = 0; j < names.length; j++) {
    ctx.fillStyle = '#000000';

    ctx.fillText(names[j], CLOUD_X + COLUMN_BETWEEN * j + COLUMN_WIDTH * (j + 1), CLOUD_HEIGHT);
    ctx.fillText(Math.floor(times[j]), CLOUD_X + COLUMN_BETWEEN * j + COLUMN_WIDTH * (j + 1), (CLOUD_HEIGHT - FONT_GAP) - COLUMN_HEIGHT * (times[j] / maxTime) - GAP);

    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.1).toFixed(1) + ')';
    }

    ctx.fillRect(CLOUD_X + COLUMN_BETWEEN * j + COLUMN_WIDTH * (j + 1), (CLOUD_HEIGHT - FONT_GAP) - COLUMN_HEIGHT * (times[j] / maxTime), COLUMN_WIDTH, COLUMN_HEIGHT * (times[j] / maxTime));
  }
};
