/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { LesnouveauxpetitsmondesStoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CategoryLpnmDetailComponent } from '../../../../../../main/webapp/app/entities/category/category-lpnm-detail.component';
import { CategoryLpnmService } from '../../../../../../main/webapp/app/entities/category/category-lpnm.service';
import { CategoryLpnm } from '../../../../../../main/webapp/app/entities/category/category-lpnm.model';

describe('Component Tests', () => {

    describe('CategoryLpnm Management Detail Component', () => {
        let comp: CategoryLpnmDetailComponent;
        let fixture: ComponentFixture<CategoryLpnmDetailComponent>;
        let service: CategoryLpnmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LesnouveauxpetitsmondesStoreTestModule],
                declarations: [CategoryLpnmDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CategoryLpnmService,
                    JhiEventManager
                ]
            }).overrideTemplate(CategoryLpnmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryLpnmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryLpnmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CategoryLpnm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.category).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
