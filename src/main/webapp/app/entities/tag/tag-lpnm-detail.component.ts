import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TagLpnm } from './tag-lpnm.model';
import { TagLpnmService } from './tag-lpnm.service';

@Component({
    selector: 'jhi-tag-lpnm-detail',
    templateUrl: './tag-lpnm-detail.component.html'
})
export class TagLpnmDetailComponent implements OnInit, OnDestroy {

    tag: TagLpnm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tagService: TagLpnmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTags();
    }

    load(id) {
        this.tagService.find(id).subscribe((tag) => {
            this.tag = tag;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tagListModification',
            (response) => this.load(this.tag.id)
        );
    }
}
