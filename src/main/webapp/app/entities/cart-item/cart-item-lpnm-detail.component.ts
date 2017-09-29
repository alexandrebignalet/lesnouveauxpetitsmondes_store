import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CartItemLpnm } from './cart-item-lpnm.model';
import { CartItemLpnmService } from './cart-item-lpnm.service';

@Component({
    selector: 'jhi-cart-item-lpnm-detail',
    templateUrl: './cart-item-lpnm-detail.component.html'
})
export class CartItemLpnmDetailComponent implements OnInit, OnDestroy {

    cartItem: CartItemLpnm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cartItemService: CartItemLpnmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCartItems();
    }

    load(id) {
        this.cartItemService.find(id).subscribe((cartItem) => {
            this.cartItem = cartItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCartItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cartItemListModification',
            (response) => this.load(this.cartItem.id)
        );
    }
}
