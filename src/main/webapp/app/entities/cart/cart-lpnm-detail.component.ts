import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CartLpnm } from './cart-lpnm.model';
import { CartLpnmService } from './cart-lpnm.service';

@Component({
    selector: 'jhi-cart-lpnm-detail',
    templateUrl: './cart-lpnm-detail.component.html'
})
export class CartLpnmDetailComponent implements OnInit, OnDestroy {

    cart: CartLpnm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cartService: CartLpnmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCarts();
    }

    load(id) {
        this.cartService.find(id).subscribe((cart) => {
            this.cart = cart;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCarts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cartListModification',
            (response) => this.load(this.cart.id)
        );
    }
}
