import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CartItemLpnm } from './cart-item-lpnm.model';
import { CartItemLpnmPopupService } from './cart-item-lpnm-popup.service';
import { CartItemLpnmService } from './cart-item-lpnm.service';
import { ProductLpnm, ProductLpnmService } from '../product';
import { CartLpnm, CartLpnmService } from '../cart';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-cart-item-lpnm-dialog',
    templateUrl: './cart-item-lpnm-dialog.component.html'
})
export class CartItemLpnmDialogComponent implements OnInit {

    cartItem: CartItemLpnm;
    isSaving: boolean;

    products: ProductLpnm[];

    carts: CartLpnm[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cartItemService: CartItemLpnmService,
        private productService: ProductLpnmService,
        private cartService: CartLpnmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.cartService.query()
            .subscribe((res: ResponseWrapper) => { this.carts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cartItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cartItemService.update(this.cartItem));
        } else {
            this.subscribeToSaveResponse(
                this.cartItemService.create(this.cartItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<CartItemLpnm>) {
        result.subscribe((res: CartItemLpnm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CartItemLpnm) {
        this.eventManager.broadcast({ name: 'cartItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: ProductLpnm) {
        return item.id;
    }

    trackCartById(index: number, item: CartLpnm) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cart-item-lpnm-popup',
    template: ''
})
export class CartItemLpnmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartItemPopupService: CartItemLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cartItemPopupService
                    .open(CartItemLpnmDialogComponent as Component, params['id']);
            } else {
                this.cartItemPopupService
                    .open(CartItemLpnmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
