
let imgFolder = [];
let openImage = [];
let matched = [];
const MAX_DINO_IMAGES = 16;
let playCell = document.querySelectorAll(".col");
let playCellArr = Array.from(playCell);
let modalElement = document.getElementById("dinoModal");
let counter = document.getElementById("moveCounter").innerHTML;
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
let interval;


let dino_deck = [];
let div_avatars = document.querySelectorAll(".dino");
let arr_dino_avatars = Array.from(div_avatars);

//creating a modal
//document.getElementById("dinoModal").classList.add("show-modal");TODO MODAL doesn't show!

//creating your Dino Playing Deck and makeing
function createDinoDeck() {
  for (let avatar of arr_dino_avatars) {
    avatar.addEventListener("click", function () {
      let avatar_style = window.getComputedStyle(avatar);
      let avatar_src_value = avatar_style.getPropertyValue('background-image');
      let avatar_src_path = avatar_src_value.slice(5, (avatar_src_value.length - 2));
      let avatar_path = new URL(avatar_src_path).pathname;
      avatar.classList.add("chosen_dino");
      avatar.classList.add("noClick");

      dino_deck.push(avatar_path);
      if (dino_deck.length === 8) {
        let dino_deck_clone = [...dino_deck];
        let dino_deck_final = dino_deck_clone.concat(dino_deck);
        console.log(dino_deck_final);
        imgFolder = imgFolder.concat(dino_deck_final);
        console.log(imgFolder);
        arr_dino_avatars.forEach((avatar) => {
          avatar.classList.add("noClick");
        });

        alert("You have chosen your Dinosaurs!");

      }
    })
  }
}

function cleanStart() {
  console.log(imgFolder);
  if (imgFolder.length === 0) {
    alert("You need to choose your dinosaurs first!");
    return;
  }
  for (let i = imgFolder.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let value = imgFolder[i];
    imgFolder[i] = imgFolder[j];
    imgFolder[j] = value;
  }
  for (let i = 0; i < MAX_DINO_IMAGES; i++) {
    let image = document.createElement('img');
    image.src = imgFolder[i];
    image.classList.add("dino_in_play");
    if (imgFolder[i] === 'img/dinogreen4.png' || imgFolder[i] === 'img/dinobrown2.png') {
      image.classList.add("dinoCentre");
    }
    document.getElementById("playCell" + i).appendChild(image)
  }

  function displayImage() {
    this.children[0].classList.toggle("show-img");
    open(this);
  }

  for (let cell of playCellArr) {
    cell.addEventListener("click", displayImage);
  }
}


function open(cell) {
  openImage.push(cell);
  let val = openImage.length;
  if (val === 2) {
    moveCounter();
    if (openImage[0].firstChild.getAttribute("src") === openImage[1].firstChild.getAttribute("src")) {
      goodGuess();
    } else {
      badGuess();
    }
  }
}

function endGame() {
  clearInterval(interval);
  document.getElementById("header").scrollIntoView();
  alert("Oke, let's have a rematch!");
  arr_dino_avatars.forEach((avatar) => {
    avatar.classList.remove("noClick");
    avatar.classList.remove("chosen_dino");
  });
  playCellArr.forEach((element) => {
    element.classList.remove("match");
    element.firstElementChild.classList.remove("show-img");
    element.removeChild(element.firstChild);
  });
  dino_deck = [];
  imgFolder = [];
  matched = [];
  openImage = [];
  playCellArr = [];
  //modalElement.classList.add("show-modal");
}

function moveCounter() {//TODO counter doesn't show!
  counter++;
  console.log(counter);
}

/*
function closeModal() {
  closeModalIcon.addEventListener("click", function() {
    modalElement.classList.remove("show-modal");
    startGame();
  })
}
*/
function goodGuess() {
  openImage[0].classList.add("match");
  openImage[1].classList.add("match");
  matched.push(openImage[0]);
  matched.push(openImage[1]);
  matched.forEach((element) => {
    element.classList.add("noClick");
  })
  console.log(matched);
  openImage = [];
  if (matched.length === 16) {
    endGame();                                                   // todo
  }
}

function badGuess() {
  openImage[0].classList.add("unmatched");
  openImage[1].classList.add("unmatched");
  setTimeout(function () {
    openImage[0].classList.remove("unmatched");
    openImage[1].classList.remove("unmatched");
    openImage[0].children[0].classList.remove('show-img');
    openImage[1].children[0].classList.remove('show-img');
    openImage = [];
  }, 1000);
}


function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second === 60) {
      minute++;
      second = 0;
    }
    if (minute === 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

createDinoDeck();
document.getElementById("lets_start").addEventListener("click", function () {
  //this.classList.add("moveVertical"); TODO buttons need to drop next to the playing field!
  console.log(document.getElementById("lets_start"));
  cleanStart();
  document.getElementById("playField").scrollIntoView();
  startTimer();

});
document.getElementById("restart").addEventListener("click", function () {
  endGame();
});


