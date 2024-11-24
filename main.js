// 랜덤번호 지정
// 유저가 번호 입력후 Go버튼 클릭
// 유저번호 < 랜덤번호 'UP'
// 유저번호 > 랜덤번호 'DOWN'
// Reset버튼 클릭시 리셋
// 5번의 기회를 다 쓰면 게임이 끝난다. (더 이상 추측불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

let computer = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("userInput");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let chances = 5;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function random() {
  computer = Math.floor(Math.random() * 100) + 1;
  console.log(computer);
}

function play() {
  const userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    alert("1과 100사이의 숫자만 입력해주세요");
    return;
  }

  if (history.includes(userValue)) {
    alert("이미 입력한 숫자입니다.");
    return;
  }

  let imgElement = document.createElement("img");
  imgElement.style.width = "300px";
  imgElement.style.height = "200px";

  chances--;
  chanceArea.textContent = `남은 기회: ${chances}`;
  console.log(chances);
  if (userValue < computer) {
    imgElement.src = "images/up.gif";
    resultArea.innerHTML = "";
    resultArea.appendChild(imgElement);
  } else if (userValue > computer) {
    imgElement.src = "images/down.gif";
    resultArea.innerHTML = "";
    resultArea.appendChild(imgElement);
  } else {
    imgElement.src = "images/answer.gif";
    resultArea.innerHTML = "";
    resultArea.appendChild(imgElement);
  }

  history.push(userValue);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver === true) {
    playButton.disabled = true;
  }
}

function reset() {
  userInput.value = "";

  let imgElement = document.createElement("img");
  imgElement.src = "images/basics.gif";

  resultArea.innerHTML = "";
  resultArea.appendChild(imgElement);

  random();
}

random();
