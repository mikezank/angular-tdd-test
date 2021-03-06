import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';
import { BookModel } from '../models/book/book.model';

import { BookEditComponent } from './book-edit.component';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookEditComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  afterEach(() => {
    if (component.book) {
      component.book.destroy();
    }
  });

  function fillTheForm(image, title, description, price) {
    component.bookEditForm.controls['image'].setValue(image);
    component.bookEditForm.controls['title'].setValue(title);
    component.bookEditForm.controls['description'].setValue(description);
    component.bookEditForm.controls['price'].setValue(price);
  }

  it('should have title error if less than length 3', fakeAsync(() => {
    component.activeForm = 'templateDriven';
    fixture.detectChanges();
    const form = component.templateForm.form;
    tick();
    form.setValue({
      title2: 'te',
      image2: 'http://test.com',
      description2: 'none',
      price2: 100
    });
    form.controls.title2.markAsTouched();
    fixture.detectChanges();
    expect(form.controls.title2.errors).toBeTruthy();
    expect(nativeElement.querySelector('.title-group').textContent)
      .toContain('Title must be at least 3 characters');
  }));

  it('should have price error if incorrect value provided', fakeAsync(() => {
    component.activeForm = 'templateDriven';
    fixture.detectChanges();
    const form = component.templateForm.form;
    tick();
    form.setValue({
      title2: 'test',
      image2: 'http://test.com',
      description2: 'none',
      price2: '$100',
    });
    form.controls.title2.markAsTouched();
    fixture.detectChanges();
    expect(form.controls.price2.errors).toBeTruthy();
    form.controls.price2.setValue('100');
    expect(form.get('price2')).toBeTruthy();  // checks field validity
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have blank fields in reactive form', () => {
    expect(component.bookEditForm.value).toEqual({
      image: '',
      title: '',
      description: '',
      price: ''
    });
  });

  it('should have submit button disabled if required fields are not filled in', fakeAsync(() => {
    const spy = spyOn(component, 'submitReactiveForm');
    fillTheForm('', '', faker.lorem.paragraph(), 12.95);
    const button = nativeElement.querySelector('#reactiveSubmitButton') as HTMLButtonElement;
    button.click();
    expect(spy).not.toHaveBeenCalled();
    expect(button.hasAttribute('disabled')).toBe(true);
  }));

  it('should have submit enabled if required fields are filled in', fakeAsync(() => {
    const spy = spyOn(component, 'submitReactiveForm').and.callThrough();
    fillTheForm(faker.image.image(), faker.lorem.sentence(), faker.lorem.paragraph(), 10.00);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement; // pull it fresh??
    button.click();
    expect(spy).toHaveBeenCalled();
    const bookFromStorage = BookModel.find(component.book.title);
    expect(bookFromStorage).toEqual(component.book);
  }));
});
