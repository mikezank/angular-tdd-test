import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "src/app/app.component";
import { CartService } from "src/app/services/cart.service";
import { CartServiceMock } from "src/app/services/cart.service.mock";
import { environment } from "src/environments/environment";

@Component({ selector: 'book' })
class BookComponent { }

@Component({ selector: 'book-edit' })
class BookEditComponent { }

@Component({})
class BookListComponent { }

describe('routing should work', () => {
    let router: Router;
    let location: Location;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        const routerStub: Object = {
            navigate: function () { },
            routerState: {},
        };

        spyOn<any>(routerStub, 'navigate');

        TestBed.configureTestingModule({
            declarations: [
                AppComponent, BookComponent, BookEditComponent,
                BookListComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'books/title', component: BookComponent },
                    { path: 'books/edit', component: BookEditComponent },
                    { path: 'books', component: BookListComponent },
                ])
            ],
            providers: [
                { provide: CartService, useClass: CartServiceMock },
                { provide: environment, useValue: {} }
            ]
        }).compileComponents();
    }));

    it('should navigate to the default route',
        inject([Router, Location], fakeAsync((router: Router, location: Location) => {
            router.initialNavigation();
            tick();
            router.navigate(['books']);
            tick();

            expect(location.path()).toBe('/books');
        })));

    it('should navigate to the book edit',
        inject([Router, Location], fakeAsync((router: Router, location: Location) => {
            router.initialNavigation();
            tick();
            router.navigate(['books', 'edit', 1]);
            tick();

            expect(location.path()).toBe('/books/edit/1');
        })));
});