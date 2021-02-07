let card = document.getElementsByClassName("card");
let cards = [...card];

let openedCards = [];

let matchedCard = document.getElementsByClassName("match");

let movi = 0;

const popup = document.getElementById("paraben-popup");

let refreshHTML = function(target, value) {
	return target.innerHTML = value;
};

// Função para o contador

let ContSet = function(movi) {
	this.target = document.querySelector(".cont");
	refreshHTML(this.target, movi);
};

ContSet.prototype.add = function() {
	movi++;
	refreshHTML(this.target, movi);
};

ContSet.prototype.restart = function() {
	movi = 0;
	refreshHTML(this.target, movi);
};

let cont = new ContSet(movi);

let interval;

window.onload = startGame();

for(var i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", displayCard);
	cards[i].addEventListener("click", cardOpen);
	cards[i].addEventListener("click", paraben);
}

document.querySelector(".restart").addEventListener("click", startGame);

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// Função para começar o jogo

function startGame() {
	cards = shuffle(cards);
	for(var i=0; i<cards.length; i++) {
		document.querySelector(".deck").innerHTML = "";
		[].forEach.call(cards, function(item) {
			document.querySelector(".deck").appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
	}
	cont.restart();

}

// Apresentação das cartas

function displayCard() {
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
}

function cardOpen() {
	openedCards.push(this);
	if(openedCards.length === 2) {
		cont.add();
		if(openedCards[0].type === openedCards[1].type) {
			matched();
		} else {
			unmatched();
		}
	}
}

// Função de pares

function matched() {
	for(var i=0; i<openedCards.length; i++) {
		openedCards[i].classList.add("match", "disabled");
		openedCards[i].classList.remove("show", "open", "no-event");
	}
	openedCards = [];
}

function unmatched() {
	for(var i=0; i<openedCards.length; i++) {
		openedCards[i].classList.add("unmatched");
	}
	disable();
	setTimeout(function() {
		for(var i=0; i<openedCards.length; i++) {
			openedCards[i].classList.remove("show", "open", "no-event", "unmatched");
		}
		enable();
		openedCards = [];
	}, 1100);
}

function disable() {
	for(var i = 0; i < cards.length; i++) {
		cards[i].classList.add("disabled");
	}
}

function enable() {
	for(var i = 0; i < cards.length; i++) {
		if(!cards[i].classList.contains("match")) {
			cards[i].classList.remove("disabled");
		};
	}
}

// Parabenização

function paraben() {

	//Mudança necessária para a apresentação da parabenização de "16" para "4"

	if(matchedCard.length == 4) {
		clearInterval(interval);
		popup.classList.add("show");
		document.getElementById("total-movi").innerHTML = movi;
		closePopup();
	};
}

//Fecha parabenização

function closePopup() {
	document.getElementById("jogar").addEventListener("click", function() {
		popup.classList.remove("show");
		startGame();
	});
}

