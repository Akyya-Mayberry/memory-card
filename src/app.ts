import Card = require('./card');

const container = document.getElementsByClassName('container')[0];
let matched: Set<string> = new Set([]);
let flipped: string = '';

const topTechTheme: ITheme = {
    name: 'Top Tech Companies',
    element: 'i',
    icons: ['fab fa-amazon', 'fab fa-google', 'fab fa-facebook-f',
        'fab fa-apple', 'fab fa-slack-hash', 'fab fa-github',
        'fab fa-microsoft', 'fab fa-linkedin-in'
    ]
};

/**
 * Generates deck of game cards from a theme
 * @param theme
 */
const makeCards = (theme: ITheme) => {

    const deck: Card.Card[] = [];

    for (const index of theme.icons.keys()) {
        const newCards = [
            new Card.Card(
                topTechTheme.icons[index],
                topTechTheme.name,
                new Set(['card'])
            ),
            new Card.Card(
                topTechTheme.icons[index],
                topTechTheme.name,
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
const buildGameBoard = (deck: Card.Card[]) => {

    const fragHelper = () => {
        const frag = document.createDocumentFragment();
        const ul = document.createElement('ul');
        ul.classList.add('deck');

        // Create DOM elements from the cards
        for (const card of deck) {
            const li = document.createElement(card.html);
            const icon = document.createElement(topTechTheme.element);

            li.classList.add(...card.classes.values());
            li.classList.add('match');
            icon.classList.add(...card.icon.split(' '));
            li.appendChild(icon);

            ul.appendChild(li);
        }

        frag.appendChild(ul);
        return frag;
    };

    container.appendChild(fragHelper());
};

const newDeck: Card.Card[] = shuffle(makeCards(topTechTheme));
buildGameBoard(newDeck);

for (const card of newDeck) {
    console.log(`Here are the generated cards: , title: ${card.title}, html: ${card.html}`);
}
