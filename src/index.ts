// import { Card } from './card';
import Card = require('./card');
const greeter = (person: IPerson) => `Hello ${person.firstName} ${person.lastName}!`;

const me: IPerson = {
    firstName: 'Poop',
    lastName: 'Ducks'
};

const myCard = new Card.Card('https://www.google.com', 'Google Search');
const title = document.querySelector('#main-title');

if (title) { title.innerHTML = `${greeter(me)}`; }

console.log(greeter(me));
console.log(myCard);
