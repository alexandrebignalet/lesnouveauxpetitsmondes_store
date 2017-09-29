import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TagLpnm } from './tag-lpnm.model';
import { TagLpnmPopupService } from './tag-lpnm-popup.service';
import { TagLpnmService } from './tag-lpnm.service';

@Component({
    selector: 'jhi-tag-lpnm-delete-dialog',
    templateUrl: './tag-lpnm-delete-dialog.component.html'
})
export class TagLpnmDeleteDialogComponent {

    tag: TagLpnm;

    constructor(
        private tagService: TagLpnmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tagListModification',
                content: 'Deleted an tag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tag-lpnm-delete-popup',
    template: ''
})
export class TagLpnmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagPopupService: TagLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tagPopupService
                .open(TagLpnmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
