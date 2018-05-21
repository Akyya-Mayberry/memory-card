enum FlippedCardsState {
    Add, Delete, Clear
}

class Card {
    public readonly icon: string;
    public readonly html: string = 'li';
    public readonly dataAttr: string;
    public classes: Set<string>;

    constructor(
        public cIcon: string,
        public cDataAttr: string,
        public cClassList: Set<string> = new Set([]),
    ) {
        this.icon = cIcon;
        this.dataAttr = cDataAttr;
        this.classes = cClassList;
    }
}

export { Card, FlippedCardsState };
