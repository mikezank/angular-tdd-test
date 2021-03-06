import * as faker from 'faker';
import { browser, logging } from 'protractor';
import { BookPage } from '../book/book.po';
import { BookEditPage } from './book-edit.po';

describe('Book edit page', () => {
    let bookEdit: BookEditPage;

    beforeEach(() => {
        bookEdit = new BookEditPage();
    });

    it('should have reactive form working', async () => {
        const image = faker.image.image();
        const title = faker.lorem.sentence();
        const description = faker.lorem.sentence();

        await bookEdit.setTitle(title);
        await bookEdit.setDescription(description);
        await bookEdit.setImage(image);
        await bookEdit.submitReactive();

        const bookPage = new BookPage(title);
        expect(bookPage.titleElement.getText()).toEqual(title);
        expect(bookPage.imageElement.getAttribute('src')).toContain(image);
        expect(bookPage.descriptionElement.getText()).toEqual(description);
    });

    afterEach(async () => {
    // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
  });
});