let avatar_arr = [];
let imgFolder = [];
let openImage = [];
let matched = [];
const MAX_DINO_SELECT = 8;
const MAX_DINO_IMAGES = 16;
let playCell = document.querySelectorAll(".col");
let playCellArr = Array.from(playCell);
let modalElement = document.getElementById("dinoModal");
let counter = document.getElementById("moveCounter").innerHTML;
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
let interval;

let random_deck = [];
let dino_deck = [];
let div_avatars = document.querySelectorAll(".dino");
let arr_dino_avatars = Array.from(div_avatars);


//creating a modal
//document.getElementById("dinoModal").classList.add("show-modal");TODO MODAL doesn't show!

//creating random Dino Deck
function create_random_deck(){
  for(let avatar of arr_dino_avatars){
    let avatar_style = window.getComputedStyle(avatar);
    let avatar_src_value = avatar_style.getPropertyValue('background-image');
    let avatar_src_path = avatar_src_value.slice(5, (avatar_src_value.length - 2));
    let avatar_path = new URL(avatar_src_path).pathname;
    avatar_arr.push(avatar_path);
  }
  for (let i = avatar_arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let value = avatar_arr[i];
    avatar_arr[i] = avatar_arr[j];
    avatar_arr[j] = value;
  }
  for(let i = 0; i < MAX_DINO_SELECT; i++){
    random_deck.push(avatar_arr[i]);
  }
  let random_deck_clone = [...random_deck];
  imgFolder = random_deck_clone.concat(random_deck);
}

//creating your own Dino Playing Deck
function create_own_deck() {
  for (let avatar of arr_dino_avatars) {
    avatar.addEventListener("click", function () {
      let avatar_style = window.getComputedStyle(avatar);
      let avatar_src_value = avatar_style.getPropertyValue('background-image');
      let avatar_src_path = avatar_src_value.slice(5, (avatar_src_value.length - 2));
      let avatar_path = new URL(avatar_src_path).pathname;
      avatar.classList.add("chosen_dino");
      avatar.classList.add("noClick");

      dino_deck.push(avatar_path);
      if (dino_deck.length === MAX_DINO_SELECT) {
        let dino_deck_clone = [...dino_deck];
        let dino_deck_final = dino_deck_clone.concat(dino_deck);
        //console.log(dino_deck_final);
        imgFolder = imgFolder.concat(dino_deck_final);
        //console.log(imgFolder);
        arr_dino_avatars.forEach((avatar) => {
          avatar.classList.add("noClick");
        });

        alert("You have chosen your Dinosaurs!");

      }
    })
  }
}
function shuffle(){
  for (let i = imgFolder.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let value = imgFolder[i];
    imgFolder[i] = imgFolder[j];
    imgFolder[j] = value;
  }
}

function cleanStart() {
  /*
  if (imgFolder.length !== 0){
    document.getElementById("lets_start").classList.add("moveVertical");
  }

  if (imgFolder.length === 0) {
    alert("You need to choose your dinosaurs first!");
    document.getElementById("lets_start").classList.remove("moveVertical");
    return;
  }*/
  for (let i = 0; i < MAX_DINO_IMAGES; i++) {
    let image = document.createElement('img');
    image.src = imgFolder[i];
    image.classList.add("dino_in_play");
    if (imgFolder[i] === 'img/dinogreen4.png' || imgFolder[i] === 'img/dinobrown2.png') { //TODO check display of images!!
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
  //document.getElementById("header").scrollIntoView();
  arr_dino_avatars.forEach((avatar) => {
    avatar.classList.remove("noClick");
    avatar.classList.remove("chosen_dino");
  });
  playCellArr.forEach((element) => {
    element.classList.remove("match");
    element.firstElementChild.classList.remove("show-img");
    element.removeChild(element.firstChild);
  });
  random_deck = [];
  avatar_arr =[];
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





create_own_deck();
shuffle();

document.getElementById("lets_start").addEventListener("click", function () {
  if (imgFolder.length === 0){
    create_random_deck();
  }
  cleanStart();
  document.getElementById("playText").classList.add("hide_text");
  document.getElementById("dino1").classList.add("hide_avatars_left");
  document.getElementById("dino2").classList.add("hide_avatars_left");
  document.getElementById("dino3").classList.add("hide_avatars_left");
  document.getElementById("dino4").classList.add("hide_avatars_left");
  document.getElementById("dino5").classList.add("hide_avatars_left");
  document.getElementById("dino6").classList.add("hide_avatars_left");
  document.getElementById("dino7").classList.add("hide_avatars_left");
  document.getElementById("dino8").classList.add("hide_avatars_left");
  document.getElementById("dino9").classList.add("hide_avatars_left");
  document.getElementById("dino10").classList.add("hide_avatars_right");
  document.getElementById("dino11").classList.add("hide_avatars_right");
  document.getElementById("dino12").classList.add("hide_avatars_right");
  document.getElementById("dino13").classList.add("hide_avatars_right");
  document.getElementById("dino14").classList.add("hide_avatars_right");
  document.getElementById("dino15").classList.add("hide_avatars_right");
  document.getElementById("dino16").classList.add("hide_avatars_right");
  document.getElementById("dino17").classList.add("hide_avatars_right");
  document.getElementById("playField").classList.add("moveVerticalPlayfield");



  startTimer();
});

document.getElementById("restart").addEventListener("click", function () {

  document.getElementById("playField").classList.add("restart_playfield");
  document.getElementById("playField").classList.remove("moveVerticalPlayfield");
  endGame();
});


