import Card = require('./card');

const container = document.getElementsByClassName('container')[0];
const matchedCards: Set<string> = new Set([]);
const facedUpCards: Set<Element> = new Set([]);

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
            li.setAttribute('data-icon', card.icon);
            // li.classList.add('match');
            icon.classList.add(...card.icon.split(' '));
            li.appendChild(icon);

            ul.appendChild(li);
        }

        frag.appendChild(ul);
        return frag;
    };

    container.appendChild(fragHelper());
};

const isCardValid = (event: any) => {
    console.log('inside card validator. EventNodeName: ', event.target.nodeName);
    if (event === null ||
        event === undefined ||
        event.target === null ||
        (event.target.classList.contains('match') || event.target.classList.contains('show')) ||
        (event.target.nodeName !== 'LI' && event.target.nodeName !== 'I')) {
        console.log('validation failed!');
        return false;
    }

    return true;
};

const faceUp = (target: any) => {
    target.classList.add(...['open', 'show']);
};

// const faceDown = (target: any) => {
//     const icon = target.firstChild.classList.value;
//     console.log(`card dataAttr/Icon name: ${target.getAttribute('data-icon')}`);
//     facedUpCards.delete(icon);
//     target.classList.remove(['open', 'show']);
// };

const updateFaceUpCards = (action: string, icon?: Element) => {
    // const icon = target.firstChild.classList.value;
    // console.log(`card dataAttr/Icon name: ${target.getAttribute('data-icon')}`);

    switch (action) {
        case 'add':
            if (icon) { facedUpCards.add(icon); }
            break;
        case 'clear':
            facedUpCards.clear();
            break;
        case 'delete':
            if (icon) { facedUpCards.delete(icon); }
    }
};

const isMatch = (target: any) => {
    if (facedUpCards.size < 1) {return false};

    const card1: Element = facedUpCards.values().next().value;

    if (card1.getAttribute('data-icon') === target.getAttribute('data-icon')) {
        return true;
    }

    return false;
};

const processMove = (event: any) => {
    const target = event.target;

    // Get the card type
    const icon = `${target.getAttribute('data-icon')}`;

    // Show the card
    faceUp(target);
    // updateFaceUpCards('add', icon);

    // console log faced up cards
    facedUpCards.forEach((i: Element) => {
        console.log(`face up card: ${i}`);
    });

    // Check if it's a match
    if (facedUpCards.size === 0) {
        updateFaceUpCards('add', target);
        return;
    } else {
        console.log('card exists. should try to match');

        if (isMatch(target)) {
            console.log(' a match!');
            updateFaceUpCards('clear');
            // If cards do match, loop over each one with
            // data type of that icon and give it classname 'match
        } else {

            setTimeout(() => {
                console.log('no match');
                // If no match we have to face the cards down

                const c: any[] = [];

                facedUpCards.forEach((i) => {
                    i.classList.remove(...['show', 'open']);
                    // const e = document.querySelectorAll(`li[data-icon*="${i}"`);
                    // c.push(...Array.from(e));
                });
                debugger;
                target.classList.remove(...['show', 'open']);
                console.log(`elements with matching data attributes to remove: ${Array.from(c)}`);

                // const c: NodeList = document.querySelectorAll('li[data-icon*=".html');
                // setTimeout(() => {
                // for (const l of c) {
                //     l.classList.remove(['show', 'open']);
                //     console.log('l: ', l);
                // }
                // c.forEach((l) => {
                //     console.log('l: ', l);
                //     // l.classList.remove(['show', 'open']);
                // });

                console.log('');
                updateFaceUpCards('clear');
            }, 3000);
        }
    }

    // stop propogation
};

//////////////////////////
// Listeners
container.addEventListener('click', (event: any) => {

    // Validate element is card
    if (!isCardValid(event)) { return; }

    // Process user's move
    processMove(event);
});

//////////////////////////

const newDeck: Card.Card[] = shuffle(makeCards(topTechTheme));
buildGameBoard(newDeck);

for (const card of newDeck) {
    console.log(`Here are the generated cards: , title: ${card.title}, html: ${card.html}`);
}
