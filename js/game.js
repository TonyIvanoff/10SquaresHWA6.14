const numDivs = 36;
const maxHits = 10;


let hits = 0;
let firstHitTime = 0;
let currentCellNumber = 0;
let missedClick = 0;

function round() {
  if ($(".target")) {
    $(".target").text("");
    $(".target").removeClass("target");
  }
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  currentCellNumber++;
  $(".target").text(currentCellNumber);
  
  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  
  $(".game-field").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  $(".miss").removeClass("miss");
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".target").text(""); 
  }
  
  else{
    $(event.target).addClass("miss");
    missedClick++;
    hits = hits + 1;
  }
  round();
} 

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
    round();
  });
  

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
