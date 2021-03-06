import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from '../models/book/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  bookEditForm: FormGroup;
  book: BookModel;
  activeForm = 'reactive';
  @ViewChild(NgForm) templateForm: NgForm;

  constructor(fb: FormBuilder, private route: ActivatedRoute) {
    this.bookEditForm = fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: [''],
      price: [''],
    });
    route.params.subscribe((res) => {
      this.book = BookModel.find(res['title']);
      console.log(res);
      if (this.book == null) {
        this.book = new BookModel('', '', '', 0);
      }
    });
  }

  submitReactiveForm() {
    const bookData = this.prepareSaveBook();
    this.book = new BookModel(
      bookData.image,
      bookData.title,
      bookData.description,
      bookData.price
    );
    this.book.save();
  }

  private prepareSaveBook() {
    const formModel = this.bookEditForm.value;
    return formModel;
  }

  ngOnInit(): void {}
}
