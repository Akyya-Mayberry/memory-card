import { Card, FlippedCardsState } from './card';
import { topTechTheme } from './themes';

const container = document.getElementsByClassName('container')[0];
const facedUpCards: Set<Element> = new Set([]);
const theme = topTechTheme;
const gameSize = theme.icons.length;
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
                t.name,
                new Set(['card'])
            ),
            new Card(
                t.icons[index],
                t.name,
                new Set(['card'])
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
            const li = document.createElement(card.html);
            const icon = document.createElement(theme.element);

            li.classList.add(...card.classes.values());
            li.setAttribute('data-icon', card.icon);
            icon.classList.add(...card.icon.split(' '));
            li.appendChild(icon);

            ul.appendChild(li);
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
        (event.target.classList.contains('match') ||
            event.target.classList.contains('show')) ||
        (event.target.nodeName !== 'LI' && event.target.nodeName !== 'I') ||
        facedUpCards.size > 1) {

        return false;
    }

    return true;
};

/**
 * Takes a card and flip it in UI and add it to faceup cards
 * @param element
 */
const faceCardUp = (element: any) => {
    element.classList.add(...['open', 'show']);
    updateFaceUpCards(FlippedCardsState.Add, element);

    /*
        TODO: Consider optimization - reduce number of reflows
    */
};

/**
 * Face card down in UI. Removes a single or all cards from faceup list.
 * @param element
 * @param icon
 */
const faceDown = (element: any, icon?: Element) => {
    element.classList.remove(...['open', 'show']);

    icon ? updateFaceUpCards(FlippedCardsState.Delete, icon) : updateFaceUpCards(FlippedCardsState.Clear);

    /*
    TODO:
        Consider optimization - reduce number of reflows
        Why two parameters - refactor this function
    */
};

/**
 * Adds/Removes cards from faced up card list
 * @param action
 * @param icon
 */
const updateFaceUpCards = (action: FlippedCardsState, icon?: Element) => {
    switch (action) {
        case FlippedCardsState.Add:
            if (icon) { facedUpCards.add(icon); }
            break;
        case FlippedCardsState.Clear:
            facedUpCards.clear();
            break;
        case FlippedCardsState.Delete:
            if (icon) { facedUpCards.delete(icon); }
    }
};

/**
 * Determine if cards in faced up card list match
 * @param element
 */
const isMatch = (element: any) => {
    if (facedUpCards.size < 1) { return false; }

    const card1: Element = facedUpCards.values().next().value;

    if (card1.getAttribute('data-icon') === element.getAttribute('data-icon')) {
        return true;
    }

    return false;
};

/**
 * Update the DOM to display two matching cards and removes them from faced up list
 * @param element
 */
const confirmMatch = (element: any) => {
    matches += 1;

    // Cards should be emptied from faced up list
    updateFaceUpCards(FlippedCardsState.Clear);

    // Find the card by their data attribute and add match class
    const icon = `${element.getAttribute('data-icon')}`;
    const elements = document.querySelectorAll(`li[data-icon*="${icon}"`);

    elements.forEach((e: Element) => {
        e.classList.add('match');
    });

    /*
        TODO: Consider optimization - reduce number of reflows
    */
};

/**
 * Removes cards from faced up list
 */
const failMatch = () => {
    setTimeout(() => {
        // If no match we have to face the cards down
        facedUpCards.forEach((i) => {
            faceDown(i, i);
        });
    }, 2000);
};

/**
 * Determines if user completed match game
 */
const isWinner = () => matches === gameSize;

/**
 * Celebrate user winning card game
 */
const celebrate = () => console.log(`Congratulations!!!!! You won in ${moves} moves`);

/**
 * Processes if a user made a valid match or not
 * @param event
 */
const processMove = (event: any) => {
    const target = event.target;

    // Show the card
    faceCardUp(event.target);

    // User is flipping first card
    if (facedUpCards.size < 2) { return; }

    // Attempting to make a match
    moves += 1;

    if (isMatch(target)) {
        confirmMatch(target);
        if (isWinner()) {
            celebrate();
        }
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

    // Validate element is flippable
    if (!isFlippable(event)) { return; }

    // Process user's move
    processMove(event);
});

//////////////////////////

const newDeck: Card[] = shuffle(makeCards(theme));
buildGameBoard(newDeck);
