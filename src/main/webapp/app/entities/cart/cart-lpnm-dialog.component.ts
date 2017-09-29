import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CartLpnm } from './cart-lpnm.model';
import { CartLpnmPopupService } from './cart-lpnm-popup.service';
import { CartLpnmService } from './cart-lpnm.service';

@Component({
    selector: 'jhi-cart-lpnm-dialog',
    templateUrl: './cart-lpnm-dialog.component.html'
})
export class CartLpnmDialogComponent implements OnInit {

    cart: CartLpnm;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cartService: CartLpnmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cart.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cartService.update(this.cart));
        } else {
            this.subscribeToSaveResponse(
                this.cartService.create(this.cart));
        }
    }

    private subscribeToSaveResponse(result: Observable<CartLpnm>) {
        result.subscribe((res: CartLpnm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CartLpnm) {
        this.eventManager.broadcast({ name: 'cartListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-cart-lpnm-popup',
    template: ''
})
export class CartLpnmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartPopupService: CartLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cartPopupService
                    .open(CartLpnmDialogComponent as Component, params['id']);
            } else {
                this.cartPopupService
                    .open(CartLpnmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
