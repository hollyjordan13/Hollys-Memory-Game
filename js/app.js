/*
 * Create a list that holds all of your cards
 */
const cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", 
				   "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", 
	               "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", 
	               "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

//Define variables
let movesCounter = 0;
let timerStart; // Starting time
let timerEnd; // End time
let timerSpeed; // Timer speed
let playerStars = 3; // Players life’s / rating
let matchedCardList = [];	               

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //separate toggling into its own function
function toggleCard(clickTarget) {
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');
}
//set up event listener for card to flip when clicked
//set conditions so that clicked cards are added to an openCardList array
//set conditions that only allow up to 2 cards in openCardList
const deck = document.querySelector('.deck');

deck.addEventListener('click', event => {
	const clickTarget = event.target; 
	if (clickTarget.classList.contains('card') && openCardList.length < 2) {
		toggleCard(clickTarget);
		addToggleCard(clickTarget);
		if (openCardList.length === 2) {
			checkForMatch();
		}
	}
});	

//add cards to a list of open cards
let openCardList = [];

function addToggleCard(clickTarget) {
	openCardList.push(clickTarget);
	console.log(openCardList);
}

//Checking for matches in openCardList
//Use firstElementChild property, because it contains the 'i' (icon) element common to each card
function checkForMatch() {
	if (
		openCardList[0].firstElementChild.className ===
		openCardList[1].firstElementChild.className
		) {
		console.log('Great Job!');
	 	} else {
	 		console.log('Nope! Try again!');
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
