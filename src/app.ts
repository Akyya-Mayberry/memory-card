import { Card, FlippedCardsState } from './card';
import { topTechTheme, udacityTheme } from './themes';
import { Timer } from './timer';

const container = document.getElementsByClassName('container')[0];
const restart = document.getElementById('restart');
const facedUpCards: Set<Card> = new Set([]);
const theme = udacityTheme;
const gameSize = theme.icons.length;
const timer = new Timer();
let isTimerRunning = false;
let matches = 0;
let moves = 0;

/**
 * Generates deck of game cards from a theme
 * @param theme
 */
const makeCards = (t: ITheme) => {

    const deck: Card[] = [];

    for (const index of t.icons.keys()) {
        const newCards = [
            new Card(
                t.icons[index],
                `${t.icons[index]}-${index}-1`,
                new Set(['card']),
                theme
            ),
            new Card(
                t.icons[index],
                `${t.icons[index]}-${index}-2`,
                new Set(['card']),
                theme
            )
        ];

        deck.push(...newCards);
    }
    return deck;
};

/**
 * Randomize position of elements in an array
 * Shuffle function from http://stackoverflow.com/a/2450976
 * updated to es6
 * @param any
 */
const shuffle = (array: any[]) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/**
 * Makes a gameboard in the DOM from a deck of cards
 * @param deck
 */
const buildGameBoard = (deck: Card[]) => {

    const fragHelper = () => {
        const frag = document.createDocumentFragment();
        const ul = document.createElement('ul');
        ul.classList.add('deck');

        // Create DOM elements from the cards
        for (const card of deck) {
            ul.appendChild(card.getHtml());
        }

        frag.appendChild(ul);
        return frag;
    };

    container.appendChild(fragHelper());
};

/**
 * Determines if a card can be flipped over in UI
 * @param event
 */
const isFlippable = (event: any) => {
    if (event === null ||
        event === undefined ||
        event.target === null ||
        event.target.classList.contains('match') ||
        event.target.classList.contains('show') ||
        event.target.nodeName !== 'LI' ||
        facedUpCards.size > 1) {

        return false;
    }

    return true;
};

/**
 * Takes a card and flip it in UI and add it to faceup cards
 * @param card
 */
const faceCardUp = (c: Card) => {

    c.faceUp();

    updateFaceUpCards(FlippedCardsState.Add, c);

    /*
        TODO: Consider optimization - reduce number of reflows
    */
};

/**
 * Face card down in UI. Removes a single or all cards from faceup list.
 * @param card
 */
const faceDown = (c?: Card) => {

    if (c) { c.faceDown(); }

    c ? updateFaceUpCards(FlippedCardsState.Delete, c) : updateFaceUpCards(FlippedCardsState.Clear);

    /*
    TODO:
        Consider optimization - reduce number of reflows
    */
};

/**
 * Adds/Removes cards from faced up card list
 * @param action
 * @param card
 */
const updateFaceUpCards = (action: FlippedCardsState, card?: Card) => {
    switch (action) {
        case FlippedCardsState.Add:
            if (card) { facedUpCards.add(card); }
            break;
        case FlippedCardsState.Clear:
            facedUpCards.clear();
            break;
        case FlippedCardsState.Delete:
            if (card) { facedUpCards.delete(card); }
    }
};

/**
 * Determine if cards in the facedup list of cards match
 * @param card2
 */
const isMatch = (card2: Card) => {
    if (facedUpCards.size < 1) { return false; }

    const card1: Card = facedUpCards.values().next().value;

    if (card1.icon === card2.icon) {
        return true;
    }

    return false;
};

/**
 * Update the DOM to display two matching cards and removes them from faced up list
 * @param card
 */
const confirmMatch = (card: Card) => {
    matches += 1;

    // Cards should be emptied from faced up list
    updateFaceUpCards(FlippedCardsState.Clear);

    // Find the card by their data attribute and add match class
    const icon = card.icon;
    const elements = document.querySelectorAll(`li[data-icon*="${icon}"`);

    for (const e of elements) {
        e.classList.add('match');
    }

    /*
        TODO: Consider optimization - reduce number of reflows
    */
};

/**
 * Removes cards from faced up list
 */
const failMatch = () => {
        // If no match we have to face the cards down
    facedUpCards.forEach((c: Card) => {
        setTimeout(() => {
            faceDown(c);
        }, 2000);
    });
};

/**
 * Determines if user completed match game
 */
const isWinner = () => matches === gameSize;

/**
 * Celebrate user winning card game
 */
const celebrate = () => {
    console.log(`Congratulations!!!!! You won in ${moves} moves`);
    timer.stop();
    isTimerRunning = false;
};

/**
 * Reset the game timer
 */
const resetTimer = () => {
    isTimerRunning = false;
    timer.reset();
};

/**
 * Restarts the game from the beginning
 */
const restartGame = () => {
    // Restart Timer and update the UI for it
    resetTimer();

    // Clear out faceup cards
    facedUpCards.clear();

    // Reintialized any needed variables
    matches = 0;
    moves = 0;

    // Go through each card in the dom and reset classes
    const elements = document.querySelectorAll('.card');

    for (const e of elements) {
        e.classList.remove(...['match', 'open', 'show']);
    }

    /*
        TODO: Consider optimization - the for of loop above
        will generate multiple reflows. Refactor this.
    */
};

/**
 * Processes if a user made a valid match or not
 * @param event
 */
const processMove = (event: any) => {
    const target = event.target;
    const index = target.getAttribute('data-icon').split('-')[2];

    const newCard = new Card(
        theme.icons[index],
        target.getAttribute('data-icon'),
        new Set(target.classList),
        theme);

    faceCardUp(newCard);

    // User is flipping first card
    if (facedUpCards.size < 2) { return; }

    // Attempting to make a match
    moves += 1;

    if (isMatch(newCard)) {
        confirmMatch(newCard);
        if (isWinner()) { celebrate(); }
    } else {
        failMatch();
    }

    /*
        TODO: consider event propagation
    */
};

//////////////////////////
// Listeners
container.addEventListener('click', (event: any) => {

    if (!isFlippable(event)) { return; }

    if (!isTimerRunning) {
        timer.start(new Date());
        isTimerRunning = true;
    }

    processMove(event);
});

restart.addEventListener('click', () => {
    restartGame();
});

//////////////////////////

const newDeck: Card[] = shuffle(makeCards(theme));
buildGameBoard(newDeck);
