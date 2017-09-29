import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderLpnm } from './order-lpnm.model';
import { OrderLpnmPopupService } from './order-lpnm-popup.service';
import { OrderLpnmService } from './order-lpnm.service';
import { CartLpnm, CartLpnmService } from '../cart';
import { AddressLpnm, AddressLpnmService } from '../address';
import { UserExtraInfo, UserExtraInfoService } from '../user-extra-info';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-order-lpnm-dialog',
    templateUrl: './order-lpnm-dialog.component.html'
})
export class OrderLpnmDialogComponent implements OnInit {

    order: OrderLpnm;
    isSaving: boolean;

    carts: CartLpnm[];

    addresses: AddressLpnm[];

    userextrainfos: UserExtraInfo[];
    creationDateDp: any;
    shippedDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderService: OrderLpnmService,
        private cartService: CartLpnmService,
        private addressService: AddressLpnmService,
        private userExtraInfoService: UserExtraInfoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cartService
            .query({filter: 'order-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.order.cartId) {
                    this.carts = res.json;
                } else {
                    this.cartService
                        .find(this.order.cartId)
                        .subscribe((subRes: CartLpnm) => {
                            this.carts = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.addressService.query()
            .subscribe((res: ResponseWrapper) => { this.addresses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userExtraInfoService.query()
            .subscribe((res: ResponseWrapper) => { this.userextrainfos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.order.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderService.update(this.order));
        } else {
            this.subscribeToSaveResponse(
                this.orderService.create(this.order));
        }
    }

    private subscribeToSaveResponse(result: Observable<OrderLpnm>) {
        result.subscribe((res: OrderLpnm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderLpnm) {
        this.eventManager.broadcast({ name: 'orderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCartById(index: number, item: CartLpnm) {
        return item.id;
    }

    trackAddressById(index: number, item: AddressLpnm) {
        return item.id;
    }

    trackUserExtraInfoById(index: number, item: UserExtraInfo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-lpnm-popup',
    template: ''
})
export class OrderLpnmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderPopupService
                    .open(OrderLpnmDialogComponent as Component, params['id']);
            } else {
                this.orderPopupService
                    .open(OrderLpnmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
