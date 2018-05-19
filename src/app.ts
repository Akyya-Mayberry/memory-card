import Card = require('./card');

const numberTheme: ITheme = {
    name: 'numbers',
    icons: ['1.png', '2.png', '3.png',
        '4.png', '5.png', '6.png',
        '7.png', '8.png'
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
                numberTheme.name,
                numberTheme.icons[index]
            ),
            new Card.Card(
                numberTheme.name,
                numberTheme.icons[index]
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

const newDeck: Card.Card[] = shuffle(makeCards(numberTheme));

for (const card of newDeck) {
    console.log(`Here are the generated cards: , title: ${card.title}, html: ${card.html}`);
}
