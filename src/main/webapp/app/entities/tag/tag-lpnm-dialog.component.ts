import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TagLpnm } from './tag-lpnm.model';
import { TagLpnmPopupService } from './tag-lpnm-popup.service';
import { TagLpnmService } from './tag-lpnm.service';
import { ProductLpnm, ProductLpnmService } from '../product';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tag-lpnm-dialog',
    templateUrl: './tag-lpnm-dialog.component.html'
})
export class TagLpnmDialogComponent implements OnInit {

    tag: TagLpnm;
    isSaving: boolean;

    products: ProductLpnm[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tagService: TagLpnmService,
        private productService: ProductLpnmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tagService.update(this.tag));
        } else {
            this.subscribeToSaveResponse(
                this.tagService.create(this.tag));
        }
    }

    private subscribeToSaveResponse(result: Observable<TagLpnm>) {
        result.subscribe((res: TagLpnm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TagLpnm) {
        this.eventManager.broadcast({ name: 'tagListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-tag-lpnm-popup',
    template: ''
})
export class TagLpnmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagPopupService: TagLpnmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tagPopupService
                    .open(TagLpnmDialogComponent as Component, params['id']);
            } else {
                this.tagPopupService
                    .open(TagLpnmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
