export class Card {
    public readonly img: string;
    public readonly title: string;
    public readonly html: string = `<li class="card"></li>`;

    constructor(public imgSrc: string, public imgTitle: string) {
        this.img = imgSrc;
        this.title = imgTitle;
    }
}

// export { Card };
