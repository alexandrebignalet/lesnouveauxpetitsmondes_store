/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { LesnouveauxpetitsmondesStoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProductLpnmDetailComponent } from '../../../../../../main/webapp/app/entities/product/product-lpnm-detail.component';
import { ProductLpnmService } from '../../../../../../main/webapp/app/entities/product/product-lpnm.service';
import { ProductLpnm } from '../../../../../../main/webapp/app/entities/product/product-lpnm.model';

describe('Component Tests', () => {

    describe('ProductLpnm Management Detail Component', () => {
        let comp: ProductLpnmDetailComponent;
        let fixture: ComponentFixture<ProductLpnmDetailComponent>;
        let service: ProductLpnmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LesnouveauxpetitsmondesStoreTestModule],
                declarations: [ProductLpnmDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProductLpnmService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProductLpnmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductLpnmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductLpnmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProductLpnm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.product).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
