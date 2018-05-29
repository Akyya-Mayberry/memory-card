enum FlippedCardsState {
    Add, Delete, Clear
}

/**
 * A series of cards make up a deck.
 * Matching cards will have the same icon and a similar data attribute.
 * The icon is what is dispay in the card.
 * The data attribute is what allows the card to be distinguished in the DOM
 * from the other cards. It is a dash dilimited string consisting of
 * the cards icon, an index number and a trailing tag number.
 * The index number links the card icon to a icon in the themes list of icons.
 * The trailing tag number (1 or 2) is to distinguish matching cards from each other.
 */

class Card {
    public readonly icon: string;
    public readonly tag: string = 'li';
    public readonly dataAttr: string;
    public readonly theme: ITheme;
    public classes: Set<string>;

    constructor(
        public cIcon: string,
        public cDataAttr: string,
        public cClassList: Set<string> = new Set([]),
        public iTheme: ITheme,
    ) {
        this.icon = cIcon;
        this.dataAttr = cDataAttr;
        this.classes = cClassList;
        this.theme = iTheme;
    }

    public getHtml = () => {
        const li = document.createElement(this.tag);
        const icon = document.createElement(this.theme.element);

        li.classList.add(...this.classes.values());
        li.setAttribute('data-icon', this.dataAttr);
        icon.classList.add(...this.icon.split(' '));
        li.appendChild(icon);

        return li;
    }

    public faceUp = () => {
        this.classes.add('open');

        setTimeout(() => {
            this.classes.add('reveal');
        }, 1000);

        const e: Element = document.querySelector(`li[data-icon*="${this.dataAttr}"`)!;

        e.classList.add(...['open', 'reveal']);
    }

    public faceDown = () => {
        this.classes.delete('open');
        this.classes.delete('reveal');

        const e: Element = document.querySelector(`li[data-icon*="${this.dataAttr}"`)!;

        e.classList.remove(...['open', 'reveal']);
    }
}

export { Card, FlippedCardsState };
