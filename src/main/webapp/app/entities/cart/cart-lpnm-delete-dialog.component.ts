import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CartLpnm } from './cart-lpnm.model';
import { CartLpnmPopupService } from './cart-lpnm-popup.service';
import { CartLpnmService } from './cart-lpnm.service';

@Component({
    selector: 'jhi-cart-lpnm-delete-dialog',
    templateUrl: './cart-lpnm-delete-dialog.component.html'
})
export class CartLpnmDeleteDialogComponent {

    cart: CartLpnm;

    constructor(
        private cartService: CartLpnmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cartService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cartListModification',
                content: 'Deleted an cart'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cart-lpnm-delete-popup',
    template: ''
})
export class CartLpnmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartPopupService: CartLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cartPopupService
                .open(CartLpnmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
