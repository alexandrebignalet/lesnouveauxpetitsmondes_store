/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { LesnouveauxpetitsmondesStoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AddressLpnmDetailComponent } from '../../../../../../main/webapp/app/entities/address/address-lpnm-detail.component';
import { AddressLpnmService } from '../../../../../../main/webapp/app/entities/address/address-lpnm.service';
import { AddressLpnm } from '../../../../../../main/webapp/app/entities/address/address-lpnm.model';

describe('Component Tests', () => {

    describe('AddressLpnm Management Detail Component', () => {
        let comp: AddressLpnmDetailComponent;
        let fixture: ComponentFixture<AddressLpnmDetailComponent>;
        let service: AddressLpnmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LesnouveauxpetitsmondesStoreTestModule],
                declarations: [AddressLpnmDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AddressLpnmService,
                    JhiEventManager
                ]
            }).overrideTemplate(AddressLpnmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressLpnmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressLpnmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AddressLpnm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.address).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
