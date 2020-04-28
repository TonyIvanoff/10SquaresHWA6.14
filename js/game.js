const numDivs = 36;
const maxHits = 10;


let hits = 0;
let firstHitTime = 0;
let currentCellNumber = 0;

function round() {
  
  // FIXME: надо бы убрать "target" прежде чем искать новый---Done
  $(".target").removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  currentCellNumber++;
  $(".target").text(currentCellNumber);
  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала -- DONE
  $(".game-field").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? -- Done
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".target").text("");
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
