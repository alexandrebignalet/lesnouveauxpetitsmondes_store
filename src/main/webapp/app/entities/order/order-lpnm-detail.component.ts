import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { OrderLpnm } from './order-lpnm.model';
import { OrderLpnmService } from './order-lpnm.service';

@Component({
    selector: 'jhi-order-lpnm-detail',
    templateUrl: './order-lpnm-detail.component.html'
})
export class OrderLpnmDetailComponent implements OnInit, OnDestroy {

    order: OrderLpnm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderService: OrderLpnmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrders();
    }

    load(id) {
        this.orderService.find(id).subscribe((order) => {
            this.order = order;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderListModification',
            (response) => this.load(this.order.id)
        );
    }
}
