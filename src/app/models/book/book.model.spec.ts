import * as faker from 'faker';
import { BookModel } from './book.model';

describe('BookModel', () => {
    let image: string;
    let title: string;
    let description: string;
    let price: number;
    let upvotes: number;
    let book: BookModel;

    beforeEach(() => {
        image = faker.image.image();
        title = faker.lorem.words();
        description = faker.lorem.sentence();
        price = 10.95;
        upvotes = 12;
        book = new BookModel(image, title, description, price, upvotes);

        // define localStorage mocks (spyOn)
        let storage = {};

        spyOn(window.localStorage, 'getItem').and.callFake((key: string): string => {
            return storage[key] || null;
        });

        spyOn(window.localStorage, 'removeItem').and.callFake((key: string): void => {
            delete storage[key];
        });

        spyOn(window.localStorage, 'setItem').and.callFake((key: string, value: string): void => {
            storage[key] = value;
        });

        spyOn(window.localStorage, 'clear').and.callFake(() => storage = {});
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('has a valid model', () => {
        expect(book.image).toEqual(image)
        expect(book.title).toEqual(title);
        expect(book.description).toEqual(description);
        expect(book.price).toEqual(price);
        expect(book.upvotes).toEqual(upvotes);
    });

    it('has localStorage working', () => {
        localStorage.setItem('key', 'value');
        expect(localStorage.getItem('key')).toBe('value');
    });

    it('has the find and save methods working', () => {
        book.save();
        const bookFromStorage = BookModel.find(book.title);
        expect(book).toEqual(bookFromStorage);
    });

    it('has the destroy method woorking', () => {
        book.save();
        book.destroy();
        const bookFromStorage = BookModel.find(book.title);
        expect(bookFromStorage).not.toBeTruthy();
    })


});
