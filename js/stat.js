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

function renderText(ctx, x, y, text) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
}

function renderSingleBar(ctx, index, name, time, max) {
  var coordinateX = CLOUD_X + COLUMN_BETWEEN * index + COLUMN_WIDTH * (index + 1);
  var columnHeight = COLUMN_HEIGHT * (time / max);
  var coordinateY = (CLOUD_HEIGHT - FONT_GAP) - columnHeight;

  ctx.fillStyle = '#000000';

  ctx.fillText(name, coordinateX, CLOUD_HEIGHT);
  ctx.fillText(Math.floor(time), coordinateX, coordinateY - GAP);

  ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + (Math.random() + 0.1).toFixed(1) + ')';

  ctx.fillRect(coordinateX, coordinateY, COLUMN_WIDTH, columnHeight);
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  renderText(ctx, CLOUD_X + GAP + FONT_GAP, CLOUD_Y + GAP + FONT_GAP, 'Ура вы победили!');
  renderText(ctx, CLOUD_X + GAP + FONT_GAP, CLOUD_Y + GAP + FONT_GAP * 2, 'Список результатов:');

  for (var j = 0; j < names.length; j++) {
    renderSingleBar(ctx, j, names[j], times[j], maxTime);
  }
};
