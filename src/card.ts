export class Card {
    public readonly icon: string;
    public readonly title: string;
    public readonly html: string = 'li';
    public classes: Set<string>;

    constructor(public iconSrc: string, public imgTitle: string, public classList: Set<string> = new Set([])) {
        this.icon = iconSrc;
        this.title = imgTitle;
        this.classes = classList;
    }
}

// export { Card };
