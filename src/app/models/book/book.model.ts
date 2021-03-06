import { isEmptyExpression } from "@angular/compiler";

export interface BookInterface {
    image: string;
    title: string;
    description: string;
    price: number;
    upvotes: number;
}

export class BookModel implements BookInterface {
    constructor(public image: string,
                public title: string,
                public description: string,
                public price: number,
                public upvotes: number = 0) { }

    public static find(title: string): BookModel {
        const books: BookModel[] = JSON.parse(
            localStorage.getItem('books') || '[]'
        );
        for (const book of books) {
            if (book.title === title) {
                return new BookModel(book.image, book.title,
                    book.description, book.price, book.upvotes);
            } else {
                return null;
            }
        }
    }

    public static query(): BookModel[] {
        const books: BookModel[] = JSON.parse(
            localStorage.getItem('books') || '[]'
        );
        const bookModels: BookModel[] = [];

        for (const book of books) {
            bookModels.push(new BookModel(
                book.image, book.title, book.description, book.price, book.upvotes));
        }
        return bookModels;
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }

    save(): void {
        const books: BookModel[] = JSON.parse(
            localStorage.getItem('books') || '[]'
        );
        books.forEach((item, index) => {
            if (item.title === this.title) {
                books.splice(index, 1); // removes the old item
            }
        });
        books.push(this);
        localStorage.setItem('books', JSON.stringify(books));
    }

    destroy(): void {
        const books: BookModel[] = JSON.parse(
            localStorage.getItem('books') || '[]'
        );
        books.forEach((item, index) => {
            if (item.title === this.title) {
                books.splice(index, 1); // removes the old item
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
