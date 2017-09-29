import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UserExtraInfo } from './user-extra-info.model';
import { UserExtraInfoService } from './user-extra-info.service';

@Component({
    selector: 'jhi-user-extra-info-detail',
    templateUrl: './user-extra-info-detail.component.html'
})
export class UserExtraInfoDetailComponent implements OnInit, OnDestroy {

    userExtraInfo: UserExtraInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userExtraInfoService: UserExtraInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserExtraInfos();
    }

    load(id) {
        this.userExtraInfoService.find(id).subscribe((userExtraInfo) => {
            this.userExtraInfo = userExtraInfo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserExtraInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userExtraInfoListModification',
            (response) => this.load(this.userExtraInfo.id)
        );
    }
}
