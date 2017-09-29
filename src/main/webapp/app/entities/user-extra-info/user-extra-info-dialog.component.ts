import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserExtraInfo } from './user-extra-info.model';
import { UserExtraInfoPopupService } from './user-extra-info-popup.service';
import { UserExtraInfoService } from './user-extra-info.service';
import { AddressLpnm, AddressLpnmService } from '../address';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-extra-info-dialog',
    templateUrl: './user-extra-info-dialog.component.html'
})
export class UserExtraInfoDialogComponent implements OnInit {

    userExtraInfo: UserExtraInfo;
    isSaving: boolean;

    addresses: AddressLpnm[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userExtraInfoService: UserExtraInfoService,
        private addressService: AddressLpnmService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.addressService.query()
            .subscribe((res: ResponseWrapper) => { this.addresses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userExtraInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userExtraInfoService.update(this.userExtraInfo));
        } else {
            this.subscribeToSaveResponse(
                this.userExtraInfoService.create(this.userExtraInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserExtraInfo>) {
        result.subscribe((res: UserExtraInfo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserExtraInfo) {
        this.eventManager.broadcast({ name: 'userExtraInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAddressById(index: number, item: AddressLpnm) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-extra-info-popup',
    template: ''
})
export class UserExtraInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userExtraInfoPopupService: UserExtraInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userExtraInfoPopupService
                    .open(UserExtraInfoDialogComponent as Component, params['id']);
            } else {
                this.userExtraInfoPopupService
                    .open(UserExtraInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
