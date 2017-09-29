/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { LesnouveauxpetitsmondesStoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserExtraInfoDetailComponent } from '../../../../../../main/webapp/app/entities/user-extra-info/user-extra-info-detail.component';
import { UserExtraInfoService } from '../../../../../../main/webapp/app/entities/user-extra-info/user-extra-info.service';
import { UserExtraInfo } from '../../../../../../main/webapp/app/entities/user-extra-info/user-extra-info.model';

describe('Component Tests', () => {

    describe('UserExtraInfo Management Detail Component', () => {
        let comp: UserExtraInfoDetailComponent;
        let fixture: ComponentFixture<UserExtraInfoDetailComponent>;
        let service: UserExtraInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LesnouveauxpetitsmondesStoreTestModule],
                declarations: [UserExtraInfoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserExtraInfoService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserExtraInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserExtraInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtraInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserExtraInfo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userExtraInfo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
