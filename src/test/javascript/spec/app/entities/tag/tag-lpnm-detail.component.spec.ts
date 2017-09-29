/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { LesnouveauxpetitsmondesStoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TagLpnmDetailComponent } from '../../../../../../main/webapp/app/entities/tag/tag-lpnm-detail.component';
import { TagLpnmService } from '../../../../../../main/webapp/app/entities/tag/tag-lpnm.service';
import { TagLpnm } from '../../../../../../main/webapp/app/entities/tag/tag-lpnm.model';

describe('Component Tests', () => {

    describe('TagLpnm Management Detail Component', () => {
        let comp: TagLpnmDetailComponent;
        let fixture: ComponentFixture<TagLpnmDetailComponent>;
        let service: TagLpnmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LesnouveauxpetitsmondesStoreTestModule],
                declarations: [TagLpnmDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TagLpnmService,
                    JhiEventManager
                ]
            }).overrideTemplate(TagLpnmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagLpnmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagLpnmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TagLpnm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tag).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
