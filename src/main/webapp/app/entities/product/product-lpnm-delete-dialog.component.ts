import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductLpnm } from './product-lpnm.model';
import { ProductLpnmPopupService } from './product-lpnm-popup.service';
import { ProductLpnmService } from './product-lpnm.service';

@Component({
    selector: 'jhi-product-lpnm-delete-dialog',
    templateUrl: './product-lpnm-delete-dialog.component.html'
})
export class ProductLpnmDeleteDialogComponent {

    product: ProductLpnm;

    constructor(
        private productService: ProductLpnmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-lpnm-delete-popup',
    template: ''
})
export class ProductLpnmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productPopupService
                .open(ProductLpnmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
