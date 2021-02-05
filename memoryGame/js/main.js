let imgFolder = ['img/dinogreen1.png', 'img/dinogreen2.png', 'img/dinogreen3.png', 'img/dinogreen4.png', 'img/dinoblue1.png', 'img/dinobrown1.png', 'img/dinobrown2.png', 'img/dinobird.png', 'img/dinogreen1.png', 'img/dinogreen2.png', 'img/dinogreen3.png', 'img/dinogreen4.png', 'img/dinoblue1.png', 'img/dinobrown1.png', 'img/dinobrown2.png', 'img/dinobird.png'];
let openImage = [];
let matched = [];


let playCell = document.querySelectorAll(".col");
let playCellArr = Array.from(playCell);
console.log(playCellArr);
console.log(openImage);



function cleanStart(){

}
function avg() {
  for (let cell of playCellArr) {
    cell.addEventListener("click", displayImage);
  }
}

function play() {
  for (let i = 0; i < 16; i++) {
    let image = document.createElement('img');
    let altImg = document.createAttribute("alt");
    //altImg.value = "play"+i;
    image.setAttributeNode(altImg);
    image.src = imgFolder[i];
    document.getElementById("playCell" + i).appendChild(image)
  }
}

function shuffle() {
  for (let i = imgFolder.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let value = imgFolder[i];
    imgFolder[i] = imgFolder[j];
    imgFolder[j] = value;
  }
}


let displayImage = function () {
  this.children[0].classList.toggle("show-img");
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
  open(this);

}


function open(cell){
openImage.push(cell);
  console.log(openImage);
  let val = openImage.length;
  if (val === 2){
    //moveCounter();
    if (openImage[0].firstChild.getAttribute("src") === openImage[1].firstChild.getAttribute("src")){
      goodGuess();
    } else {
      badGuess();
    }
  }
}

function goodGuess(){
  openImage[0].classList.add("match");
  openImage[1].classList.add("match");
  openImage[0].classList.remove("show", "open");
  openImage[1].classList.remove("show", "open");
  matched.push(openImage[0]);
  matched.push(openImage[1]);
  console.log(matched);
  openImage = [];
  //if (matched.length === 16){
    //endGame();                                                   // todo
  //}
}

function badGuess() {
  openImage[0].classList.add("unmatched");
  openImage[1].classList.add("unmatched");
  disable();
  setTimeout(function () {
    openImage[0].classList.remove("show", "open", "unmatched");
    openImage[1].classList.remove("show", "open", "unmatched");
    openImage[0].children[0].classList.remove('show-img');
    openImage[1].children[0].classList.remove('show-img');
    enable();
    openImage = [];
  }, 1000);
}

function disable(){
  playCellArr.filter((cell, i, playCellArr) =>{
    cell.classList.add("disabled");
  });
}


function enable(){
  playCellArr.filter((cell, i, playCellArr) =>{
    cell.classList.remove("disabled");
    for (let i = 0; i < matched.length; i++) {
      matched[i].classList.add('disabled');
    }
  });
}


avg();
shuffle(imgFolder);
console.log(imgFolder);
play();

disable();
enable();

