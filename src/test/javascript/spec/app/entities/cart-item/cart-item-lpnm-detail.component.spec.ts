/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { LesnouveauxpetitsmondesStoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CartItemLpnmDetailComponent } from '../../../../../../main/webapp/app/entities/cart-item/cart-item-lpnm-detail.component';
import { CartItemLpnmService } from '../../../../../../main/webapp/app/entities/cart-item/cart-item-lpnm.service';
import { CartItemLpnm } from '../../../../../../main/webapp/app/entities/cart-item/cart-item-lpnm.model';

describe('Component Tests', () => {

    describe('CartItemLpnm Management Detail Component', () => {
        let comp: CartItemLpnmDetailComponent;
        let fixture: ComponentFixture<CartItemLpnmDetailComponent>;
        let service: CartItemLpnmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LesnouveauxpetitsmondesStoreTestModule],
                declarations: [CartItemLpnmDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CartItemLpnmService,
                    JhiEventManager
                ]
            }).overrideTemplate(CartItemLpnmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CartItemLpnmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CartItemLpnmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CartItemLpnm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cartItem).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
