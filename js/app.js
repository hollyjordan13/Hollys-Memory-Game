/*
 * Create a list that holds all of your cards
 */
//Clock Element Functionality
let time = 0;
let clockOff = true;



function displayTime() {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	const clock = document.querySelector('.clock');
	clock.innerHTML = time;
	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}
}
function startClock() {
	clockId = setInterval(() => {
		time++;
		displayTime();
	}, 1000);
}

function stopClock() {
	clearInterval(clockId);
}


const deck = document.querySelector('.deck');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//'Moves' functionality
let moves = 0;
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
}

//Star rating functionality
function checkScore() {
	if (moves === 18 || moves === 25)
		{hideStar();
		}
}
function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
	}}}



//Shuffle the deck!
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
} 
shuffleDeck();

//separate toggling into its own function
function toggleCard(card) {
	card.classList.toggle('open');
	card.classList.toggle('show');
} 

//add cards to a list of open cards
let openCardList = [];

function addToggleCard(clickTarget) {
	openCardList.push(clickTarget);
	console.log(openCardList);
}

//set up event listener for card to flip when clicked
//set conditions so that clicked cards are added to an openCardList array
//set conditions that only allow up to 2 cards in openCardList


deck.addEventListener('click', event => {
	const clickTarget = event.target; 
	if (isClickValid(clickTarget)) {
		if (isClickValid(clickTarget)) {
			if (clockOff) {
				startClock();
				clockOff = false;
			}
		}
		toggleCard(clickTarget);
		addToggleCard(clickTarget);
		if (openCardList.length === 2) {
			checkForMatch(clickTarget);
			addMove();
			checkScore();
		}
	}
});	

function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') && 
		!clickTarget.classList.contains('match') &&
		openCardList.length < 2 &&
		!openCardList.includes(clickTarget)
		);
}

//Checking for matches in openCardList
//Use firstElementChild property, because it contains the 'i' (icon) element common to each card
function checkForMatch() {
	if (
		openCardList[0].firstElementChild.className ===
		openCardList[1].firstElementChild.className
		) {
		openCardList[0].classList.toggle('match');
		openCardList[1].classList.toggle('match');
		openCardList = [];
		} else {
			console.log('Nope! Try again!');
			setTimeout(() => {
				toggleCard(openCardList[0]);
				toggleCard(openCardList[1]);
				openCardList = [];
			}, 1000);
			
		}
}


// Shuffle function from http://stackoverflow.com/a/2450976
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

//Test player stats
time = 121;
displayTime();
moves = 16;
checkScore();

writeReportStats();
toggleReport();
//Show player stats upon completion of game
function toggleReport() {
	const report = document.querySelector('.report__background');
	report.classList.toggle('hide');
}

function writeReportStats() {
	const timeStat = document.querySelector('.report__time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.report__moves');
	const starsStat = document.querySelector('report__stars');
	const stars = getStars();

	timeStat.innerHTML = `Time = ${clockTime}`;
	movesStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	console.log(starCount);
	return starCount;

//Report buttons functionality


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
