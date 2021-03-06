import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from '../models/book/book.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: BookModel;
  @Output() addToCart = new EventEmitter<BookModel>();

  constructor(private route: ActivatedRoute, private cs: CartService) {
    route.params.subscribe(res => {
      this.book = BookModel.find(res['title']);
    });
  }

  ngOnInit(): void {
  }

  sendToCart(): void {
    this.addToCart.emit(this.book);
    this.cs.add(this.book);
  }

  upvoteCount(): number {
    return this.book.upvotes;
  }

  upvote(): number {
    return this.book.upvotes++;
  }

}
