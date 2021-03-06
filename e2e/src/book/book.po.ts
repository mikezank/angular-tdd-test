import { browser, by, element } from "protractor";

export class BookPage {
    titleElement: any;
    imageElement: any;
    descriptionElement: any;

    constructor(title: string) {
        this.getPage(title);
        this.titleElement = element(by.css('.book-title'));
        this.imageElement = element(by.css('.book-image'));
        this.descriptionElement = element(by.css('.book-description'));

    }

    async getPage(title: string): Promise<void> {
        await browser.get('/books/' + title);
    }
}