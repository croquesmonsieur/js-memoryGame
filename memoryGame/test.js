let gridItems = document.getElementsByClassName("grid-item");
let gridArray = [...gridItems];
let imgItems = document.getElementsByClassName("img-grid");
let imgArray = [...imgItems];

let openItems = [];
let matchItems = [];

function shuffle(array) {
  for (let i = imgArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let value = imgArray[i];
    imgArray[i] = imgArray[j];
    imgArray[j] = value;
  }
  return array;
}

shuffleItems = shuffle(imgArray);

for (let i = 0; i < shuffleItems.length; i++) {
  gridArray[i].innerHTML = "";
  gridArray[i].appendChild(shuffleItems[i]);
  gridArray[i].type = shuffleItems[i].alt;

  //remove all extra classes for game play
  gridArray[i].classList.remove("show", "open", "match", "disabled");
  gridArray[i].children[0].classList.remove("show-img");
}
console.log(gridArray);
console.log(shuffleItems);

for(let i = 0; i < gridArray.length; i++) {
  gridArray[i].addEventListener("click", displayItem)
}

function displayItem() {
  this.children[0].classList.toggle('show-img');
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
  Open(this);
}

function Open(card) {
  openItems.push(card);
  let len = openItems.length;
  if(len === 2) {
    //moveCounter();
    if(openItems[0].type === openItems[1].type) {
      match();
    } else {
      unmatch();
    }
  }
}

function match() {
  openItems[0].classList.add("match");
  openItems[1].classList.add("match");
  openItems[0].classList.remove("show", "open");
  openItems[1].classList.remove("show", "open");
  matchItems.push(openItems[0]);
  matchItems.push(openItems[1]);
  openItems = [];
  //if(matchItems.length === 16) {
    //endGame();
  //}
}

function unmatch() {
  openItems[0].classList.add("unmatched");
  openItems[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openItems[0].classList.remove("show", "open", "unmatched");
    openItems[1].classList.remove("show", "open", "unmatched");
    openItems[0].children[0].classList.remove('show-img');
    openItems[1].children[0].classList.remove('show-img');
    enable();
    openItems = [];

  }, 1100)
}

function disable() {
  gridArray.filter((item, i, gridArray) => {
    item.classList.add('disabled');
  })
}

function enable() {
  gridArray.filter((item, i, gridArray) => {
    item.classList.remove('disabled');
    for(let i=0; i<matchItems.length; i++) {
      matchItems[i].classList.add('disabled');
    }
  })
}


