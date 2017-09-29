/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { LesnouveauxpetitsmondesStoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CartLpnmDetailComponent } from '../../../../../../main/webapp/app/entities/cart/cart-lpnm-detail.component';
import { CartLpnmService } from '../../../../../../main/webapp/app/entities/cart/cart-lpnm.service';
import { CartLpnm } from '../../../../../../main/webapp/app/entities/cart/cart-lpnm.model';

describe('Component Tests', () => {

    describe('CartLpnm Management Detail Component', () => {
        let comp: CartLpnmDetailComponent;
        let fixture: ComponentFixture<CartLpnmDetailComponent>;
        let service: CartLpnmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LesnouveauxpetitsmondesStoreTestModule],
                declarations: [CartLpnmDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CartLpnmService,
                    JhiEventManager
                ]
            }).overrideTemplate(CartLpnmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CartLpnmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CartLpnmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CartLpnm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cart).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
