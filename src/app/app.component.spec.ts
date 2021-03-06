import { fakeAsync, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from './services/cart.service';
import { CartList, CartServiceMock } from './services/cart.service.mock';
import { DiscountFormatterPipe } from './pipes/discount-formatter.pipe';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BookComponent,
        DiscountFormatterPipe
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: CartService, useClass: CartServiceMock}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display the cart after rendering', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.cart).toBe(CartList);
  }));

  it(`should have as title 'angular-testing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-testing');
  });

  it('should render title in an h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-testing!');
  });
});
