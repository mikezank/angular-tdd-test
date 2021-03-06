import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { BookModel } from '../models/book/book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private emitAddToCart = new Subject<any>();
  addEmitted$ = this.emitAddToCart.asObservable();
  apiUrl = `https://firestore.googleapis.com/v1/projects/angular-tdd-eduonix-7e87d/databases/(default)/documents/cart?key=AIzaSyDj1v6UFdt3nq6k`;


  constructor(private db: AngularFirestore, private http: HttpClient) { }

  query() {
    return this.db.collection('/cart').valueChanges();
  }

  add(data) {
    const item = this.db.collection<BookModel>('/cart').add(data.getData());
    this.emitAddToCart.next(item);
    return item;
  }

  emitChange(book: BookModel) {
    this.emitAddToCart.next(book);
  }

  httpCall() {
    return this.http.get(this.apiUrl);
  }
}
