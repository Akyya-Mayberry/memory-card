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
 */
const makeCards: (theme: ITheme) => Card.Card[] = (theme: ITheme) => {

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

const newDeck: Card.Card[] = makeCards(numberTheme);

for (const card of newDeck) {
    console.log(`Here are the generated cards: , title: ${card.title}, html: ${card.html}`);
}
