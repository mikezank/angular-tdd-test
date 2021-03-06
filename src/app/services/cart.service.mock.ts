import * as faker from "faker";
import { Observable, of, Subject } from "rxjs";

export const CartList = [];

for (let i = 0; i < 10; i++) {
    CartList.push({
        image: faker.image.image(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        price: 123.33,
        upvotes: 0
    });
}

export class CartServiceMock {
    private emitAddToCart = new Subject<any>();
    addEmitted$ = this.emitAddToCart.asObservable();

    constructor() { }

    add(item) {
        return item;
    }

    query() {
        return of(CartList);
    }
}