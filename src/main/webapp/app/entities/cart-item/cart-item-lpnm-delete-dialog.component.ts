import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CartItemLpnm } from './cart-item-lpnm.model';
import { CartItemLpnmPopupService } from './cart-item-lpnm-popup.service';
import { CartItemLpnmService } from './cart-item-lpnm.service';

@Component({
    selector: 'jhi-cart-item-lpnm-delete-dialog',
    templateUrl: './cart-item-lpnm-delete-dialog.component.html'
})
export class CartItemLpnmDeleteDialogComponent {

    cartItem: CartItemLpnm;

    constructor(
        private cartItemService: CartItemLpnmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cartItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cartItemListModification',
                content: 'Deleted an cartItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cart-item-lpnm-delete-popup',
    template: ''
})
export class CartItemLpnmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartItemPopupService: CartItemLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cartItemPopupService
                .open(CartItemLpnmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
