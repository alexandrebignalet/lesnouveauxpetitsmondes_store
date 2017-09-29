import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressLpnm } from './address-lpnm.model';
import { AddressLpnmPopupService } from './address-lpnm-popup.service';
import { AddressLpnmService } from './address-lpnm.service';

@Component({
    selector: 'jhi-address-lpnm-delete-dialog',
    templateUrl: './address-lpnm-delete-dialog.component.html'
})
export class AddressLpnmDeleteDialogComponent {

    address: AddressLpnm;

    constructor(
        private addressService: AddressLpnmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressListModification',
                content: 'Deleted an address'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-lpnm-delete-popup',
    template: ''
})
export class AddressLpnmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.addressPopupService
                .open(AddressLpnmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
