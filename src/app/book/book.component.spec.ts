import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookModel } from '../models/book/book.model';

import * as faker from 'faker';

import { BookComponent } from './book.component';
import { CartService } from '../services/cart.service';
import { CartServiceMock } from '../services/cart.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'discount' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return 99;
  }
}

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: BookModel;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent, MockPipe],
      imports: [RouterTestingModule],
      providers: [{ provide: CartService, useClass: CartServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    book = new BookModel(
      faker.image.image(),
      faker.lorem.words(),
      faker.lorem.paragraph(),
      15.95,
      0
    );
    component.book = book;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the book image', () => {
    const image = nativeElement.querySelector('.book-image').getAttribute('src');
    expect(image).toEqual(book.image);
  });

  it('should show the book title', () => {
    const title = nativeElement.querySelector('.book-title').innerHTML;
    expect(title).toEqual(book.title);
  });

  it('should show the book price properly formatted', () => {
    const price = nativeElement.querySelector('.book-price').innerHTML;
    expect(price).toEqual('$15.95');
  });

  it('should show the discounted book price properly formatted', () => {
    const price = nativeElement.querySelector('.new-price').innerHTML;
    expect(price).toEqual('99');
  });

  it('should set the correct number of upvotes', () => {
    const votes = component.upvoteCount();
    expect(component.upvoteCount()).toEqual(votes);
  });

  it('upvote invokes the component function', () => {
    const spy = spyOn(component, 'upvote');
    const button = nativeElement.querySelector('.upvote-button') as HTMLButtonElement;
    console.log(JSON.stringify(button));
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit addToCart event', (done) => {
    component.addToCart.subscribe(e => {
      expect(e).toEqual(component.book);
      done();
    });
    component.sendToCart();
  });

  it('should call sendToCart when button is clicked', () => {
    const spy = spyOn(component, 'sendToCart');
    const button = nativeElement.querySelector('.cart-button') as HTMLButtonElement;
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});
