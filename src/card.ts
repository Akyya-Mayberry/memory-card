enum FlippedCardsState {
    Add, Delete, Clear
}

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
        this.classes.add('show');

        const e: Element = document.querySelector(`li[data-icon*="${this.dataAttr}"`)!;

        e.classList.add(...['open', 'show']);
    }

    /**
     * Face card down in UI. Removes a single or all cards from faceup list.
     * @param element
     * @param icon
     */
    public faceDown = () => {
        this.classes.delete('open');
        this.classes.delete('show');

        const e: Element = document.querySelector(`li[data-icon*="${this.dataAttr}"`)!;

        e.classList.remove(...['open', 'show']);
    }
}

export { Card, FlippedCardsState };
