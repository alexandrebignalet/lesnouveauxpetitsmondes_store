import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderLpnm } from './order-lpnm.model';
import { OrderLpnmPopupService } from './order-lpnm-popup.service';
import { OrderLpnmService } from './order-lpnm.service';

@Component({
    selector: 'jhi-order-lpnm-delete-dialog',
    templateUrl: './order-lpnm-delete-dialog.component.html'
})
export class OrderLpnmDeleteDialogComponent {

    order: OrderLpnm;

    constructor(
        private orderService: OrderLpnmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'Deleted an order'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-lpnm-delete-popup',
    template: ''
})
export class OrderLpnmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderPopupService
                .open(OrderLpnmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
